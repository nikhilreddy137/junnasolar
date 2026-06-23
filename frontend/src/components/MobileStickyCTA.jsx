import { Link } from "react-router-dom";
import { MessageCircle, Calculator } from "lucide-react";
import { BRAND, WHATSAPP_URL } from "@/lib/brand";
import { track, EVENTS } from "@/lib/analytics";

export const MobileStickyCTA = () => (
  <div
    data-testid="mobile-sticky-cta"
    className="lg:hidden fixed bottom-3 inset-x-3 z-40 rounded-full border border-[rgb(var(--js-border))] bg-[rgb(var(--js-text))] text-[rgb(var(--js-bg))] shadow-[0_18px_36px_-12px_rgba(22,29,27,0.45)] px-2 py-2"
    style={{ marginBottom: "env(safe-area-inset-bottom)" }}
  >
    <div className="grid grid-cols-3 gap-1">
      <Link
        to="/?calc=1#estimator"
        data-testid="sticky-calc-btn"
        onClick={() => track(EVENTS.HERO_CTA, { cta: "calc", location: "mobile_sticky" })}
        className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold text-[rgb(var(--js-bg))]"
      >
        <Calculator className="h-4 w-4 text-[rgb(var(--js-accent))]" /> Estimate
      </Link>
      <Link
        to="/contact?action=survey"
        data-testid="sticky-survey-btn"
        onClick={() => track(EVENTS.HERO_CTA, { cta: "survey", location: "mobile_sticky" })}
        className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[rgb(var(--js-accent))] px-3 py-2 text-[12px] font-semibold text-white"
      >
        Visit
      </Link>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noreferrer"
        aria-label={`WhatsApp ${BRAND.name}`}
        data-testid="sticky-wa-btn"
        onClick={() => track(EVENTS.WHATSAPP, { location: "mobile_sticky" })}
        className="inline-flex items-center justify-center gap-1.5 rounded-full px-3 py-2 text-[12px] font-semibold"
      >
        <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
      </a>
    </div>
  </div>
);

export default MobileStickyCTA;
