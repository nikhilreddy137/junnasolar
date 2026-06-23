import { useState } from "react";
import { Calculator, TrendingUp, Loader2, Sun, CheckCircle2 } from "lucide-react";
import { submitZohoLead, ZOHO_SUCCESS_MSG } from "@/lib/zohoLead";
import { track, EVENTS } from "@/lib/analytics";
import { toast } from "sonner";

// ─── Local savings formula (no backend required) ─────────────────────────────
const SAVINGS_RATES = {
  home:        { low: 0.70, high: 0.85, payback: "4–5 years", subsidy: "Residential rooftop users may be eligible for government subsidy. We guide you through the paperwork." },
  business:    { low: 0.55, high: 0.70, payback: "3–4 years", subsidy: "Businesses are not eligible for residential subsidy but benefit from accelerated depreciation (AD) benefits." },
  society:     { low: 0.60, high: 0.75, payback: "4–5 years", subsidy: "Common-area solar for societies may qualify for subsidy under applicable state schemes. Ask us for details." },
  institution: { low: 0.55, high: 0.70, payback: "4–5 years", subsidy: "Educational and healthcare institutions may qualify for special tariff or subsidy schemes. We'll advise." },
};

const calcSavings = (segment, monthlyBill) => {
  const cfg = SAVINGS_RATES[segment] || SAVINGS_RATES.home;
  const monthly_savings_min = Math.round(monthlyBill * cfg.low);
  const monthly_savings_max = Math.round(monthlyBill * cfg.high);
  const annual_savings_min  = monthly_savings_min * 12;
  const annual_savings_max  = monthly_savings_max * 12;
  // Solar size: bill ÷ 8 ÷ 30 ÷ 4 (peak sun hours)
  const kw = monthlyBill / 8 / 30 / 4;
  const system_size_kw_min = Math.max(1, parseFloat((kw * 0.9).toFixed(1)));
  const system_size_kw_max = parseFloat((kw * 1.1).toFixed(1));
  return { monthly_savings_min, monthly_savings_max, annual_savings_min, annual_savings_max, system_size_kw_min, system_size_kw_max, payback: cfg.payback, subsidy_note: cfg.subsidy };
};

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

/**
 * SavingsEstimator — Residential page estimator.
 * Per spec:
 *  - Calculate savings locally (no Zoho lead) unless phone is entered.
 *  - Submit Zoho lead when phone is present OR when "Book Free Rooftop Survey" is clicked.
 */
