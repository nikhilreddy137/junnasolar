// Curated, verified images:
//  - JUNNA: real Junna Solar case-study photos (admin.junnasolar.com) — guaranteed to be solar.
//  - STOCK: only Unsplash photo IDs that have been MANUALLY VERIFIED to show solar.
//
// Why we lean on Junna's CDN: random Unsplash IDs are unreliable — many of the
// solar-looking IDs in the wild actually return wind turbines, farm workers,
// or unrelated objects. Junna's own installation photos are real solar and
// add brand credibility. They're served at full original resolution.
const u = (id, w = 2400, q = 90) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;

const JUNNA_CDN = "https://admin.junnasolar.com";

// Real Junna Solar installations (verified solar, hi-res).
export const JUNNA = {
  residential1:    `${JUNNA_CDN}/upload/casestudy/1853293603183174.jpg`, // Driving Residential Sustainability
  govt:            `${JUNNA_CDN}/upload/casestudy/1842770865286623.png`, // Khammam District Court 135 kWp
  institution:     `${JUNNA_CDN}/upload/casestudy/1841511996621085.png`, // Vasavi Hostel Musheerabad
  groundMount:     `${JUNNA_CDN}/upload/casestudy/1840345298585367.jpg`, // Textile manufacturing
  homeowner:       `${JUNNA_CDN}/upload/casestudy/1840329143490839.jpg`, // Homeowner success
  university:      `${JUNNA_CDN}/upload/casestudy/1831573326423763.jpg`, // Palamuru University
  society:         `${JUNNA_CDN}/upload/casestudy/1831573237626146.jpg`, // Housing Society
  residential4kw:  `${JUNNA_CDN}/upload/casestudy/1831573119049473.jpg`, // 4 KW Seshagiri
  residentialAlt:  `${JUNNA_CDN}/upload/casestudy/1831572914595679.jpg`, // Residential transformation
  storyline:       `https://junnasolar.com/images/storyline.jpg`,
};

// Verified Unsplash solar photos — actually checked to show solar PV.
const STOCK = {
  solarFarm:        u("1509391366360-2e959784a276", 2400, 90), // verified: solar farm w/ rows of PV panels
};

export const IMG = {
  // ─── Hero (homepage) — real Junna residential install + the cleanest solar farm.
  // We use a JUNNA install on the homepage so visitors immediately see real work.
  heroPrimary: JUNNA.residential1,

  // ─── Page-specific heroes — real Junna projects matching each segment ───
  heroHomes:     JUNNA.homeowner,
  heroBusiness:  JUNNA.groundMount,
  heroSocieties: JUNNA.society,
  heroTrust:     JUNNA.institution,
  heroAbout:     JUNNA.university,

  // ─── Generic semantic aliases ───
  heroResidentialAlt: JUNNA.homeowner,
  rooftopResidential: JUNNA.residential1,
  industrial:         JUNNA.groundMount,
  solarFarm:          JUNNA.groundMount,   // ground-mount textile site (real)
  panelsCloseup:      STOCK.solarFarm,     // verified PV close-up (Unsplash)
  panelsDetail:       JUNNA.residential4kw,
  factoryFloor:       JUNNA.groundMount,
  farmlandscape:      JUNNA.university,    // institutional landscape
  installer:          JUNNA.residentialAlt,
  fallback:           STOCK.solarFarm,

  // ─── Segment cards — real Junna installs ───
  segmentHome:     JUNNA.homeowner,
  segmentBusiness: JUNNA.groundMount,
  segmentSociety:  JUNNA.society,

  // ─── Case studies — real Junna installs ───
  caseHome1:       JUNNA.residential1,
  caseHome2:       JUNNA.residential4kw,
  caseBusiness1:   JUNNA.groundMount,
  caseBusiness2:   JUNNA.groundMount,
  caseSociety:     JUNNA.society,
  caseInstitution: JUNNA.institution,

  // ─── Showreel / gallery — real Junna projects ───
  gallery: [
    { src: JUNNA.residential1,   caption: "Residential rooftop · Telangana" },
    { src: JUNNA.govt,           caption: "District Court Khammam · 135 kWp" },
    { src: JUNNA.institution,    caption: "Vasavi Hostel · Musheerabad" },
    { src: JUNNA.groundMount,    caption: "Textile manufacturing · ground-mount" },
    { src: JUNNA.university,     caption: "Palamuru University · institutional" },
    { src: JUNNA.society,        caption: "Housing society · common-area solar" },
    { src: JUNNA.homeowner,      caption: "Homeowner success story" },
    { src: JUNNA.residential4kw, caption: "4 kW residential · Seshagiri Rao" },
  ],

  // ─── About page ───
  aboutHero: JUNNA.residential1,
  visionImg: JUNNA.storyline,
  wide1:     JUNNA.residential1,
  wide2:     JUNNA.groundMount,
};

export const FALLBACK_BG = "linear-gradient(135deg, rgb(15 74 71 / 0.85), rgb(233 107 60 / 0.55))";
