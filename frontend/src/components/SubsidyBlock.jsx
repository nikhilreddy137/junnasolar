import { Link } from "react-router-dom";

export const SubsidyBlock = () => (
  <section style={{ backgroundColor: "#1F2647" }} className="py-16 lg:py-20">
    <div className="container-js">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
        <div className="max-w-xl">
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>Government subsidy</p>
          <h2 className="mt-3" style={{ color: "#ffffff", fontSize: "clamp(24px, 3.5vw, 36px)", fontWeight: 500, letterSpacing: "-0.02em" }}>
            Yes, subsidy exists. <span style={{ color: "rgba(255,255,255,0.7)" }}>We guide you through it.</span>
          </h2>
          <p className="mt-4" style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.6 }}>
            Under PM Surya Ghar Muft Bijli Yojana, residential customers can get up to ₹78,000 in central subsidy. We handle all the paperwork.
          </p>
        </div>
        <div className="flex-shrink-0">
          <Link to="/contact?action=survey" className="btn-white">
            Check my subsidy eligibility
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default SubsidyBlock;
