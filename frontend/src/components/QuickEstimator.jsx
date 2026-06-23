import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, TrendingDown, Zap, CalendarCheck2, CheckCircle2, Loader2 } from "lucide-react";
import { track, EVENTS } from "@/lib/analytics";
import { submitZohoLead, ZOHO_SUCCESS_MSG } from "@/lib/zohoLead";
import { toast } from "sonner";

// ─── Calculator config ────────────────────────────────────────────────────────
const SAVINGS_CONFIG = {
  home: {
    label: "Home",
    savingsRate: 0.8,
    payback: "4–5 years",
  },
  business: {
    label: "Business",
    savingsRate: 0.65,
    payback: "3–4 years",
  },
  society: {
    label: "Society",
    savingsRate: 0.7,
    payback: "4–5 years",
  },
};

const COST_PER_UNIT = 8;          // ₹ per kWh
const UNITS_PER_KW_PER_DAY = 4;   // kWh generated per kW per day

function calculateSolarSavings(category, monthlyBill) {
  const config = SAVINGS_CONFIG[category];
  if (!config || !monthlyBill || monthlyBill <= 0) return null;

  const monthlySavings = monthlyBill * config.savingsRate;
  const yearlySavings = monthlySavings * 12;

  const monthlyUnits = monthlyBill / COST_PER_UNIT;
  const dailyUnits = monthlyUnits / 30;
  const solarSizeKw = dailyUnits / UNITS_PER_KW_PER_DAY;

  return {
    monthlySavings: Math.round(monthlySavings),
    yearlySavings: Math.round(yearlySavings),
    solarSizeKw: Number(solarSizeKw.toFixed(2)),
    payback: config.payback,
  };
}

