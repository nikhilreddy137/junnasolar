import { Link } from "react-router-dom";
import { Phone, Mail, MessageCircle } from "lucide-react";

export const Footer = () => (
  <footer style={{ backgroundColor: "#1F2647", color: "rgba(255,255,255,0.75)" }}>
    <div className="container-js py-16">
      <div className="grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div className="md:col-span-1">
          <img src="/junna-logo.png" alt="Junna Solar" className="h-9 w-auto brightness-0 invert mb-4" />
          <p style={{ fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.6)" }}>
            Rooftop solar — designed, manufactured, installed and supported by Junna Solar Systems Limited. India-built for Indian homes and businesses.
          </p>
          <p style={{ fontSize: "12px", marginTop: "12px", color: "rgba(255,255,255,0.4)" }}>
            13+ years · 125+ MW deployed · 650 MW factory
          </p>
        </div>

        {/* Explore */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
            Explore
          </h4>
          <ul className="space-y-3">
            {[
              { to: "/homes", label: "Residential" },
              { to: "/businesses", label: "Commercial" },
              { to: "/products", label: "Products" },
              { to: "/case-studies", label: "Stories" },
              { to: "/about", label: "About Us" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} style={{ fontSize: "15px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}
                  onMouseOver={e => e.currentTarget.style.color = "#ffffff"}
                  onMouseOut={e => e.currentTarget.style.color = "rgba(255,255,255,0.7)"}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
            Contact
          </h4>
          <ul className="space-y-3">
            <li>
              <a href="tel:18008906987" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} />
                1800 890 6987
              </a>
            </li>
            <li>
              <a href="tel:+916309395555" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                <Phone className="h-4 w-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} />
                +91 63093 95555
              </a>
            </li>
            <li>
              <a href="https://wa.me/916309395555" target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                <MessageCircle className="h-4 w-4 flex-shrink-0" style={{ color: "#25D366" }} />
                WhatsApp chat
              </a>
            </li>
            <li>
              <a href="mailto:info@junnasolar.com" style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "15px", color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>
                <Mail className="h-4 w-4 flex-shrink-0" style={{ color: "rgba(255,255,255,0.4)" }} />
                info@junnasolar.com
              </a>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h4 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>
            Get started
          </h4>
          <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.6, marginBottom: "16px" }}>
            Free rooftop assessment. No payment, no obligation.
          </p>
          <Link to="/contact?action=survey" className="btn-white" style={{ fontSize: "14px", padding: "12px 24px" }}>
            Get a free quote
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", marginTop: "48px", paddingTop: "24px", display: "flex", flexWrap: "wrap", gap: "16px", justifyContent: "space-between", alignItems: "center" }}>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
          © {new Date().getFullYear()} Junna Solar Systems Limited. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy Policy", "Terms of Use"].map(t => (
            <Link key={t} to="/contact" style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textDecoration: "none" }}>
              {t}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
