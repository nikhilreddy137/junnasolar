import { useState } from "react";
import { ArrowRight, CheckCircle2, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import axios from "axios";

const API_BASE = `${process.env.REACT_APP_BACKEND_URL}/api`;
const HOUSE_IMG = "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1600&q=80";

const PROPERTY_TYPES = [
  { id: "home", label: "Home / Villa" },
  { id: "apartment", label: "Flat / Apartment" },
  { id: "commercial", label: "Commercial" },
  { id: "society", label: "Housing Society" },
];

const validPin = (s) => /^\d{6}$/.test(s.trim()) || (/^[A-Za-z][A-Za-z\s.,'-]{2,}$/.test(s.trim()) && s.trim().length >= 3);
const validPhone = (p) => p.replace(/\D/g, "").length === 10;
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

export const QuoteFormMultiStep = ({ compact = false }) => {
  const [step, setStep] = useState(1);
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [form, setForm] = useState({ fullName: "", phone: "", email: "", monthlyBill: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleStep1 = (e) => {
    e.preventDefault(); setError("");
    if (!validPin(location)) { setError("Please enter a valid city name or 6-digit PIN code."); return; }
    setStep(2);
  };

  const handlePropertyChoice = (id) => { setPropertyType(id); setStep(3); };

  const handleSubmit = async (e) => {
    e.preventDefault(); setError("");
    if (!form.fullName.trim()) { setError("Please enter your full name."); return; }
    if (!validPhone(form.phone)) { setError("Please enter a valid 10-digit mobile number."); return; }
    if (form.email && !validEmail(form.email)) { setError("Please enter a valid email or leave it blank."); return; }
    setSubmitting(true);
    try {
      const [firstName, ...rest] = form.fullName.trim().split(" ");
      await axios.post(`${API_BASE}/zoho/lead`, {
        firstName: firstName || form.fullName,
        lastName: rest.join(" ") || "—",
        fullName: form.fullName,
        phone: form.phone,
        email: form.email || undefined,
        cityOrPincode: location,
        installationLocation: location,
        propertyType: PROPERTY_TYPES.find((p) => p.id === propertyType)?.label,
        segment: propertyType === "commercial" ? "business" : propertyType === "society" ? "society" : "home",
        monthlyBill: form.monthlyBill || undefined,
        source: "Junna Solar Website",
        formName: "Free Rooftop Survey — Multi-step",
        pageSource: window.location.pathname,
        currentPageUrl: window.location.href,
        submittedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Lead submit warning:", err?.response?.data || err.message);
    }
    setSubmitting(false); setSubmitted(true);
  };

  return (
    <section data-testid="quote-form-section" style={{ background: "#fff", padding: compact ? "48px 0" : "80px 0" }}>
      <div className="container-js">
        <div className="lg:grid lg:grid-cols-2" style={{ display: "grid", gap: 0, border: "1px solid #E5E7EB", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
          <div style={{ padding: "44px 36px" }}>
            <h2 data-testid="quote-form-heading" style={{ fontSize: "clamp(26px,3vw,32px)", color: "#1A2E4A", margin: 0, fontWeight: 700 }}>
              Get Your Free Rooftop Survey
            </h2>
            <p style={{ marginTop: 10, color: "#6B7280", fontSize: 15, maxWidth: 480 }}>
              Tell us about your property and our solar expert will visit within 48 hours — at no cost.
            </p>

            {!submitted && (
              <div style={{ display: "flex", gap: 8, marginTop: 24 }} data-testid="quote-step-indicator">
                {[1, 2, 3].map((s) => (
                  <span key={s} style={{ flex: 1, height: 4, borderRadius: 999, background: step >= s ? "#F47B22" : "#E5E7EB", transition: "background-color .2s ease" }} />
                ))}
              </div>
            )}
            {!submitted && (
              <p style={{ fontSize: 12, color: "#6B7280", marginTop: 10, fontWeight: 600 }}>Step {step} of 3</p>
            )}

            {step === 1 && !submitted && (
              <form onSubmit={handleStep1} data-testid="quote-step-1" style={{ marginTop: 20 }}>
                <label className="label-js" htmlFor="location">Enter your city or PIN code</label>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <input id="location" data-testid="quote-location-input" className="input-js"
                    value={location} onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Hyderabad or 500072" style={{ flex: 1, minWidth: 180 }} />
                  <button type="submit" className="btn-primary" data-testid="quote-next-btn">
                    Next <ArrowRight size={15} />
                  </button>
                </div>
                {error && <p style={{ marginTop: 10, color: "#B0413E", fontSize: 13 }} data-testid="quote-error">{error}</p>}
              </form>
            )}

            {step === 2 && !submitted && (
              <div data-testid="quote-step-2" style={{ marginTop: 20 }}>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: "0 0 14px" }}>What type of property do you have?</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  {PROPERTY_TYPES.map((p) => (
                    <button key={p.id} data-testid={`quote-property-${p.id}`} onClick={() => handlePropertyChoice(p.id)}
                      style={{ padding: "16px 18px", border: `2px solid ${propertyType === p.id ? "#F47B22" : "#E5E7EB"}`,
                        background: propertyType === p.id ? "rgba(244,123,34,0.06)" : "#fff",
                        borderRadius: 10, textAlign: "left", cursor: "pointer", fontSize: 15, fontWeight: 600, color: "#111827", transition: "all .15s ease" }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = "#F47B22"; }}
                      onMouseOut={(e) => { if (propertyType !== p.id) e.currentTarget.style.borderColor = "#E5E7EB"; }}>
                      {p.label}
                    </button>
                  ))}
                </div>
                <button onClick={() => setStep(1)} style={{ marginTop: 18, color: "#6B7280", background: "transparent", border: "none", cursor: "pointer", fontSize: 13, textDecoration: "underline" }}>← Change location</button>
              </div>
            )}

            {step === 3 && !submitted && (
              <form onSubmit={handleSubmit} data-testid="quote-step-3" style={{ marginTop: 20, display: "grid", gap: 12 }}>
                <div>
                  <label className="label-js" htmlFor="fullName">Full name *</label>
                  <input id="fullName" data-testid="quote-name" className="input-js" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                </div>
                <div>
                  <label className="label-js" htmlFor="phone">Mobile number *</label>
                  <input id="phone" data-testid="quote-phone" className="input-js" inputMode="tel"
                    value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })}
                    placeholder="10-digit mobile" />
                </div>
                <div>
                  <label className="label-js" htmlFor="email">Email <span style={{ color: "#9CA3AF", fontWeight: 400 }}>(optional)</span></label>
                  <input id="email" data-testid="quote-email" className="input-js" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                </div>
                <div>
                  <label className="label-js" htmlFor="bill">Monthly electricity bill (₹)</label>
                  <input id="bill" data-testid="quote-bill" className="input-js" inputMode="numeric"
                    value={form.monthlyBill} onChange={(e) => setForm({ ...form, monthlyBill: e.target.value.replace(/\D/g, "") })}
                    placeholder="e.g. 3500" />
                </div>
                <p style={{ fontSize: 11, color: "#6B7280", lineHeight: 1.5, marginTop: 4 }} data-testid="form-disclaimer">
                  By submitting, you agree to be contacted by Junna Solar via call or WhatsApp. Your data is safe with us.
                </p>
                {error && <p style={{ color: "#B0413E", fontSize: 13 }} data-testid="quote-error">{error}</p>}
                <button type="submit" disabled={submitting} className="btn-primary" data-testid="quote-submit-btn" style={{ width: "100%", marginTop: 4, padding: "13px 24px" }}>
                  {submitting ? "Submitting..." : "Book Free Survey"}
                </button>
              </form>
            )}

            {submitted && (
              <div data-testid="quote-confirmation" style={{ marginTop: 28 }}>
                <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 60, height: 60, borderRadius: "50%", background: "rgba(244,123,34,0.12)" }}>
                  <CheckCircle2 size={32} color="#F47B22" />
                </div>
                <h3 style={{ marginTop: 18, fontSize: 22, color: "#1A2E4A", fontWeight: 700 }}>Thank you! We&apos;ll call you within 24 hours.</h3>
                <p style={{ marginTop: 8, color: "#6B7280", maxWidth: 480, lineHeight: 1.6 }}>Our solar expert will call you shortly to schedule your free rooftop survey.</p>
                <a href={BRAND.phoneHref} className="link-teal" data-testid="quote-confirm-call" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: 16 }}>
                  <Phone size={14} /> Need to talk now? Call {BRAND.phone}
                </a>
              </div>
            )}
          </div>

          <div data-testid="quote-form-photo" style={{ backgroundImage: `url(${HOUSE_IMG})`, backgroundSize: "cover", backgroundPosition: "center", minHeight: 420 }} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

export default QuoteFormMultiStep;
