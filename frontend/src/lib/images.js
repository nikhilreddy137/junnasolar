// Curated images: real Junna Solar case study photos + verified Unsplash fallbacks.
const u = (id, w = 1200, q = 72) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

// Real Junna Solar case study photos (sourced from admin.junnasolar.com/api/aboutpage)
const JUNNA_CDN = "https://admin.junnasolar.com";
export const JUNNA = {
  residential1: `${JUNNA_CDN}/upload/casestudy/1853293603183174.jpg`,  // Driving Residential Sustainability
  govt: `${JUNNA_CDN}/upload/casestudy/1842770865286623.png`,           // Khammam District Court 135 kWp
  institution: `${JUNNA_CDN}/upload/casestudy/1841511996621085.png`,    // Vasavi Hostel Musheerabad
  groundMount: `${JUNNA_CDN}/upload/casestudy/1840345298585367.jpg`,    // Textile manufacturing
  homeowner: `${JUNNA_CDN}/upload/casestudy/1840329143490839.jpg`,      // Homeowner success
  university: `${JUNNA_CDN}/upload/casestudy/1831573326423763.jpg`,     // Palamuru University
  society: `${JUNNA_CDN}/upload/casestudy/1831573237626146.jpg`,        // Housing Society
  residential4kw: `${JUNNA_CDN}/upload/casestudy/1831573119049473.jpg`, // 4 KW Seshagiri
  residentialAlt: `${JUNNA_CDN}/upload/casestudy/1831572914595679.jpg`, // Residential transformation
  storyline: `https://junnasolar.com/images/storyline.jpg`,
};

export const IMG = {
  // Hero: AI-generated Sunrun-inspired hero image
  heroPrimary: "/hero-primary.jpg",
  heroResidentialAlt: JUNNA.homeowner,
  rooftopResidential: JUNNA.residential1,
  industrial: JUNNA.groundMount,
  solarFarm: JUNNA.groundMount,
  panelsCloseup: JUNNA.residential4kw,
  panelsDetail: JUNNA.residentialAlt,
  factoryFloor: u("1521618755572-156ae0cdd74d", 1400),
  farmlandscape: u("1605000797499-95a51c5269ae", 1400),
  fallback: u("1581094288338-2314dddb7ece", 900),

  // Segment cards — use real Junna photos
  segmentHome: JUNNA.homeowner,
  segmentBusiness: JUNNA.groundMount,
  segmentSociety: JUNNA.society,

  // Case studies (real Junna installs)
  caseHome1: JUNNA.residential1,
  caseHome2: JUNNA.residential4kw,
  caseBusiness1: JUNNA.groundMount,
  caseBusiness2: JUNNA.groundMount,
  caseSociety: JUNNA.society,
  caseInstitution: JUNNA.institution,

  // Gallery — striking mix of real Junna projects
  gallery: [
    { src: JUNNA.residential1, caption: "Residential rooftop · Telangana" },
    { src: JUNNA.govt, caption: "District Court Khammam · 135 kWp" },
    { src: JUNNA.institution, caption: "Vasavi Hostel · Musheerabad" },
    { src: JUNNA.groundMount, caption: "Textile manufacturing · ground-mount" },
    { src: JUNNA.university, caption: "Palamuru University · institutional" },
    { src: JUNNA.society, caption: "Housing society · common-area solar" },
    { src: JUNNA.homeowner, caption: "Homeowner success story" },
    { src: JUNNA.residential4kw, caption: "4 kW residential · Seshagiri Rao" },
  ],

  aboutHero: u("1605000797499-95a51c5269ae", 1600, 75),
  visionImg: JUNNA.storyline,
  wide1: JUNNA.residential1,
  wide2: JUNNA.groundMount,
};

export const FALLBACK_BG = "linear-gradient(135deg, rgb(15 74 71 / 0.85), rgb(233 107 60 / 0.55))";
