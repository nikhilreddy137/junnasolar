import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Award, Factory, Zap, Shield, Sun } from "lucide-react";
import CTASection from "@/components/CTASection";
import { useSEO } from "@/lib/seo";

// ─── Data ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: "module", label: "Solar Module" },
  { id: "cell", label: "Solar Cell" },
  { id: "structure", label: "Mounting Structure" },
];

const MODULE_FEATURES = [
  "Good Quality and Superior Module Efficiency",
  "Sand and Dust Storm Resistant",
  "Positive Power Tolerance",
  "ISO 9001:2015 & 14001:2015 Quality Management System",
  "PID Resistant Modules",
  "Excellent Low Light Response",
  "Glass with Anti-Reflective Coating",
  "Current Annual Module Production Capacity of 30 MW+",
  "Salt Mist, Ammonia and Hail Resistant",
  "Extra Value to Customers, More Benefits",
  "Sustain Heavy Wind & Snow Loads (2400 Pa & 7500 Pa)",
  "25 Year Linear Performance Warranty",
  "IP 67 Rated Junction with MC4 Compatible Connectors",
  "Dedicated Customer Support by Technical Engineers",
];

const MONOPERC_PRODUCTS = [
  {
    id: 1,
    name: "VIKRAANTH SERIES",
    subtitle: "144 Cell",
    image: "/products/vikraanth-144.jpg",
    badge: "Best Seller",
    specs: [
      { label: "Cell Count", value: "144 Cells" },
      { label: "Technology", value: "MonoPerc" },
      { label: "Warranty", value: "25 Years" },
      { label: "Certification", value: "ALMM Approved" },
    ],
  },
  {
    id: 2,
    name: "VIKRAANTH SERIES",
    subtitle: "132 Cell",
    image: "/products/vikraanth-132.jpg",
    badge: null,
    specs: [
      { label: "Cell Count", value: "132 Cells" },
      { label: "Technology", value: "MonoPerc" },
      { label: "Warranty", value: "25 Years" },
      { label: "Certification", value: "ALMM Approved" },
    ],
  },
  {
    id: 3,
    name: "VIKRAANTH SERIES",
    subtitle: "120 Cell",
    image: "/products/vikraanth-120.jpg",
    badge: null,
    specs: [
      { label: "Cell Count", value: "120 Cells" },
      { label: "Technology", value: "MonoPerc" },
      { label: "Warranty", value: "25 Years" },
      { label: "Certification", value: "ALMM Approved" },
    ],
  },
];

const MANUFACTURE_IMAGES = [
  { id: 1, src: "/products/mf1.jpg", alt: "Manufacturing facility — module assembly line" },
  { id: 2, src: "/products/mf2.jpg", alt: "Manufacturing facility — quality control" },
  { id: 3, src: "/products/mf3.jpg", alt: "Manufacturing facility — cell processing" },
  { id: 4, src: "/products/mf4.jpg", alt: "Manufacturing facility — testing station" },
  { id: 5, src: "/products/mf5.jpg", alt: "Manufacturing facility — packaging" },
];

const CERT_IMAGES = [
  { id: 1, src: "/products/cert1.jpg", alt: "IEC 61215 Certification" },
  { id: 2, src: "/products/cert2.jpg", alt: "IEC 61730 Certification" },
  { id: 3, src: "/products/cert3.jpg", alt: "BIS Certification" },
  { id: 4, src: "/products/cert4.jpg", alt: "ALMM Certification" },
  { id: 5, src: "/products/cert5.jpg", alt: "ISO 9001 Certification" },
];

