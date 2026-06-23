import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, CheckCircle2, Upload } from "lucide-react";
import { submitZohoLead, ZOHO_SUCCESS_MSG } from "@/lib/zohoLead";
import { track, EVENTS } from "@/lib/analytics";
import { toast } from "sonner";

/**
 * LeadForm — used on Contact, Homes, Businesses, Societies, and Institutions pages.
 * Submits to /api/zoho/lead (backend) which creates a Lead in Zoho CRM.
 */
export const LeadForm = ({
  defaultSegment = "home",
  source = "contact",
  title = "Get a free solar assessment",
  subtitle = "A solar expert will review your details and contact you within one business day.",
  // Optional pre-filled estimator data passed from SavingsEstimator
  estimatorData = null,
}) => {
  const [params] = useSearchParams();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    segment: params.get("segment") || defaultSegment,
    city: "",
    monthly_bill: "",
    property_type: "Independent house",
    name: "",
    phone: "",
    email: "",
    notes: "",
    preferred_callback: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [successMsg, setSuccessMsg] = useState(ZOHO_SUCCESS_MSG);
  const [startedTracked, setStartedTracked] = useState(false);

  const update = (k, v) => {
    setForm((s) => ({ ...s, [k]: v }));
    if (!startedTracked) { track(EVENTS.LEAD_START, { source }); setStartedTracked(true); }
  };

  // Validation per spec
  const validateStep1 = () => {
    const e = {};
    if (!form.city.trim()) e.city = "City or pincode is required.";
    if (!form.monthly_bill || isNaN(Number(form.monthly_bill))) e.monthly_bill = "Please enter your average monthly bill.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateStep2 = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    const phoneDigits = (form.phone || "").replace(/\D/g, "");
    if (phoneDigits.length < 10) e.phone = "Enter a valid 10-digit phone number.";
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email or leave blank.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (step === 1 && !validateStep1()) { track(EVENTS.LEAD_ERROR, { step: 1 }); return; }
    if (step === 2 && !validateStep2()) { track(EVENTS.LEAD_ERROR, { step: 2 }); return; }
    setStep((s) => Math.min(3, s + 1));
  };
  const back = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep2()) { setStep(2); return; }
    setSubmitting(true);

    // Map enquiry type from segment
    const enquiryTypeMap = {
      home: "Residential",
      business: "Commercial",
      society: "Society",
      institution: "Institution",
    };

    // Build Zoho lead payload per spec
    const nameParts = form.name.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || nameParts[0] || "Website Lead";

    const zohoPayload = {
      formName: title,
      pageSource: source,
      enquiryType: enquiryTypeMap[form.segment] || form.segment,
      firstName,
      lastName,
      fullName: form.name.trim(),
      phone: form.phone,
      email: form.email || "",
      cityOrPincode: form.city,
      monthlyBill: form.monthly_bill ? `₹${form.monthly_bill}` : "",
      propertyType: form.property_type,
      message: form.notes || "",
      preferredVisitDate: form.preferred_callback || "",
      // Pass through estimator data if available
      ...(estimatorData || {}),
      // Segment-specific company/society/institution name
      ...(form.segment === "business" ? { companyName: form.name } : {}),
      ...(form.segment === "society" ? { societyName: form.name } : {}),
      ...(form.segment === "institution" ? { institutionName: form.name } : {}),
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

  return (
    <div className="card-js max-w-xl mx-auto" data-testid="lead-form">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">{title}</h3>
          <p className="mt-1 text-sm text-[rgb(var(--js-muted))]">{subtitle}</p>
        </div>
        <span className="chip" data-testid="lead-step">Step {step} / 3</span>
      </div>

      <form onSubmit={onSubmit} className="mt-6 grid gap-4">
        {step === 1 && (
          <>
            <div>
              <label className="label-js">I am interested in</label>
              <div className="grid grid-cols-4 gap-2">
                {["home", "business", "society", "institution"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    data-testid={`leadform-segment-${s}`}
                    onClick={() => update("segment", s)}
                    className={`rounded-xl border px-2 py-2 text-[12px] sm:text-sm capitalize font-medium ${
                      form.segment === s
                        ? "border-[rgb(var(--js-primary))] bg-[rgb(var(--js-primary))] text-white"
                        : "border-[rgb(var(--js-border))] bg-white text-[rgb(var(--js-text))] hover:bg-[rgb(var(--js-bg-alt))]"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="lf-city" className="label-js">City or pincode <span className="text-[rgb(var(--js-danger))]">*</span></label>
              <input id="lf-city" data-testid="lf-city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Hyderabad / 500001" className="input-js" />
              {errors.city && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.city}</p>}
            </div>
            <div>
              <label htmlFor="lf-bill" className="label-js">Average monthly bill (₹) <span className="text-[rgb(var(--js-danger))]">*</span></label>
              <input id="lf-bill" data-testid="lf-bill" inputMode="numeric" value={form.monthly_bill} onChange={(e) => update("monthly_bill", e.target.value.replace(/[^0-9]/g, ""))} placeholder="3500" className="input-js" />
              {errors.monthly_bill && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.monthly_bill}</p>}
            </div>
            <div>
              <label htmlFor="lf-ptype" className="label-js">Property type</label>
              <select id="lf-ptype" data-testid="lf-property" value={form.property_type} onChange={(e) => update("property_type", e.target.value)} className="input-js">
                <option>Independent house</option>
                <option>Apartment / Society</option>
                <option>Factory / Warehouse</option>
                <option>Office / Commercial</option>
                <option>School / Hospital</option>
              </select>
            </div>
            <Nav onNext={next} />
          </>
        )}

        {step === 2 && (
          <>
            <div>
              <label htmlFor="lf-name" className="label-js">Name <span className="text-[rgb(var(--js-danger))]">*</span></label>
              <input id="lf-name" data-testid="lf-name" value={form.name} onChange={(e) => update("name", e.target.value)} className="input-js" />
              {errors.name && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="lf-phone" className="label-js">Phone <span className="text-[rgb(var(--js-danger))]">*</span></label>
              <input id="lf-phone" data-testid="lf-phone" inputMode="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 9XXXXXXXXX" className="input-js" />
              <p className="mt-1 text-[11px] text-[rgb(var(--js-muted))]">We&apos;ll only use this to schedule your rooftop survey or clarify your bill details.</p>
              {errors.phone && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.phone}</p>}
            </div>
            <div>
              <label htmlFor="lf-email" className="label-js">Email <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
              <input id="lf-email" data-testid="lf-email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} className="input-js" />
              {errors.email && <p className="mt-1 text-xs text-[rgb(var(--js-danger))]">{errors.email}</p>}
            </div>
            <Nav onBack={back} onNext={next} />
          </>
        )}

        {step === 3 && (
          <>
            <div>
              <label className="label-js">Electricity bill upload <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
              <label htmlFor="lf-upload" className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-[rgb(var(--js-border))] bg-[rgb(var(--js-bg-alt))] px-4 py-6 text-sm text-[rgb(var(--js-muted))] cursor-pointer">
                <Upload className="h-4 w-4" /> Click to upload (PDF / JPG)
                <input id="lf-upload" data-testid="lf-upload" type="file" accept="application/pdf,image/*" className="hidden" />
              </label>
              <p className="mt-1 text-[11px] text-[rgb(var(--js-muted))]">File upload is UI-only in this MVP; we&apos;ll request it on call if needed.</p>
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
            <div>
              <label htmlFor="lf-notes" className="label-js">Notes <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
              <textarea id="lf-notes" data-testid="lf-notes" rows={3} value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Tell us anything that helps — roof type, shading, urgency, etc." className="input-js"></textarea>
            </div>
            <p className="text-[11px] text-[rgb(var(--js-muted))]">
              No payment required. No obligation. A solar expert will review your details and contact you.
            </p>
            <div className="flex items-center justify-between gap-3">
              <button type="button" onClick={back} className="btn-secondary">Back</button>
              <button type="submit" data-testid="lf-submit" disabled={submitting} className="btn-primary disabled:opacity-60">
                {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Submitting…</> : "Submit & book survey"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

const Nav = ({ onBack, onNext }) => (
  <div className="flex items-center justify-between gap-3 mt-1">
    {onBack ? <button type="button" onClick={onBack} className="btn-secondary">Back</button> : <span />}
    <button type="button" onClick={onNext} data-testid="lf-next" className="btn-primary">Continue</button>
  </div>
);

export default LeadForm;
