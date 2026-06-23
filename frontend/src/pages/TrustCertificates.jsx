import TrustStrip from "@/components/TrustStrip";
import Certificates from "@/components/Certificates";
import CTASection from "@/components/CTASection";
import { useSEO, ORG_JSONLD } from "@/lib/seo";
import { Star, ShieldCheck, Wrench, Headphones, Factory, MapPin } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { IMG } from "@/lib/images";

const REVIEWS = [
  { name: "Mr. Reddy", role: "Homeowner, Hyderabad", text: "Survey was honest about what would and wouldn't work. Installation crew was clean. Bills dropped significantly from month one." },
  { name: "Sunrise Residency", role: "Housing society, Bengaluru", text: "Junna's team patiently walked our committee through the proposal. The dashboard makes it easy to track monthly savings." },
  { name: "Director, Cold-chain Pune", role: "C&I customer", text: "Their EPC was on time. SCADA monitoring is helpful. AMC has been responsive when we needed it." },
];

const REACH_HIGHLIGHTS = [
  { k: BRAND.stats.portfolioMW, v: "On-grid + off-grid portfolio" },
  { k: BRAND.stats.factoryMW, v: "TopCon module factory · Hyderabad" },
  { k: BRAND.stats.cellPipelineMW, v: "Solar cell line · pipeline 2026" },
  { k: BRAND.stats.assamMoU, v: "Assam integrated plant · MoU" },
  { k: BRAND.stats.assamInvestment, v: "Planned investment · Assam" },
  { k: `${BRAND.stats.dealers} · ${BRAND.stats.states} states`, v: "Dealer network · pan-India" },
];

