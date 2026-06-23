# Junna Solar — PRD

## Problem Statement
Clone the public repo https://github.com/nikhilreddy137/junnasolar into the workspace and run/set it up.

## Architecture
- Frontend: React 19 + CRACO + Tailwind (craco start on :3000)
- Backend: FastAPI + Motor (MongoDB) on :8001, all routes prefixed `/api`
- DB: MongoDB (MONGO_URL/DB_NAME from .env)
- Integrations: Zoho CRM (Leads module) via `backend/zoho_lead.py` — needs ZOHO_CLIENT_ID / ZOHO_CLIENT_SECRET / ZOHO_REFRESH_TOKEN env vars (not configured locally; endpoint returns 503 until set).

## Pages / Routes
Home, About, Residential/Homes, Commercial/Businesses, Communities/Societies, CaseStudies, Trust, Contact, Products. Legacy `.php` paths redirected.

## Backend Endpoints
- GET  /api/                     → health
- POST /api/leads, GET /api/leads
- POST /api/estimate             → indicative solar savings calc
- GET  /api/board?group=board|core (seeded on startup)
- POST /api/zoho/lead            → forwards to Zoho CRM (requires creds)

## What's Implemented (2026-01)
- Cloned repo into /app, preserved .env and node_modules
- `yarn install` + `pip install -r requirements.txt` completed
- Supervisor restarted; backend + frontend RUNNING
- Verified: home page renders, `/api/`, `/api/estimate`, `/api/board` respond OK
- Board members auto-seeded on startup (8 members)

## Backlog / Next Actions
- (P1) Configure Zoho CRM credentials in backend/.env to enable lead submission to CRM
- (P2) Run full E2E testing on lead form, estimator, and all nav pages
- (P2) SEO: confirm sitemap.xml + robots.txt served from public/
