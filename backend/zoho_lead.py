"""
Zoho CRM Lead integration module for Junna Solar.

Handles:
- OAuth2 token refresh using refresh_token grant
- Duplicate detection by phone/email before creating
- Lead creation in Zoho CRM Leads module
- Maps website form data to Junna's CUSTOM Zoho field API names so each
  field lands in its proper place in CRM (not stuffed into Description).
"""

import os
import re
import logging
import requests
from datetime import datetime, timezone
from typing import Optional

logger = logging.getLogger(__name__)

ZOHO_ACCOUNTS_URL = os.environ.get("ZOHO_ACCOUNTS_URL", "https://accounts.zoho.in")
ZOHO_CRM_API_BASE = os.environ.get("ZOHO_CRM_API_BASE", "https://www.zohoapis.in/crm/v2")
ZOHO_CLIENT_ID = os.environ.get("ZOHO_CLIENT_ID", "")
ZOHO_CLIENT_SECRET = os.environ.get("ZOHO_CLIENT_SECRET", "")
ZOHO_REFRESH_TOKEN = os.environ.get("ZOHO_REFRESH_TOKEN", "")

# Junna Solar Zoho CRM layout IDs (verified via /settings/layouts?module=Leads)
LAYOUT_B2C_ID = "1259423000000000167"
LAYOUT_B2B_ID = "1259423000000688027"

# Valid picklist values from Junna's Zoho CRM
BUDGET_PICKLIST = {"Under 1 Lakh", "1-3 Lakh", "3-6 Lakh", "Above 6 Lakh"}
PROJECT_TYPE_PICKLIST = {"Rooftop Solar", "Solar Pump", "Solar Inverter", "Other"}

_token_cache: dict = {"access_token": None, "expires_at": 0}


# ─── Auth ─────────────────────────────────────────────────────────────────────
def _get_access_token() -> str:
    """Refresh and return a valid Zoho access token (cached in-process)."""
    import time
    now = time.time()
    if _token_cache["access_token"] and now < _token_cache["expires_at"] - 60:
        return _token_cache["access_token"]

    if not all([ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN]):
        raise ValueError(
            "Zoho credentials not configured. Set ZOHO_CLIENT_ID, "
            "ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN in backend .env"
        )

    resp = requests.post(
        f"{ZOHO_ACCOUNTS_URL}/oauth/v2/token",
        params={
            "refresh_token": ZOHO_REFRESH_TOKEN,
            "client_id": ZOHO_CLIENT_ID,
            "client_secret": ZOHO_CLIENT_SECRET,
            "grant_type": "refresh_token",
        },
        timeout=15,
    )
    resp.raise_for_status()
    data = resp.json()
    if "access_token" not in data:
        raise RuntimeError(f"Zoho token refresh failed: {data}")

    _token_cache["access_token"] = data["access_token"]
    _token_cache["expires_at"] = now + int(data.get("expires_in", 3600))
    logger.info("Zoho access token refreshed")
    return _token_cache["access_token"]


# ─── Helpers ──────────────────────────────────────────────────────────────────
def _parse_amount(val) -> Optional[float]:
    """Extract a number from strings like '₹3,500' / '3500' / '3,500 INR'."""
    if val is None:
        return None
    if isinstance(val, (int, float)):
        return float(val)
    s = re.sub(r"[^\d.]", "", str(val))
    if not s:
        return None
    try:
        return float(s)
    except ValueError:
        return None


def _parse_int(val) -> Optional[int]:
    """Extract an integer (e.g. system kW). '3.5 kW' → 3, '3–4 kW' → 3."""
    if val is None:
        return None
    if isinstance(val, (int, float)):
        return int(val)
    m = re.search(r"\d+", str(val))
    return int(m.group()) if m else None


def _lead_type_from_segment(segment: str) -> str:
    """Map website segment → Zoho Lead_Type picklist value."""
    s = (segment or "").lower()
    if s in ("business", "businesses", "commercial", "industry", "industrial", "b2b"):
        return "B2B"
    if s in ("institution", "institutions", "government", "school", "hospital", "b2g"):
        return "B2G"
    # home, residential, society, communities, apartment → B2C
    return "B2C"