/** Indian rupee formatter — e.g. 120000 → ₹1,20,000 */
function formatINR(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Component ────────────────────────────────────────────────────────────────
export const QuickEstimator = () => {
  const [bill, setBill] = useState("");
  const [segment, setSegment] = useState("home");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [bookingLoading, setBookingLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const nav = useNavigate();

  const handleInput = (e) => {
    // Allow only digits, strip everything else
    const cleaned = e.target.value.replace(/[^0-9]/g, "");
    setBill(cleaned);
    // Clear error as user types
    if (error) setError("");
    // Clear stale result when input changes
    if (result) setResult(null);
  };

  const onCalculate = () => {
    const trimmed = bill.trim();

    if (!trimmed) {
      setError("Please enter your monthly electricity bill.");
      setResult(null);
      return;
    }

    const v = parseFloat(trimmed);
    if (isNaN(v) || v <= 0) {
      setError("Please enter a valid monthly electricity bill.");
      setResult(null);
      return;
    }

    setError("");
    const calc = calculateSolarSavings(segment, v);
    setResult(calc);
    track(EVENTS.CALC_COMPLETE, { segment, solar_kw: calc?.solarSizeKw });
  };

  const handleSegmentChange = (key) => {
    setSegment(key);
    // Recalculate immediately if there's already a valid result
    if (result && bill) {
      const v = parseFloat(bill);
      if (v > 0) setResult(calculateSolarSavings(key, v));
    }
  };

  return (
    <div id="estimator" data-testid="quick-estimator" className="card-js !p-6 sm:!p-8">
      {/* Category tabs */}
      <div className="mt-4 flex flex-wrap gap-2">
        {Object.entries(SAVINGS_CONFIG).map(([key, { label }]) => (
          <button
            key={key}
            type="button"
            data-testid={`quick-seg-${key}`}
            onClick={() => handleSegmentChange(key)}
            className={`rounded-full px-3.5 py-1.5 text-[12px] font-medium transition ${
              segment === key
                ? "bg-[rgb(var(--js-text))] text-[rgb(var(--js-bg))]"
                : "border border-[rgb(var(--js-border))] text-[rgb(var(--js-muted))] hover:text-[rgb(var(--js-text))]"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[rgb(var(--js-muted))] text-sm select-none">
            ₹
          </span>
          <input
            id="quick-bill"
            data-testid="quick-bill"
            inputMode="numeric"
            value={bill}
            onChange={handleInput}
            placeholder="Avg. monthly electricity bill"
            className="input-js pl-8"
            onKeyDown={(e) => { if (e.key === "Enter") onCalculate(); }}
            aria-label="Monthly electricity bill in rupees"
          />
        </div>
        <button
          type="button"
          data-testid="quick-calc"
          onClick={onCalculate}
          className="btn-primary sm:w-auto"
        >
          Estimate savings <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      {/* Validation error */}
      {error && (
        <p data-testid="quick-error" role="alert" className="mt-3 text-xs text-[rgb(var(--js-danger))]">
          {error}
        </p>
      )}

      {/* Result card */}
      {result && (
        <div
          data-testid="quick-result"
          className="mt-5 rounded-[20px] border border-[rgb(var(--js-border))] bg-[rgb(var(--js-bg-alt))] overflow-hidden"
        >
          {/* Result grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-[rgb(var(--js-border))]">
            <ResultCell
              icon={TrendingDown}
              label="Monthly savings"
              value={formatINR(result.monthlySavings)}
              accent
            />
            <ResultCell
              icon={CalendarCheck2}
              label="Yearly savings"
              value={formatINR(result.yearlySavings)}
            />
            <ResultCell
              icon={Zap}
              label="Solar system size"
              value={`${result.solarSizeKw} kW`}
            />
            <ResultCell
              icon={CheckCircle2}
              label="Payback estimate"
              value={result.payback}
            />
          </div>

          {/* Disclaimer + CTA */}
          <div className="px-5 py-4 border-t border-[rgb(var(--js-border))] flex flex-col sm:flex-row sm:items-center gap-3">
            <p className="flex-1 text-[11.5px] leading-relaxed text-[rgb(var(--js-muted))]">
              Indicative range. Final figures after free rooftop visit.
            </p>
            {booked ? (
              <div className="flex items-center gap-2 text-[rgb(var(--js-primary-dark))] text-xs font-medium">
                <CheckCircle2 className="h-4 w-4" /> Request received!
              </div>
            ) : (
              <button
                type="button"
                data-testid="quick-survey-cta"
                disabled={bookingLoading}
                onClick={async () => {
                  setBookingLoading(true);
                  try {
                    await submitZohoLead({
                      formName: "Homepage Quick Estimator",
                      pageSource: "home",
                      enquiryType: segment === "home" ? "Residential" : segment === "business" ? "Commercial" : "Society",
                      monthlyBill: bill ? `₹${bill}` : "",
                      estimatedSystemSize: result ? `${result.solarSizeKw} kW` : "",
                      estimatedMonthlySavings: result ? formatINR(result.monthlySavings) : "",
                      estimatedAnnualSavings: result ? formatINR(result.yearlySavings) : "",
                      estimatedPayback: result ? result.payback : "",
                      // phone not collected here — navigate to contact form
                      phone: "0000000000", // placeholder; contact form collects real phone
                    });
                    setBooked(true);
                    toast.success(ZOHO_SUCCESS_MSG);
                  } catch (err) {
                    // Fall back to contact page if Zoho fails
                    nav("/contact?action=survey");
                  } finally {
                    setBookingLoading(false);
                  }
                }}
                className="btn-accent !w-full sm:!w-auto whitespace-nowrap disabled:opacity-60"
              >
                {bookingLoading ? <><Loader2 className="h-4 w-4 animate-spin" /> Booking…</> : <>Book free rooftop survey <ArrowRight className="h-4 w-4" /></>}
              </button>
            )}
          </div>
        </div>
      )}

      {/* Static disclaimer when no result yet */}
      {!result && (
        <p className="mt-3 text-[11px] text-[rgb(var(--js-muted))]/90">
          Indicative range. Final figures after free rooftop visit.
        </p>
      )}
    </div>
  );
};

// ─── Sub-component ────────────────────────────────────────────────────────────
const ResultCell = ({ icon: Icon, label, value, accent }) => (
  <div
    className={`flex flex-col gap-1 px-4 py-4 ${
      accent
        ? "bg-[rgb(var(--js-text))] text-white"
        : "bg-transparent text-[rgb(var(--js-text))]"
    }`}
  >
    <div className="flex items-center gap-1.5">
      <Icon
        className={`h-3.5 w-3.5 shrink-0 ${accent ? "text-white/70" : "text-[rgb(var(--js-accent))]"}`}
      />
      <p className={`text-[10px] uppercase tracking-widest font-medium ${accent ? "text-white/70" : "text-[rgb(var(--js-muted))]"}`}>
        {label}
      </p>
    </div>
    <p className={`text-base font-semibold leading-tight ${accent ? "text-white" : "text-[rgb(var(--js-text))]"}`}>
      {value}
    </p>
  </div>
);

export default QuickEstimator;
