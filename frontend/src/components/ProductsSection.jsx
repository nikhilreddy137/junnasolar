import { Link } from "react-router-dom";
import { Sun, Zap, BatteryCharging, Cog, Droplet, Lightbulb, ArrowRight } from "lucide-react";

const PRODUCTS = [
  { Icon: Sun, title: "Solar PV Modules", body: "Tier-1, monocrystalline & polycrystalline, 415W to 550W panels.", to: "/products/solar-panels" },
  { Icon: Zap, title: "Solar Inverters", body: "String, micro & hybrid inverters from Havells, Growatt, SMA.", to: "/products/inverters" },
  { Icon: BatteryCharging, title: "Solar Batteries", body: "Li-Ion & lead-acid battery banks for backup & off-grid.", to: "/products/batteries" },
  { Icon: Cog, title: "Mounting Structures", body: "MS & aluminium structures for RCC roof, metal shed, ground mount.", to: "/products/structures" },
  { Icon: Droplet, title: "Solar Water Pumps", body: "DC/AC pumps from 0.5HP to 10HP for agriculture & borewells.", to: "/products/water-pumps" },
  { Icon: Lightbulb, title: "Solar Street Lights", body: "Integrated all-in-one 12W to 60W LED, smart & manual.", to: "/products/street-lights" },
];

export const ProductsSection = () => (
  <section data-testid="products-section" style={{ background: "#F3F4F6", padding: "80px 0" }}>
    <div className="container-js">
      <div style={{ textAlign: "center", marginBottom: 44, maxWidth: 760, marginInline: "auto" }}>
        <span className="eyebrow" data-testid="products-eyebrow">Our Products</span>
        <h2 className="h-section" data-testid="products-heading" style={{ marginTop: 10 }}>Quality Solar Equipment, Installed Right</h2>
        <p style={{ marginTop: 14, color: "#6B7280", fontSize: 15.5 }}>
          We use only Tier-1 solar panels and certified inverters — sourced from top manufacturers and installed by our trained engineers.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 18 }}>
        {PRODUCTS.map(({ Icon, title, body, to }, i) => (
          <Link key={title} to={to} data-testid={`product-card-${i}`} className="card-js" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 14 }}>
            <div style={{ aspectRatio: "16/9", background: "linear-gradient(135deg, rgba(26,46,74,0.95), rgba(26,46,74,0.7))", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>
              <Icon size={48} strokeWidth={1.6} />
            </div>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>{title}</h3>
            <p style={{ fontSize: 13.5, color: "#6B7280", lineHeight: 1.55, margin: 0, flex: 1 }}>{body}</p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#F47B22", fontSize: 13, fontWeight: 600 }}>
              Learn more <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
