import { Link } from "react-router-dom";
import { useSEO, ORG_JSONLD } from "@/lib/seo";
import { ArrowRight, Sun, Compass, Heart, Factory, MapPin, ShieldCheck, Users } from "lucide-react";
import { BRAND } from "@/lib/brand";
import { IMG } from "@/lib/images";
import BoardGrid from "@/components/BoardGrid";
import CTASection from "@/components/CTASection";

export default function About() {
  useSEO({
    title: "About Junna Solar — Founder, Board & Team",
    description:
      "Junna Solar Systems — founded 2012 by Junna Shekar Reddy. Meet the board, leadership team, and the story behind India's vertically-integrated solar company.",
    path: "/about",
    jsonLd: ORG_JSONLD,
  });

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-dusk overflow-hidden">
        {/* subtle grid texture */}
        <div className="absolute inset-0 bg-sun-grid opacity-40 pointer-events-none" />
        <div className="container-js relative pt-14 pb-12 lg:pt-24 lg:pb-20">
          <span className="eyebrow">About Junna Solar</span>
          <h1 className="mt-4 serif-display text-[44px] sm:text-6xl lg:text-[80px] leading-[0.98] font-medium tracking-tight max-w-4xl">
            Solar, the way{" "}
            <span className="text-[rgb(var(--js-primary))]">India</span> built it.
          </h1>
          <p className="mt-6 max-w-2xl text-[rgb(var(--js-muted))] text-base sm:text-lg">
            From a single founder&apos;s mission in 2012 to a {BRAND.stats.factoryMW} TopCon module
            factory and {BRAND.stats.portfolioMW} of deployed solar — Junna&apos;s story is one of
            stubborn focus, in-house manufacturing, and customer accountability that lasts 25 years.
          </p>

          {/* Stats strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-px bg-[rgb(var(--js-border))] rounded-[24px] overflow-hidden max-w-3xl">
            {[
              [BRAND.stats.yearsExperience, "Years since 2012"],
              [BRAND.stats.portfolioMW, "Deployed"],
              [BRAND.stats.factoryMW, "Factory output"],
              [`${BRAND.stats.states} · ${BRAND.stats.dealers}`, "States · dealers"],
            ].map(([k, v]) => (
              <div key={v} className="bg-[rgb(var(--js-bg))] p-5">
                <p className="serif-display text-xl sm:text-2xl text-[rgb(var(--js-text))]">{k}</p>
                <p className="mt-1 text-[12px] text-[rgb(var(--js-muted))]">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Founder section ──────────────────────────────────── */}
      <section id="minds" className="container-js py-20 lg:py-28 scroll-mt-24">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <span className="eyebrow">The mind behind Junna</span>
            <h2 className="section-title mt-4">{BRAND.founderName}</h2>
            <p className="mt-2 text-[15px] text-[rgb(var(--js-accent))] font-medium">
              {BRAND.founderRole}
            </p>
            <div className="mt-6 space-y-4 text-[rgb(var(--js-muted))] text-[15px] leading-relaxed">
              <p>
                {BRAND.founderName} grew up watching his farming community in Telangana struggle with
                power cuts that ruined harvests and inflated diesel bills. He founded Junna Solar in{" "}
                {BRAND.stats.founded} with a stubborn belief: rural and urban India deserve the same
                quality of solar — not the leftovers.
              </p>
              <p>
                From a small solar pump business, Junna scaled to deploy {BRAND.stats.portfolioMW} of
                rooftop, ground-mount and institutional solar. In 2025, the company opened a fully
                automated {BRAND.stats.factoryMW} TopCon module plant near Hyderabad — bringing
                manufacturing in-house and locking in quality at the cell level.
              </p>
              <p>
                Junna now has an MoU with the Government of Assam for an {BRAND.stats.assamMoU}{" "}
                integrated module-and-cell facility ({BRAND.stats.assamInvestment} planned investment)
                and a &ldquo;Mega Project&rdquo; allotment in Aurangabad, Maharashtra.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/products" className="btn-secondary">
                Our Products
              </Link>
              <Link to="/contact?action=survey" className="btn-primary">
                Talk to the team <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative rounded-[28px] overflow-hidden bg-[rgb(var(--js-text))] aspect-[5/4]">
              <img
                src={IMG.aboutHero}
                alt="Junna founder — Telangana landscape"
                className="absolute inset-0 h-full w-full object-cover opacity-90"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--js-text))]/85 via-[rgb(var(--js-text))]/30 to-transparent" />
              <div className="absolute inset-x-7 bottom-7 text-white">
                <p className="text-[10px] uppercase tracking-[0.24em] opacity-80">Founder</p>
                <p className="serif-display text-3xl mt-1">{BRAND.founderName}</p>
                <p className="text-sm text-white/80 mt-1">
                  {BRAND.founderRole} · Junna Solar Systems Limited
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vision / Mission / Promise ───────────────────────── */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-js">
          <div className="max-w-2xl">
            <span className="eyebrow">What drives us</span>
            <h2 className="section-title mt-4">
              Three convictions.<br />
              <span className="text-[rgb(var(--js-primary))]">One company.</span>
            </h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            <Card
              icon={Compass}
              t="Vision"
              d="A solar-first India where every roof, farm and factory generates more energy than it consumes — without trade-offs on quality."
            />
            <Card
              icon={Heart}
              t="Mission"
              d="Make rooftop solar a trusted, transparent decision — from a homeowner's first electricity bill to a 1 MW industrial array."
            />
            <Card
              icon={Sun}
              t="Promise"
              d="In-house manufacturing, in-house engineering, in-house service. If something breaks 5 years in, the same team answers the phone."
            />
          </div>
        </div>
      </section>

      {/* ── Board of Directors ───────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Decorative accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[rgb(var(--js-primary))] via-[rgb(var(--js-accent))] to-[rgb(var(--js-primary))]" />
        <div className="container-js pt-16 pb-2 lg:pt-24 lg:pb-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-[rgb(var(--js-bg-alt))] text-[rgb(var(--js-accent))]">
              <Users className="h-5 w-5" />
            </span>
            <span className="eyebrow !mb-0">Leadership</span>
          </div>
        </div>
        <BoardGrid
          group="board"
          title="The Board"
          subtitle="Three operators with skin in the game — and decades in solar EPC, manufacturing and pan-India operations."
        />
      </section>

      {/* ── Core Personnel ───────────────────────────────────── */}
      <section className="bg-cream relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-[rgb(var(--js-border))]" />
        <BoardGrid
          group="core"
          title="Core Personnel"
          subtitle="The team that keeps factories humming, projects shipping, and customers heard."
        />
      </section>

      {/* ── Manufacturing strip ──────────────────────────────── */}
      <section className="container-js py-20 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 order-2 lg:order-1">
            <span className="eyebrow">Manufacturing</span>
            <h2 className="section-title mt-4">
              A {BRAND.stats.factoryMW} TopCon line.<br />
              <span className="text-[rgb(var(--js-primary))]">Made in India.</span>
            </h2>
            <p className="mt-4 text-[rgb(var(--js-muted))]">
              In 2025 Junna opened a fully automated {BRAND.stats.factoryMW} TopCon module facility in
              Hyderabad. A {BRAND.stats.cellPipelineMW} cell line is under construction. Owning the
              supply chain means quality is locked in at the cell level — and on-time delivery isn&apos;t
              dependent on imports.
            </p>
            <ul className="mt-6 grid gap-2 text-[14px] text-[rgb(var(--js-text))]">
              <li className="flex items-center gap-3">
                <Factory className="h-4 w-4 text-[rgb(var(--js-accent))]" /> Fully automated TopCon
                production
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="h-4 w-4 text-[rgb(var(--js-accent))]" /> BIS-certified,
                MNRE-listed modules
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-[rgb(var(--js-accent))]" /> 8 GW MoU with Government
                of Assam
              </li>
            </ul>
          </div>
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="relative rounded-[28px] overflow-hidden aspect-[5/4] bg-[rgb(var(--js-text))]">
              <img
                src={IMG.factoryFloor}
                alt="Solar manufacturing facility"
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Reach ────────────────────────────────────────────── */}
      <section className="bg-cream py-20 lg:py-24">
        <div className="container-js">
          <div className="max-w-2xl">
            <span className="eyebrow">Our reach</span>
            <h2 className="section-title mt-4">
              From Hyderabad to <span className="text-[rgb(var(--js-primary))]">{BRAND.stats.states} states.</span>
            </h2>
            <p className="mt-4 text-[rgb(var(--js-muted))] max-w-lg">
              {BRAND.stats.portfolioMW} delivered across India via a {BRAND.stats.dealers} network of
              dealers — supported by our own manufacturing.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-2 max-w-3xl">
            {BRAND.serviceAreas.map((s) => (
              <span key={s} className="chip text-sm">
                <MapPin className="h-3.5 w-3.5" /> {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to work with Junna?"
        subtitle="Talk to our team — homes, businesses, societies and institutions."
      />
    </>
  );
}

const Card = ({ icon: Icon, t, d }) => (
  <div className="card-js">
    <span className="grid h-11 w-11 place-items-center rounded-xl bg-[rgb(var(--js-bg-alt))] text-[rgb(var(--js-accent))]">
      <Icon className="h-5 w-5" />
    </span>
    <h3 className="mt-5 serif-display text-xl text-[rgb(var(--js-text))]">{t}</h3>
    <p className="mt-2 text-[15px] text-[rgb(var(--js-muted))] leading-relaxed">{d}</p>
  </div>
);
