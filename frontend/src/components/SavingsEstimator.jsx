import { useState } from "react";
import { Calculator, TrendingUp, Sun } from "lucide-react";
import { track, EVENTS } from "@/lib/analytics";
import LeadForm from "@/components/LeadForm";

// ─── Local savings formula ───────────────────────────────────────────────────
const SAVINGS_RATES = {
  home:        { low: 0.70, high: 0.85, payback: "4–5 years" },
  society:     { low: 0.60, high: 0.75, payback: "4–5 years" },
  business:    { low: 0.55, high: 0.70, payback: "3–4 years" },
  government:  { low: 0.55, high: 0.70, payback: "4–5 years" },
};

const calcSavings = (segment, monthlyBill) => {
  const cfg = SAVINGS_RATES[segment] || SAVINGS_RATES.home;
  const monthly_savings_min = Math.round(monthlyBill * cfg.low);
  const monthly_savings_max = Math.round(monthlyBill * cfg.high);
  const kw = monthlyBill / 8 / 30 / 4;
  return {
    monthly_savings_min,
    monthly_savings_max,
    annual_savings_min: monthly_savings_min * 12,
    annual_savings_max: monthly_savings_max * 12,
    system_size_kw_min: Math.max(1, parseFloat((kw * 0.9).toFixed(1))),
    system_size_kw_max: parseFloat((kw * 1.1).toFixed(1)),
    payback: cfg.payback,
  };
};

const inr = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

const SEGMENTS = [
  { key: "home",        label: "Home" },
  { key: "society",     label: "Society" },
  { key: "business",    label: "Business" },
  { key: "government",  label: "Government" },
];

const chipClass = (active) =>
  "rounded-full border px-3 py-2 text-[13px] sm:text-sm font-medium transition " +
  (active
    ? "border-[var(--sr-navy)] bg-[var(--sr-navy)] text-white shadow-sm"
    : "border-[var(--sr-border)] bg-white text-[var(--sr-navy)] hover:border-[var(--sr-navy)] hover:bg-[var(--sr-cream)]");

/**
 * SavingsEstimator — calculator only.
 * After computing, the unified LeadForm appears beneath, prefilled.
 */
export const SavingsEstimator = ({ defaultSegment = "home" }) => {
  const [segment, setSegment] = useState(defaultSegment);
  const [bill, setBill] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const onCalculate = (e) => {
    e.preventDefault();
    setError("");
    const b = parseFloat(bill);
    if (!b || b < 100) { setError("Please enter a monthly bill of at least ₹100."); return; }
    const r = calcSavings(segment, b);
    setResult(r);
    track(EVENTS.CALC_COMPLETE, { segment, bill: b });
    setTimeout(() => {
      document.getElementById("estimator-result")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section className="container-js py-16 lg:py-20" data-testid="savings-estimator">
      <div className="text-center max-w-2xl mx-auto">
        <span className="eyebrow">Savings estimator</span>
        <h2 className="section-title mt-3">See your savings in 30 seconds.</h2>
        <p className="mt-3 text-[15px] text-[var(--sr-muted)]">
          A quick indicative range based on your average monthly bill. No personal details required to see numbers.
        </p>
      </div>

      <div className="mt-10 grid lg:grid-cols-5 gap-6 items-start">
        {/* Calculator */}
        <div className="card-js lg:col-span-2">
          <form onSubmit={onCalculate} className="grid gap-4" data-testid="estimator-form">
            <div>
              <label className="label-js">I am estimating for</label>
              <div className="flex flex-wrap gap-2">
                {SEGMENTS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    data-testid={`est-segment-${s.key}`}
                    onClick={() => { setSegment(s.key); setResult(null); }}
                    className={chipClass(segment === s.key)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="est-bill" className="label-js">Avg. monthly electricity bill (₹)</label>
              <input
                id="est-bill"
                data-testid="est-bill"
                inputMode="numeric"
                value={bill}
                onChange={(e) => { setBill(e.target.value.replace(/[^0-9]/g, "")); setResult(null); }}
                placeholder="e.g. 3500"
                className="input-js"
              />
              {error && <p className="mt-1 text-xs text-[#B0413E]">{error}</p>}
            </div>

            <button type="submit" data-testid="est-calculate" className="btn-primary">
              <Calculator className="h-4 w-4" /> See my savings
            </button>

            <p className="text-[11px] text-[var(--sr-muted)]">
              Indicative only. A free site visit gives exact numbers based on roof, shading, sanctioned load and tariff slab.
            </p>
          </form>
        </div>

        {/* Result + LeadForm */}
        <div id="estimator-result" className="lg:col-span-3 space-y-4">
          {!result ? (
            <div className="card-js text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[var(--sr-cream)] text-[var(--sr-navy)]">
                <Sun className="h-7 w-7" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Enter your bill to estimate</h3>
              <p className="mt-1 text-sm text-[var(--sr-muted)]">
                We&apos;ll show your indicative monthly savings, system size and payback.
              </p>
            </div>
          ) : (
            <>
              <div className="card-js">
                <div className="flex items-center gap-3">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-[var(--sr-cream)] text-[var(--sr-navy)]">
                    <TrendingUp className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-[var(--sr-muted)]">Indicative monthly savings</p>
                    <p className="text-2xl font-medium tracking-tight">
                      {inr(result.monthly_savings_min)} – {inr(result.monthly_savings_max)}
                    </p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
                  <Stat label="Annual savings" value={`${inr(result.annual_savings_min)}–${inr(result.annual_savings_max)}`} />
                  <Stat label="System size" value={`${result.system_size_kw_min}–${result.system_size_kw_max} kW`} />
                  <Stat label="Payback" value={result.payback} />
                </div>
              </div>

              <LeadForm
                key={`${segment}-${bill}`}
                defaultSegment={segment}
                source="savings-estimator"
                title="Lock in these savings — book a free survey"
                subtitle="Share your details and a Junna solar expert will call you within one business day with an exact, no-obligation quote."
                estimatorData={{
                  monthlyBill: bill,
                  systemSizeKw: result.system_size_kw_min,
                  estimatedSystemSize: `${result.system_size_kw_min}–${result.system_size_kw_max} kW`,
                  estimatedMonthlySavings: `${inr(result.monthly_savings_min)}–${inr(result.monthly_savings_max)}`,
                  estimatedAnnualSavings: `${inr(result.annual_savings_min)}–${inr(result.annual_savings_max)}`,
                  estimatedPayback: result.payback,
                }}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
};

const Stat = ({ label, value }) => (
  <div className="rounded-xl border border-[var(--sr-border)] bg-white px-3 py-3">
    <p className="text-[11px] uppercase tracking-wide text-[var(--sr-muted)]">{label}</p>
    <p className="mt-1 text-sm font-medium">{value}</p>
  </div>
);

export default SavingsEstimator;
