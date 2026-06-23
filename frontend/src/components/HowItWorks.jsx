const steps = [
  { n: "01", title: "Tell us about your roof", desc: "Share your monthly electricity bill and location. Takes 30 seconds." },
  { n: "02", title: "Free rooftop survey", desc: "Our engineer visits, measures your roof, and designs your system." },
  { n: "03", title: "Get your custom proposal", desc: "Detailed quote with system size, savings, payback period, and subsidy." },
  { n: "04", title: "Approve & we install", desc: "Our certified team installs your system in 1–3 days." },
  { n: "05", title: "Net metering", desc: "We handle all DISCOM paperwork and net metering approvals." },
  { n: "06", title: "25-year warranty", desc: "Ongoing support, monitoring, and 25-year module warranty." },
];

export const HowItWorks = () => (
  <section style={{ backgroundColor: "#FFFBF0", borderTop: "1px solid #E8E4DC" }} className="py-20 lg:py-28">
    <div className="container-js">
      <div className="mb-12">
        <p className="eyebrow">The process</p>
        <h2 className="section-title mt-3">Six steps from bill to <strong style={{ fontWeight: 500 }}>backup power.</strong></h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {steps.map(({ n, title, desc }) => (
          <div key={n} style={{ backgroundColor: "#ffffff", border: "1px solid #E8E4DC", borderRadius: "16px", padding: "24px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#6F6D68", letterSpacing: "0.06em", marginBottom: "12px" }}>{n}</p>
            <h3 style={{ fontSize: "18px", fontWeight: 500, color: "#1F2647", letterSpacing: "-0.01em", marginBottom: "8px" }}>{title}</h3>
            <p style={{ fontSize: "14px", color: "#6F6D68", lineHeight: 1.6 }}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
