import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Phone, ChevronDown, Menu, X, Sun, ArrowRight } from "lucide-react";
import { BRAND, QUOTE_URL } from "@/lib/brand";

const FEATURED = {
  Solutions: { img: "/hero-primary.jpg", eyebrow: "Featured", title: "PM Surya Ghar — up to ₹78,000 subsidy for homes", href: "/solutions/residential" },
  Products:  { img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80", eyebrow: "Spotlight", title: "Tier-1 monocrystalline panels 415–550 W", href: "/products/solar-panels" },
  Services:  { img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80", eyebrow: "Featured Service", title: "Free 48-hour rooftop survey across 8 states", href: "/services/survey" },
  About:     { img: "/hero-primary.jpg", eyebrow: "About Us", title: "13+ years · 26,000+ installations · ISO 9001:2015", href: "/about" },
  Learn:     { img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1200&q=80", eyebrow: "Learn", title: "How PM Surya Ghar subsidy works — the complete guide", href: "/blog" },
};

const NAV = [
  { label: "Home", to: "/" },
  { label: "Solutions", items: [
      { label: "Residential Solar", to: "/solutions/residential" },
      { label: "Commercial Solar", to: "/solutions/commercial" },
      { label: "Housing Societies", to: "/solutions/societies" },
      { label: "Institutions", to: "/solutions/institutions" },
      { label: "Hybrid Systems", to: "/solutions/hybrid" },
    ], extra: [
      { label: "Why Solar", to: "/why-solar" },
      { label: "Subsidy Calculator", to: "/calculator" },
      { label: "Free Survey", to: QUOTE_URL },
    ],
  },
  { label: "Products", items: [
      { label: "Solar Panels", to: "/products/solar-panels" },
      { label: "Solar Inverters", to: "/products/inverters" },
      { label: "Solar Batteries", to: "/products/batteries" },
      { label: "Mounting Structures", to: "/products/structures" },
      { label: "Water Pumps", to: "/products/water-pumps" },
      { label: "Street Lights", to: "/products/street-lights" },
    ], extra: [
      { label: "Tier-1 Manufacturers", to: "/about#partners" },
      { label: "Warranty & AMC", to: "/services/amc" },
    ],
  },
  { label: "Services", items: [
      { label: "Free Rooftop Survey", to: "/services/survey" },
      { label: "EPC Services", to: "/services/epc" },
      { label: "Subsidy Guidance", to: "/services/subsidy" },
      { label: "AMC & Maintenance", to: "/services/amc" },
      { label: "Net Metering Support", to: "/services/net-metering" },
    ], extra: [
      { label: "Project Gallery", to: "/projects" },
      { label: "Customer Reviews", to: "/#testimonials" },
    ],
  },
  { label: "About", items: [
      { label: "About Us", to: "/about" },
      { label: "Our Team", to: "/about#team" },
      { label: "Certifications", to: "/download-certificates" },
      { label: "Projects", to: "/projects" },
    ], extra: [
      { label: "Careers", to: "/careers" },
      { label: "Press & Media", to: "/press" },
    ],
  },
  { label: "Learn", items: [
      { label: "Blog", to: "/blog" },
      { label: "FAQs", to: "/#faqs" },
      { label: "Subsidy Calculator", to: "/calculator" },
      { label: "Why Solar", to: "/why-solar" },
    ], extra: [
      { label: "PM Surya Ghar guide", to: "/blog/pm-surya-ghar" },
      { label: "Net metering explained", to: "/blog/net-metering" },
    ],
  },
  { label: "Contact", to: "/contact" },
];

const JunnaLogo = ({ height = 32 }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }} data-testid="junna-logo">
    <span style={{ width: height, height: height, borderRadius: "50%",
      background: "linear-gradient(135deg, #FFB45E 0%, #F47B22 55%, #1A2E4A 130%)",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      boxShadow: "0 0 0 3px rgba(244,123,34,0.18)" }}>
      <Sun style={{ width: height * 0.62, height: height * 0.62, color: "#fff" }} strokeWidth={2.6} />
    </span>
    <span style={{ fontWeight: 800, fontSize: 19, color: "#1A2E4A", letterSpacing: "-0.01em" }}>Junna Solar</span>
  </span>
);

export const Navbar = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const open = (idx) => { if (closeTimer.current) clearTimeout(closeTimer.current); setOpenIndex(idx); };
  const scheduleClose = () => { closeTimer.current = setTimeout(() => setOpenIndex(null), 120); };

  return (
    <>
      <div data-testid="announcement-banner"
        style={{ backgroundColor: "#0D1B2A", color: "rgba(255,255,255,0.92)", height: 40, display: "flex", alignItems: "center", justifyContent: "center", gap: 24, padding: "0 16px" }}>
        <span style={{ fontSize: 13, letterSpacing: 0.2 }}>{BRAND.bannerText}</span>
        <a href={BRAND.phoneHref} style={{ color: "#F47B22", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>{BRAND.phone}</a>
      </div>

      <div className={`mega-backdrop ${openIndex !== null ? "open" : ""}`} data-testid="mega-backdrop" onMouseEnter={() => setOpenIndex(null)} />

      <header data-testid="site-header" className="sticky top-0 z-50 w-full"
        style={{ background: "#fff", boxShadow: scrolled || openIndex !== null ? "var(--shadow-nav)" : "none", transition: "box-shadow .2s ease" }}>
        <div className="container-js flex items-center" style={{ height: 76, gap: 12, position: "relative" }}>
          <Link to="/" aria-label="Junna Solar home" style={{ textDecoration: "none", flexShrink: 0 }}>
            <JunnaLogo height={32} />
          </Link>

          <nav className="hidden lg:flex" style={{ flex: 1, justifyContent: "center", alignItems: "center", gap: 0, height: "100%" }} onMouseLeave={scheduleClose}>
            {NAV.map((g, idx) =>
              g.items ? (
                <div key={g.label} style={{ height: "100%", display: "inline-flex", alignItems: "center" }} onMouseEnter={() => open(idx)}>
                  <button className={`nav-link ${openIndex === idx ? "active" : ""}`} data-testid={`nav-${g.label.toLowerCase()}`}>
                    {g.label}
                    <ChevronDown size={13} style={{ marginLeft: 2, opacity: 0.7 }} />
                  </button>
                </div>
              ) : (
                <Link key={g.label} to={g.to} className="nav-link" data-testid={`nav-${g.label.toLowerCase()}`} onMouseEnter={() => open(null)}>
                  {g.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center" style={{ gap: 16, flexShrink: 0 }}>
            <a href={BRAND.phoneHref} data-testid="nav-phone"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, color: "#1A2E4A", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
              <Phone style={{ width: 14, height: 14 }} /> {BRAND.phone}
            </a>
            <Link to={QUOTE_URL} className="btn-primary" data-testid="nav-get-survey-btn" style={{ padding: "10px 20px", fontSize: 13.5 }}>
              Get Free Survey
            </Link>
            <Link to="/portal" data-testid="nav-portal" style={{ color: "#1A2E4A", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>
              Customer Portal
            </Link>
          </div>

          <button data-testid="nav-mobile-toggle" className="lg:hidden" onClick={() => setMobile((v) => !v)} aria-label="Toggle menu"
            style={{ marginLeft: "auto", background: "transparent", border: "none", cursor: "pointer", color: "#1A2E4A" }}>
            {mobile ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {NAV.map((g, idx) =>
          g.items ? (
            <div key={`panel-${g.label}`} className={`mega-panel ${openIndex === idx ? "open" : ""}`}
              data-testid={`mega-${g.label.toLowerCase()}`}
              onMouseEnter={() => open(idx)} onMouseLeave={scheduleClose}
              aria-hidden={openIndex !== idx}>
              <div className="mega-panel-inner">
                <div>
                  <p className="mega-col-heading">Explore {g.label.toLowerCase()}</p>
                  {g.items.map((it) => (
                    <Link key={it.label} to={it.to} className="mega-link" data-testid={`mega-link-${it.label.toLowerCase().replace(/\W+/g, "-")}`}>{it.label}</Link>
                  ))}
                </div>
                <Link to={FEATURED[g.label]?.href || "/"} className="mega-featured" data-testid={`mega-featured-${g.label.toLowerCase()}`}>
                  <div className="mega-featured-img" style={{ backgroundImage: `url(${FEATURED[g.label]?.img})` }} aria-hidden="true" />
                  <div className="mega-featured-body">
                    <span className="mega-featured-eyebrow">{FEATURED[g.label]?.eyebrow}</span>
                    <h4 className="mega-featured-title">{FEATURED[g.label]?.title}</h4>
                    <span className="mega-featured-cta">Learn more <ArrowRight size={14} /></span>
                  </div>
                </Link>
                <div>
                  <p className="mega-col-heading">More</p>
                  {(g.extra || []).map((it) => (
                    <Link key={it.label} to={it.to} className="mega-link">{it.label}</Link>
                  ))}
                  <div style={{ marginTop: 20, padding: 16, background: "var(--bg-cream)", borderRadius: 12 }}>
                    <p style={{ fontSize: 13, color: "var(--text-muted)", margin: 0 }}>Talk to an expert</p>
                    <p style={{ fontSize: 18, fontWeight: 700, color: "var(--primary)", margin: "4px 0 10px" }}>{BRAND.phone}</p>
                    <Link to={QUOTE_URL} className="btn-primary" style={{ padding: "8px 16px", fontSize: 13 }}>Book free survey</Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        )}

        {mobile && (
          <div className="lg:hidden" style={{ background: "#fff", borderTop: "1px solid var(--border)", padding: 16 }}>
            {NAV.map((g) =>
              g.items ? (
                <details key={g.label} style={{ borderBottom: "1px solid #F3F4F6", padding: "6px 0" }}>
                  <summary style={{ padding: "10px 4px", fontWeight: 600, color: "#111827", cursor: "pointer", listStyle: "none" }}>{g.label}</summary>
                  <div style={{ paddingLeft: 12, paddingBottom: 8 }}>
                    {g.items.map((it) => (
                      <Link key={it.label} to={it.to} onClick={() => setMobile(false)} style={{ display: "block", padding: "8px 4px", color: "#6B7280", fontSize: 14, textDecoration: "none" }}>{it.label}</Link>
                    ))}
                  </div>
                </details>
              ) : (
                <Link key={g.label} to={g.to} onClick={() => setMobile(false)} style={{ display: "block", padding: "12px 4px", color: "#111827", fontSize: 15, fontWeight: 600, textDecoration: "none", borderBottom: "1px solid #F3F4F6" }}>{g.label}</Link>
              )
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 16 }}>
              <a href={BRAND.phoneHref} className="btn-outline" style={{ justifyContent: "center" }}>
                <Phone size={14} /> {BRAND.phone}
              </a>
              <Link to={QUOTE_URL} className="btn-primary" style={{ justifyContent: "center" }} onClick={() => setMobile(false)}>Get Free Survey</Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