export default function TrustCertificates() {
  useSEO({
    title: "About & Trust — Junna Solar | Founder, Reach, Certificates",
    description: "Junna Solar — founded 2012 by Junna Shekar Reddy. 13+ years, 125+ MW deployed, 650 MW TopCon factory, 50+ dealers across 10+ states. View leadership, reach and certificates.",
    path: "/trust",
    jsonLd: ORG_JSONLD,
  });

  return (
    <>
      {/* Hero */}
      <section className="relative bg-dusk">
        <div className="container-js relative pt-14 pb-12 lg:pt-24 lg:pb-20">
          <span className="eyebrow">About · Trust · Certificates</span>
          <h1 className="mt-4 serif-display text-[44px] sm:text-6xl lg:text-[76px] leading-[1.0] font-medium tracking-tight max-w-4xl">
            Built by farmers&apos; sons.<br />
            <span className="text-[rgb(var(--js-primary))]">Engineered</span> like a 25-year promise.
          </h1>
          <p className="mt-6 max-w-2xl text-[rgb(var(--js-muted))] text-base sm:text-lg">
            Junna Solar Systems was founded in <strong className="text-[rgb(var(--js-text))]">{BRAND.stats.founded}</strong> by{" "}
            <strong className="text-[rgb(var(--js-text))]">{BRAND.founderName}</strong> — a son of the soil who watched his own farming community struggle with unreliable, expensive power. Today, we manufacture solar modules in our own {BRAND.stats.factoryMW} TopCon plant, deploy systems across {BRAND.stats.states} states, and stay accountable long after the panels are on the roof.
          </p>
        </div>
      </section>

      {/* Mind behind Junna */}
      <section className="container-js py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow">The mind behind Junna</span>
            <h2 className="section-title mt-4">{BRAND.founderName}</h2>
            <p className="mt-2 text-[15px] text-[rgb(var(--js-accent))] font-medium">{BRAND.founderRole}</p>
            <div className="mt-6 space-y-4 text-[rgb(var(--js-muted))] text-[15px] leading-relaxed">
              <p>
                {BRAND.founderName} grew up watching his farming community struggle with power cuts that ruined harvests and inflated diesel bills. He founded Junna Solar in {BRAND.stats.founded} with a stubborn belief: rural and urban India deserve the same quality solar — not the leftovers.
              </p>
              <p>
                From a small solar pump business, Junna scaled to deploy {BRAND.stats.portfolioMW} of solar across rooftops, ground-mounts, institutions and farms. In 2025 the company opened a fully automated {BRAND.stats.factoryMW} TopCon module plant near Hyderabad — bringing manufacturing in-house and locking-in quality at the cell level.
              </p>
              <p>
                Junna now has an MoU with the Government of Assam for an {BRAND.stats.assamMoU} integrated module-and-cell facility ({BRAND.stats.assamInvestment} planned investment) and a &ldquo;Mega Project&rdquo; allotment in Aurangabad, Maharashtra.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            {/* Portrait placeholder card */}
            <div className="relative rounded-[28px] overflow-hidden bg-[rgb(var(--js-text))] aspect-[5/4]">
              <img
                src={IMG.farmlandscape}
                alt="Founder of Junna Solar — landscape representing his agricultural roots"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
                decoding="async"
                width={1200}
                height={960}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--js-text))]/85 via-[rgb(var(--js-text))]/30 to-transparent" />
              <div className="absolute inset-x-7 bottom-7 text-white">
                <p className="text-[10px] uppercase tracking-[0.24em] opacity-80">Founder</p>
                <p className="serif-display text-3xl mt-1">{BRAND.founderName}</p>
                <p className="text-sm text-white/80 mt-1">{BRAND.founderRole} · Junna Solar Systems Limited</p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-[rgb(var(--js-muted))]">Portrait pending — landscape used as placeholder. Replace with official portrait before launch.</p>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="container-js">
          <div className="max-w-2xl">
            <span className="eyebrow">Leadership</span>
            <h2 className="section-title mt-4">The people who pick up.</h2>
            <p className="mt-4 text-[rgb(var(--js-muted))]">
              Three operators with skin in the game — and decades in solar EPC, manufacturing and pan-India operations.
            </p>
          </div>
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {BRAND.leadership.map((p) => (
              <li key={p.name} data-testid={`leader-${p.name.toLowerCase().replace(/\s+/g, '-')}`} className="card-js">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-[rgb(var(--js-text))] text-[rgb(var(--js-accent))] serif-display text-lg">
                  {p.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </div>
                <h3 className="mt-5 serif-display text-xl text-[rgb(var(--js-text))]">{p.name}</h3>
                <p className="text-[13px] font-medium text-[rgb(var(--js-accent))]">{p.role}</p>
                <p className="mt-3 text-[14px] text-[rgb(var(--js-muted))] leading-relaxed">{p.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reach */}
      <section className="container-js py-20 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow">Our reach</span>
            <h2 className="section-title mt-4">From a Hyderabad rooftop<br />to a pan-India presence.</h2>
            <p className="mt-4 text-[rgb(var(--js-muted))] max-w-md">
              {BRAND.stats.portfolioMW} delivered across {BRAND.stats.states} states via a {BRAND.stats.dealers} network of dealers — supported by our own manufacturing in Hyderabad.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {BRAND.serviceAreas.slice(0, 10).map((s) => (
                <span key={s} className="chip">
                  <MapPin className="h-3 w-3" /> {s}
                </span>
              ))}
            </div>
          </div>
          <dl className="lg:col-span-7 grid grid-cols-2 gap-px bg-[rgb(var(--js-border))] rounded-[28px] overflow-hidden">
            {REACH_HIGHLIGHTS.map(({ k, v }) => (
              <div key={k + v} className="bg-[rgb(var(--js-bg))] p-6">
                <dt className="serif-display text-2xl sm:text-3xl text-[rgb(var(--js-text))]">{k}</dt>
                <dd className="mt-1.5 text-[13px] text-[rgb(var(--js-muted))]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Manufacturing */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="container-js grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="eyebrow">Manufacturing</span>
            <h2 className="section-title mt-4">A {BRAND.stats.factoryMW} TopCon line.<br />Made in India.</h2>
            <p className="mt-4 text-[rgb(var(--js-muted))]">
              In 2025 Junna opened a fully automated {BRAND.stats.factoryMW} TopCon module facility in Hyderabad. A {BRAND.stats.cellPipelineMW} cell line is under construction. Owning the supply chain means quality is locked in at the cell level — and on-time delivery isn&apos;t dependent on imports.
            </p>
            <ul className="mt-6 grid gap-2 text-[14px] text-[rgb(var(--js-text))]">
              <li className="flex items-center gap-3"><Factory className="h-4 w-4 text-[rgb(var(--js-accent))]" /> Fully automated TopCon production</li>
              <li className="flex items-center gap-3"><Factory className="h-4 w-4 text-[rgb(var(--js-accent))]" /> BIS-certified, MNRE-listed modules</li>
              <li className="flex items-center gap-3"><Factory className="h-4 w-4 text-[rgb(var(--js-accent))]" /> 8 GW integrated module + cell MoU with Government of Assam</li>
            </ul>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-[28px] overflow-hidden aspect-[5/4] bg-[rgb(var(--js-text))]">
              <img
                src={IMG.factoryFloor}
                alt="Modern manufacturing facility"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
                width={1200}
                height={960}
              />
            </div>
          </div>
        </div>
      </section>

      <TrustStrip compact />

      {/* Promises */}
      <section className="container-js py-20 lg:py-24 grid lg:grid-cols-3 gap-5">
        <PromiseCard icon={ShieldCheck} t="Compliance-first materials" d="BIS-compliant TopCon modules from our own line. IEC-tested balance of system." />
        <PromiseCard icon={Wrench} t="Workmanship warranty" d="Typical 5-year workmanship warranty on our installation; manufacturer warranties carry through." />
        <PromiseCard icon={Headphones} t="Service desk" d="Toll-free support, AMC plans and remote monitoring on bigger systems." />
      </section>

      <Certificates />

      <section className="container-js py-12 lg:py-16">
        <span className="eyebrow">Customer voices</span>
        <h2 className="section-title mt-3">Real customers, real feedback.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="card-js">
              <div className="flex items-center gap-0.5 text-[rgb(var(--js-accent))]">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <blockquote className="mt-3 text-sm text-[rgb(var(--js-text))]">{r.text}</blockquote>
              <figcaption className="mt-4 text-xs">
                <p className="font-semibold">{r.name}</p>
                <p className="text-[rgb(var(--js-muted))]">{r.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-4 text-[11px] text-[rgb(var(--js-muted))]">Placeholder testimonials. Replace with verified customer reviews before launch.</p>
      </section>

      <CTASection title="Ready to start your solar journey with Junna?" subtitle="Free rooftop survey. Real numbers. Zero obligation." />
    </>
  );
}

const PromiseCard = ({ icon: Icon, t, d }) => (
  <div className="card-js">
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[rgb(var(--js-bg-alt))] text-[rgb(var(--js-accent))]">
      <Icon className="h-5 w-5" />
    </span>
    <h3 className="mt-4 text-base font-semibold">{t}</h3>
    <p className="mt-1 text-sm text-[rgb(var(--js-muted))]">{d}</p>
  </div>
);
