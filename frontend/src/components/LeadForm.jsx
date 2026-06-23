import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2 } from "lucide-react";
import { submitZohoLead, ZOHO_SUCCESS_MSG } from "@/lib/zohoLead";
import { track, EVENTS } from "@/lib/analytics";
import { toast } from "sonner";

/**
 * LeadForm — single shared lead form used on Contact, Homes, Businesses, Societies.
 * Submits to /api/zoho/lead → Zoho CRM with proper custom-field mapping.
 *
 * Segment → Zoho:
 *   home / society     → Lead_Type B2C, Layout B2C
 *   business           → Lead_Type B2B, Layout B2B
 *   government         → Lead_Type B2G, Layout B2C
 */
const SEGMENTS = [
  { key: "home",       label: "Home" },
  { key: "society",    label: "Society" },
  { key: "business",   label: "Business" },
  { key: "government", label: "Government" },
];

const PROPERTY_TYPES = {
  home:       ["Independent house", "Villa", "Duplex", "Apartment (own roof)"],
  society:    ["Apartment / Society", "Gated community", "Township"],
  business:   ["Factory / Warehouse", "Office / Commercial", "Retail / Showroom", "Hotel / Hospitality"],
  government: ["School / College", "Hospital", "Government office", "Other institution"],
};

const BUDGET_OPTIONS = ["Under 1 Lakh", "1-3 Lakh", "3-6 Lakh", "Above 6 Lakh"];

