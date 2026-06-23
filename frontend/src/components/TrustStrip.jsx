/* Awards & Recognition — exact Sunrun "Trusted by the best" section */
const stats = [
  { value: "12+", label: "Years in solar" },
  { value: "750 MW", label: "Module manufacturing" },
  { value: "25,000+", label: "Happy customers" },
  { value: "5,000+", label: "On-grid projects" },
  { value: "20,000+", label: "Off-grid projects" },
];

export const TrustStrip = () => (
  <section style={{ backgroundColor: "#FFFBF0", borderBottom: "1px solid #E8E4DC" }}>
    <div className="container-js py-10">
      <p className="eyebrow mb-6">Awards &amp; recognition</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map(({ value, label }) => (
          <div
            key={label}
            style={{
              backgroundColor: "#ffffff",
              border: "1px solid #E8E4DC",
              borderRadius: "16px",
              padding: "20px 16px",
              textAlign: "center",
            }}
          >
            <p style={{ fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 500, color: "#1F2647", letterSpacing: "-0.02em", lineHeight: 1.1 }}>
              {value}
            </p>
            <p style={{ fontSize: "13px", color: "#6F6D68", marginTop: "4px" }}>{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustStrip;
