import { Link } from "react-router-dom";

const segments = [
  {
    to: "/homes",
    label: "MOST POPULAR",
    title: "Residential Solar",
    desc: "Cut your electricity bill 70–90%. Subsidy guidance included.",
    img: "https://admin.junnasolar.com/upload/casestudy/1840329143490839.jpg",
  },
  {
    to: "/businesses",
    label: "HIGH ROI",
    title: "Commercial Solar",
    desc: "Factories, warehouses, offices. ROI in 3–5 years.",
    img: "https://admin.junnasolar.com/upload/casestudy/1840345298585367.jpg",
  },
];

export const SegmentCards = () => (
  <section style={{ backgroundColor: "#FFFBF0" }} className="py-20 lg:py-28">
    <div className="container-js">
      <div className="mb-12">
        <p className="eyebrow">Pick your path</p>
        <h2 className="section-title mt-3">Solar that fits how<br />you live &amp; work.</h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        {segments.map(({ to, label, title, desc, img }) => (
          <Link
            key={to}
            to={to}
            className="group relative overflow-hidden rounded-2xl block"
            style={{ border: "1px solid #E8E4DC" }}
          >
            <div className="relative h-72 overflow-hidden">
              <img
                src={img}
                alt={title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,12,30,0.75) 0%, rgba(10,12,30,0.1) 60%)" }} />
              <div className="absolute top-4 left-4">
                <span style={{
                  backgroundColor: "#1F2647",
                  color: "#ffffff",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  padding: "4px 12px",
                  borderRadius: "800px",
                }}>
                  {label}
                </span>
              </div>
            </div>
            <div style={{ backgroundColor: "#ffffff", padding: "24px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: 500, color: "#1F2647", letterSpacing: "-0.01em" }}>{title}</h3>
              <p style={{ fontSize: "15px", color: "#6F6D68", marginTop: "6px", lineHeight: 1.5 }}>{desc}</p>
              <span style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "16px",
                color: "#1F2647",
                fontSize: "14px",
                fontWeight: 500,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}>
                Learn more →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

export default SegmentCards;
