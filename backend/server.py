from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional, Any, Dict
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Junna Solar API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


# ---------- Models ----------
class LeadCreate(BaseModel):
    model_config = ConfigDict(extra="ignore")
    segment: str
    city: str
    monthly_bill: Optional[str] = None
    property_type: Optional[str] = None
    name: str
    phone: str
    email: Optional[EmailStr] = None
    notes: Optional[str] = None
    preferred_callback: Optional[str] = None
    source_page: Optional[str] = "home"


class Lead(LeadCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"


class EstimateRequest(BaseModel):
    segment: str = "home"
    monthly_bill: float


class EstimateResponse(BaseModel):
    system_size_kw_min: float
    system_size_kw_max: float
    monthly_savings_min: int
    monthly_savings_max: int
    annual_savings_min: int
    annual_savings_max: int
    subsidy_eligible: bool
    subsidy_note: str
    indicative: bool = True


class BoardMember(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    group: str  # "board" | "core"
    bio: Optional[str] = None
    initials: Optional[str] = None
    image_url: Optional[str] = None
    linkedin: Optional[str] = None
    order: int = 100


# ---------- Seed Board Members (real data sourced from admin.junnasolar.com/api/aboutpage) ----------
JUNNA_CDN = "https://admin.junnasolar.com"
BOARD_SEED = [
    # The Board (top leadership)
    {
        "name": "Junna Shekar Reddy",
        "role": "Chairman & Managing Director",
        "group": "board",
        "bio": "Founded Junna Solar in 2012 to solve the energy challenges he saw in his own farming community. Drives strategic direction and Junna's mission to make quality solar accessible across India.",
        "initials": "JS",
        "image_url": f"{JUNNA_CDN}/upload/board/1832298001687234.jpg",
        "linkedin": "https://www.linkedin.com/in/shekar-reddy-junna-0b9a6534b/",
        "order": 1,
    },
    {
        "name": "B. Anil Babu",
        "role": "CEO & Director",
        "group": "board",
        "bio": "Leads end-to-end EPC delivery, manufacturing scale-up, and customer experience across residential, C&I and institutional segments.",
        "initials": "AB",
        "image_url": f"{JUNNA_CDN}/upload/board/1860163188791977.png",
        "linkedin": "https://www.linkedin.com/in/anilb",
        "order": 2,
    },
    {
        "name": "Junna Basvi Reddy",
        "role": "Director",
        "group": "board",
        "bio": "Provides oversight and counsel on long-term strategy, governance and Junna's expansion across India.",
        "initials": "BR",
        "image_url": f"{JUNNA_CDN}/upload/board/1832297874831533.jpg",
        "linkedin": None,
        "order": 3,
    },
    # Core personnel
    {
        "name": "Narendar Reddy Idula",
        "role": "Executive Director",
        "group": "core",
        "bio": "Oversees execution, partnerships and Junna's pan-India operations network.",
        "initials": "NR",
        "image_url": f"{JUNNA_CDN}/upload/board/1832298794200105.jpg",
        "linkedin": None,
        "order": 10,
    },
    {
        "name": "Chandrashekar B",
        "role": "Senior Vice President — Projects",
        "group": "core",
        "bio": "Senior VP heading Commercial & Industrial project delivery across factories, offices, hospitals and ground-mount solar.",
        "initials": "CB",
        "image_url": f"{JUNNA_CDN}/upload/board/1832298862232826.jpg",
        "linkedin": "https://www.linkedin.com/in/chandrashekar-bhonagiri-313621100/",
        "order": 11,
    },
    {
        "name": "G. Suresh Kumar",
        "role": "Vice President — Projects",
        "group": "core",
        "bio": "Leads residential rooftop project delivery, subsidy guidance and customer success.",
        "initials": "SK",
        "image_url": f"{JUNNA_CDN}/upload/board/1832299053734857.jpg",
        "linkedin": "https://www.linkedin.com/in/g-suresh-kumar-39206255/",
        "order": 12,
    },
    {
        "name": "CA. Rajeswari Potla",
        "role": "Finance Head",
        "group": "core",
        "bio": "Chartered Accountant leading finance, compliance and investor relations as Junna scales nationally.",
        "initials": "RP",
        "image_url": f"{JUNNA_CDN}/upload/board/1832299123095413.jpg",
        "linkedin": "https://www.linkedin.com/in/ca-rajeswari-potla-3130b5213/",
        "order": 13,
    },
    {
        "name": "Junna Manoj Reddy",
        "role": "Production Head",
        "group": "core",
        "bio": "Runs the 650 MW TopCon module manufacturing facility — quality, throughput and on-time delivery.",
        "initials": "MR",
        "image_url": f"{JUNNA_CDN}/upload/board/1832299187328661.jpg",
        "linkedin": "https://www.linkedin.com/in/manojreddyjunna/",
        "order": 14,
    },
]


async def seed_board():
    """Idempotently seed board members. Insert any missing; update existing by name."""
    # Remove any old seed entries (names that aren't in current real data)
    current_names = [m["name"] for m in BOARD_SEED]
    await db.board_members.delete_many({"name": {"$nin": current_names}})
    for m in BOARD_SEED:
        existing = await db.board_members.find_one({"name": m["name"]})
        if existing:
            await db.board_members.update_one(
                {"name": m["name"]},
                {"$set": {k: v for k, v in m.items() if k != "name"}},
            )
        else:
            doc = BoardMember(**m).model_dump()
            await db.board_members.insert_one(doc)
    count = await db.board_members.count_documents({})
    logger.info(f"Board members seed: {count} total in DB")


@app.on_event("startup")
async def on_startup():
    await seed_board()


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"service": "Junna Solar API", "status": "ok"}


@api_router.post("/leads", response_model=Lead, status_code=201)
async def create_lead(payload: LeadCreate):
    lead = Lead(**payload.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    await db.leads.insert_one(doc)
    logger.info(f"Lead created: {lead.id} segment={lead.segment} city={lead.city}")
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    docs = await db.leads.find({}, {"_id": 0}).sort("created_at", -1).to_list(limit)
    for d in docs:
        if isinstance(d.get('created_at'), str):
            try:
                d['created_at'] = datetime.fromisoformat(d['created_at'])
            except Exception:
                d['created_at'] = datetime.now(timezone.utc)
    return docs


@api_router.post("/estimate", response_model=EstimateResponse)
async def estimate(payload: EstimateRequest):
    bill = max(0.0, float(payload.monthly_bill or 0))
    if bill <= 0:
        raise HTTPException(status_code=400, detail="monthly_bill must be > 0")

    units = bill / 8.0
    kw_mid = max(1.0, units / 120.0)
    kw_min = round(kw_mid * 0.85, 1)
    kw_max = round(kw_mid * 1.15, 1)

    save_min = int(bill * 0.70)
    save_max = int(bill * 0.90)

    subsidy_eligible = payload.segment.lower() == "home" and kw_mid <= 10
    subsidy_note = (
        "Residential rooftop solar may be eligible for government subsidy under current schemes (subject to eligibility). Junna will help guide the process."
        if subsidy_eligible
        else "Commercial/industrial users are not covered under residential subsidy schemes. Junna can prepare an ROI/payback proposal."
    )

    return EstimateResponse(
        system_size_kw_min=kw_min,
        system_size_kw_max=kw_max,
        monthly_savings_min=save_min,
        monthly_savings_max=save_max,
        annual_savings_min=save_min * 12,
        annual_savings_max=save_max * 12,
        subsidy_eligible=subsidy_eligible,
        subsidy_note=subsidy_note,
        indicative=True,
    )


@api_router.get("/board", response_model=List[BoardMember])
async def list_board(group: Optional[str] = None):
    """Get board members from DB, optionally filtered by group (board|core)."""
    query = {}
    if group:
        query["group"] = group
    docs = await db.board_members.find(query, {"_id": 0}).sort("order", 1).to_list(50)
    return docs


# ---------- Zoho CRM Lead endpoint ----------
class ZohoLeadPayload(BaseModel):
    model_config = ConfigDict(extra="allow")
    # Required by spec
    phone: str
    # Standard fields
    source: Optional[str] = "Junna Solar Website"
    formName: Optional[str] = None
    pageSource: Optional[str] = None
    enquiryType: Optional[str] = None
    firstName: Optional[str] = None
    lastName: Optional[str] = None
    fullName: Optional[str] = None
    email: Optional[str] = None
    cityOrPincode: Optional[str] = None
    installationLocation: Optional[str] = None
    monthlyBill: Optional[str] = None
    propertyType: Optional[str] = None
    companyName: Optional[str] = None
    societyName: Optional[str] = None
    institutionName: Optional[str] = None
    sanctionedLoadKw: Optional[str] = None
    roofType: Optional[str] = None
    roofArea: Optional[str] = None
    numberOfFlats: Optional[str] = None
    preferredVisitDate: Optional[str] = None
    estimatedSystemSize: Optional[str] = None
    estimatedMonthlySavings: Optional[str] = None
    estimatedAnnualSavings: Optional[str] = None
    estimatedPayback: Optional[str] = None
    message: Optional[str] = None
    currentPageUrl: Optional[str] = None
    referrerUrl: Optional[str] = None
    submittedAt: Optional[str] = None
    utmSource: Optional[str] = None
    utmMedium: Optional[str] = None
    utmCampaign: Optional[str] = None
    utmTerm: Optional[str] = None
    utmContent: Optional[str] = None


@api_router.post("/zoho/lead", status_code=201)
async def create_zoho_lead_endpoint(payload: ZohoLeadPayload):
    """
    Receive a lead payload from the frontend and create/update a Lead in Zoho CRM.
    Credentials are read server-side from environment variables — never exposed to frontend.
    """
    from zoho_lead import create_zoho_lead
    import asyncio

    phone_digits = "".join(c for c in (payload.phone or "") if c.isdigit())
    if len(phone_digits) < 10:
        raise HTTPException(status_code=422, detail="A valid 10-digit phone number is required.")

    lead_data = payload.model_dump()

    try:
        result = await asyncio.get_event_loop().run_in_executor(
            None, create_zoho_lead, lead_data
        )
        logger.info(f"Zoho lead endpoint success: {result}")
        return {
            "success": True,
            "message": "Thank you. Your request has been received. Junna Solar team will contact you shortly.",
            "action": result.get("action"),
        }
    except ValueError as ve:
        # Credentials not configured
        logger.error(f"Zoho config error: {ve}")
        raise HTTPException(status_code=503, detail="CRM service not configured.")
    except Exception as exc:
        # Log full error server-side, return friendly message to frontend
        logger.error(f"Zoho lead creation error: {exc}", exc_info=True)
        # Still return 201 so frontend shows success message per spec
        return {
            "success": False,
            "message": "Thank you. Your request has been received. Our team will contact you shortly.",
            "action": "error_logged",
        }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
