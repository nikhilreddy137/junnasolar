# Junna Solar — PRD

## Problem
Clone & run https://github.com/nikhilreddy137/junnasolar. Unify all website forms into a single, consistent lead-capture component mapped correctly to Zoho CRM custom fields.

## Architecture
- Frontend: React 19 + CRACO + Tailwind (port 3000)
- Backend: FastAPI + Motor (Mongo) on port 8001 (all `/api` routes)
- Integration: Zoho CRM Leads (Indian DC), creds in `backend/.env`

## ONE Unified Form (LeadForm.jsx)
The same `<LeadForm>` component is now used everywhere:

| Page | Default segment | Notes |
|---|---|---|
| `/contact` | from URL `?segment=` | Main contact page |
| `/homes`, `/residential` | home | Used inside SavingsEstimator after calc |
| `/commercial`, `/businesses` | business | |
| `/communities`, `/societies` | society | Newly added |
| `/` (homepage) | home | Inside SavingsEstimator after calc; QuickEstimator routes to /contact |

`<CTASection>` on About / Products / CaseStudies / Trust links to `/contact?action=survey` → same LeadForm.

## SavingsEstimator (Calculator + LeadForm)
- Pure calculator: pick segment + enter bill → see indicative monthly/annual savings, system size, payback.
- After calculation, the unified `<LeadForm>` appears beneath, prefilled with bill, segment & system size.

## Zoho CRM mapping (verified)
| Form input | Zoho field |
|---|---|
| Segment | `Lead_Type` (B2C/B2B/B2G) + `Layout` (B2C `…167` / B2B `…027`) |
| Name | `First_Name` + `Last_Name` |
| Phone | `Phone` + `Mobile` |
| Email | `Email` |
| City | `City`, `Site_Address` |
| Monthly bill | `Monthly_Electricity_Bill` |
| Property type / segment summary | `Looking_for` (Requirements) |
| Rooftop area | `Rooftop_Area_sq_ft` |
| Industry / Govt name | `Industry_Type` / `Government_Name` |
| Budget range | `Budget_Range` |
| Estimator kW | `Required_System_Size_KW` |
| Auto | `Project_Type=Rooftop Solar`, `Lead_Source=Online Store`, `Lead_Status=Not Contacted`, `Subsidy=Yes/No` |
| Notes | `Description` |
| Audit (UTM, page, etc.) | `Feedback_Notes` |

Duplicates on Phone/Email update the existing lead's audit notes instead of creating new.

## Verified end-to-end
- B2C residential lead → Leads-B2C layout with all custom fields populated ✓
- B2B business lead → Leads-B2B layout with `Industry_Type`, `Company`, etc. ✓
- B2G government → Leads-B2C layout with `Lead_Type=B2G`, `Government_Name` set ✓
- Society → Leads-B2C layout ✓

## Backlog
- P2: Real PDF/image upload (Zoho `Upload_Electricity_Bill` field)
- P3: Add "Junna Website" to Lead_Source picklist in Zoho
- P3: WhatsApp auto-receipt on lead submission

## Hero & Image System (2026-01)
- Replaced unreliable Unsplash IDs (some returned wind turbines, farm workers, even sneakers!) with **real Junna Solar case-study photos** from `admin.junnasolar.com` for every page hero.
- Fixed `Hero.jsx` to actually honour props (was hardcoded to show homepage hero on every page). Now accepts `eyebrow`, `title`, `subtitle`, `imageUrl`, `showStats`, primary/secondary/whatsapp CTAs.
- Strengthened gradient overlay (94% → 20% navy from left to right) so the H1 always reads clearly regardless of image content.
- Image quality bumped to `w=2400&q=90` everywhere; `fetchpriority=high` & `loading=eager` on the hero.

| Page | Hero image | Source |
|---|---|---|
| `/` | Residential install w/ homeowners | JUNNA case study |
| `/businesses` | Textile ground-mount aerial | JUNNA case study |
| `/societies` | Society install with people | JUNNA case study |
| `/homes` | Custom layout (existing) | JUNNA case study |
| `/contact`, `/about`, `/trust` | Various | JUNNA case studies |
