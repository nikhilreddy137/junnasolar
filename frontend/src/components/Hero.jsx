import { Link } from "react-router-dom";
import { IMG } from "@/lib/images";

/**
 * Hero — flexible page hero that ACTUALLY honours props.
 *
 * Usage:
 *   <Hero />                                       // homepage default
 *   <Hero eyebrow="..." title={...} subtitle="..." imageUrl={...} showStats={false} />
 */
const DEFAULT_TITLE = (
  <>
    The bill
    <br />
    <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}>stops here.</em>
    <br />
    Solar starts here.
  </>
);

const DEFAULT_SUBTITLE = (
  <>
    India-built rooftop solar from{" "}
    <strong style={{ color: "#ffffff", fontWeight: 600 }}>Junna Solar Systems</strong> —
    designed, manufactured, installed and supported under one roof.
  </>
);

const DEFAULT_EYEBROW = "Since 2012 · 125+ MW deployed · 650 MW factory";

export const Hero = ({
  eyebrow = DEFAULT_EYEBROW,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  imageUrl = IMG.heroPrimary,
  showStats = true,
  primaryCta = { label: "Book free rooftop visit", to: "/contact?action=survey" },
  secondaryCta = { label: "See my savings →", href: "#savings-estimator" },
  whatsappCta = true,
}) => (
  <section style={{ position: "relative", minHeight: "90vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
    {/* Full-bleed background image */}
    <div style={{ position: "absolute", inset: 0 }}>
      <img
        src={imageUrl}
        alt="Solar installation by Junna Solar"
        loading="eager"
        fetchpriority="high"
        decoding="async"
        style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%" }}
      />
      {/* Stronger left-heavy overlay so the H1 never competes with image detail */}
      <div style={{
        position: "absolute", inset: 0,
        background:
          "linear-gradient(100deg, rgba(8,12,28,0.94) 0%, rgba(8,12,28,0.82) 30%, rgba(8,12,28,0.55) 60%, rgba(8,12,28,0.20) 100%)",
      }} />
      {/* Subtle bottom vignette for graceful fade into next section */}
      <div style={{
        position: "absolute", left: 0, right: 0, bottom: 0, height: "30%",
        background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(8,12,28,0.55) 100%)",
        pointerEvents: "none",
      }} />
    </div>

    {/* Content */}
    <div className="container-js" style={{ position: "relative", zIndex: 10, paddingTop: "80px", paddingBottom: "80px" }}>
      <div style={{ maxWidth: "720px" }}>
        {/* Eyebrow */}
        <p style={{
          fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.7)", marginBottom: "20px",
          display: "flex", alignItems: "center", gap: "10px",
        }}>
          <span style={{ width: "28px", height: "1.5px", backgroundColor: "rgba(255,255,255,0.55)", display: "inline-block" }} />
          {eyebrow}
        </p>

        {/* H1 */}
        <h1 style={{
          fontSize: "clamp(40px, 7vw, 76px)",
          fontWeight: 500,
          lineHeight: 1.02,
          letterSpacing: "-0.025em",
          color: "#ffffff",
          margin: 0,
          textShadow: "0 2px 24px rgba(0,0,0,0.45)",
        }}>
          {title}
        </h1>

        <p style={{
          marginTop: "24px",
          fontSize: "18px",
          lineHeight: 1.6,
          color: "rgba(255,255,255,0.86)",
          maxWidth: "540px",
          textShadow: "0 1px 8px rgba(0,0,0,0.35)",
        }}>
          {subtitle}
        </p>

        {/* CTAs */}
        <div style={{ marginTop: "36px", display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
          {primaryCta && (
            <Link to={primaryCta.to} data-testid="hero-cta-primary" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              backgroundColor: "#ffffff", color: "#1F2647",
              fontSize: "16px", fontWeight: 600,
              padding: "15px 32px", borderRadius: "800px",
              textDecoration: "none", whiteSpace: "nowrap",
              boxShadow: "0 6px 24px rgba(0,0,0,0.30)",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}>
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <a href={secondaryCta.href || secondaryCta.to} data-testid="hero-cta-secondary" style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "6px",
              backgroundColor: "transparent", color: "#ffffff",
              fontSize: "16px", fontWeight: 500,
              padding: "14px 28px", borderRadius: "800px",
              border: "1.5px solid rgba(255,255,255,0.55)",
              textDecoration: "none", whiteSpace: "nowrap",
              transition: "border-color 0.15s ease, background-color 0.15s ease",
            }}>
              {secondaryCta.label}
            </a>
          )}
          {whatsappCta && (
            <a
              href="https://wa.me/916309395555?text=Hi%20Junna%20Solar%2C%20I'd%20like%20to%20know%20more%20about%20rooftop%20solar."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "6px",
                color: "rgba(255,255,255,0.75)", fontSize: "14px", fontWeight: 500,
                textDecoration: "none",
              }}
            >
              💬 or message us
            </a>
          )}
        </div>

        {/* Stats bar */}
        {showStats && (
          <div style={{
            marginTop: "52px",
            display: "flex", flexWrap: "wrap", gap: "0",
            backgroundColor: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "16px",
            border: "1px solid rgba(255,255,255,0.14)",
            overflow: "hidden",
            maxWidth: "620px",
          }}>
            {[
              { v: "13+",       l: "Years since 2012" },
              { v: "125+ MW",   l: "Deployed" },
              { v: "650 MW",    l: "TopCon factory" },
              { v: "10+ states", l: "Pan-India" },
            ].map(({ v, l }, i) => (
              <div key={l} style={{
                flex: "1 1 120px",
                padding: "16px 20px",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.12)" : "none",
              }}>
                <p style={{ fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 600, color: "#ffffff", lineHeight: 1.1, margin: 0 }}>{v}</p>
                <p style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginTop: "4px" }}>{l}</p>
              </div>
            ))}
          </div>
        )}

        {/* Toll-free line */}
        <p style={{ marginTop: showStats ? "20px" : "32px", fontSize: "13px", color: "rgba(255,255,255,0.55)" }}>
          Toll-free <a href="tel:18008906987" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 600, textDecoration: "none" }}>1800 890 6987</a> · Mon–Sat, 9 AM – 7 PM IST
        </p>
      </div>
    </div>
  </section>
);

export default Hero;
