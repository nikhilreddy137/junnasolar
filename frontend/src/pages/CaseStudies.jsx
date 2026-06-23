import { useState } from "react";
import CaseStudyCard, { CASE_STUDIES } from "@/components/CaseStudyCard";
import CTASection from "@/components/CTASection";
import { useSEO } from "@/lib/seo";

const FILTERS = ["All", "Home", "Business", "Society", "Institution"];

export default function CaseStudies() {
  const [filter, setFilter] = useState("All");
  useSEO({
    title: "Solar Case Studies — Junna Solar Installations",
    description: "Junna Solar case studies for homes, businesses, societies and institutions across India. System size, savings and payback at a glance.",
    path: "/case-studies",
  });

  const items = filter === "All" ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.type === filter);

  return (
    <>
      <section className="gradient-leaf">
        <div className="container-js py-14 lg:py-20">
          <span className="eyebrow">Case studies</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight">
            Real rooftops.<br /><span className="text-[rgb(var(--js-primary))]">Real savings.</span>
          </h1>
          <p className="mt-4 max-w-2xl text-[rgb(var(--js-muted))]">
            A snapshot of Junna installations across segments. Indicative figures shown; verified during proposal.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-testid={`case-filter-${f.toLowerCase()}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition border ${
                  filter === f
                    ? "bg-[rgb(var(--js-primary))] text-white border-transparent"
                    : "bg-white text-[rgb(var(--js-text))] border-[rgb(var(--js-border))] hover:bg-[rgb(var(--js-bg-alt))]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="container-js py-12 lg:py-16">
        <div data-testid="case-grid" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((cs) => <CaseStudyCard key={cs.id} cs={cs} />)}
        </div>
        {items.length === 0 && (
          <p className="text-center text-[rgb(var(--js-muted))] py-12">No case studies for this filter yet.</p>
        )}
        <p className="mt-6 text-[11px] text-[rgb(var(--js-muted))]">*Indicative figures pending final verification.</p>
      </section>

      <CTASection title="Want results like these?" subtitle="Start with a free rooftop assessment from Junna." />
    </>
  );
}