def _subsidy_for(lead_type: str, monthly_bill: Optional[float]) -> Optional[str]:
    """Residential / society rooftop with small bills are typically subsidy-eligible."""
    if lead_type != "B2C":
        return "No"
    if monthly_bill is None:
        return None
    # PM Surya Ghar covers up to ~3 kW heavily; bills under ~₹10k generally qualify
    return "Yes" if monthly_bill <= 10000 else "No"


def _build_feedback_audit(payload: dict) -> str:
    """Compact audit trail for the 'Description' (Feedback_Notes) field."""
    def line(k, l):
        v = payload.get(k)
        return f"{l}: {v}" if v else None
    parts = [
        "Junna Solar Website — submission details",
        line("formName", "Form"),
        line("pageSource", "Page"),
        line("enquiryType", "Enquiry Type"),
        line("preferredVisitDate", "Preferred callback / visit"),
        line("estimatedSystemSize", "Estimated system size"),
        line("estimatedMonthlySavings", "Estimated monthly savings"),
        line("estimatedAnnualSavings", "Estimated annual savings"),
        line("estimatedPayback", "Estimated payback"),
        line("currentPageUrl", "URL"),
        line("referrerUrl", "Referrer"),
        line("utmSource", "UTM Source"),
        line("utmMedium", "UTM Medium"),
        line("utmCampaign", "UTM Campaign"),
        line("utmTerm", "UTM Term"),
        line("utmContent", "UTM Content"),
        line("submittedAt", "Submitted at"),
    ]
    return "\n".join(p for p in parts if p)


# ─── Duplicate lookup ─────────────────────────────────────────────────────────
def _search_existing_lead(token: str, phone: str, email: str) -> Optional[str]:
    headers = {"Authorization": f"Zoho-oauthtoken {token}"}
    for field, value in [("Phone", phone), ("Email", email)]:
        if not value:
            continue
        try:
            resp = requests.get(
                f"{ZOHO_CRM_API_BASE}/Leads/search",
                headers=headers,
                params={"criteria": f"({field}:equals:{value})"},
                timeout=10,
            )
            if resp.status_code == 200:
                data = resp.json().get("data", [])
                if data:
                    return data[0].get("id")
        except Exception as e:
            logger.warning(f"Zoho duplicate search failed for {field}: {e}")
    return None


def _update_existing_lead(token: str, lead_id: str, append_note: str) -> None:
    """Append a new audit note to existing lead without overwriting field data."""
    headers = {
        "Authorization": f"Zoho-oauthtoken {token}",
        "Content-Type": "application/json",
    }
    body = {
        "data": [{
            "id": lead_id,
            "Feedback_Notes": f"[Updated {datetime.now(timezone.utc).isoformat()}]\n{append_note}",
        }]
    }
    resp = requests.put(
        f"{ZOHO_CRM_API_BASE}/Leads/{lead_id}",
        headers=headers,
        json=body,
        timeout=15,
    )
    if resp.status_code not in (200, 201):
        logger.warning(f"Zoho lead update failed: {resp.status_code} {resp.text[:300]}")


