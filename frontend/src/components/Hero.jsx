import { Link } from "react-router-dom";
import { Landmark, Home, Award, Map } from "lucide-react";
import { QUOTE_URL } from "@/lib/brand";

const HERO_IMG = "/hero-primary.jpg";

const BADGES = [
  { Icon: Landmark, num: "MNRE", label: "Empanelled" },
  { Icon: Home, num: "26,000+", label: "Installations" },
  { Icon: Award, num: "13+", label: "Years Excellence" },
  { Icon: Map, num: "8 States", label: "PAN India" },
];

export const Hero = () => (
  <section data-testid="hero-section">
    <div style={{ position: "relative", minHeight: "82vh", overflow: "hidden" }}>
      <img src={HERO_IMG} alt="Indian home with rooftop solar panels at golden hour"
        loading="eager" fetchpriority="high"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0,
        background: "linear-gradient(to right, rgba(13,27,42,0.78) 0%, rgba(13,27,42,0.45) 50%, transparent 100%)" }} />
      <div className="container-js" style={{ position: "relative", zIndex: 2, paddingTop: 96, paddingBottom: 96 }}>
        <div style={{ maxWidth: 640 }}>
          <span style={{ display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "#F47B22", marginBottom: 18 }} data-testid="hero-eyebrow">
            India&apos;s Trusted Solar Partner
          </span>
          <h1 data-testid="hero-headline" style={{ color: "#fff", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", margin: 0 }}>
            Rooftop Solar for<br />Homes, Businesses<br />&amp; Societies.
          </h1>
          <p data-testid="hero-subtitle" style={{ marginTop: 22, fontSize: 18, color: "rgba(255,255,255,0.88)", maxWidth: 480, lineHeight: 1.55 }}>
            Free rooftop survey · PM Surya Ghar subsidy guidance · End-to-end EPC · 13+ years
          </p>
          <div style={{ marginTop: 32 }}>
            <Link to={QUOTE_URL} className="btn-primary" data-testid="hero-cta-survey" style={{ padding: "16px 36px", fontSize: 17 }}>
              Book Your Free Survey
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div data-testid="trust-strip" style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "22px 0" }}>
      <div className="container-js">
        <p style={{ textAlign: "center", fontSize: 11, letterSpacing: "0.18em", fontWeight: 700, color: "#6B7280", textTransform: "uppercase", marginBottom: 16 }}>
          Trusted Across India
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 0, justifyContent: "center", alignItems: "center" }}>
          {BADGES.map(({ Icon, num, label }, i) => (
            <div key={label} data-testid={`trust-badge-${i}`} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 28px", borderRight: i < BADGES.length - 1 ? "1px solid #E5E7EB" : "none", flex: "0 1 auto" }}>
              <span style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(244,123,34,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                <Icon size={16} color="#F47B22" strokeWidth={2.2} />
              </span>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, color: "#F47B22", lineHeight: 1 }}>{num}</div>
                <div style={{ fontSize: 11, color: "#6B7280", marginTop: 2, fontWeight: 500 }}>{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
