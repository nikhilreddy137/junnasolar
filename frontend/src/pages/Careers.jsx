import { ArrowRight, Mail, Phone } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useSEO } from "@/lib/seo";

const VALUES = [
  { icon: "☀️", title: "Impact at Scale", body: "Every system you design, install or sell powers a real home or business with clean energy. With 26,000+ installations complete and thousands more underway, your work creates tangible change in the lives of Indian families every single day." },
  { icon: "🚀", title: "Grow Fast. Grow Far.", body: "From a Hyderabad startup to a ₹114 Cr government contract winner — Junna Solar's growth trajectory is extraordinary. Join us early and rise with a company that is redefining India's energy landscape." },
  { icon: "🤝", title: "A Culture That Feels Like Family", body: "Our 43-strong team is built on trust, respect and shared purpose. We celebrate milestones together, solve hard problems together and support each other's growth. Every voice matters." },
  { icon: "🎓", title: "Learn from Industry Veterans", body: "Work alongside MNRE-empanelled engineers, ISO-certified processes and solar veterans who have built India's rooftop solar industry from scratch." },
];

const JOBS = [
  ["Solar Design Engineer", "Engineering", "Hyderabad", "Full-time", "Design on-grid and hybrid rooftop solar systems using AutoCAD and PVsyst. Prepare BOQ, layout drawings and single-line diagrams. Min. 2 years experience. B.Tech Electrical/ECE preferred."],
  ["Solar Sales Executive", "Sales", "Hyderabad / Telangana", "Full-time", "Generate residential and commercial solar leads through field visits, digital channels and referrals. Conduct site visits, prepare proposals and close deals. Attractive commission per installation."],
  ["EPC Project Manager", "Operations", "PAN India", "Full-time", "Own end-to-end project delivery from survey to commissioning. Manage teams of 10–20 engineers and installers. Handle DISCOM coordination and client communication. 5+ years solar EPC experience required."],
  ["Solar Field Technician / Installer", "Engineering", "Multiple States", "Full-time", "Install rooftop solar panels, mounting structures and inverters under supervision. ITI Electrician or Diploma in Electrical. Freshers with strong aptitude welcome — full training provided."],
  ["Digital Marketing Executive", "Corporate", "Hyderabad", "Full-time", "Run Google Ads, Meta Ads, SEO, content marketing and social media. Generate qualified solar leads at scale. 2+ years experience in performance marketing."],
  ["Subsidy & Documentation Specialist", "Operations", "Hyderabad", "Full-time", "Process PM Surya Ghar applications, TSSPDCL/APEPDCL net metering requests and government scheme documentation. 1–3 years experience."],
  ["Business Development Manager", "Sales", "Multiple States", "Full-time", "Identify and close B2B deals with housing societies, institutions and commercial clients. Monthly target: ₹2 Cr+ new business. Excellent English and Telugu communication."],
];