# ─── Main entry ───────────────────────────────────────────────────────────────
def create_zoho_lead(payload: dict) -> dict:
    """
    Build and POST a Lead to Zoho using the actual custom field API names.

    Returns: {"success": bool, "lead_id": str|None, "action": "created"|"updated"}
    """
    token = _get_access_token()

    # ── Identity ──
    phone = (payload.get("phone") or "").strip()
    email = (payload.get("email") or "").strip()
    full_name = (
        payload.get("fullName")
        or f"{payload.get('firstName', '')} {payload.get('lastName', '')}".strip()
        or "Website Lead"
    )
    first_name = (payload.get("firstName") or (full_name.split()[0] if full_name else "")).strip()
    last_name = (
        payload.get("lastName")
        or (" ".join(full_name.split()[1:]) if len(full_name.split()) > 1 else full_name)
        or "Website Lead"
    ).strip()

    # ── Segment → Lead_Type & Layout ──
    segment_hint = (
        payload.get("segment")
        or payload.get("enquiryType")
        or ""
    )
    lead_type = _lead_type_from_segment(segment_hint)
    layout_id = LAYOUT_B2B_ID if lead_type == "B2B" else LAYOUT_B2C_ID

    # ── Company (Zoho requires it on Leads) ──
    company = (
        payload.get("companyName")
        or payload.get("societyName")
        or payload.get("institutionName")
        or ("Junna Solar Website Lead" if lead_type != "B2B" else (full_name or "Website Lead"))
    )

    # ── Numeric / parsed fields ──
    monthly_bill = _parse_amount(payload.get("monthlyBill"))
    system_size_kw = _parse_int(payload.get("systemSizeKw") or payload.get("estimatedSystemSize"))
    subsidy_val = payload.get("subsidy") or _subsidy_for(lead_type, monthly_bill)

    # ── Address / location ──
    city = (payload.get("cityOrPincode") or payload.get("city") or "").strip()
    site_address = (payload.get("installationLocation") or city or "").strip()

    # ── Requirements (the "Looking for" / Requirements field in CRM) ──
    req_bits = []
    if system_size_kw:
        req_bits.append(f"{system_size_kw} kW system")
    if payload.get("propertyType"):
        req_bits.append(payload["propertyType"])
    if payload.get("enquiryType"):
        req_bits.append(payload["enquiryType"])
    if payload.get("estimatedMonthlySavings"):
        req_bits.append(f"~{payload['estimatedMonthlySavings']}/mo savings")
    requirements = " · ".join(req_bits) if req_bits else None

    # ── Build the Zoho Lead record using ACTUAL custom field API names ──
    zoho_lead: dict = {
        # Standard
        "Last_Name": last_name,
        "Company": company,
        "Phone": phone,
        "Mobile": phone,
        "Lead_Source": "Online Store",
        "Lead_Status": "Not Contacted",
        # Layout assignment
        "Layout": {"id": layout_id},
        # Custom (per Junna's CRM)
        "Lead_Type": lead_type,
        "Project_Type": "Rooftop Solar",
    }
    if first_name:
        zoho_lead["First_Name"] = first_name
    if email:
        zoho_lead["Email"] = email
    if city:
        zoho_lead["City"] = city
    if site_address:
        zoho_lead["Site_Address"] = site_address
    if monthly_bill is not None:
        zoho_lead["Monthly_Electricity_Bill"] = monthly_bill
    if system_size_kw:
        zoho_lead["Required_System_Size_KW"] = system_size_kw
    if subsidy_val in ("Yes", "No"):
        zoho_lead["Subsidy"] = subsidy_val
    if requirements:
        zoho_lead["Looking_for"] = requirements
    if payload.get("industryType"):
        zoho_lead["Industry_Type"] = payload["industryType"]
    if payload.get("governmentName"):
        zoho_lead["Government_Name"] = payload["governmentName"]
    if payload.get("rooftopAreaSqft"):
        zoho_lead["Rooftop_Area_sq_ft"] = str(payload["rooftopAreaSqft"])
    if payload.get("budgetRange") in BUDGET_PICKLIST:
        zoho_lead["Budget_Range"] = payload["budgetRange"]
    if payload.get("message"):
        zoho_lead["Description"] = payload["message"]  # "Note" field in CRM UI
    # Audit / traceability trail
    zoho_lead["Feedback_Notes"] = _build_feedback_audit(payload)

    # ── Duplicate check → update vs create ──
    existing_id = _search_existing_lead(token, phone, email)
    if existing_id:
        _update_existing_lead(token, existing_id, zoho_lead["Feedback_Notes"])
        logger.info(f"Zoho lead updated: {existing_id} ({lead_type})")
        return {"success": True, "lead_id": existing_id, "action": "updated"}

    headers = {
        "Authorization": f"Zoho-oauthtoken {token}",
        "Content-Type": "application/json",
    }
    resp = requests.post(
        f"{ZOHO_CRM_API_BASE}/Leads",
        headers=headers,
        json={"data": [zoho_lead]},
        timeout=15,
    )

    if resp.status_code not in (200, 201):
        logger.error(f"Zoho lead creation failed: {resp.status_code} {resp.text[:500]}")
        raise RuntimeError(f"Zoho API error {resp.status_code}")

    result = resp.json()
    lead_id = None
    try:
        lead_id = result["data"][0]["details"]["id"]
    except (KeyError, IndexError):
        pass

    logger.info(f"Zoho lead created: {lead_id} | type={lead_type} | name={full_name} | phone={phone}")
    return {"success": True, "lead_id": lead_id, "action": "created"}