export const SavingsEstimator = ({ defaultSegment = "home" }) => {
  const [form, setForm] = useState({
    segment: defaultSegment,
    city: "",
    monthly_bill: "",
    property_type: "Independent house",
    name: "",
    phone: "",
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [leadSent, setLeadSent] = useState(false);

  const update = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  // Local calculation (no Zoho unless phone present)
  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const bill = parseFloat(form.monthly_bill);
    if (!bill || bill < 100) { setError("Please enter a monthly bill of at least ₹100."); return; }
    if (!form.city.trim()) { setError("City / pincode is required."); return; }

    track(EVENTS.CALC_START, { segment: form.segment });
    setLoading(true);
    try {
      // Calculate locally — no backend needed
      const r = calcSavings(form.segment, bill);
      setResult(r);
      track(EVENTS.CALC_COMPLETE, { segment: form.segment, kw_min: r.system_size_kw_min });

      // Per spec: if phone is present, also create a Zoho lead
      const phoneDigits = (form.phone || "").replace(/\D/g, "");
      if (phoneDigits.length >= 10 && !leadSent) {
        await _sendZohoLead(r);
      }
    } catch (err) {
      setError("Couldn't calculate right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const _sendZohoLead = async (r) => {
    const nameParts = (form.name || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || nameParts[0] || "Website Lead";
    const enquiryMap = { home: "Residential", business: "Commercial", society: "Society", institution: "Government / Institution" };
    const segmentMap = { home: "home", business: "business", society: "society", institution: "government" };
    try {
      await submitZohoLead({
        formName: "Savings Estimator",
        pageSource: "homes",
        segment: segmentMap[form.segment] || "home",
        enquiryType: enquiryMap[form.segment] || "Residential",
        firstName,
        lastName,
        fullName: form.name || "",
        phone: form.phone,
        cityOrPincode: form.city,
        monthlyBill: form.monthly_bill || "",
        propertyType: form.property_type,
        systemSizeKw: r ? r.system_size_kw_min : undefined,
        estimatedSystemSize: r ? `${r.system_size_kw_min}–${r.system_size_kw_max} kW` : "",
        estimatedMonthlySavings: r ? `${inr(r.monthly_savings_min)}–${inr(r.monthly_savings_max)}` : "",
        estimatedAnnualSavings: r ? `${inr(r.annual_savings_min)}–${inr(r.annual_savings_max)}` : "",
        estimatedPayback: r ? r.payback : "4–5 years (indicative)",
      });
      setLeadSent(true);
    } catch (err) {
      // Silent — do not block the user experience
      console.error("Zoho lead error (estimator):", err);
    }
  };

  // "Book Free Rooftop Survey" clicked — validate phone and submit lead
  const onBookSurvey = async (e) => {
    e.preventDefault();
    const phoneDigits = (form.phone || "").replace(/\D/g, "");
    if (phoneDigits.length < 10) {
      setError("Please enter your phone number to book a free rooftop survey.");
      return;
    }
    if (!form.city.trim()) {
      setError("City / pincode is required.");
      return;
    }
    setSubmitting(true);
    try {
      await _sendZohoLead(result);
      toast.success(ZOHO_SUCCESS_MSG);
    } catch (err) {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="estimator" style={{ backgroundColor: "#FFFBF0", padding: "64px 0" }}>
      <div className="container-js">
      <div style={{ marginBottom: "32px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6F6D68", marginBottom: "8px" }}>Indicative</p>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1F2647", margin: 0 }}>Savings estimator</h2>
        <p style={{ fontSize: "16px", color: "#6F6D68", marginTop: "10px" }}>Get an indicative solar system size &amp; savings in 30 seconds.</p>
      </div>
      <div data-testid="savings-estimator" className="rounded-3xl border border-[rgb(var(--js-border))] bg-white shadow-[0_24px_60px_-30px_rgba(16,32,24,0.25)] overflow-hidden">
        <div className="grid lg:grid-cols-5">
          <div className="lg:col-span-3 p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[rgb(var(--js-primary))]/10 text-[rgb(var(--js-primary-dark))]">
                <Calculator className="h-5 w-5" />
              </span>
              <span className="eyebrow">Savings estimator</span>
            </div>
            <h2 className="mt-3 text-2xl sm:text-3xl font-semibold tracking-tight">
              Get an indicative solar system size &amp; savings in 30 seconds.
            </h2>
            <p className="mt-2 text-sm text-[rgb(var(--js-muted))]">
              Final figures confirmed after a free rooftop assessment. No payment required.
            </p>

            <form onSubmit={onSubmit} className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="label-js">I am interested in</label>
                <div role="radiogroup" className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {["home", "business", "society", "institution"].map((s) => (
                    <button
                      key={s}
                      type="button"
                      data-testid={`estimator-segment-${s}`}
                      onClick={() => update("segment", s)}
                      className={`rounded-xl border px-2 py-2 text-[12px] sm:text-sm font-medium capitalize transition ${
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
                <label htmlFor="city" className="label-js">City or pincode <span className="text-[rgb(var(--js-danger))]">*</span></label>
                <input id="city" data-testid="estimator-city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Hyderabad" className="input-js" />
              </div>
              <div>
                <label htmlFor="bill" className="label-js">Average monthly bill (₹) <span className="text-[rgb(var(--js-danger))]">*</span></label>
                <input id="bill" data-testid="estimator-bill" inputMode="numeric" value={form.monthly_bill} onChange={(e) => update("monthly_bill", e.target.value.replace(/[^0-9]/g, ""))} placeholder="3500" className="input-js" />
              </div>
              <div>
                <label htmlFor="ptype" className="label-js">Property type</label>
                <select id="ptype" data-testid="estimator-property" value={form.property_type} onChange={(e) => update("property_type", e.target.value)} className="input-js">
                  <option>Independent house</option>
                  <option>Apartment / Society</option>
                  <option>Factory / Warehouse</option>
                  <option>Office / Commercial</option>
                  <option>School / Hospital</option>
                </select>
              </div>
              <div>
                <label htmlFor="cname" className="label-js">Name <span className="text-[rgb(var(--js-muted))] text-xs">(optional)</span></label>
                <input id="cname" data-testid="estimator-name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="Your name" className="input-js" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="cphone" className="label-js">
                  Phone <span className="text-[rgb(var(--js-muted))] text-xs">(enter to also book a free survey)</span>
                </label>
                <input id="cphone" data-testid="estimator-phone" inputMode="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="+91 9XXXXXXXXX" className="input-js" />
              </div>

              {error && <p className="sm:col-span-2 text-sm text-[rgb(var(--js-danger))]" data-testid="estimator-error">{error}</p>}

              <div className="sm:col-span-2 flex flex-col sm:flex-row gap-3 mt-1">
                <button data-testid="estimator-submit" disabled={loading} className="btn-primary disabled:opacity-60" type="submit">
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Calculating…</> : <>Calculate savings</>}
                </button>
                <button
                  type="button"
                  data-testid="estimator-book-survey"
                  disabled={submitting}
                  onClick={onBookSurvey}
                  className="btn-secondary disabled:opacity-60"
                >
                  {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking…</> : "Book free rooftop survey"}
                </button>
              </div>
            </form>
          </div>

          <div className="lg:col-span-2 bg-[rgb(var(--js-bg-alt))] p-6 sm:p-8 lg:p-10 border-t lg:border-t-0 lg:border-l border-[rgb(var(--js-border))]">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-[rgb(var(--js-accent))]" />
              <span className="eyebrow">Indicative result</span>
            </div>
            {!result ? (
              <div className="mt-4 rounded-2xl border border-dashed border-[rgb(var(--js-border))] bg-white p-6">
                <p className="text-sm text-[rgb(var(--js-muted))]">
                  Enter your monthly bill and city to see an indicative system size and savings band. Final proposal comes after a free rooftop visit.
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[rgb(var(--js-text))]">
                  <li>• System size band (kW)</li>
                  <li>• Indicative monthly &amp; annual savings</li>
                  <li>• Subsidy relevance note</li>
                </ul>
              </div>
            ) : (
              <div data-testid="estimator-result" className="mt-4 space-y-4">
                <Metric label="Suggested system size" value={`${result.system_size_kw_min} – ${result.system_size_kw_max} kW`} />
                <Metric label="Indicative monthly savings" value={`${inr(result.monthly_savings_min)} – ${inr(result.monthly_savings_max)}`} />
                <Metric label="Indicative annual savings" value={`${inr(result.annual_savings_min)} – ${inr(result.annual_savings_max)}`} highlight />
                <div className="rounded-xl bg-white border border-[rgb(var(--js-border))] p-4">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-[rgb(var(--js-primary-dark))]" />
                    <p className="text-xs font-semibold uppercase tracking-wide text-[rgb(var(--js-primary-dark))]">Subsidy</p>
                  </div>
                  <p className="mt-1 text-sm text-[rgb(var(--js-text))]">{result.subsidy_note}</p>
                </div>
                {leadSent && (
                  <div className="flex items-center gap-2 rounded-xl bg-[rgb(var(--js-primary))]/10 border border-[rgb(var(--js-primary))]/20 p-3">
                    <CheckCircle2 className="h-4 w-4 text-[rgb(var(--js-primary-dark))]" />
                    <p className="text-xs text-[rgb(var(--js-primary-dark))] font-medium">Request received. Our team will contact you shortly.</p>
                  </div>
                )}
                {!leadSent && (
                  <button
                    type="button"
                    data-testid="estimator-survey-cta"
                    disabled={submitting}
                    onClick={onBookSurvey}
                    className="btn-primary w-full disabled:opacity-60"
                  >
                    {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking…</> : "Book free rooftop survey"}
                  </button>
                )}
                <p className="text-[11px] text-[rgb(var(--js-muted))]">Figures are indicative bands. Verified after site assessment.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

const Metric = ({ label, value, highlight }) => (
  <div className={`rounded-xl border p-4 ${highlight ? "bg-[rgb(var(--js-primary))] border-transparent text-white" : "bg-white border-[rgb(var(--js-border))]"}`}>
    <p className={`text-[11px] font-semibold uppercase tracking-widest ${highlight ? "text-white/80" : "text-[rgb(var(--js-muted))]"}`}>{label}</p>
    <p className={`mt-1 text-xl font-semibold ${highlight ? "text-white" : "text-[rgb(var(--js-text))]"}`}>{value}</p>
  </div>
);

export default SavingsEstimator;
