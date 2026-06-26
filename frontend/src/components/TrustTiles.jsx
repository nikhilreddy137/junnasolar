import { ShieldCheck, Wrench, Coins, Headphones } from "lucide-react";

const TILES = [
  { Icon: ShieldCheck, title: "MNRE Empanelled & ISO Certified", body: "Junna Solar is approved by the Ministry of New and Renewable Energy (MNRE) and ISO 9001:2015 certified, ensuring quality you can rely on." },
  { Icon: Wrench, title: "End-to-End EPC Service", body: "From free rooftop survey to subsidy filing, installation, net metering, and lifetime AMC — we handle everything under one roof." },
  { Icon: Coins, title: "Subsidy & Savings Experts", body: "Our team processes PM Surya Ghar and state subsidy applications for you, maximising your financial benefit and cutting payback time." },
  { Icon: Headphones, title: "13+ Years of After-Sales Support", body: "With dedicated AMC plans, remote monitoring, and on-call technicians across 8 states, your system is protected for decades." },
];

export const TrustTiles = () => (
  <section data-testid="trust-tiles-section" style={{ background: "#fff", padding: "80px 0" }}>
    <div className="container-js" style={{ maxWidth: 920, textAlign: "center" }}>
      <h2 className="h-section" data-testid="trust-tiles-heading" style={{ marginBottom: 48 }}>Why 26,000+ Customers Trust Junna Solar</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
        {TILES.map(({ Icon, title, body }) => (
          <div key={title} data-testid={`trust-tile-${title.slice(0,8).toLowerCase().replace(/\W+/g, "-")}`} style={{ textAlign: "left" }}>
            <span style={{ width: 56, height: 56, borderRadius: 12, background: "rgba(244,123,34,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 18 }}>
              <Icon size={28} color="#F47B22" strokeWidth={2.2} />
            </span>
            <h3 style={{ fontSize: 18, color: "#111827", margin: 0, fontWeight: 700, lineHeight: 1.3 }}>{title}</h3>
            <p style={{ marginTop: 10, color: "#6B7280", fontSize: 14.5, lineHeight: 1.7 }}>{body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustTiles;
