import { Link } from "react-router-dom";
import SavingsEstimator from "@/components/SavingsEstimator";
import CaseStudyCard, { CASE_STUDIES } from "@/components/CaseStudyCard";
import SubsidyBlock from "@/components/SubsidyBlock";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import { useSEO, faqJsonLd } from "@/lib/seo";
import { CheckCircle2, Zap, Shield, Clock, Wrench, ArrowRight, Sun, Home as HomeIcon, Star } from "lucide-react";

const PACKAGES = [
  {
    kw: "3 kW",
    area: "~225 sq.ft",
    monthly: "₹2,500 – ₹3,000",
    units: "~360 units/month",
    best: false,
    desc: "Ideal for 2BHK homes with monthly bills of ₹2,000–₹3,500.",
  },
  {
    kw: "5 kW",
    area: "~375 sq.ft",
    monthly: "₹4,500 – ₹5,500",
    units: "~600 units/month",
    best: true,
    desc: "Most popular. Suits 3BHK homes with bills of ₹4,000–₹6,000.",
  },
  {
    kw: "10 kW",
    area: "~750 sq.ft",
    monthly: "₹9,000 – ₹11,000",
    units: "~1,200 units/month",
    best: false,
    desc: "Large homes, villas, or homes with EV charging needs.",
  },
];

const SUITABILITY = [
  { icon: Sun, text: "Roof is mostly shadow-free between 9 AM–4 PM" },
  { icon: HomeIcon, text: "Available area ≥ 100 sq.ft for 1 kW (approx)" },
  { icon: Shield, text: "Roof structure is sound (RCC, metal, tiled)" },
  { icon: Zap, text: "Sanctioned load supports proposed system" },
  { icon: CheckCircle2, text: "Owner consent / society NOC where applicable" },
];

const BENEFITS = [
  { icon: Zap, title: "Cut bills by 70–90%", desc: "Most homeowners see their electricity bill drop dramatically from month one." },
  { icon: Shield, title: "25-year module warranty", desc: "BIS-certified TopCon panels from our own 650 MW factory in Hyderabad." },
  { icon: Clock, title: "Payback in 4–5 years", desc: "After that, 20+ years of near-free electricity. It's the best investment on your roof." },
  { icon: Wrench, title: "End-to-end in-house", desc: "We design, install, handle paperwork, subsidy, monitoring and AMC — no middlemen." },
];

const FAQS = [
  { q: "Can I install solar in an apartment?", a: "Yes — common-area systems work brilliantly for societies. For individual apartments, balcony or shared roof solutions can be explored." },
  { q: "Do I lose power during cloudy days?", a: "Grid-connected systems automatically draw from the grid when solar output is low. With a battery, you also get backup during outages." },
  { q: "Will solar damage my roof?", a: "Properly engineered mounts (with appropriate ballast or anchors) preserve the roof and may even reduce heat ingress." },
  { q: "What about insurance?", a: "Many home insurance policies cover solar; we can advise based on your provider." },
  { q: "How long does installation take?", a: "Typically 1–3 days for a residential system, depending on size and roof type. We handle all permits and DISCOM paperwork." },
  { q: "Is there a government subsidy?", a: "Yes — under PM Surya Ghar Muft Bijli Yojana, residential rooftop systems up to 3 kW can get up to ₹78,000 in subsidy. We guide you through every step." },
];

