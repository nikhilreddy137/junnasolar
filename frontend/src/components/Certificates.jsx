import { FileBadge, Download, ShieldCheck } from "lucide-react";
import { track, EVENTS } from "@/lib/analytics";

const CERTS = [
  { name: "BIS Certificate", desc: "Bureau of Indian Standards compliance for materials.", code: "IS 14286 / IS 16170" },
  { name: "Company Incorporation", desc: "MCA Certificate of Incorporation.", code: "CIN: TODO" },
  { name: "GST Registration", desc: "Verified GST registration.", code: "GSTIN: TODO" },
  { name: "MNRE / Empanelment", desc: "Empanelled / approved vendor documents.", code: "Ref: TODO" },
  { name: "Workmanship Warranty", desc: "Junna installation workmanship warranty.", code: "5 yrs (typical)" },
  { name: "Module / Inverter", desc: "Tier-1 module & inverter manufacturer warranties.", code: "Up to 25 yrs (module)" },
];

export const Certificates = ({ preview = false }) => (
  <section className={`container-js ${preview ? "py-16 lg:py-20" : "py-12 lg:py-16"}`}>
    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
      <div className="max-w-2xl">
        <span className="eyebrow">Trust & compliance</span>
        <h2 className="section-title mt-3">Certificates that de-risk your purchase.</h2>
      </div>
      <p className="text-sm text-[rgb(var(--js-muted))] max-w-md">
        We share original documents on request during the site visit. Every project follows BIS / MNRE-aligned material standards.
      </p>
    </div>
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {CERTS.slice(0, preview ? 3 : CERTS.length).map((c) => (
        <li key={c.name} className="card-js">
          <div className="flex items-start justify-between">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-[rgb(var(--js-bg-alt))] text-[rgb(var(--js-primary-dark))]">
              <FileBadge className="h-5 w-5" />
            </span>
            <ShieldCheck className="h-4 w-4 text-[rgb(var(--js-primary))]" />
          </div>
          <h3 className="mt-4 text-base font-semibold">{c.name}</h3>
          <p className="mt-1 text-sm text-[rgb(var(--js-muted))]">{c.desc}</p>
          <p className="mt-3 text-[11px] uppercase tracking-widest text-[rgb(var(--js-muted))]">{c.code}</p>
          <button
            type="button"
            onClick={() => track(EVENTS.CERT_DL, { cert: c.name })}
            data-testid={`cert-dl-${c.name.replace(/\s+/g, "-").toLowerCase()}`}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[rgb(var(--js-primary-dark))] hover:underline underline-offset-4"
          >
            <Download className="h-4 w-4" /> Request copy
          </button>
        </li>
      ))}
    </ul>
    <p className="mt-6 text-[11px] text-[rgb(var(--js-muted))]">Document numbers shown as placeholders. Final document set is shared during onboarding.</p>
  </section>
);

export default Certificates;
