import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { BRAND, QUOTE_URL } from "@/lib/brand";
import { useSEO } from "@/lib/seo";

const STATS = [
  { num: "26,000+", label: "Installations" },
  { num: "13+", label: "Years of Excellence" },
  { num: "8", label: "States Served" },
  { num: "43", label: "Expert Professionals" },
];

const TIMELINE = [
  ["2006", "Junna Group of Companies founded. First steps into India's solar industry."],
  ["2010", "Launched solar manufacturing operations in Hyderabad, Telangana."],
  ["2012", `Formally incorporated as Junna Solar Systems Pvt Ltd on 12 December 2012 (CIN: ${BRAND.cin}).`],
  ["2014", "Launched residential rooftop EPC division. First 100 home installations completed."],
  ["2016", "Expanded to commercial & industrial segment. 1MW cumulative capacity milestone."],
  ["2018", "First government project delivered with TSREDCO, Telangana."],
  ["2020", "MNRE empanelment secured. ISO 9001:2015 certification achieved."],
  ["2022", "Converted to Public Limited Company. Expanded to 8 states. HDFC Bank credit facility obtained."],
  ["2023", "HDFC Bank credit of ₹36.44 Cr registered (Charge ID 100760062) for growth expansion."],
  ["2024", "₹114.58 Cr PM-KUSUM solar pump order awarded by MEDA Maharashtra. 4,500 pumps."],
  ["2025", "Mr. Anil Babu Bhimavarapu appointed CEO. New directors: Sonal Pratham Bajaj, Naresh Tiwari."],
  ["2026", "26,000+ installation milestone. 43 professionals. Pan-India solar leader."],
];

const LEADERS = [
  { initials: "SR", name: "Mr. Junna Shekar Reddy", title: "Founder & Managing Director",
    bio: "The visionary who built Junna Solar from a single Hyderabad office into a pan-India powerhouse. Under Mr. Shekar Reddy's leadership since 2012, Junna Solar became MNRE empanelled, ISO certified and expanded across 8 states — transforming 26,000+ homes, factories and societies with clean energy. A pioneer of India's solar revolution.",
    tags: ["Founder", "13+ Years", "Visionary", "Solar Pioneer"] },
  { initials: "AB", name: "Mr. Anil Babu Bhimavarapu", title: "Chief Executive Officer", appointed: "November 22, 2025",
    bio: "Appointed CEO in November 2025, Mr. Anil Babu Bhimavarapu is steering Junna Solar's next growth chapter. With deep expertise in operations, business strategy and corporate governance, he is driving the company's pan-India expansion, process excellence and aggressive new business pipeline.",
    tags: ["CEO", "Director", "Operations", "Strategy"] },
  { initials: "BJ", name: "Mr. Basvi Reddy Junna", title: "Director", appointed: "September 5, 2022",
    bio: "Mr. Basvi Reddy Junna serves as Director, bringing deep domain knowledge in solar project execution and client relationship management. Instrumental in Junna Solar's geographic expansion, large-scale project delivery and stakeholder management across Telangana, Andhra Pradesh, Maharashtra and beyond.",
    tags: ["Director", "Projects", "Delivery", "Expansion"] },
  { initials: "RR", name: "Mr. Rajasekar Reddy", title: "Chief Technical Engineer",
    bio: "The engineering backbone of Junna Solar — overseeing solar PV system design, structural engineering, installation quality control and system performance standards. His technical expertise spans on-grid, off-grid and hybrid systems across 26,000+ installations.",
    tags: ["Technical", "Engineering", "Design", "Quality"] },
];

const TEAM_EXTRA = ["Surampudi Kumar", "Naga Maniteja Kopparthi", "Satya Narayana", "Manideepreddy Kolli"];

