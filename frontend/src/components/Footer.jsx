import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Sun, Facebook, Instagram, Youtube, MessageCircle, Linkedin } from "lucide-react";
import { BRAND, QUOTE_URL } from "@/lib/brand";

const COLUMNS = [
  { title: "Solutions", links: [
    ["Residential Solar", "/solutions/residential"],
    ["Commercial Solar", "/solutions/commercial"],
    ["Housing Societies", "/solutions/societies"],
    ["Institutions", "/solutions/institutions"],
    ["Hybrid Systems", "/solutions/hybrid"],
  ]},
  { title: "Products", links: [
    ["Solar PV Panels", "/products/solar-panels"],
    ["Solar Inverters", "/products/inverters"],
    ["Solar Batteries", "/products/batteries"],
    ["Mounting Structures", "/products/mounting-structures"],
    ["Solar Water Pumps", "/products/water-pumps"],
    ["Solar Street Lights", "/products/street-lights"],
  ]},
  { title: "Services", links: [
    ["Free Rooftop Survey", "/services/survey"],
    ["EPC Services", "/services/epc"],
    ["Subsidy Guidance", "/services/subsidy"],
    ["AMC & Maintenance", "/services/amc"],
    ["Net Metering Support", "/services/net-metering"],
  ]},
  { title: "Company", links: [
    ["About Us", "/about"],
    ["Our Team", "/about#team"],
    ["Certifications", "/download-certificates"],
    ["Blog", "/blog"],
    ["Careers", "/careers"],
    ["Contact Us", "/contact"],
  ]},
];

const SOCIALS = [
  { Icon: Facebook, label: "Facebook", href: BRAND.social.facebook },
  { Icon: Instagram, label: "Instagram", href: BRAND.social.instagram },
  { Icon: Youtube, label: "YouTube", href: BRAND.social.youtube },
  { Icon: MessageCircle, label: "WhatsApp", href: BRAND.social.whatsapp },
  { Icon: Linkedin, label: "LinkedIn", href: BRAND.social.linkedin },
];

const FooterLogo = () => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
    <span style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#FFB45E,#F47B22)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
      <Sun size={20} color="#0D1B2A" strokeWidth={2.6} />
    </span>
    <span style={{ fontWeight: 800, fontSize: 22, color: "#fff", letterSpacing: "-0.01em" }}>Junna Solar</span>
  </span>
);

export const Footer = () => (
  <footer data-testid="site-footer" style={{ background: "#0D1B2A", color: "rgba(255,255,255,0.72)" }}>
    <div className="container-js" style={{ paddingTop: 56, paddingBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
        <div>
          <FooterLogo />
          <p style={{ marginTop: 8, color: "#F47B22", fontSize: 13, fontStyle: "italic", margin: "8px 0 0" }}>{BRAND.tagline}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap" }}>
          <a href={BRAND.phoneHref} data-testid="footer-phone" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#fff", fontSize: 16, fontWeight: 700, textDecoration: "none" }}>
            <Phone size={15} /> {BRAND.phone}
          </a>
          <a href={BRAND.emailHref} data-testid="footer-email" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "rgba(255,255,255,0.78)", fontSize: 14, textDecoration: "none" }}>
            <Mail size={14} /> {BRAND.email}
          </a>
          <Link to={QUOTE_URL} className="btn-primary" data-testid="footer-cta">Get Free Survey</Link>
        </div>
      </div>

      <hr style={{ marginTop: 32, marginBottom: 32, border: "none", borderTop: "1px solid rgba(255,255,255,0.12)" }} />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
        {COLUMNS.map((c) => (
          <div key={c.title}>
            <h4 style={{ color: "rgba(255,255,255,0.95)", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 16 }}>{c.title}</h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 10 }}>
              {c.links.map(([label, to]) => (
                <li key={label}>
                  <Link to={to} style={{ color: "rgba(255,255,255,0.72)", fontSize: 14, textDecoration: "none", transition: "color .15s" }}
                    onMouseOver={(e) => (e.currentTarget.style.color = "#F47B22")}
                    onMouseOut={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.72)")}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, display: "flex", alignItems: "flex-start", gap: 10, color: "rgba(255,255,255,0.72)" }}>
        <MapPin size={16} color="#F47B22" style={{ marginTop: 2, flexShrink: 0 }} />
        <p style={{ fontSize: 13.5, margin: 0, lineHeight: 1.55 }}>{BRAND.address}</p>
      </div>

      <hr style={{ marginTop: 28, marginBottom: 20, border: "none", borderTop: "1px solid rgba(255,255,255,0.12)" }} />

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 14 }}>
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>
          © {new Date().getFullYear()} Junna Solar Systems Limited. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: 10 }} data-testid="footer-socials">
          {SOCIALS.map(({ Icon, label, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", transition: "background .15s ease" }}
              onMouseOver={(e) => (e.currentTarget.style.background = "#F47B22")}
              onMouseOut={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}>
              <Icon size={15} />
            </a>
          ))}
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <Link to="/privacy" style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textDecoration: "none" }}>Privacy Policy</Link>
          <Link to="/terms" style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, textDecoration: "none" }}>Terms of Use</Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
