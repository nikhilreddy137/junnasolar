import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const TESTIMONIALS = [
  { name: "Ramesh K.", city: "Hyderabad",
    quote: "Junna Solar installed a 5kW system at my home. The team was professional and the installation was spotless. My electricity bill dropped from ₹4,500 to under ₹600 per month. Best investment I've made in years. Highly recommended!" },
  { name: "Priya Sharma", city: "Secunderabad",
    quote: "They handled everything — rooftop survey, PM Surya Ghar subsidy paperwork and TSSPDCL net metering. Our housing society now saves ₹40,000 per month on common area electricity. Truly hassle-free from start to finish." },
  { name: "Srinivas Reddy", city: "Warangal",
    quote: "My factory now runs 60% on solar. Junna Solar completed the 50kW installation in just 4 days. The ROI is far better than expected and their after-sales AMC team responds within 24 hours. Outstanding service." },
];

export const Testimonials = () => {
  const [i, setI] = useState(0);
  const paused = useRef(false);
  const t = TESTIMONIALS[i];
  const prev = () => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setI((p) => (p + 1) % TESTIMONIALS.length);
  useEffect(() => {
    const id = setInterval(() => { if (!paused.current) setI((p) => (p + 1) % TESTIMONIALS.length); }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <section data-testid="testimonials-section" style={{ background: "#fff", padding: "80px 0" }}
      onMouseEnter={() => (paused.current = true)} onMouseLeave={() => (paused.current = false)}>
      <div className="container-js" style={{ textAlign: "center" }}>
        <h2 className="h-section" data-testid="testimonials-heading" style={{ marginBottom: 40 }}>What Our Customers Say</h2>
        <div style={{ position: "relative", maxWidth: 760, margin: "0 auto" }}>
          <div data-testid="testimonial-card" style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 14, padding: "44px 52px", boxShadow: "0 12px 36px -16px rgba(15,74,71,0.18)", textAlign: "left", minHeight: 230 }}>
            <Quote style={{ width: 36, height: 36, color: "#F47B22", marginBottom: 14 }} />
            <p style={{ fontSize: 18.5, lineHeight: 1.6, color: "#111827", fontStyle: "italic", margin: 0 }}>“{t.quote}”</p>
            <hr style={{ margin: "22px 0 16px", border: "none", borderTop: "1px solid #E5E7EB" }} />
            <p style={{ fontSize: 15, fontWeight: 700, color: "#F47B22", margin: 0 }}>{t.name}</p>
            <p style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>{t.city}</p>
          </div>
          <button onClick={prev} data-testid="testimonial-prev" aria-label="Previous testimonial"
            style={{ position: "absolute", top: "50%", left: -22, transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "2px solid #F47B22", color: "#F47B22", boxShadow: "0 6px 18px -6px rgba(0,0,0,0.15)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} data-testid="testimonial-next" aria-label="Next testimonial"
            style={{ position: "absolute", top: "50%", right: -22, transform: "translateY(-50%)", width: 44, height: 44, borderRadius: "50%", background: "#fff", border: "2px solid #F47B22", color: "#F47B22", boxShadow: "0 6px 18px -6px rgba(0,0,0,0.15)", cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <ChevronRight size={20} />
          </button>
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 24 }} data-testid="testimonial-dots">
            {TESTIMONIALS.map((_, idx) => (
              <button key={idx} onClick={() => setI(idx)} aria-label={`Go to testimonial ${idx + 1}`}
                style={{ width: idx === i ? 22 : 8, height: 8, borderRadius: 999, background: idx === i ? "#F47B22" : "#D1D5DB", border: "none", cursor: "pointer", transition: "all .2s ease" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
