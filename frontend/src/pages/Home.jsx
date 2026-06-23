import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Zap, Shield, Clock, PhoneCall } from "lucide-react";
import Hero from "@/components/Hero";
import SegmentCards from "@/components/SegmentCards";
import CTASection from "@/components/CTASection";
import HomeSavingsEstimator from "@/components/SavingsEstimator";
import { IMG } from "@/lib/images";
import { useSEO } from "@/lib/seo";
import { BRAND } from "@/lib/brand";

/* ── Numbers ── */
const Numbers = () => (
  <section style={{ backgroundColor: "#1F2647", padding: "40px 0" }}>
    <div className="container-js">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0" }}>
        {[
          { v: "13+", l: "Years since 2012" },
          { v: "125+ MW", l: "Deployed" },
          { v: "650 MW", l: "TopCon factory" },
          { v: "50+", l: "Dealer network" },
          { v: "10+ states", l: "Pan-India reach" },
        ].map(({ v, l }, i) => (
          <div key={l} style={{
            flex: "1 1 0",
            padding: "20px 16px",
            borderRight: i < 4 ? "1px solid rgba(255,255,255,0.12)" : "none",
            textAlign: "center",
            minWidth: "120px",
          }}>
            <p style={{ fontSize: "clamp(22px, 2.5vw, 32px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.1, margin: 0, whiteSpace: "nowrap" }}>{v}</p>
            <p style={{ fontSize: "12px", fontWeight: 500, color: "rgba(255,255,255,0.55)", marginTop: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{l}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Why Junna ── */
const Why = () => (
  <section style={{ backgroundColor: "#FFFBF0", padding: "72px 0 64px" }}>
    <div className="container-js">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
        {/* Left: text */}
        <div>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6F6D68", marginBottom: "12px" }}>Why Junna</p>
          <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1F2647", margin: 0 }}>
            A solar partner that<br />actually <em style={{ fontStyle: "italic" }}>picks up the phone.</em>
          </h2>
          <p style={{ marginTop: "16px", fontSize: "16px", lineHeight: 1.7, color: "#6F6D68", maxWidth: "440px" }}>
            Junna isn't a reseller. We design, manufacture (650 MW TopCon plant near Hyderabad), install and service — so quality and timelines stay in our hands.
          </p>
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              { icon: CheckCircle2, t: "Real numbers, not sales pitches", d: "We show you the math before the contract. Indicative savings → free rooftop visit → tailored proposal." },
              { icon: Shield, t: "End-to-end, in-house", d: "Design, manufacturing, paperwork, subsidy guidance, install, monitoring and AMC — under one roof." },
              { icon: Clock, t: "Built to last 25 years", d: "BIS-certified TopCon modules from our own factory. Workmanship warranty. Service desk that answers." },
            ].map(({ icon: Icon, t, d }) => (
              <div key={t} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(31,38,71,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "2px" }}>
                  <Icon style={{ width: "18px", height: "18px", color: "#1F2647" }} />
                </div>
                <div>
                  <p style={{ fontSize: "15px", fontWeight: 600, color: "#1F2647", margin: 0 }}>{t}</p>
                  <p style={{ fontSize: "14px", color: "#6F6D68", marginTop: "4px", lineHeight: 1.5 }}>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "28px", fontSize: "14px", fontWeight: 600, color: "#1F2647", textDecoration: "none", borderBottom: "1.5px solid #1F2647", paddingBottom: "2px" }}>
            Read the Junna story <ArrowRight style={{ width: "14px", height: "14px" }} />
          </Link>
        </div>
        {/* Right: image + stat card */}
        <div style={{ position: "relative" }}>
          <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", backgroundColor: "#1F2647" }}>
            <img
              src="https://admin.junnasolar.com/upload/casestudy/1840329143490839.jpg"
              alt="Junna Solar residential installation"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Floating stat card */}
          <div style={{
            position: "absolute", bottom: "24px", left: "-24px",
            backgroundColor: "#ffffff", borderRadius: "16px",
            padding: "16px 20px", boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
            border: "1px solid #E8E4DC",
          }}>
            <p style={{ fontSize: "28px", fontWeight: 700, color: "#1F2647", margin: 0 }}>86%</p>
            <p style={{ fontSize: "12px", color: "#6F6D68", marginTop: "2px" }}>Average bill offset</p>
            <p style={{ fontSize: "11px", color: "#9CA3AF", marginTop: "2px" }}>*Indicative, verified per project</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── How it works ── */
const HowItWorks = () => (
  <section style={{ backgroundColor: "#1F2647", padding: "72px 0" }}>
    <div className="container-js">
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "12px" }}>How it works</p>
        <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#ffffff", margin: 0 }}>
          From bill to <em style={{ fontStyle: "italic" }}>savings</em> in three steps.
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2px" }}>
        {[
          { n: "01", t: "Share your bill", d: "We read the bill and pull back a savings band tailored to your home or building.", icon: "📄" },
          { n: "02", t: "Free rooftop visit", d: "An engineer (not a salesperson) walks the roof, checks shading and structure, and confirms the math.", icon: "🏠" },
          { n: "03", t: "Switch on, sit back", d: "We handle install, paperwork, subsidy guidance, monitoring and after-care for the long haul.", icon: "⚡" },
        ].map(({ n, t, d, icon }, i) => (
          <div key={n} style={{
            backgroundColor: "rgba(255,255,255,0.05)",
            borderRadius: i === 0 ? "20px 0 0 20px" : i === 2 ? "0 20px 20px 0" : "0",
            padding: "36px 32px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <span style={{ fontSize: "32px" }}>{icon}</span>
              <span style={{ fontSize: "13px", fontWeight: 700, color: "rgba(255,255,255,0.3)", letterSpacing: "0.06em" }}>{n}</span>
            </div>
            <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#ffffff", margin: 0 }}>{t}</h3>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.55)", marginTop: "10px" }}>{d}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ── Showreel / gallery ── */
const Showreel = () => {
  const imgs = [
    { src: "https://admin.junnasolar.com/upload/casestudy/1840345298585367.jpg", cap: "Textile manufacturing · ground-mount" },
    { src: "https://admin.junnasolar.com/upload/casestudy/1842770865286623.png", cap: "District Court Khammam · 135 kWp" },
    { src: "https://admin.junnasolar.com/upload/casestudy/1840329143490839.jpg", cap: "Homeowner success story" },
    { src: "https://admin.junnasolar.com/upload/casestudy/1831573237626146.jpg", cap: "Housing society · common-area solar" },
    { src: "https://admin.junnasolar.com/upload/casestudy/1853293603183174.jpg", cap: "Residential rooftop · Telangana" },
    { src: "https://admin.junnasolar.com/upload/casestudy/1841511996621085.png", cap: "Vasavi Hostel · Musheerabad" },
  ];
  return (
    <section style={{ backgroundColor: "#FFFBF0", padding: "48px 0" }}>
      <div className="container-js">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "28px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6F6D68", marginBottom: "8px" }}>Junna · real installations</p>
            <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#1F2647", margin: 0 }}>
              From farmhouse rooftops<br />to district courts.
            </h2>
          </div>
          <Link to="/case-studies" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#1F2647", textDecoration: "none", borderBottom: "1.5px solid #1F2647", paddingBottom: "2px", whiteSpace: "nowrap" }}>
            Read more stories <ArrowRight style={{ width: "14px", height: "14px" }} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
          {imgs.map(({ src, cap }, i) => (
            <div key={i} style={{ position: "relative", borderRadius: "16px", overflow: "hidden", aspectRatio: i === 0 || i === 3 ? "4/3" : "1/1", backgroundColor: "#E8E4DC" }}>
              <img src={src} alt={cap} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
                onMouseOver={e => e.currentTarget.style.transform = "scale(1.04)"}
                onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)" }} />
              <p style={{ position: "absolute", bottom: "12px", left: "14px", right: "14px", fontSize: "12px", fontWeight: 500, color: "#ffffff", margin: 0 }}>{cap}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Subsidy strip ── */
const SubsidyStrip = () => (
  <section style={{ backgroundColor: "#FFFBF0", borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC", padding: "40px 0" }}>
    <div className="container-js" style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "center", justifyContent: "space-between" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ width: "48px", height: "48px", borderRadius: "12px", backgroundColor: "#1F2647", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Zap style={{ width: "24px", height: "24px", color: "#ffffff" }} />
        </div>
        <div>
          <p style={{ fontSize: "18px", fontWeight: 600, color: "#1F2647", margin: 0 }}>PM Surya Ghar subsidy — up to ₹78,000 available</p>
          <p style={{ fontSize: "14px", color: "#6F6D68", marginTop: "2px" }}>Yes, subsidy exists. We guide you through every step of the paperwork.</p>
        </div>
      </div>
      <Link to="/homes#subsidy" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "12px 24px", borderRadius: "800px", backgroundColor: "#1F2647", color: "#ffffff", fontSize: "14px", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
        Check my eligibility <ArrowRight style={{ width: "14px", height: "14px" }} />
      </Link>
    </div>
  </section>
);

/* ── Trust line ── */
const TrustLine = () => (
  <section style={{ backgroundColor: "#FFFBF0", padding: "48px 0" }}>
    <div className="container-js" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "24px" }}>
      <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 500, color: "#1F2647", maxWidth: "420px", lineHeight: 1.35, margin: 0 }}>
        13 years. 125+ MW installed.<br />One service desk that picks up.
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {["BIS · MNRE compliant", "Tier-1 TopCon modules", "25-yr module warranty", "In-house factory"].map(t => (
          <span key={t} style={{ padding: "8px 16px", borderRadius: "800px", border: "1.5px solid #E8E4DC", fontSize: "13px", fontWeight: 500, color: "#1F2647", backgroundColor: "#ffffff" }}>{t}</span>
        ))}
        <Link to="/about" style={{ display: "inline-flex", alignItems: "center", gap: "4px", padding: "8px 16px", borderRadius: "800px", border: "1.5px solid #1F2647", fontSize: "13px", fontWeight: 600, color: "#1F2647", textDecoration: "none", backgroundColor: "transparent" }}>
          About Junna Solar <ArrowRight style={{ width: "12px", height: "12px" }} />
        </Link>
      </div>
    </div>
  </section>
);

export default function Home() {
  useSEO({
    title: "Junna Solar — Rooftop Solar for Indian Homes & Businesses",
    description: "Junna Solar Systems — 13+ years, 125+ MW deployed, 650 MW TopCon factory. Rooftop solar designed, manufactured, installed and supported under one roof.",
    path: "/",

  });
  return (
    <>
      <Hero />
      <div id="savings-estimator">
        <HomeSavingsEstimator />
      </div>
      <Numbers />
      <Why />
      <SegmentCards />
      <HowItWorks />
      <Showreel />
      <SubsidyStrip />
      <TrustLine />
      <CTASection
        title="See what solar would do for your roof."
        subtitle="One short call. One free rooftop visit. Real numbers, not a sales pitch."
      />
    </>
  );
}
