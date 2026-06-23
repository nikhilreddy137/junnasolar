"""
Zoho CRM Lead integration module for Junna Solar.

Handles:
- OAuth2 token refresh using refresh_token grant
- Duplicate detection by phone/email before creating
- Lead creation in Zoho CRM Leads module
- All extra data packed into Description field
"""

import os
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

# Simple in-process token cache to avoid refreshing on every request
_token_cache: dict = {"access_token": None, "expires_at": 0}


def _get_access_token() -> str:
    """Refresh and return a valid Zoho access token."""
    import time
    now = time.time()
    # Use cached token if still valid (with 60s buffer)
    if _token_cache["access_token"] and now < _token_cache["expires_at"] - 60:
        return _token_cache["access_token"]

    if not all([ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN]):
        raise ValueError("Zoho credentials not configured. Set ZOHO_CLIENT_ID, ZOHO_CLIENT_SECRET, ZOHO_REFRESH_TOKEN in backend .env")

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

    expires_in = int(data.get("expires_in", 3600))
    _token_cache["access_token"] = data["access_token"]
    _token_cache["expires_at"] = now + expires_in
    logger.info("Zoho access token refreshed successfully")
    return _token_cache["access_token"]


def _build_description(payload: dict) -> str:
    """Build a structured Description string from all form fields."""
    def f(key, label):
        val = payload.get(key, "")
        return f"{label}: {val}" if val else ""

    lines = [
        "New Junna Solar Website Lead",
        "",
        f("formName", "Form Name"),
        f("pageSource", "Page Source"),
        f("enquiryType", "Enquiry Type"),
        "",
        f("fullName", "Name"),
        f("phone", "Phone"),
        f("email", "Email"),
        "",
        f("cityOrPincode", "City / Pincode"),
        f("installationLocation", "Installation Location"),
        f("propertyType", "Property Type"),
        f("monthlyBill", "Monthly Bill"),
        f("sanctionedLoadKw", "Sanctioned Load (kW)"),
        f("roofType", "Roof Type"),
        f("roofArea", "Roof Area"),
        "",
        f("companyName", "Company"),
        f("societyName", "Society"),
        f("institutionName", "Institution"),
        f("numberOfFlats", "Number of Flats"),
        f("preferredVisitDate", "Preferred Visit Date"),
        "",
        f("estimatedSystemSize", "Estimated System Size"),
        f("estimatedMonthlySavings", "Estimated Monthly Savings"),
        f("estimatedAnnualSavings", "Estimated Annual Savings"),
        f("estimatedPayback", "Estimated Payback"),
        "",
        f("message", "Message"),
        "",
        f("currentPageUrl", "Current Page URL"),
        f("referrerUrl", "Referrer URL"),
        f("utmSource", "UTM Source"),
        f("utmMedium", "UTM Medium"),
        f("utmCampaign", "UTM Campaign"),
        f("utmTerm", "UTM Term"),
        f("utmContent", "UTM Content"),
        f("submittedAt", "Submitted At"),
    ]
    return "\n".join(line for line in lines if line is not None)


def _search_existing_lead(token: str, phone: str, email: str) -> Optional[str]:
    """
    Search Zoho CRM for existing lead by phone or email.
    Returns the lead ID if found, else None.
    TODO: Enhance duplicate prevention with fuzzy matching if needed.
    """
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
                data = resp.json()
                leads = data.get("data", [])
                if leads:
                    lead_id = leads[0].get("id")
                    logger.info(f"Found existing Zoho lead by {field}: {lead_id}")
                    return lead_id
        except Exception as e:
            logger.warning(f"Zoho duplicate search failed for {field}: {e}")
    return None


def _update_lead_description(token: str, lead_id: str, description: str) -> None:
    """Append new enquiry details to an existing lead's Description."""
    headers = {
        "Authorization": f"Zoho-oauthtoken {token}",
        "Content-Type": "application/json",
    }
    body = {
        "data": [{
            "id": lead_id,
            "Description": f"[Updated {datetime.now(timezone.utc).isoformat()}]\n{description}",
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
    else:
        logger.info(f"Zoho lead {lead_id} description updated")


def create_zoho_lead(payload: dict) -> dict:
    """
    Main entry point: validate, check duplicates, create or update Zoho Lead.
    Returns dict with keys: success (bool), lead_id (str|None), action (str)
    """
    token = _get_access_token()

    phone = (payload.get("phone") or "").strip()
    email = (payload.get("email") or "").strip()
    full_name = (
        payload.get("fullName")
        or f"{payload.get('firstName', '')} {payload.get('lastName', '')}".strip()
        or "Website Lead"
    )
    first_name = payload.get("firstName") or (full_name.split()[0] if full_name else "")
    last_name = (
        payload.get("lastName")
        or (" ".join(full_name.split()[1:]) if len(full_name.split()) > 1 else full_name)
        or phone
        or "Website Lead"
    )
    company = (
        payload.get("companyName")
        or payload.get("societyName")
        or payload.get("institutionName")
        or "Junna Solar Website Lead"
    )
    city = payload.get("cityOrPincode") or payload.get("city") or ""
    description = _build_description({**payload, "fullName": full_name})

    # Check for duplicate lead
    existing_id = _search_existing_lead(token, phone, email)
    if existing_id:
        _update_lead_description(token, existing_id, description)
        return {"success": True, "lead_id": existing_id, "action": "updated"}

    # Build Zoho lead record using standard fields only (no custom fields to avoid failures)
    zoho_lead = {
        "Lead_Source": "Junna Solar Website",
        "Lead_Status": "New",
        "Last_Name": last_name,
        "Company": company,
        "Phone": phone,
        "Description": description,
    }
    # Add optional standard fields only if present
    if first_name:
        zoho_lead["First_Name"] = first_name
    if email:
        zoho_lead["Email"] = email
    if city:
        zoho_lead["City"] = city

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

    logger.info(f"Zoho lead created: {lead_id} | name={full_name} | phone={phone}")
    return {"success": True, "lead_id": lead_id, "action": "created"}
