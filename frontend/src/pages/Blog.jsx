import { Link } from "react-router-dom";
import { useSEO } from "@/lib/seo";

const ARTICLES = [
  { cat: "SUBSIDY GUIDE", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80", title: "PM Surya Ghar Muft Bijli Yojana — The Complete 2025 Guide", date: "March 15, 2025", read: "8 min", excerpt: "Everything you need to know about India's biggest rooftop solar subsidy. Who qualifies, how much you receive (up to ₹78,000), how to apply online — and how Junna Solar makes it hassle-free.", to: "/blog/pm-surya-ghar-guide-2025" },
  { cat: "RESIDENTIAL", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", title: "How Much Solar Do I Need? A Guide for Hyderabad Homeowners", date: "February 20, 2025", read: "6 min", excerpt: "Confused about system size? Use our simple calculation guide — based on real Hyderabad bills and TSSPDCL tariffs — to pick the right 1kW, 2kW, 3kW or 5kW system.", to: "/blog/how-much-solar-do-i-need-hyderabad" },
  { cat: "TECHNOLOGY", img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80", title: "On-Grid vs Off-Grid vs Hybrid Solar — Which is Right for You?", date: "January 10, 2025", read: "7 min", excerpt: "A practical, no-jargon comparison of India's three solar system types. Real cost differences and which configuration fits homes, businesses and remote properties.", to: "/blog/on-grid-vs-off-grid-vs-hybrid" },
  { cat: "COMMERCIAL", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80", title: "5 Reasons Every Telangana Factory Must Go Solar in 2025", date: "December 5, 2024", read: "5 min", excerpt: "Rising tariffs, 40% accelerated depreciation, fast 3-year ROI, no-upfront RESCO models and net metering — the business case has never been stronger.", to: "/blog/commercial-solar-telangana-2025" },
  { cat: "SUBSIDY GUIDE", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", title: "PM-KUSUM Solar Pump Scheme — Farmer's Complete Guide", date: "November 12, 2024", read: "6 min", excerpt: "Farmers can receive up to 90% subsidy on solar water pumps through PM-KUSUM. Junna Solar is an MNRE approved vendor and has delivered 4,500 pumps in Maharashtra.", to: "/blog/pm-kusum-solar-pump-guide" },
  { cat: "RESIDENTIAL", img: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?auto=format&fit=crop&w=800&q=80", title: "Net Metering in Telangana — Earn Money from Your Rooftop Solar", date: "October 8, 2024", read: "5 min", excerpt: "How net metering works with TSSPDCL and APEPDCL, what you earn per unit exported to the grid, and how Junna Solar handles the complete registration process.", to: "/blog/net-metering-telangana-guide" },
  { cat: "NEWS & UPDATES", img: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=800&q=80", title: "Junna Solar Wins ₹114.58 Crore PM-KUSUM Order from MEDA Maharashtra", date: "July 24, 2024", read: "3 min", excerpt: "A landmark contract: 4,500 off-grid solar water pumps for farmers across Maharashtra under PM-KUSUM, awarded by Maharashtra Energy Development Agency.", to: "/blog/junna-solar-meda-pm-kusum-order" },
  { cat: "TECHNOLOGY", img: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80", title: "How to Monitor Your Solar System — Apps, Portals & Performance Tips", date: "September 3, 2024", read: "6 min", excerpt: "Most solar owners never check their system performance. This guide explains how to read your inverter monitoring app and identify underperformance early.", to: "/blog/solar-system-monitoring-guide" },
];

export default function Blog() {
  useSEO({
    title: "Solar Knowledge Hub — Junna Solar Blog",
    description: "Expert guides, subsidy updates, installation tips and solar news from Junna Solar's certified engineers and solar specialists.",
    path: "/blog",
  });

  return (
    <>
      <section style={{ background: "linear-gradient(135deg,#1A2E4A,#0D1B2A)", color: "#fff", padding: "80px 0" }} data-testid="blog-hero">
        <div className="container-js">
          <span style={{ color: "#F47B22", fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase" }}>Blog</span>
          <h1 style={{ color: "#fff", marginTop: 12 }}>Solar Knowledge Hub</h1>
          <p style={{ marginTop: 16, color: "rgba(255,255,255,0.85)", fontSize: 17, maxWidth: 760 }}>
            Expert guides, subsidy updates, installation tips and solar news from Junna Solar&apos;s team of certified engineers and solar specialists.
          </p>
        </div>
      </section>

      <section style={{ background: "#F9FAFB", padding: "64px 0" }}>
        <div className="container-js">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
            {ARTICLES.map((a, i) => (
              <Link key={a.title} to={a.to} data-testid={`blog-card-${i}`} style={{ textDecoration: "none", background: "#fff", borderRadius: 14, overflow: "hidden", border: "1px solid #E5E7EB", display: "flex", flexDirection: "column", transition: "all .25s" }}
                onMouseOver={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-5px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <div style={{ position: "relative", aspectRatio: "16/9", overflow: "hidden", background: "#E5E7EB" }}>
                  <img src={a.img} alt={a.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} loading="lazy" />
                  <span style={{ position: "absolute", top: 12, left: 12, padding: "4px 10px", background: "#F47B22", color: "#fff", borderRadius: 999, fontSize: 11, fontWeight: 700 }}>{a.cat}</span>
                </div>
                <div style={{ padding: 20, flex: 1, display: "flex", flexDirection: "column" }}>
                  <p style={{ color: "#9CA3AF", fontSize: 12, margin: 0 }}>{a.date} · {a.read} read</p>
                  <h3 style={{ color: "#1A2E4A", fontSize: 17, fontWeight: 700, marginTop: 8, lineHeight: 1.4 }}>{a.title}</h3>
                  <p style={{ color: "#6B7280", fontSize: 13.5, marginTop: 10, lineHeight: 1.6, flex: 1 }}>{a.excerpt}</p>
                  <span className="link-teal" style={{ marginTop: 14, display: "inline-block", fontSize: 13 }}>Read more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