const STRUCTURE_PRODUCTS = [
  {
    id: 1,
    name: "Rooftop Mounting Structures",
    description:
      "Engineered for Indian rooftops — RCC, metal sheet, and tiled surfaces. Corrosion-resistant aluminium alloy frames with hot-dip galvanised steel hardware. Designed to withstand wind loads up to 200 km/h.",
    image: "/products/rooftop-mounting.png",
    features: [
      "Aluminium alloy 6005-T5 rails",
      "Hot-dip galvanised hardware",
      "Adjustable tilt angle 10°–35°",
      "Suitable for RCC, metal & tiled roofs",
      "25-year structural warranty",
    ],
  },
  {
    id: 2,
    name: "Mounting Structure for Pump Sets",
    description:
      "Purpose-built ground-mount and elevated structures for agricultural solar pump sets. Optimised tilt for maximum generation across Telangana, Andhra Pradesh, and pan-India installations.",
    image: "/products/pump-mounting.png",
    features: [
      "Fixed or adjustable tilt",
      "Suitable for 1 HP – 10 HP pump sets",
      "Corrosion-resistant finish",
      "Easy field installation",
      "Compatible with all major pump brands",
    ],
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const ProductCard = ({ product, accent }) => (
  <div
    className={`group rounded-[24px] overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
      accent ? "border-[var(--sr-navy)] ring-2 ring-[var(--sr-navy)]/20" : "border-[var(--sr-border)]"
    }`}
  >
    <div className="relative overflow-hidden aspect-[4/3] bg-[var(--sr-cream)]">
      <img
        src={product.image}
        alt={`${product.name} ${product.subtitle}`}
        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
      />
      {product.badge && (
        <span className="absolute top-3 left-3 bg-[var(--sr-navy)] text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
          {product.badge}
        </span>
      )}
    </div>
    <div className="p-5">
      <p className="text-[10px] uppercase tracking-widest text-[var(--sr-muted)] font-medium">MonoPerc Module</p>
      <h3 className="mt-1 text-lg font-semibold text-[var(--sr-navy)]">{product.name}</h3>
      <p className="text-sm text-[var(--sr-navy)] font-medium">{product.subtitle}</p>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {product.specs.map((s) => (
          <div key={s.label} className="rounded-xl bg-[var(--sr-cream)] px-3 py-2">
            <p className="text-[9px] uppercase tracking-widest text-[var(--sr-muted)]">{s.label}</p>
            <p className="mt-0.5 text-[12px] font-semibold text-[var(--sr-navy)]">{s.value}</p>
          </div>
        ))}
      </div>
      <Link
        to="/contact?action=enquire"
        className="mt-4 flex items-center justify-center gap-2 w-full rounded-full py-2.5 text-[13px] font-medium border border-[var(--sr-border)] text-[var(--sr-navy)] hover:bg-[var(--sr-navy)] hover:text-white hover:border-[var(--sr-navy)] transition-all duration-200"
      >
        Enquire now <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  </div>
);

// ─── Tab Sections ─────────────────────────────────────────────────────────────

const SolarModuleSection = () => (
  <div>
    {/* Hero intro */}
    <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-20">
      <div>
        <span className="eyebrow">Solar Modules</span>
        <h2 className="section-title mt-3">
          High-Efficiency Solar Modules:{" "}
          <span className="text-[var(--sr-navy)]">Powering India's Future</span>
        </h2>
        <p className="mt-4 text-[var(--sr-muted)] leading-relaxed">
          Experience quality and reliability with Junna Solar's MonoPerc and TopCon solar modules.
          ALMM approved and designed for long-lasting performance, our modules ensure efficient
          energy generation and better return on investment.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="chip bg-[var(--sr-navy)]/10 border-[var(--sr-navy)]/30 text-[var(--sr-navy)]">
            ALMM Approved
          </span>
          <span className="chip bg-[#E96B3C]/10 border-[#E96B3C]/30 text-[var(--sr-navy)]">
            BIS Certified
          </span>
          <span className="chip">25-Year Warranty</span>
          <span className="chip">Made in India</span>
        </div>
        <Link
          to="/contact?action=enquire"
          className="mt-6 btn-primary inline-flex"
        >
          Enquire about modules <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="rounded-[28px] overflow-hidden shadow-2xl">
        <img
          src="/products/solar-module-hero.jpg"
          alt="Junna Solar MonoPerc Module"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* MonoPerc Products */}
    <section className="py-12 lg:py-16">
      <div className="mb-10">
        <span className="eyebrow">MonoPerc Range</span>
        <h3 className="section-title mt-2">Explore Our Range of Premium MonoPerc Modules</h3>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MONOPERC_PRODUCTS.map((p, i) => (
          <ProductCard key={p.id} product={p} accent={i === 0} />
        ))}
      </div>
    </section>

    {/* TopCon Teaser */}
    <section className="py-10 lg:py-12">
      <div className="rounded-[28px] bg-gradient-to-br from-[var(--sr-navy)] to-[#2a3380] text-white p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="flex-1">
          <span className="inline-block text-[10px] uppercase tracking-widest font-semibold text-white/60 mb-2">
            TopCon Modules
          </span>
          <h3 className="text-2xl lg:text-3xl font-medium tracking-tight">Explore Our Range of Premium TopCon Modules</h3>
          <p className="mt-3 text-white/75 leading-relaxed max-w-xl">
            Next-generation N-type TopCon technology from our 650 MW factory. Higher efficiency,
            lower degradation, and superior performance in Indian heat conditions. Coming soon.
          </p>
        </div>
        <Link
          to="/contact?action=enquire"
          className="shrink-0 inline-flex items-center gap-2 rounded-full bg-white text-[var(--sr-navy)] px-6 py-3 text-sm font-semibold hover:bg-white/90 transition"
        >
          Get notified <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>

    {/* Module Features */}
    <section className="py-12 lg:py-16">
      <div className="mb-10">
        <span className="eyebrow">Module Features</span>
        <h3 className="section-title mt-2">Our Solar Modules: Engineered for Performance</h3>
        <p className="mt-3 text-[var(--sr-muted)] max-w-2xl">
          Our modules combine advanced technology, durable construction, and industry-leading
          efficiency to provide you with reliable and cost-effective solar energy.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {MODULE_FEATURES.map((f) => (
          <div
            key={f}
            className="flex items-start gap-3 rounded-2xl border border-[var(--sr-border)] bg-white p-4 hover:shadow-md transition"
          >
            <CheckCircle2 className="h-4 w-4 text-[var(--sr-navy)] mt-0.5 shrink-0" />
            <span className="text-sm text-[var(--sr-navy)]">{f}</span>
          </div>
        ))}
      </div>
    </section>

    {/* Manufacturing Facility */}
    <section className="py-12 lg:py-16">
      <div className="mb-8">
        <span className="eyebrow">Manufacturing Facility</span>
        <h3 className="section-title mt-2">Manufacturing Facility</h3>
        <p className="mt-3 text-[var(--sr-muted)] max-w-2xl">
          World class 750 MW+ solar module manufacturing capacity with N-type TOPCon &amp; P-type PERC.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {MANUFACTURE_IMAGES.map((img) => (
          <div
            key={img.id}
            className="rounded-[20px] overflow-hidden aspect-square bg-[var(--sr-cream)] hover:shadow-lg transition"
          >
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        ))}
      </div>
    </section>

    {/* Certificates */}
    <section className="py-12 lg:py-16">
      <div className="mb-8">
        <span className="eyebrow">Certifications</span>
        <h3 className="section-title mt-2">Meeting Global Standards</h3>
        <p className="mt-3 text-[var(--sr-muted)] max-w-2xl">
          Our solar modules meet the highest industry standards for quality, performance and safety.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {CERT_IMAGES.map((cert) => (
          <div
            key={cert.id}
            className="rounded-[20px] border border-[var(--sr-border)] bg-white p-4 flex items-center justify-center aspect-square hover:shadow-md transition"
          >
            <img src={cert.src} alt={cert.alt} className="max-h-full max-w-full object-contain" />
          </div>
        ))}
      </div>
    </section>
  </div>
);

