import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Phone, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/homes", label: "Residential" },
  { to: "/businesses", label: "Commercial" },
  { to: "/products", label: "Products" },
  { to: "/case-studies", label: "Stories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Utility bar */}
      <div style={{ backgroundColor: "#1F2647" }} className="hidden lg:block">
        <div className="container-js flex items-center justify-end py-2">
          <a href="tel:18008906987"
            style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "rgba(255,255,255,0.8)", textDecoration: "none", whiteSpace: "nowrap" }}
          >
            <Phone style={{ width: "13px", height: "13px", flexShrink: 0 }} />
            Call 1800 890 6987 for a free quote
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className="sticky top-0 z-50 w-full"
        style={{ backgroundColor: "#FFFBF0", borderBottom: "1px solid #E8E4DC" }}
      >
        <div className="container-js" style={{ display: "flex", alignItems: "center", height: "64px", gap: "8px" }}>

          {/* Logo — fixed width so it never shrinks */}
          <Link to="/" style={{ flexShrink: 0, marginRight: "16px" }} aria-label="Junna Solar">
            <img src="/junna-logo.png" alt="Junna Solar Systems Limited" style={{ height: "36px", width: "auto" }} />
          </Link>

          {/* Nav links — flex-1 so they take available space */}
          <nav className="hidden lg:flex" style={{ flex: 1, alignItems: "center", gap: "2px" }}>
            {NAV_LINKS.map(({ to, label, exact }) => (
              <NavLink
                key={to}
                to={to}
                end={exact}
                style={({ isActive }) => ({
                  padding: "8px 14px",
                  borderRadius: "800px",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  color: isActive ? "#ffffff" : "#1F2647",
                  backgroundColor: isActive ? "#1F2647" : "transparent",
                  transition: "background-color 0.15s ease, color 0.15s ease",
                })}
                onMouseOver={e => { if (!e.currentTarget.style.backgroundColor.includes("31, 38, 71")) { e.currentTarget.style.backgroundColor = "rgba(31,38,71,0.07)"; } }}
                onMouseOut={e => { if (!e.currentTarget.style.backgroundColor.includes("31, 38, 71")) { e.currentTarget.style.backgroundColor = "transparent"; } }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Right side — phone + CTA, fixed, no shrink */}
          <div className="hidden lg:flex" style={{ flexShrink: 0, alignItems: "center", gap: "16px", marginLeft: "8px" }}>
            <a href="tel:18008906987"
              style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "14px", fontWeight: 500, color: "#1F2647", textDecoration: "none", whiteSpace: "nowrap" }}
            >
              <Phone style={{ width: "15px", height: "15px" }} />
              1800&nbsp;890&nbsp;6987
            </a>
            <Link
              to="/contact?action=survey"
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                backgroundColor: "#1F2647", color: "#ffffff",
                fontSize: "14px", fontWeight: 500,
                padding: "10px 20px", borderRadius: "800px",
                textDecoration: "none", whiteSpace: "nowrap",
                transition: "background-color 0.15s ease",
              }}
            >
              Get a free quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden"
            onClick={() => setOpen(!open)}
            style={{ marginLeft: "auto", padding: "8px", color: "#1F2647", background: "none", border: "none", cursor: "pointer" }}
            aria-label="Toggle menu"
          >
            {open ? <X style={{ width: "24px", height: "24px" }} /> : <Menu style={{ width: "24px", height: "24px" }} />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div style={{ backgroundColor: "#FFFBF0", borderTop: "1px solid #E8E4DC" }}>
            <nav className="container-js" style={{ paddingTop: "12px", paddingBottom: "16px", display: "flex", flexDirection: "column", gap: "4px" }}>
              {NAV_LINKS.map(({ to, label, exact }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={exact}
                  onClick={() => setOpen(false)}
                  style={({ isActive }) => ({
                    padding: "12px 16px", borderRadius: "12px",
                    fontSize: "15px", fontWeight: 500, textDecoration: "none",
                    color: isActive ? "#ffffff" : "#1F2647",
                    backgroundColor: isActive ? "#1F2647" : "transparent",
                  })}
                >
                  {label}
                </NavLink>
              ))}
              <div style={{ paddingTop: "12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <a href="tel:18008906987"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", padding: "12px 20px", borderRadius: "800px", border: "1.5px solid #1F2647", color: "#1F2647", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}
                >
                  <Phone style={{ width: "16px", height: "16px" }} /> 1800 890 6987
                </a>
                <Link to="/contact?action=survey" onClick={() => setOpen(false)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "12px 20px", borderRadius: "800px", backgroundColor: "#1F2647", color: "#ffffff", fontSize: "15px", fontWeight: 500, textDecoration: "none" }}
                >
                  Get a free quote
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
