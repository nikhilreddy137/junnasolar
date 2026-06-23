import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CaseStudyCard, { CASE_STUDIES } from "@/components/CaseStudyCard";
import CTASection from "@/components/CTASection";
import FAQ from "@/components/FAQ";
import { useSEO, faqJsonLd } from "@/lib/seo";
import { Users2, FileText, Download, ClipboardList } from "lucide-react";
import { track, EVENTS } from "@/lib/analytics";
import { IMG } from "@/lib/images";

const FAQS = [
  { q: "How does common-area solar work for societies?", a: "A single rooftop system offsets the maintenance bill — lifts, pumps, lobby and corridor lighting. Savings get distributed across flats via lower maintenance dues." },
  { q: "Do we need society approval?", a: "Yes. We help with a presentation deck, a tailored proposal and Q&A support for committee/AGM meetings." },
  { q: "Who maintains the system?", a: "Junna offers annual maintenance contracts with SLAs and remote monitoring dashboards." },
  { q: "What about institutions like schools or hospitals?", a: "We've delivered systems for day-load institutions where load profile aligns with solar generation. Compliance and warranty documentation included." },
];

export default function Societies() {
  useSEO({
    title: "Solar for Housing Societies & Institutions — Junna Solar",
    description: "Common-area solar for apartments, gated communities, schools, colleges and hospitals. Committee-friendly proposals, EPC and after-care.",
    path: "/societies",
    jsonLd: faqJsonLd(FAQS),
  });

  return (
    <>
      <Hero
        eyebrow="Societies · Institutions"
        title={<>Solar for apartments, communities, schools, <span className="text-[rgb(var(--js-primary))]">colleges & hospitals</span>.</>}
        subtitle="Lower maintenance bills for residents, lower electricity costs for institutions — with committee-ready proposals and end-to-end EPC."
        imageUrl={IMG.solarFarm}
        showStats={false}
      />

      <section className="container-js py-16 lg:py-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <Tile icon={Users2} t="Common-area savings" d="Lifts, pumps, lobby & corridor lighting offset by rooftop solar — directly reducing maintenance dues." />
          <Tile icon={ClipboardList} t="Committee support" d="We prepare a presentation, ROI sheet, vendor comparison and Q&A document for AGM/committee meetings." />
          <Tile icon={FileText} t="Documentation pack" d="Tender-ready specifications, drawings, compliance documents and warranty matrix." />
        </div>
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            onClick={() => track(EVENTS.PROPOSAL_DL, { type: "society" })}
            data-testid="society-proposal-download"
            className="btn-secondary"
          >
            <Download className="h-4 w-4" /> Download sample society proposal
          </button>
          <p className="text-[11px] text-[rgb(var(--js-muted))]">Sample PDF will be available once content is finalised by the Junna team.</p>
        </div>
      </section>

      <HowItWorks />

      <section className="container-js py-16 lg:py-20">
        <span className="eyebrow">Society & institution work</span>
        <h2 className="section-title mt-3">Proposals approved. Systems live.</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.filter((c) => c.type === "Society" || c.type === "Institution").map((cs) => <CaseStudyCard key={cs.id} cs={cs} />)}
        </div>
      </section>

      <FAQ items={FAQS} title="Society solar, made simple." />
      <CTASection title="Want a committee-ready proposal?" subtitle="Free site visit and a documentation pack tailored for AGM approval." />
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
