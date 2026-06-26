import { Download, ExternalLink, Phone, Mail } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { useSEO } from "@/lib/seo";

const CERTS = [
  { icon: "🏛", badge: "GOVT CERTIFIED", badgeBg: "#16A34A", title: "MNRE Empanelment Certificate", issuer: "Ministry of New and Renewable Energy, Government of India", details: "Current & Active", file: "/certificates/mnre-empanelment-junna-solar.pdf" },
  { icon: "📋", badge: "INTL STANDARD", badgeBg: "#F47B22", title: "ISO 9001:2015 Quality Management Certificate", issuer: "International Organization for Standardization (via accredited CB)", details: "Validity: 2024 – 2027", file: "/certificates/iso-9001-2015-junna-solar.pdf" },
  { icon: "🏢", badge: "GOVT CERTIFIED", badgeBg: "#16A34A", title: "Certificate of Incorporation", issuer: "Ministry of Corporate Affairs — Registrar of Companies, Hyderabad", details: `CIN ${BRAND.cin} | Incorporated: ${BRAND.incorporated}`, file: "/certificates/certificate-of-incorporation.pdf" },
  { icon: "🌾", badge: "GOVT CERTIFIED", badgeBg: "#16A34A", title: "PM-KUSUM Vendor Approval — MEDA Maharashtra", issuer: "Maharashtra Energy Development Agency (MEDA)", details: `${BRAND.stats.pmKusum} Contract | ${BRAND.stats.pmKusumPumps} Solar Pumps`, file: "/certificates/pm-kusum-meda-approval.pdf" },
  { icon: "⚡", badge: "STATE APPROVED", badgeBg: "#1D4ED8", title: "TSREDCO Empanelment Certificate", issuer: "Telangana State Renewable Energy Development Corporation", details: "Active", file: "/certificates/tsredco-empanelment.pdf" },
  { icon: "📑", badge: "GOVT CERTIFIED", badgeBg: "#16A34A", title: "GST Registration Certificate", issuer: "Government of India — GST Network", details: "State: Telangana", file: "/certificates/gst-registration.pdf" },
  { icon: "💳", badge: "INTL STANDARD", badgeBg: "#F47B22", title: "ENF Solar Global Directory Listing", issuer: "ENF Solar (Global Solar Directory)", details: "Listed as Manufacturer & Installer · Panels 415W–550W", file: "/certificates/enf-solar-listing.pdf" },
];

export default function Certificates() {
  useSEO({
    title: "Certifications & Credentials — Junna Solar",
    description: "MNRE Empanelment, ISO 9001:2015, PM-KUSUM Vendor Approval, TSREDCO and more. Verified credentials for vendor onboarding & due diligence.",
    path: "/download-certificates",
  });

  return (
    <>
      <section style={{ background: "linear-gradient(135deg,#1A2E4A,#0D1B2A)", color: "#fff", padding: "80px 0" }} data-testid="cert-hero">
        <div className="container-js">
          <span style={{ color: "#F47B22", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Credentials</span>
          <h1 style={{ color: "#fff", marginTop: 12 }}>Our Certifications &amp; Credentials</h1>
          <p style={{ marginTop: 16, color: "rgba(255,255,255,0.85)", fontSize: 17, maxWidth: 720 }}>
            Verified by government authorities, international standards bodies and industry regulators. Download for vendor onboarding or due diligence.
          </p>
        </div>
      </section>

      <section style={{ background: "#F3F4F6", padding: "72px 0" }}>
        <div className="container-js">
          <h2 className="h-section" style={{ textAlign: "center", marginBottom: 36 }}>Official Downloads</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
            {CERTS.map((c, i) => (
              <div key={c.title} data-testid={`cert-${i}`} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid #E5E7EB", transition: "all .25s" }}
                onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.14)"; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ position: "relative", height: 140, background: "linear-gradient(135deg,#1A2E4A,#0D1B2A)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48 }}>
                  {c.icon}
                  <span style={{ position: "absolute", top: 12, right: 12, padding: "4px 10px", background: c.badgeBg, color: "#fff", borderRadius: 999, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em" }}>{c.badge}</span>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ color: "#1A2E4A", marginBottom: 8, fontSize: 16, lineHeight: 1.35 }}>{c.title}</h3>
                  <p style={{ color: "#6B7280", fontSize: 12.5, lineHeight: 1.5 }}>{c.issuer}</p>
                  <p style={{ color: "#9CA3AF", fontSize: 11.5, marginTop: 6 }}>{c.details}</p>
                  <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                    <a href={c.file} download className="btn-primary" style={{ flex: 1, padding: "8px 12px", fontSize: 13 }}>
                      <Download size={14} /> Download PDF
                    </a>
                    <a href={c.file} target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ padding: "6px 12px", fontSize: 13, color: "#1A2E4A", borderColor: "#1A2E4A" }}>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "linear-gradient(135deg,#1A2E4A,#0D1B2A)", color: "#fff", padding: "60px 0" }}>
        <div className="container-js" style={{ textAlign: "center", maxWidth: 720 }}>
          <h3 style={{ color: "#fff", fontSize: 24 }}>Need to Verify Our Credentials?</h3>
          <p style={{ marginTop: 10, color: "rgba(255,255,255,0.82)" }}>
            For vendor onboarding, due diligence or legal verification, contact our compliance team. We respond within 24 business hours.
          </p>
          <p style={{ marginTop: 10, color: "#F47B22" }}>{BRAND.email}</p>
          <div style={{ marginTop: 22, display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={BRAND.emailHref} className="btn-primary" style={{ padding: "12px 26px" }}><Mail size={14} /> Email Compliance Team</a>
            <a href={BRAND.phoneHref} className="btn-white" style={{ padding: "12px 26px" }}><Phone size={14} /> Call: {BRAND.phone}</a>
          </div>
        </div>
      </section>
    </>
  );
}
