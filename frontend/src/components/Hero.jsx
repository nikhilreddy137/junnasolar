import { Link } from "react-router-dom";
import { IMG } from "@/lib/images";

export const Hero = () => (
  <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
    {/* Full-bleed background */}
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src={IMG.heroPrimary || "/hero-primary.jpg"}
        alt="Solar panels on Indian home at golden hour"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
      />
      {/* Stronger left-heavy overlay for text readability */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(105deg, rgba(5,8,20,0.88) 0%, rgba(5,8,20,0.65) 45%, rgba(5,8,20,0.20) 100%)",
      }} />
    </div>

    {/* Content */}
    <div className="container-js" style={{ position: "relative", zIndex: 10, paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "680px" }}>

        {/* Eyebrow */}
        <p style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.65)", marginBottom: "20px",
          display: "flex", alignItems: "center", gap: "8px",
        }}>
          <span style={{ width: "24px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.5)", display: "inline-block" }} />
          Since 2012 · 125+ MW deployed · 650 MW factory
        </p>

        {/* H1 — "The bill stops here" */}
        <h1 style={{
          fontSize: "clamp(44px, 7vw, 76px)",
          fontWeight: 500,
          lineHeight: 1.0,
          letterSpacing: "-0.025em",
          color: "#ffffff",
          margin: 0,
        }}>
          The bill<br />
          <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}>stops here.</em><br />
          Solar starts here.
        </h1>

        <p style={{
          marginTop: "24px",
          fontSize: "18px",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.80)",
          maxWidth: "520px",
        }}>
          India-built rooftop solar from <strong style={{ color: "#ffffff", fontWeight: 600 }}>Junna Solar Systems</strong> — designed, manufactured, installed and supported under one roof.
        </p>

        {/* CTAs */}
        <div style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          <Link to="/contact?action=survey" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            backgroundColor: "#ffffff", color: "#1F2647",
            fontSize: "16px", fontWeight: 600,
            padding: "15px 32px", borderRadius: "800px",
            textDecoration: "none", whiteSpace: "nowrap",
            boxShadow: "0 4px 20px rgba(0,0,0,0.25)",
            transition: "opacity 0.15s ease",
          }}>
            Book free rooftop visit
          </Link>
          <a href="#savings-estimator" style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px",
            backgroundColor: "transparent", color: "#ffffff",
            fontSize: "16px", fontWeight: 500,
            padding: "14px 28px", borderRadius: "800px",
            border: "1.5px solid rgba(255,255,255,0.55)",
            textDecoration: "none", whiteSpace: "nowrap",
            transition: "border-color 0.15s ease",
          }}>
            See my savings →
          </a>
          <a href="https://wa.me/916309395555?text=Hi%20Junna%20Solar%2C%20I'd%20like%20to%20know%20more%20about%20rooftop%20solar." target="_blank" rel="noopener noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: "6px",
            color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: 500,
            textDecoration: "none",
          }}>
            💬 or message us
          </a>
        </div>

        {/* Stats bar */}
        <div style={{
          marginTop: "52px",
          display: "flex", flexWrap: "wrap", gap: "0",
          backgroundColor: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(12px)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.12)",
          overflow: "hidden",
          maxWidth: "600px",
        }}>
          {[
            { v: "13+", l: "Years since 2012" },
            { v: "125+ MW", l: "Deployed" },
            { v: "650 MW", l: "TopCon factory" },
            { v: "10+ states", l: "Pan-India" },
          ].map(({ v, l }, i) => (
            <div key={l} style={{
              flex: "1 1 120px",
              padding: "16px 20px",
              borderRight: i < 3 ? "1px solid rgba(255,255,255,0.1)" : "none",
            }}>
              <p style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>{v}</p>
              <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginTop: "4px" }}>{l}</p>
            </div>
          ))}
        </div>

        {/* Toll-free */}
        <p style={{ marginTop: "20px", fontSize: "13px", color: "rgba(255,255,255,0.5)" }}>
          Toll-free <a href="tel:18008906987" style={{ color: "rgba(255,255,255,0.8)", fontWeight: 600, textDecoration: "none" }}>1800 890 6987</a> · Mon–Sat, 9 AM – 7 PM IST
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
