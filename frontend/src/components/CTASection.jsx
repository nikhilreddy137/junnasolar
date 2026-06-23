import { Link } from "react-router-dom";
import { WHATSAPP_URL } from "@/lib/brand";

export const CTASection = () => (
  <section style={{ backgroundColor: "#1F2647" }} className="py-20 lg:py-28">
    <div className="container-js text-center">
      <p className="eyebrow" style={{ color: "rgba(255,255,255,0.55)" }}>Ready when you are</p>
      <h2 className="mt-4" style={{ color: "#ffffff", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 500, letterSpacing: "-0.02em" }}>
        Ready to start saving on electricity?
      </h2>
      <p className="mt-4 text-white/70 max-w-xl mx-auto text-base">
        Get a free rooftop assessment from Junna Solar. No payment, no obligation.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link to="/contact?action=survey" className="btn-white">
          Get a free quote
        </Link>
        <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="btn-whatsapp">
          WhatsApp us
        </a>
      </div>
    </div>
  </section>
);

export default CTASection;
