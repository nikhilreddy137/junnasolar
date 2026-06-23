/**
 * Junna Solar — Zoho CRM Lead submission utility
 *
 * All form submissions call `submitZohoLead(payload)`.
 * UTM parameters are automatically captured from the URL.
 * Credentials are NEVER in this file — they live in backend .env only.
 */

import { API } from "@/lib/api";

/** Read UTM params from the current URL search string */
export function getUtmParams() {
  const p = new URLSearchParams(window.location.search);
  return {
    utmSource: p.get("utm_source") || "",
    utmMedium: p.get("utm_medium") || "",
    utmCampaign: p.get("utm_campaign") || "",
    utmTerm: p.get("utm_term") || "",
    utmContent: p.get("utm_content") || "",
  };
}

/**
 * Build and POST a lead payload to the secure backend /api/zoho/lead endpoint.
 *
 * @param {Object} fields - Form-specific fields (see spec for full list)
 * @returns {Promise<{success: boolean, message: string, action: string}>}
 */
export async function submitZohoLead(fields = {}) {
  const payload = {
    source: "Junna Solar Website",
    currentPageUrl: window.location.href,
    referrerUrl: document.referrer || "",
    submittedAt: new Date().toISOString(),
    ...getUtmParams(),
    ...fields,
  };

  const resp = await fetch(`${API}/zoho/lead`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  // Per spec: even on Zoho API error the backend returns 201 with success:false
  // so we treat any non-network error as a soft success for the user
  if (!resp.ok && resp.status !== 201) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.detail || `HTTP ${resp.status}`);
  }

  return resp.json();
}

/** Success message per spec */
export const ZOHO_SUCCESS_MSG =
  "Thank you. Your request has been received. Junna Solar team will contact you shortly.";

/** Fallback message per spec */
export const ZOHO_FALLBACK_MSG =
  "Thank you. Your request has been received. Our team will contact you shortly.";
