import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CaseStudyCard, { CASE_STUDIES } from "@/components/CaseStudyCard";
import LeadForm from "@/components/LeadForm";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import TrustStrip from "@/components/TrustStrip";
import { useSEO, faqJsonLd } from "@/lib/seo";
import { LineChart, ShieldCheck, Factory, Building2 } from "lucide-react";
import { IMG } from "@/lib/images";

const FAQS = [
  { q: "What is typical payback for commercial solar?", a: "Most C&I rooftops achieve payback in 3–5 years depending on load profile, tariff and net-metering policy." },
  { q: "Can we go OPEX / PPA?", a: "Yes — for large rooftops (>250 kW typically), we offer Power Purchase Agreement (PPA) modes with zero CAPEX." },
  { q: "Will solar impact my plant operations?", a: "Installation is sequenced to minimise downtime; large projects often complete without halting operations." },
  { q: "How do you handle warranties and AMC?", a: "Module 25 years, inverter 5–10 years (extendable), workmanship 5 years (typical). AMC plans are available." },
];

export default function Businesses() {
  useSEO({
    title: "Commercial & Industrial Solar — Junna Solar EPC",
    description: "Reduce operating electricity costs with commercial solar. ROI/payback proposals, EPC, financing and O&M for factories, warehouses, schools and offices.",
    path: "/businesses",
    jsonLd: faqJsonLd(FAQS),
  });

  return (
    <>
      <Hero
        eyebrow="For Businesses · C&I"
        title={<>Reduce operating electricity costs with <span className="text-[rgb(var(--js-primary))]">commercial solar</span>.</>}
        subtitle="Custom ROI/payback proposals, CAPEX or OPEX (PPA) modes, EPC and lifetime O&M for factories, warehouses, schools, hospitals and offices."
        imageUrl={IMG.industrial}
        showStats={false}
      />

      {/* Bill capture lead form pulled close to top */}
      <section className="container-js -mt-10 lg:-mt-14 relative z-10">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <LeadForm defaultSegment="business" source="businesses" title="Request a custom proposal" subtitle="Share your monthly bill or sanctioned load — we'll come back with an ROI/payback model." />
          </div>
          <div className="lg:col-span-7 space-y-5">
            <Tile icon={LineChart} t="ROI & payback model" d="Tariff escalation, CAPEX/OPEX comparison, NPV/IRR scenarios on request." />
            <Tile icon={Factory} t="Industrial-grade EPC" d="Design, structures, electrical BoS, SCADA monitoring, net-metering & approvals." />
            <Tile icon={ShieldCheck} t="Compliance & warranties" d="Tier-1 modules, IS / IEC compliant BoS, workmanship + manufacturer warranties." />
            <Tile icon={Building2} t="Multi-site programs" d="Roll-out across multiple sites with standard templates, common SLAs and dashboards." />
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* Process */}
      <HowItWorks />

      <section className="container-js py-16 lg:py-20">
        <span className="eyebrow">Recent C&I work</span>
        <h2 className="section-title mt-3">From 80 kW rooftops to <span className="text-[rgb(var(--js-primary))]">1 MW hybrids.</span></h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.filter((c) => c.type === "Business").map((cs) => <CaseStudyCard key={cs.id} cs={cs} />)}
        </div>
      </section>

      <FAQ items={FAQS} title="Commercial solar, demystified." />
      <CTASection title="Want an ROI proposal for your plant or office?" subtitle="One short call. One free site visit. One number you can take to your board." />
    </>
  );
}

const Tile = ({ icon: Icon, t, d }) => (
  <div className="card-js flex items-start gap-4">
    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[rgb(var(--js-bg-alt))] text-[rgb(var(--js-primary-dark))]">
      <Icon className="h-5 w-5" />
    </span>
    <div>
      <h3 className="text-base font-semibold">{t}</h3>
      <p className="mt-1 text-sm text-[rgb(var(--js-muted))]">{d}</p>
    </div>
  </div>
);
