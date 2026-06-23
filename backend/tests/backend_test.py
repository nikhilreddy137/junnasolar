"""Backend API tests for Junna Solar - leads, estimate, sitemap, robots."""
import os
import pytest
import requests

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://rooftop-quote-hub.preview.emergentagent.com').rstrip('/')


@pytest.fixture
def api_client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# --- Health ---
class TestHealth:
    def test_root_api(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/")
        assert r.status_code == 200
        data = r.json()
        assert data.get("status") == "ok"


# --- Estimate endpoint ---
class TestEstimate:
    def test_estimate_home_3500(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/estimate", json={"segment": "home", "monthly_bill": 3500})
        assert r.status_code == 200
        d = r.json()
        assert d["subsidy_eligible"] is True
        assert "subsidy" in d["subsidy_note"].lower() or "junna" in d["subsidy_note"].lower()
        assert d["system_size_kw_min"] > 0
        assert d["system_size_kw_max"] >= d["system_size_kw_min"]
        assert d["monthly_savings_min"] > 0
        assert d["annual_savings_max"] == d["monthly_savings_max"] * 12
        assert d["indicative"] is True

    def test_estimate_business_not_subsidy(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/estimate", json={"segment": "business", "monthly_bill": 50000})
        assert r.status_code == 200
        d = r.json()
        assert d["subsidy_eligible"] is False

    def test_estimate_zero_bill_returns_400(self, api_client):
        r = api_client.post(f"{BASE_URL}/api/estimate", json={"segment": "home", "monthly_bill": 0})
        assert r.status_code == 400

    def test_estimate_negative_bill_returns_400(self, api_client):
        # Negative gets clamped to 0 by max(0.0, ...) then raises 400
        r = api_client.post(f"{BASE_URL}/api/estimate", json={"segment": "home", "monthly_bill": -100})
        assert r.status_code == 400


# --- Leads endpoint ---
class TestLeads:
    def test_create_lead_and_persist(self, api_client):
        payload = {
            "segment": "home",
            "city": "TEST_Hyderabad",
            "monthly_bill": "3500",
            "property_type": "Independent house",
            "name": "TEST_User",
            "phone": "9876543210",
            "email": "test_user@example.com",
            "notes": "TEST notes",
            "preferred_callback": "9 AM – 12 PM",
            "source_page": "contact",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 201, r.text
        lead = r.json()
        assert lead["segment"] == "home"
        assert lead["city"] == "TEST_Hyderabad"
        assert lead["name"] == "TEST_User"
        assert lead["status"] == "new"
        assert "id" in lead and len(lead["id"]) > 0
        assert "created_at" in lead

        # Verify persistence by GET
        list_r = api_client.get(f"{BASE_URL}/api/leads")
        assert list_r.status_code == 200
        leads = list_r.json()
        assert any(l.get("id") == lead["id"] for l in leads), "Created lead not found in list"

    def test_create_lead_minimal(self, api_client):
        # No email / minimal payload
        payload = {
            "segment": "business",
            "city": "TEST_Mumbai",
            "name": "TEST_Minimal",
            "phone": "9123456789",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 201
        d = r.json()
        assert d["email"] is None

    def test_create_lead_invalid_email(self, api_client):
        payload = {
            "segment": "home", "city": "TEST_X", "name": "TEST_E",
            "phone": "9999999999", "email": "not-an-email",
        }
        r = api_client.post(f"{BASE_URL}/api/leads", json=payload)
        assert r.status_code == 422

    def test_list_leads_no_mongo_id(self, api_client):
        r = api_client.get(f"{BASE_URL}/api/leads")
        assert r.status_code == 200
        leads = r.json()
        assert isinstance(leads, list)
        for l in leads:
            assert "_id" not in l


# --- Static / SEO ---
class TestSEO:
    def test_robots_txt(self, api_client):
        r = api_client.get(f"{BASE_URL}/robots.txt")
        assert r.status_code == 200
        assert "User-agent" in r.text or "user-agent" in r.text.lower()

    def test_sitemap_xml(self, api_client):
        r = api_client.get(f"{BASE_URL}/sitemap.xml")
        assert r.status_code == 200
        assert "<urlset" in r.text or "<sitemap" in r.text
