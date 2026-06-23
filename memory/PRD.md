# Junna Solar — PRD

## Problem Statement
Clone https://github.com/nikhilreddy137/junnasolar, run, and unify all website forms with correct Zoho CRM field mapping.

## Architecture
- Frontend: React 19 + CRACO + Tailwind (port 3000)
- Backend: FastAPI + Motor (Mongo) on port 8001 (all `/api` routes)
- Integrations: **Zoho CRM Leads** (Indian DC `.in`) — configured via .env

## Zoho CRM Integration (LIVE)
- Credentials in `backend/.env`: `ZOHO_CLIENT_ID/SECRET/REFRESH_TOKEN`
- Layout routing: B2C → `1259423000000000167`, B2B → `1259423000000688027`
- Lead Source = "Online Store" (constant), Status = "Not Contacted"
- Project_Type = "Rooftop Solar" (constant)
- Subsidy auto-derived: B2C + bill ≤ ₹10k → "Yes", else "No"
- Mobile field mirrored from Phone (B2B layout mandatory)
- Duplicate detection by Phone/Email → updates Feedback_Notes instead of creating dup

## Website Forms (UNIFIED)
All forms call `submitZohoLead()` → `POST /api/zoho/lead`.

| Page | Form | Segment options |
|---|---|---|
| `/`, `/contact`, `/residential`, `/homes` | LeadForm | Home / Society / Business / Government |
| `/commercial`, `/businesses` | LeadForm (B2B prefilled) | same |
| `/communities`, `/societies` | LeadForm (Society prefilled) | same |
| `/homes` (estimator section) | SavingsEstimator (with phone capture) | Home / Business / Society / Institution |
| `/` (homepage chip) | QuickEstimator (calc only) | Home / Business / Society — submits via /contact prefilled |

### Form → Zoho field mapping (final)
| Form field | Zoho API field | Zoho UI label |
|---|---|---|
| segment (home/society/business/government) | `Lead_Type` (B2C/B2C/B2B/B2G) + `Layout` | Lead Type / Layout |
| Full name | `First_Name` + `Last_Name` | Lead Name |
| Phone | `Phone` + `Mobile` | Phone |
| Email | `Email` | Email |
| City / pincode | `City` + `Site_Address` | Address |
| Avg monthly bill | `Monthly_Electricity_Bill` | Monthly Electricity Bill |
| Property type | `Looking_for` (composed) | Requirements |
| Rooftop area | `Rooftop_Area_sq_ft` | Rooftop Area (sq.ft) |
| Industry / business type | `Industry_Type` | Industry Type |
| Department / Institution | `Government_Name` | Government Name |
| Budget range | `Budget_Range` | Budget Range |
| Estimator system size (kW) | `Required_System_Size_KW` | Required System Capacity |
| (auto) Rooftop Solar | `Project_Type` | Project Type |
| (auto) Yes/No | `Subsidy` | Subsidy |
| Notes | `Description` | Note |
| (audit) UTM + URL + Form name etc. | `Feedback_Notes` | Description |

## Verified end-to-end
- B2C residential lead → "Leads - B2C" layout, all custom fields filled ✓
- B2B business lead → "Leads - B2B" layout, Industry_Type populated ✓
- Phone duplicates update Feedback_Notes instead of creating new lead ✓
- QuickEstimator no longer submits junk `phone=0000000000` leads ✓

## Recent Changes (2026-01)
- Removed dark navy stats strip ("13+ / 125+ MW…") from homepage
- Connected Zoho CRM (created Self Client app, exchanged auth code for refresh token)
- Rewrote `backend/zoho_lead.py` to map to actual Zoho custom field API names (Lead_Type, Project_Type, Monthly_Electricity_Bill, Required_System_Size_KW, Subsidy, Looking_for, Industry_Type, Government_Name, Rooftop_Area_sq_ft, Budget_Range, Layout)
- Replaced 3-step LeadForm with a single-step clearer form with segment-aware fields
- Removed misleading "Upload bill" UI (was non-functional)
- QuickEstimator now navigates to /contact with prefilled query params instead of creating dummy leads

## Backlog
- (P2) Allow real bill upload (Zoho `Upload_Electricity_Bill` file field) via multipart
- (P2) Pre-select country code +91 input
- (P3) Add "Government" picklist value to `Lead_Source` for cleaner reporting (currently mapped to "Online Store")
