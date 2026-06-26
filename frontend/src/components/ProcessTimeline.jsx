const STEPS = [
  { n: 1, title: "Free Rooftop Survey", body: "Our engineer visits your property within 48 hours to assess solar potential, roof strength, and shadow analysis." },
  { n: 2, title: "Custom System Design", body: "We design a system tailored to your monthly usage, roof size, and budget. You approve the final layout." },
  { n: 3, title: "Subsidy Application", body: "We file your PM Surya Ghar or state subsidy application on your behalf. No paperwork hassle for you." },
  { n: 4, title: "Equipment Procurement", body: "We source Tier-1 panels, certified inverters, and MS mounting structures from verified manufacturers." },
  { n: 5, title: "Installation", body: "Our trained engineers complete the installation in 1–3 days, ensuring a clean, safe, and weatherproof setup." },
  { n: 6, title: "DISCOM & Net Metering", body: "We coordinate with TSSPDCL/APEPDCL for grid connection and net meter installation." },
  { n: 7, title: "Handover & Monitoring", body: "We hand over the system, set up remote monitoring, and provide our AMC plan for long-term care." },
];

export const ProcessTimeline = () => (
  <section data-testid="process-section" style={{ background: "#fff", padding: "80px 0" }}>
    <div className="container-js">
      <div style={{ textAlign: "center", maxWidth: 720, margin: "0 auto 56px" }}>
        <h2 className="h-section" data-testid="process-heading">How Junna Solar Works</h2>
        <p style={{ marginTop: 14, color: "#6B7280", fontSize: 16 }}>
          We do all the heavy lifting — from survey to subsidy to switch-on. Here&apos;s what to expect:
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18, position: "relative" }}>
        {STEPS.map((s) => (
          <div key={s.n} data-testid={`process-step-${s.n}`} style={{ padding: "22px 18px", borderRadius: 12, border: "1px solid #E5E7EB", background: "#fff", position: "relative" }}>
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 40, height: 40, borderRadius: "50%", background: "#F47B22", color: "#fff", fontWeight: 800, fontSize: 16, marginBottom: 14 }}>{s.n}</span>
            <h3 style={{ color: "#111827", fontSize: 15.5, fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{s.title}</h3>
            <p style={{ marginTop: 8, color: "#6B7280", fontSize: 13.5, lineHeight: 1.6 }}>{s.body}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessTimeline;