export const LeadForm = ({
  defaultSegment = "home",
  source = "contact",
  title = "Get a free solar assessment",
  subtitle = "A solar expert will review your details and contact you within one business day.",
  estimatorData = null,
}) => {
  const [params] = useSearchParams();

  // Allow Contact page to be prefilled via ?segment=&bill=&kw=&city=
  const initialSegment = params.get("segment") || defaultSegment;
  const [form, setForm] = useState({
    segment: SEGMENTS.find((s) => s.key === initialSegment) ? initialSegment : "home",
    city: params.get("city") || "",
    monthly_bill: params.get("bill") || estimatorData?.monthlyBill || "",
    property_type: "",
    rooftop_area: "",
    industry_type: "",
    government_name: "",
    budget_range: "",
    system_size_kw: params.get("kw") || (estimatorData?.systemSizeKw || ""),
    name: "",
    phone: "",
    email: "",
    notes: "",
    preferred_callback: "",
  });

  // Ensure a default property type is set per segment
  useEffect(() => {
    setForm((s) => ({ ...s, property_type: s.property_type || PROPERTY_TYPES[s.segment][0] }));
  }, [form.segment]);

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [successMsg, setSuccessMsg] = useState(ZOHO_SUCCESS_MSG);
  const [startedTracked, setStartedTracked] = useState(false);

  const update = (k, v) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (!startedTracked) { track(EVENTS.LEAD_START, { source }); setStartedTracked(true); }
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    const phoneDigits = (form.phone || "").replace(/\D/g, "");
    if (phoneDigits.length < 10) e.phone = "Enter a valid 10-digit phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email or leave blank.";
    if (!form.city.trim()) e.city = "City or pincode is required.";
    if (!form.monthly_bill || isNaN(Number(form.monthly_bill))) e.monthly_bill = "Average monthly bill is required.";
    if (form.segment === "government" && !form.government_name.trim()) e.government_name = "Department / institution name is required.";
    if (form.segment === "business" && !form.industry_type.trim()) e.industry_type = "Industry / business type is required.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) { track(EVENTS.LEAD_ERROR, { source }); return; }
    setSubmitting(true);

    const enquiryTypeMap = {
      home: "Residential",
      society: "Society",
      business: "Commercial",
      government: "Government / Institution",
    };

    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName  = nameParts.slice(1).join(" ") || nameParts[0] || "Website Lead";

    const zohoPayload = {
      formName: title,
      pageSource: source,
      segment: form.segment,
      enquiryType: enquiryTypeMap[form.segment] || form.segment,
      firstName,
      lastName,
      fullName: form.name.trim(),
      phone: form.phone,
      email: form.email || "",
      cityOrPincode: form.city,
      monthlyBill: form.monthly_bill,
      propertyType: form.property_type,
      rooftopAreaSqft: form.rooftop_area || "",
      industryType: form.segment === "business" ? form.industry_type : "",
      governmentName: form.segment === "government" ? form.government_name : "",
      budgetRange: form.budget_range || "",
      systemSizeKw: form.system_size_kw ? Number(form.system_size_kw) : undefined,
      message: form.notes || "",
      preferredVisitDate: form.preferred_callback || "",
      ...(estimatorData || {}),
      ...(form.segment === "business" ? { companyName: form.industry_type || form.name } : {}),
      ...(form.segment === "society"  ? { societyName: form.name } : {}),
      ...(form.segment === "government" ? { institutionName: form.government_name } : {}),
    };

    try {
      const result = await submitZohoLead(zohoPayload);
      track(EVENTS.LEAD_SUBMIT, { source, segment: form.segment });
      setSuccessMsg(result.message || ZOHO_SUCCESS_MSG);
      setDone(true);
      toast.success(result.message || ZOHO_SUCCESS_MSG);
    } catch (err) {
      track(EVENTS.LEAD_ERROR, { source, reason: "submit_failed" });
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  if (done) {
    return (
      <div data-testid="lead-success" className="card-js text-center max-w-xl mx-auto">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[rgb(var(--js-primary))]/10 text-[rgb(var(--js-primary-dark))]">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-2xl font-semibold">You&apos;re in. Thanks!</h3>
        <p className="mt-2 text-sm text-[rgb(var(--js-muted))]">{successMsg}</p>
      </div>
    );
  }

  const propertyOptions = PROPERTY_TYPES[form.segment] || PROPERTY_TYPES.home;

  return (
    <div className="card-js max-w-xl mx-auto" data-testid="lead-form">
      <div>
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-1 text-sm text-[rgb(var(--js-muted))]">{subtitle}</p>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        {/* ── Segment selector ── */}
        <div>
          <label className="label-js">I am enquiring for</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SEGMENTS.map((s) => (
              <button
                key={s.key}
                type="button"
                data-testid={`leadform-segment-${s.key}`}
                onClick={() => update("segment", s.key)}
                className={`rounded-xl border px-2 py-2 text-[12px] sm:text-sm font-medium transition ${
                  form.segment === s.key
                    ? "border-[rgb(var(--js-primary))] bg-[rgb(var(--js-primary))] text-white"
                    : "border-[rgb(var(--js-border))] bg-white text-[rgb(var(--js-text))] hover:bg-[rgb(var(--js-bg-alt))]"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── Identity (always required) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lf-name" className="label-js">Full name <span className="text-[rgb(var(--js-danger))]">*</span></label>
            <input id="lf-name" data-testid="lf-name" value={form.name} onChange={(e) => update("name", e.target.value)} className="input-js" />
            {errors.name && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="lf-phone" className="label-js">Phone <span className="text-[rgb(var(--js-danger))]">*</span></label>
            <input id="lf-phone" data-testid="lf-phone" inputMode="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 9XXXXXXXXX" className="input-js" />
            {errors.phone && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="lf-email" className="label-js">Email <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
          <input id="lf-email" data-testid="lf-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input-js" />
          {errors.email && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.email}</p>}
        </div>

        {/* ── Segment-specific identification ── */}
        {form.segment === "business" && (
          <div>
            <label htmlFor="lf-industry" className="label-js">Industry / Business type <span className="text-[rgb(var(--js-danger))]">*</span></label>
            <input id="lf-industry" data-testid="lf-industry" value={form.industry_type} onChange={(e) => update("industry_type", e.target.value)} placeholder="e.g. Pharma, Textile, Cold storage" className="input-js" />
            {errors.industry_type && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.industry_type}</p>}
          </div>
        )}

        {form.segment === "government" && (
          <div>
            <label htmlFor="lf-gov" className="label-js">Department / Institution name <span className="text-[rgb(var(--js-danger))]">*</span></label>
            <input id="lf-gov" data-testid="lf-gov" value={form.government_name} onChange={(e) => update("government_name", e.target.value)} placeholder="e.g. ZP High School, District Hospital" className="input-js" />
            {errors.government_name && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.government_name}</p>}
          </div>
        )}

        {/* ── Property details ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lf-city" className="label-js">City or pincode <span className="text-[rgb(var(--js-danger))]">*</span></label>
            <input id="lf-city" data-testid="lf-city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Hyderabad / 500001" className="input-js" />
            {errors.city && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.city}</p>}
          </div>
          <div>
            <label htmlFor="lf-bill" className="label-js">Avg. monthly electricity bill (₹) <span className="text-[rgb(var(--js-danger))]">*</span></label>
            <input id="lf-bill" data-testid="lf-bill" inputMode="numeric" value={form.monthly_bill} onChange={(e) => update("monthly_bill", e.target.value.replace(/[^0-9]/g, ""))} placeholder="3500" className="input-js" />
            {errors.monthly_bill && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.monthly_bill}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lf-ptype" className="label-js">Property type</label>
            <select id="lf-ptype" data-testid="lf-property" value={form.property_type} onChange={(e) => update("property_type", e.target.value)} className="input-js">
              {propertyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="lf-area" className="label-js">Rooftop area (sq.ft) <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
            <input id="lf-area" data-testid="lf-area" inputMode="numeric" value={form.rooftop_area} onChange={(e) => update("rooftop_area", e.target.value.replace(/[^0-9]/g, ""))} placeholder="500" className="input-js" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="lf-budget" className="label-js">Budget range <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
            <select id="lf-budget" data-testid="lf-budget" value={form.budget_range} onChange={(e) => update("budget_range", e.target.value)} className="input-js">
              <option value="">Prefer not to say</option>
              {BUDGET_OPTIONS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="lf-callback" className="label-js">Preferred callback time <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
            <select id="lf-callback" data-testid="lf-callback" value={form.preferred_callback} onChange={(e) => update("preferred_callback", e.target.value)} className="input-js">
              <option value="">No preference</option>
              <option>9 AM – 12 PM</option>
              <option>12 PM – 3 PM</option>
              <option>3 PM – 6 PM</option>
              <option>6 PM – 8 PM</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="lf-notes" className="label-js">Notes <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
          <textarea id="lf-notes" data-testid="lf-notes" rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Roof type, shading, urgency, sanctioned load, anything that helps." className="input-js"></textarea>
        </div>

        <p className="text-[11px] text-[rgb(var(--js-muted))]">
          No payment required. No obligation. A solar expert will review your details and contact you.
        </p>

        <button type="submit" data-testid="lf-submit" disabled={submitting} className="btn-primary disabled:opacity-60">
          {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Submit & book free survey"}
        </button>
      </form>
    </div>
  );
};

export default LeadForm;