const SolarCellSection = () => (
  <div>
    <div className="grid lg:grid-cols-2 gap-12 items-center py-16 lg:py-20">
      <div>
        <span className="eyebrow">Solar Cell</span>
        <h2 className="section-title mt-3">
          High-Performance Cells:{" "}
          <span className="text-[var(--sr-navy)]">Quality You Can Rely On</span>
        </h2>
        <p className="mt-4 text-[var(--sr-muted)] leading-relaxed">
          Junna Solar's advanced solar cell technology ensures high efficiency and reliable solar
          energy generation. We focus on research and development to deliver high-quality solar
          cell solutions in India.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="chip bg-[var(--sr-navy)]/10 border-[var(--sr-navy)]/30 text-[var(--sr-navy)]">
            High Efficiency
          </span>
          <span className="chip">R&amp;D Backed</span>
          <span className="chip">Made in India</span>
        </div>
        <Link
          to="/contact?action=enquire"
          className="mt-6 btn-primary inline-flex"
        >
          Enquire about cells <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="rounded-[28px] overflow-hidden shadow-2xl">
        <img
          src="/products/solar-cell-hero.jpg"
          alt="Junna Solar Cell"
          className="w-full h-full object-cover"
        />
      </div>
    </div>

    {/* Key advantages */}
    <section className="py-12 lg:py-16">
      <div className="mb-10">
        <span className="eyebrow">Cell Technology</span>
        <h3 className="section-title mt-2">Advanced Cell Technology for Maximum Output</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { icon: Zap, title: "High Conversion Efficiency", desc: "Advanced cell architecture maximises photon capture and electron flow for superior energy output per square metre." },
          { icon: Shield, title: "Durability & Reliability", desc: "Engineered to withstand India's extreme heat, humidity, and monsoon conditions with minimal degradation over 25+ years." },
          { icon: Sun, title: "Low Light Performance", desc: "Excellent response in diffuse light conditions — generates meaningful power even on overcast Indian monsoon days." },
          { icon: Award, title: "ALMM & BIS Certified", desc: "Fully compliant with India's Approved List of Models and Manufacturers (ALMM) and Bureau of Indian Standards (BIS)." },
          { icon: Factory, title: "In-House Manufacturing", desc: "Cells produced in our own 650 MW+ facility near Hyderabad — no third-party supply chain risk." },
          { icon: CheckCircle2, title: "25-Year Warranty", desc: "Industry-leading linear performance warranty backed by Junna Solar's in-house service and support team." },
        ].map((item) => (
          <div key={item.title} className="card-js hover:shadow-lg transition-shadow">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--sr-navy)]/10 text-[var(--sr-navy)]">
              <item.icon className="h-5 w-5" />
            </span>
            <h4 className="mt-4 font-semibold text-[var(--sr-navy)]">{item.title}</h4>
            <p className="mt-2 text-sm text-[var(--sr-muted)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA banner */}
    <section className="py-10">
      <div className="rounded-[28px] bg-[var(--sr-cream)] border border-[var(--sr-border)] p-8 lg:p-12 flex flex-col lg:flex-row items-start lg:items-center gap-6">
        <div className="flex-1">
          <h3 className="text-xl lg:text-2xl font-semibold">Interested in bulk cell procurement?</h3>
          <p className="mt-2 text-[var(--sr-muted)]">
            We supply solar cells to module manufacturers and EPC contractors across India.
            Get in touch for pricing and availability.
          </p>
        </div>
        <Link
          to="/contact?action=enquire"
          className="shrink-0 btn-primary"
        >
          Contact our sales team <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  </div>
);

