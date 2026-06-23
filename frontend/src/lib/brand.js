// Junna Solar brand — real verified data sourced from junnasolar.com & public records.
export const BRAND = {
  name: "Junna Solar",
  legalName: "Junna Solar Systems Limited",
  tagline: "Solar for homes and businesses, designed, installed, and supported by Junna Solar",

  // Founder / leadership
  founderName: "Junna Shekar Reddy",
  founderRole: "Chairman & Managing Director",
  founderYear: 2012,

  // Primary phones
  phoneToll: "1800 890 6987",
  phoneTollHref: "tel:18008906987",
  phoneMobile: "+91 63093 95555",
  phoneMobileHref: "tel:+916309395555",

  // Legacy aliases (kept for components that import .phone / .phoneHref)
  phone: "1800 890 6987",
  phoneHref: "tel:18008906987",

  // Emails
  email: "info@junnasolar.com",
  emailMarketing: "marketing@junnasolar.com",

  // WhatsApp (uses mobile)
  whatsappNumber: "916309395555",
  whatsappMessage: "Hi Junna Solar, I'd like to know more about rooftop solar for my property.",

  // Offices
  offices: [
    {
      label: "Head Office",
      city: "Hyderabad",
      addr: "Survey No. 477, Plot No. 17 & 18, Vignanapuri Colony, IDA Ext., Prasanthi Nagar, Kukatpally, Hyderabad — 500072",
      mapQuery: "Junna Solar Kukatpally Hyderabad",
    },
    {
      label: "Corporate Office",
      city: "Hyderabad",
      addr: "T-Hub 2.0, Knowledge City, Inorbit Mall Road, Vittal Rao Nagar, Madhapur, Hyderabad — 500081",
      mapQuery: "T-Hub 2.0 Madhapur Hyderabad",
    },
    {
      label: "Manufacturing Plant",
      city: "Chandanvelly",
      addr: "Plot No. 8/B, Chandanvelly, Hayatabad Village, Hyderabad",
      sub: "650 MW Fully Automated TopCon Module Plant",
      mapQuery: "Chandanvelly Hyderabad",
    },
  ],

  // Single-line address for footer / SEO fallback
  address: "Survey No. 477, Vignanapuri Colony, Kukatpally, Hyderabad — 500072",

  // Reach
  serviceAreas: [
    "Telangana", "Andhra Pradesh", "Karnataka", "Maharashtra",
    "Tamil Nadu", "Kerala", "Assam", "Gujarat", "Madhya Pradesh", "Odisha",
  ],

  // Real verified statistics
  stats: {
    founded: 2012,
    yearsExperience: "13+",
    portfolioMW: "125+ MW",
    factoryMW: "650 MW",
    cellPipelineMW: "500 MW",
    dealers: "50+",
    states: "10+",
    assamMoU: "8 GW",
    assamInvestment: "₹2,500 Cr",
  },

  // Leadership
  leadership: [
    { name: "Junna Shekar Reddy", role: "Chairman & Managing Director", note: "Founded Junna Solar in 2012 to solve real energy challenges he saw in his own farming community." },
    { name: "Anil Babu Bhimavarapu", role: "CEO & Director", note: "Leads end-to-end EPC delivery, manufacturing scale-up and customer experience." },
    { name: "Narendar Reddy Iduala", role: "Director", note: "Oversees strategy, partnerships and Junna's pan-India dealer network." },
  ],

  // Approvals / accreditations
  approvals: ["BIS", "MNRE", "TSREDCO", "NREDCAP"],
};

export const WHATSAPP_URL = `https://wa.me/${BRAND.whatsappNumber}?text=${encodeURIComponent(BRAND.whatsappMessage)}`;

export const SEGMENTS = [
  { value: "home", label: "Home" },
  { value: "business", label: "Business" },
  { value: "society", label: "Housing Society" },
  { value: "institution", label: "Institution" },
];