export default function Careers() {
  useSEO({
    title: "Careers at Junna Solar — Build a Career That Powers the Future",
    description: "Join 43 passionate professionals driving India's clean energy transformation. Open positions in Engineering, Sales, Operations and Corporate.",
    path: "/careers",
  });

  return (
    <>
      <section style={{ background: "linear-gradient(to bottom, rgba(13,27,42,0.75), rgba(13,27,42,0.5)), url('/hero-primary.jpg') center/cover no-repeat", color: "#fff", minHeight: "82vh", display: "flex", alignItems: "center", padding: "80px 0" }} data-testid="careers-hero">
        <div className="container-js" style={{ textAlign: "center", maxWidth: 760, marginInline: "auto" }}>
          <span style={{ color: "#F47B22", fontSize: 13, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Join the Solar Revolution</span>
          <h1 style={{ color: "#fff", marginTop: 16, fontSize: "clamp(36px, 6vw, 64px)", lineHeight: 1 }}>
            Build a Career That<br />Powers the Future.
          </h1>
          <p style={{ marginTop: 22, color: "rgba(255,255,255,0.88)", fontSize: 18, maxWidth: 620, marginInline: "auto" }}>
            At Junna Solar, you don&apos;t just hold a job — you drive India&apos;s clean energy transformation. Join 43 passionate professionals changing lives every day.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#openings" className="btn-primary" style={{ padding: "14px 32px", fontSize: 16 }}>View Open Positions ↓</a>
            <a href="#culture" className="btn-white" style={{ padding: "14px 32px", fontSize: 16 }}>Learn About Our Culture</a>
          </div>
        </div>
      </section>

      <section id="culture" style={{ background: "#FBF9F5", padding: "80px 0" }} data-testid="careers-values">
        <div className="container-js">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="eyebrow">Why Junna Solar</span>
            <h2 className="h-section">More Than a Job. A Mission.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {VALUES.map((v) => (
              <div key={v.title} className="card-js" data-testid={`career-value-${v.title.slice(0,8).toLowerCase().replace(/\W+/g, "-")}`}>
                <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
                <h3 style={{ color: "#1A2E4A", marginBottom: 8 }}>{v.title}</h3>
                <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.7 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "#1A2E4A", color: "#fff", padding: "72px 0" }}>
        <div className="container-js" style={{ textAlign: "center", maxWidth: 800 }}>
          <span style={{ fontSize: 80, color: "#F47B22", lineHeight: 0.4 }}>“</span>
          <p style={{ marginTop: 12, fontSize: 24, fontStyle: "italic", color: "#fff", lineHeight: 1.55 }}>
            Joining Junna Solar was the best professional decision of my life. Within two years, I grew from a field technician to managing projects worth crores. The trust and opportunities here are unmatched.
          </p>
          <p style={{ marginTop: 18, color: "#F47B22", fontSize: 14, fontWeight: 600 }}>— Surampudi Kumar, Senior Project Engineer</p>
        </div>
      </section>

      <section id="openings" style={{ background: "#fff", padding: "80px 0" }} data-testid="careers-openings">
        <div className="container-js">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span className="eyebrow">Careers at Junna Solar</span>
            <h2 className="h-section">Current Openings</h2>
          </div>
          <div style={{ display: "grid", gap: 14, maxWidth: 920, marginInline: "auto" }}>
            {JOBS.map(([title, dept, location, type, desc], i) => (
              <div key={title} data-testid={`job-${i}`} style={{ background: "#fff", borderRadius: 12, border: "1px solid #E5E7EB", borderLeft: "4px solid #F47B22", padding: "22px 24px", transition: "all .2s" }}
                onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateX(0)"; }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <h3 style={{ color: "#1A2E4A", marginBottom: 6 }}>{title}</h3>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 10 }}>
                      <span style={{ padding: "3px 10px", background: "#EBF4FF", color: "#1A2E4A", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{dept}</span>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>📍 {location}</span>
                      <span style={{ fontSize: 12, color: "#6B7280" }}>· {type}</span>
                    </div>
                    <p style={{ color: "#6B7280", fontSize: 14, lineHeight: 1.65 }}>{desc}</p>
                  </div>
                  <a href={`mailto:${BRAND.email}?subject=Application — ${title}`} className="link-teal" style={{ display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap" }}>
                    Apply Now <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg,#1A2E4A,#0D1B2A)", color: "#fff", padding: "72px 0" }}>
        <div className="container-js" style={{ textAlign: "center", maxWidth: 760 }}>
          <h2 style={{ color: "#fff" }}>Don&apos;t See Your Role? We&apos;re Always Looking for Great People.</h2>
          <p style={{ marginTop: 12, color: "rgba(255,255,255,0.82)" }}>
            Send your updated CV and a short note about why you want to join the solar revolution.
          </p>
          <p style={{ marginTop: 8, color: "#F47B22", fontSize: 16, fontWeight: 600 }}>{BRAND.email}</p>
          <div style={{ marginTop: 24, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={`mailto:${BRAND.email}`} className="btn-primary" style={{ padding: "14px 30px" }}><Mail size={16} /> Send Your CV</a>
            <a href={BRAND.phoneHref} className="btn-white" style={{ padding: "14px 30px" }}><Phone size={16} /> Call HR: {BRAND.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