const MountingStructureSection = () => (
  <div>
    <div className="py-16 lg:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="eyebrow">Mounting Structures</span>
        <h2 className="section-title mt-3">
          High-Quality Solar Mounting Structures:{" "}
          <span className="text-[var(--sr-navy)]">Tailored to Need</span>
        </h2>
        <p className="mt-4 text-[var(--sr-muted)] leading-relaxed">
          Choose durable solar mounting structures designed to withstand harsh weather conditions
          and provide long-lasting support for solar panels. Junna Solar offers high-quality
          mounting structures for reliable solar installations in India.
        </p>
      </div>

      {/* Structure products */}
      <div className="grid lg:grid-cols-2 gap-8">
        {STRUCTURE_PRODUCTS.map((product, i) => (
          <div
            key={product.id}
            className={`rounded-[28px] overflow-hidden border bg-white shadow-sm hover:shadow-xl transition-all duration-300 ${
              i === 0 ? "border-[var(--sr-navy)] ring-2 ring-[var(--sr-navy)]/20" : "border-[var(--sr-border)]"
            }`}
          >
            <div className="relative overflow-hidden aspect-video bg-[var(--sr-cream)]">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-500"
              />
              {i === 0 && (
                <span className="absolute top-3 left-3 bg-[var(--sr-navy)] text-white text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  Most Popular
                </span>
              )}
            </div>
            <div className="p-6 lg:p-8">
              <h3 className="text-xl font-semibold text-[var(--sr-navy)]">{product.name}</h3>
              <p className="mt-3 text-sm text-[var(--sr-muted)] leading-relaxed">{product.description}</p>
              <ul className="mt-5 grid gap-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-[var(--sr-navy)] mt-0.5 shrink-0" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/contact?action=enquire"
                className="mt-6 flex items-center justify-center gap-2 w-full rounded-full py-3 text-[13px] font-semibold bg-[var(--sr-navy)] text-white hover:bg-[var(--sr-navy)]/90 transition"
              >
                Enquire now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Why our structures */}
    <section className="py-12 lg:py-16">
      <div className="mb-10">
        <span className="eyebrow">Why Junna Structures</span>
        <h3 className="section-title mt-2">Built for India's Conditions</h3>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { icon: Shield, title: "Corrosion Resistant", desc: "Aluminium alloy and hot-dip galvanised steel components resist India's coastal, agricultural, and urban environments." },
          { icon: Zap, title: "Easy Installation", desc: "Pre-engineered components with clear installation guides. Reduces on-site labour time significantly." },
          { icon: Award, title: "Structural Warranty", desc: "25-year structural warranty covering material defects and workmanship." },
          { icon: CheckCircle2, title: "Custom Engineering", desc: "Structures engineered for your specific roof type, load requirements, and tilt angle." },
        ].map((item) => (
          <div key={item.title} className="card-js hover:shadow-lg transition-shadow">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--sr-navy)]/10 text-[var(--sr-navy)]">
              <item.icon className="h-5 w-5" />
            </span>
            <h4 className="mt-4 font-semibold">{item.title}</h4>
            <p className="mt-2 text-sm text-[var(--sr-muted)] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Products() {
  const [activeTab, setActiveTab] = useState("module");

  useSEO({
    title: "Solar Products — Modules, Cells & Mounting Structures | Junna Solar",
    description:
      "High-quality solar modules (MonoPerc & TopCon), solar cells, and mounting structures made in India. ALMM approved, BIS certified, 25-year warranty.",
    path: "/products",
  });

  return (
    <>
      {/* ── Revamped Hero Header ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <img
            src="/products/hero-bg.jpg"
            alt="Junna Solar manufacturing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--sr-navy)]/90 via-[var(--sr-navy)]/70 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container-js py-20 lg:py-28">
          <div className="max-w-2xl">
            <span className="inline-block text-[11px] uppercase tracking-widest font-semibold text-white/60 mb-4">
              Made in India · 650 MW Factory
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              High-Quality Solar{" "}
              <span className="text-[var(--sr-navy)]">Modules, Cells</span>{" "}
              &amp; Structures
            </h1>
            <p className="mt-5 text-lg text-white/75 leading-relaxed max-w-xl">
              Durable, high-performance solar products built to withstand India's diverse
              conditions. ALMM approved, BIS certified, and backed by a 25-year warranty.
            </p>

            {/* Stats strip */}
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { value: "650 MW", label: "Factory Capacity" },
                { value: "25 Yrs", label: "Performance Warranty" },
                { value: "ALMM", label: "Approved" },
                { value: "BIS", label: "Certified" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold text-white">{s.value}</p>
                  <p className="text-[11px] uppercase tracking-widest text-white/50">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact?action=enquire" className="btn-primary">
                Enquire now <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact?action=survey"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white border border-white/30 hover:bg-white/10 transition"
              >
                Book free site visit
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Tab Navigation ───────────────────────────────────────────────── */}
      <div className="sticky top-[64px] lg:top-[80px] z-30 bg-[var(--sr-card-bg)]/95 backdrop-blur border-b border-[var(--sr-border)]">
        <div className="container-js">
          <div className="flex overflow-x-auto scrollbar-none">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative shrink-0 px-6 py-4 text-[13px] font-medium transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-[var(--sr-navy)]"
                    : "text-[var(--sr-muted)] hover:text-[var(--sr-navy)]"
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full bg-[var(--sr-navy)]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Tab Content ──────────────────────────────────────────────────── */}
      <div className="container-js">
        {activeTab === "module" && <SolarModuleSection />}
        {activeTab === "cell" && <SolarCellSection />}
        {activeTab === "structure" && <MountingStructureSection />}
      </div>

      <CTASection />
    </>
  );
}