export default function Homes() {
  useSEO({
    title: "Rooftop Solar for Homes in India — Junna Solar",
    description:
      "Rooftop solar for Indian homes — savings, subsidy, suitability check, free site visit and after-care. Tailored 3 kW, 5 kW and 10 kW packages.",
    path: "/homes",
    jsonLd: faqJsonLd(FAQS),
  });

  return (
    <>
      {/* ── Hero ── */}
      <section style={{ position: "relative", minHeight: "540px", display: "flex", alignItems: "flex-end", overflow: "hidden", backgroundColor: "#1F2647" }}>
        <img
          src="https://admin.junnasolar.com/upload/casestudy/1840329143490839.jpg"
          alt="Junna Solar residential rooftop installation"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(105deg, rgba(5,8,20,0.92) 0%, rgba(5,8,20,0.65) 55%, rgba(5,8,20,0.3) 100%)" }} />
        <div className="container-js" style={{ position: "relative", zIndex: 1, paddingTop: "120px", paddingBottom: "64px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "16px" }}>For Homes</p>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 500, lineHeight: 1.1, letterSpacing: "-0.025em", color: "#ffffff", maxWidth: "640px", margin: 0 }}>
            Rooftop solar that<br /><em style={{ fontStyle: "italic" }}>pays for itself.</em>
          </h1>
          <p style={{ marginTop: "20px", fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.65, color: "rgba(255,255,255,0.75)", maxWidth: "520px" }}>
            Free rooftop survey, transparent system sizing and subsidy guidance. Real savings numbers before any payment.
          </p>
          <div style={{ marginTop: "32px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
            <Link to="/contact?action=survey" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "800px", backgroundColor: "#ffffff", color: "#1F2647", fontSize: "15px", fontWeight: 600, textDecoration: "none" }}>
              Book free rooftop visit <ArrowRight style={{ width: "16px", height: "16px" }} />
            </Link>
            <a href="#estimator" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "800px", border: "1.5px solid rgba(255,255,255,0.4)", color: "#ffffff", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}>
              See my savings →
            </a>
          </div>
          {/* Stat chips */}
          <div style={{ marginTop: "40px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {["70–90% bill reduction", "4–5 year payback", "25-yr module warranty", "Subsidy guidance included"].map(t => (
              <span key={t} style={{ padding: "7px 14px", borderRadius: "800px", backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", fontSize: "13px", fontWeight: 500, color: "#ffffff" }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Savings Estimator ── */}
      <SavingsEstimator defaultSegment="home" />

      {/* ── 4 Benefits ── */}
      <section style={{ backgroundColor: "#FFFBF0", padding: "72px 0" }}>
        <div className="container-js">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6F6D68", marginBottom: "8px" }}>Why go solar with Junna</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1F2647", margin: 0 }}>
              The smartest upgrade<br />your home can get.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{ backgroundColor: "#ffffff", borderRadius: "20px", border: "1px solid #E8E4DC", padding: "28px 24px" }}>
                <div style={{ width: "44px", height: "44px", borderRadius: "12px", backgroundColor: "rgba(31,38,71,0.07)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                  <Icon style={{ width: "22px", height: "22px", color: "#1F2647" }} />
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 600, color: "#1F2647", margin: 0 }}>{title}</h3>
                <p style={{ fontSize: "14px", lineHeight: 1.6, color: "#6F6D68", marginTop: "8px" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Packages ── */}
      <section style={{ backgroundColor: "#1F2647", padding: "72px 0" }}>
        <div className="container-js">
          <div style={{ marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>System sizes</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#ffffff", margin: 0 }}>
              Three packages built for<br /><em style={{ fontStyle: "italic" }}>Indian homes.</em>
            </h2>
            <p style={{ marginTop: "12px", fontSize: "15px", color: "rgba(255,255,255,0.55)", maxWidth: "480px" }}>Final pricing tailored to your roof, brand choices and finance preference.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
            {PACKAGES.map((p) => (
              <div key={p.kw} style={{
                backgroundColor: p.best ? "#ffffff" : "rgba(255,255,255,0.06)",
                borderRadius: "20px",
                border: p.best ? "none" : "1px solid rgba(255,255,255,0.1)",
                padding: "28px 24px",
                position: "relative",
              }}>
                {p.best && (
                  <div style={{ position: "absolute", top: "-12px", left: "24px", backgroundColor: "#1F2647", color: "#ffffff", fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "5px 14px", borderRadius: "800px", display: "flex", alignItems: "center", gap: "5px" }}>
                    <Star style={{ width: "11px", height: "11px" }} /> Most popular
                  </div>
                )}
                <p style={{ fontSize: "32px", fontWeight: 700, color: p.best ? "#1F2647" : "#ffffff", margin: 0 }}>{p.kw}</p>
                <p style={{ fontSize: "13px", color: p.best ? "#6F6D68" : "rgba(255,255,255,0.5)", marginTop: "4px" }}>Roof area {p.area}</p>
                <p style={{ fontSize: "14px", lineHeight: 1.55, color: p.best ? "#6F6D68" : "rgba(255,255,255,0.6)", marginTop: "12px" }}>{p.desc}</p>
                <div style={{ marginTop: "20px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div style={{ backgroundColor: p.best ? "rgba(31,38,71,0.06)" : "rgba(255,255,255,0.06)", borderRadius: "12px", padding: "12px" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: p.best ? "#6F6D68" : "rgba(255,255,255,0.4)", margin: 0 }}>Est. monthly savings</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: p.best ? "#1F2647" : "#ffffff", marginTop: "4px" }}>{p.monthly}</p>
                  </div>
                  <div style={{ backgroundColor: p.best ? "rgba(31,38,71,0.06)" : "rgba(255,255,255,0.06)", borderRadius: "12px", padding: "12px" }}>
                    <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: p.best ? "#6F6D68" : "rgba(255,255,255,0.4)", margin: 0 }}>Units generated</p>
                    <p style={{ fontSize: "14px", fontWeight: 600, color: p.best ? "#1F2647" : "#ffffff", marginTop: "4px" }}>{p.units}</p>
                  </div>
                </div>
                <Link to="/contact?action=survey" style={{ display: "inline-flex", alignItems: "center", gap: "6px", marginTop: "20px", padding: "11px 20px", borderRadius: "800px", backgroundColor: p.best ? "#1F2647" : "rgba(255,255,255,0.12)", color: p.best ? "#ffffff" : "#ffffff", fontSize: "13px", fontWeight: 600, textDecoration: "none", border: p.best ? "none" : "1px solid rgba(255,255,255,0.2)" }}>
                  Get a quote <ArrowRight style={{ width: "13px", height: "13px" }} />
                </Link>
              </div>
            ))}
          </div>
          <p style={{ marginTop: "20px", fontSize: "12px", color: "rgba(255,255,255,0.35)", textAlign: "center" }}>All figures are indicative. Final price and savings confirmed after free rooftop visit. Subsidy adjusted where applicable.</p>
        </div>
      </section>

      {/* ── Subsidy ── */}
      <SubsidyBlock />

      {/* ── Suitability ── */}
      <section style={{ backgroundColor: "#FFFBF0", padding: "72px 0" }} id="suitability">
        <div className="container-js">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6F6D68", marginBottom: "12px" }}>Suitability</p>
              <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#1F2647", margin: 0 }}>
                Is your roof<br /><em style={{ fontStyle: "italic" }}>solar-ready?</em>
              </h2>
              <p style={{ marginTop: "16px", fontSize: "15px", lineHeight: 1.7, color: "#6F6D68" }}>
                Tick most boxes? Your roof is likely a great fit. Our engineers confirm everything during the free visit — no obligation.
              </p>
              <Link to="/contact?action=survey" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "28px", padding: "13px 26px", borderRadius: "800px", backgroundColor: "#1F2647", color: "#ffffff", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                Book free rooftop visit <ArrowRight style={{ width: "14px", height: "14px" }} />
              </Link>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {SUITABILITY.map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: "14px", backgroundColor: "#ffffff", borderRadius: "16px", border: "1px solid #E8E4DC", padding: "16px 20px" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "10px", backgroundColor: "rgba(31,38,71,0.07)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon style={{ width: "18px", height: "18px", color: "#1F2647" }} />
                  </div>
                  <p style={{ fontSize: "14px", fontWeight: 500, color: "#1F2647", margin: 0 }}>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section style={{ backgroundColor: "#1F2647", padding: "72px 0" }}>
        <div className="container-js">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)", marginBottom: "8px" }}>How it works</p>
            <h2 style={{ fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 500, lineHeight: 1.15, letterSpacing: "-0.02em", color: "#ffffff", margin: 0 }}>
              From bill to <em style={{ fontStyle: "italic" }}>savings</em> in three steps.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2px" }}>
            {[
              { n: "01", t: "Share your bill", d: "We read the bill and pull back a savings band tailored to your home.", icon: "📄" },
              { n: "02", t: "Free rooftop visit", d: "An engineer (not a salesperson) walks the roof, checks shading and confirms the math.", icon: "🏠" },
              { n: "03", t: "Switch on, sit back", d: "We handle install, paperwork, subsidy, monitoring and after-care for 25 years.", icon: "⚡" },
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

      {/* ── Homeowner Stories ── */}
      <section style={{ backgroundColor: "#FFFBF0", padding: "72px 0" }}>
        <div className="container-js">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6F6D68", marginBottom: "8px" }}>Homeowner stories</p>
              <h2 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.02em", color: "#1F2647", margin: 0 }}>
                Quiet panels.<br />Loud savings.
              </h2>
            </div>
            <Link to="/case-studies" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 600, color: "#1F2647", textDecoration: "none", borderBottom: "1.5px solid #1F2647", paddingBottom: "2px", whiteSpace: "nowrap" }}>
              All stories <ArrowRight style={{ width: "14px", height: "14px" }} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
            {CASE_STUDIES.filter((c) => c.type === "Home").map((cs) => <CaseStudyCard key={cs.id} cs={cs} />)}
          </div>
        </div>
      </section>

      {/* ── After-sales promise ── */}
      <section style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E8E4DC", borderBottom: "1px solid #E8E4DC", padding: "56px 0" }}>
        <div className="container-js">
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: "32px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ width: "56px", height: "56px", borderRadius: "16px", backgroundColor: "#1F2647", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Wrench style={{ width: "26px", height: "26px", color: "#ffffff" }} />
            </div>
            <div>
              <h3 style={{ fontSize: "20px", fontWeight: 600, color: "#1F2647", margin: 0 }}>Our after-sales promise</h3>
              <p style={{ fontSize: "14px", lineHeight: 1.65, color: "#6F6D68", marginTop: "6px", maxWidth: "560px" }}>
                Junna stays with you long after handover. Periodic cleaning, monitoring alerts, warranty support — our service desk picks up the phone.
              </p>
            </div>
            <Link to="/contact" style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "12px 22px", borderRadius: "800px", border: "1.5px solid #1F2647", fontSize: "13px", fontWeight: 600, color: "#1F2647", textDecoration: "none", whiteSpace: "nowrap" }}>
              Contact us <ArrowRight style={{ width: "13px", height: "13px" }} />
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={FAQS} />

      <CTASection
        title="Ready to stop paying rent to the grid?"
        subtitle="Book a free rooftop visit. An engineer confirms your savings — no payment, no obligation."
      />
    </>
  );
}
