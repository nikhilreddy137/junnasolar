import { Link } from "react-router-dom";
import { Home, Building2, Building, Landmark, ArrowRight } from "lucide-react";

const CARDS = [
  { Icon: Home, title: "Residential Solar", body: "Save 70–90% on electricity bills. Systems from 1kW to 10kW for homes of all sizes. PM Surya Ghar subsidy up to ₹78,000.", to: "/solutions/residential" },
  { Icon: Building2, title: "Commercial Solar", body: "Cut operational costs by 30–60%. On-grid, off-grid and hybrid systems from 10kW to 500kW+ for factories, offices and warehouses.", to: "/solutions/commercial" },
  { Icon: Building, title: "Housing Societies", body: "Electrify common areas, lifts and water pumps. Reduce monthly maintenance charges for all residents by up to ₹40,000/month.", to: "/solutions/societies" },
  { Icon: Landmark, title: "Institutions", body: "Solar for schools, hospitals, temples and government buildings. Special pricing and scheme benefits for institutional buyers.", to: "/solutions/institutions" },
];

export const SolutionsSection = () => (
  <section data-testid="solutions-section" style={{ background: "#FBF9F5", padding: "80px 0" }}>
    <div className="container-js">
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <span className="eyebrow" data-testid="solutions-eyebrow">Our Solutions</span>
        <h2 className="h-section" data-testid="solutions-heading" style={{ marginTop: 10 }}>Solar for Every Need</h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
        {CARDS.map(({ Icon, title, body, to }, i) => (
          <Link key={title} to={to} data-testid={`solution-card-${i}`} className="card-js" style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: 12 }}>
            <span style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(244,123,34,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <Icon size={24} color="#F47B22" strokeWidth={2.2} />
            </span>
            <h3 style={{ fontSize: 18, color: "#1A2E4A", margin: 0, fontWeight: 700 }}>{title}</h3>
            <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.55, margin: 0, flex: 1 }}>{body}</p>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 4, color: "#F47B22", fontSize: 13, fontWeight: 600, marginTop: 4 }}>
              Learn more <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default SolutionsSection;