export default function About() {
  useSEO({
    title: "About Junna Solar — Powering India's Solar Revolution Since 2012",
    description: "Junna Solar Systems Limited — MNRE empanelled, ISO 9001:2015 certified solar EPC company. 26,000+ installations, 13+ years, 8 states. Founded by Mr. Junna Shekar Reddy in Hyderabad.",
    path: "/about",
  });

  return (
    <>
      <section data-testid="about-hero" style={{ background: "linear-gradient(135deg, #1A2E4A 0%, #0D1B2A 100%)", color: "#fff", minHeight: "60vh", display: "flex", alignItems: "center", padding: "80px 0" }}>
        <div className="container-js">
          <span style={{ color: "#F47B22", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Our Story</span>
          <h1 style={{ color: "#fff", marginTop: 14, maxWidth: 900 }}>Powering India&apos;s Solar Revolution Since 2012</h1>
          <p style={{ marginTop: 18, fontSize: 18, color: "rgba(255,255,255,0.85)", maxWidth: 760, lineHeight: 1.6 }}>
            What began as a mission to bring affordable solar to Hyderabad has grown into one of India&apos;s most trusted solar EPC companies — with {BRAND.stats.installations} installations across {BRAND.stats.states} states, guided by the vision of our founder Mr. Junna Shekar Reddy.
          </p>
          <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {STATS.map((s) => (
              <div key={s.label} data-testid={`about-stat-${s.label.toLowerCase().replace(/\W+/g, "-")}`} style={{ padding: "18px 20px", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 12 }}>
                <p style={{ color: "#F47B22", fontSize: 28, fontWeight: 800, margin: 0 }}>{s.num}</p>
                <p style={{ color: "rgba(255,255,255,0.78)", fontSize: 13, marginTop: 4 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#fff", padding: "80px 0" }}>
        <div className="container-js" style={{ maxWidth: 900 }}>
          <h2 className="h-section">About Junna Solar</h2>
          <p style={{ marginTop: 18, fontSize: 16, color: "#374151", lineHeight: 1.75 }}>
            Junna Solar Systems Limited (CIN: {BRAND.cin}) was founded on {BRAND.incorporated} and is headquartered at {BRAND.address}
          </p>
          <p style={{ marginTop: 14, fontSize: 16, color: "#374151", lineHeight: 1.75 }}>
            We are a MNRE empanelled and ISO 9001:2015 certified end-to-end solar EPC company providing rooftop solar for residential, commercial, industrial and institutional customers across India. Our product range spans Solar PV Modules (415W–550W), inverters, batteries, mounting structures, water pumps and street lights.
          </p>
          <p style={{ marginTop: 14, fontSize: 16, color: "#374151", lineHeight: 1.75 }}>
            Under the guidance of founder Mr. Junna Shekar Reddy and with a growing team of {BRAND.stats.team} professionals, Junna Solar has secured a {BRAND.stats.pmKusum} PM-KUSUM order from MEDA Maharashtra and has active HDFC Bank credit facilities of {BRAND.stats.hdfcCredit}, reflecting our financial strength and growth trajectory.
          </p>

          <div style={{ marginTop: 28, padding: 24, border: "1px solid #E5E7EB", borderRadius: 12, background: "#FBF9F5", display: "grid", gap: 12 }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}><MapPin size={18} color="#F47B22" /><span style={{ fontSize: 14, color: "#374151" }}>{BRAND.address}</span></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Phone size={16} color="#F47B22" /><a href={BRAND.phoneHref} style={{ color: "#1A2E4A", fontWeight: 600, fontSize: 14, textDecoration: "none" }}>{BRAND.phone}</a></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Mail size={16} color="#F47B22" /><a href={BRAND.emailHref} style={{ color: "#1A2E4A", fontSize: 14, textDecoration: "none" }}>{BRAND.email}</a></div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Globe size={16} color="#F47B22" /><span style={{ color: "#1A2E4A", fontSize: 14 }}>{BRAND.website}</span></div>
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #1A2E4A 0%, #0D1B2A 100%)", color: "#fff", padding: "80px 0" }} data-testid="about-timeline">
        <div className="container-js">
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <h2 style={{ color: "#fff" }}>Our Journey</h2>
            <p style={{ marginTop: 14, color: "rgba(255,255,255,0.78)", fontSize: 17 }}>From a single office in Hyderabad to a pan-India solar powerhouse.</p>
          </div>
          <div style={{ position: "relative", display: "grid", gap: 24, maxWidth: 800, margin: "0 auto" }}>
            {TIMELINE.map(([year, text]) => (
              <div key={year} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div style={{ flexShrink: 0, width: 80, textAlign: "right", color: "#F47B22", fontSize: 22, fontWeight: 800 }}>{year}</div>
                <span style={{ flexShrink: 0, width: 12, height: 12, borderRadius: "50%", background: "#F47B22", marginTop: 8, boxShadow: "0 0 0 4px rgba(244,123,34,0.18)" }} />
                <p style={{ color: "rgba(255,255,255,0.86)", fontSize: 15, lineHeight: 1.65, margin: 0 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="team" style={{ background: "#FBF9F5", padding: "80px 0" }} data-testid="about-leadership">
        <div className="container-js">
          <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 48px" }}>
            <span className="eyebrow">Leadership</span>
            <h2 className="h-section">The Team Behind India&apos;s Solar Mission</h2>
            <p style={{ marginTop: 14, color: "#6B7280" }}>Visionary leaders with decades of solar, engineering and business expertise.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 22 }}>
            {LEADERS.map((p) => (
              <div key={p.name} data-testid={`leader-${p.initials.toLowerCase()}`} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 1px 3px rgba(0,0,0,0.06)", border: "1px solid #E5E7EB", transition: "transform .2s, box-shadow .2s" }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,0,0,0.12)"; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.06)"; }}>
                <div style={{ height: 4, background: "linear-gradient(90deg, #1A2E4A, #F47B22)" }} />
                <div style={{ padding: "32px 28px", textAlign: "center" }}>
                  <div style={{ width: 110, height: 110, borderRadius: "50%", background: "#1A2E4A", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800, border: "3px solid #F47B22", marginBottom: 16 }}>{p.initials}</div>
                  <h3 style={{ fontSize: 19, color: "#1A2E4A", margin: 0 }}>{p.name}</h3>
                  <p style={{ marginTop: 4, fontSize: 11, color: "#F47B22", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>{p.title}</p>
                  {p.appointed && <p style={{ fontSize: 12, color: "#6B7280", marginTop: 2 }}>Appointed: {p.appointed}</p>}
                  <p style={{ marginTop: 14, fontSize: 14, color: "#374151", lineHeight: 1.65, textAlign: "left" }}>{p.bio}</p>
                  <div style={{ marginTop: 16, display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center" }}>
                    {p.tags.map((t) => (<span key={t} style={{ padding: "4px 12px", background: "#FFF3E8", color: "#C25A12", borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{t}</span>))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 48, textAlign: "center" }}>
            <h3 style={{ fontSize: 18, color: "#1A2E4A", marginBottom: 12 }}>Our Team</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              {TEAM_EXTRA.map((name) => (
                <div key={name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px", background: "#fff", border: "1px solid #E5E7EB", borderRadius: 999 }}>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: "#1A2E4A", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700 }}>
                    {name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </span>
                  <span style={{ fontSize: 13, color: "#374151" }}>{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg, #1A2E4A 0%, #0D1B2A 100%)", color: "#fff", padding: "72px 0" }}>
        <div className="container-js" style={{ textAlign: "center", maxWidth: 760 }}>
          <h2 style={{ color: "#fff" }}>Ready to Start Your Solar Journey?</h2>
          <p style={{ marginTop: 12, color: "rgba(255,255,255,0.82)", fontSize: 17 }}>Book your free rooftop survey today. Our expert will visit within 48 hours.</p>
          <div style={{ marginTop: 28, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to={QUOTE_URL} className="btn-primary" style={{ padding: "16px 36px", fontSize: 17 }}>Book Free Survey Now <ArrowRight size={16} /></Link>
            <a href={BRAND.phoneHref} className="btn-white" style={{ padding: "16px 36px", fontSize: 17 }}>Call {BRAND.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
