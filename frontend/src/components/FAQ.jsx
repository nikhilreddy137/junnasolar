import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Minus, ArrowRight } from "lucide-react";

const FAQS = [
  { q: "What is the PM Surya Ghar Muft Bijli Yojana subsidy?",
    a: "PM Surya Ghar Muft Bijli Yojana is a Government of India scheme that provides direct subsidies for rooftop solar on residential homes: ₹30,000 for 1kW, ₹60,000 for 2kW, and ₹78,000 for 3kW and above. Junna Solar files the entire application for you — at no extra charge." },
  { q: "How long does installation take?",
    a: "Residential systems (1–5kW) are installed in 1–2 days. Commercial systems (10kW+) take 3–5 days. DISCOM net meter approval takes 15–30 days, which we coordinate with your local electricity board." },
  { q: "What is the payback period for solar in Hyderabad?",
    a: "For a home with a ₹3,000–₹5,000 monthly bill, the payback period is typically 3–4 years after subsidy. After that, you enjoy near-free electricity for 20+ years." },
  { q: "Will solar panels work during power cuts?",
    a: "On-grid systems automatically shut off during power cuts for safety. For backup power, we recommend our hybrid systems with lithium battery storage. Junna Solar offers both options." },
  { q: "Does Junna Solar provide AMC (Annual Maintenance Contracts)?",
    a: "Yes. We offer comprehensive AMC plans covering panel cleaning, inverter servicing, electrical safety checks and performance monitoring. Our technicians are available across Hyderabad, Telangana, Andhra Pradesh and 5 other states." },
];

const Item = ({ q, a, open, onClick, index }) => (
  <div data-testid={`faq-item-${index}`} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, padding: 18, marginBottom: 10 }}>
    <button data-testid={`faq-toggle-${index}`} onClick={onClick}
      style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", background: "transparent", border: "none", textAlign: "left", cursor: "pointer", padding: 0 }}>
      <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>{q}</span>
      {open ? <Minus size={20} color="#F47B22" /> : <Plus size={20} color="#F47B22" />}
    </button>
    {open && (<p data-testid={`faq-answer-${index}`} style={{ marginTop: 12, color: "#6B7280", fontSize: 14.5, lineHeight: 1.65 }}>{a}</p>)}
  </div>
);

export const FAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return (
    <section id="faqs" data-testid="faq-section" style={{ background: "#F9FAFB", padding: "80px 0" }}>
      <div className="container-js" style={{ maxWidth: 760 }}>
        <h2 className="h-section" data-testid="faq-heading" style={{ textAlign: "center", marginBottom: 36 }}>Frequently Asked Questions</h2>
        <div>
          {FAQS.map((it, i) => (
            <Item key={it.q} index={i} q={it.q} a={it.a} open={openIdx === i} onClick={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link to="/faq" className="link-teal" data-testid="faq-browse-all" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
            Browse all FAQs <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
