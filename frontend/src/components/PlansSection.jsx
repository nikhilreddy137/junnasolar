import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const BULLETS = [
  "Systems starting from 1kW to 500kW+",
  "PM Surya Ghar subsidy: up to 40% off for homes",
  "Easy EMI options with 0% interest via partner banks",
];

const IMG = "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=1600&q=80";

export const PlansSection = () => (
  <section data-testid="plans-section" style={{ background: "#FBF9F5", padding: "80px 0" }}>
    <div className="container-js">
      <div className="lg:grid lg:grid-cols-2" style={{ display: "grid", gap: 48, alignItems: "center" }}>
        <div>
          <span className="eyebrow" data-testid="plans-eyebrow">Plans &amp; Pricing</span>
          <h2 className="h-section" data-testid="plans-heading" style={{ marginTop: 12 }}>Solar Plans for Every Budget</h2>
          <p style={{ marginTop: 14, fontSize: 16, color: "#6B7280", maxWidth: 520, lineHeight: 1.6 }}>
            From 1kW home systems to 100kW commercial plants — with PM Surya Ghar subsidy, your solar journey starts at just ₹15,000 out-of-pocket.
          </p>
          <ul style={{ marginTop: 28, padding: 0, listStyle: "none", display: "grid", gap: 14 }}>
            {BULLETS.map((b) => (
              <li key={b} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                <span style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(244,123,34,0.12)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                  <Check size={14} color="#F47B22" strokeWidth={3} />
                </span>
                <span style={{ color: "#111827", fontSize: 15.5, fontWeight: 500 }}>{b}</span>
              </li>
            ))}
          </ul>
          <Link to="/pricing" className="btn-outline" data-testid="plans-cta" style={{ marginTop: 32 }}>View All Plans &amp; Pricing</Link>
        </div>
        <div data-testid="plans-photo" style={{ borderRadius: 14, overflow: "hidden", aspectRatio: "4/3", background: "#E5E7EB" }}>
          <img src={IMG} alt="Solar panels on Indian residential rooftop" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </div>
    </div>
  </section>
);

export default PlansSection;
