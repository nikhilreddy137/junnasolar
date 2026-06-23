// Analytics event placeholder. Wire to GA/PostHog when ready.
export const track = (event, props = {}) => {
  try {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event, ...props, ts: Date.now() });
      if (window.posthog && typeof window.posthog.capture === "function") {
        window.posthog.capture(event, props);
      }
    }
  } catch (_) { /* swallow */ }
};

export const EVENTS = {
  SEGMENT_SELECT: "segment_select",
  CALC_START: "calculator_start",
  CALC_COMPLETE: "calculator_complete",
  HERO_CTA: "hero_cta_click",
  LEAD_START: "lead_form_start",
  LEAD_ERROR: "lead_form_error",
  LEAD_SUBMIT: "lead_submit",
  WHATSAPP: "whatsapp_click",
  CALL: "call_click",
  CASE_VIEW: "case_study_view",
  CERT_DL: "certificate_download",
  PROPOSAL_DL: "proposal_download",
  SCROLL_75: "scroll_75",
};
