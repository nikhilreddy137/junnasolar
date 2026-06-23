import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { IMG } from "@/lib/images";
import { track, EVENTS } from "@/lib/analytics";

export const CaseStudyCard = ({ cs }) => (
  <Link
    to={`/case-studies?id=${cs.id}`}
    data-testid={`case-card-${cs.id}`}
    onClick={() => track(EVENTS.CASE_VIEW, { id: cs.id })}
    className="card-js group block hover:-translate-y-0.5"
  >
    <div className="relative aspect-[5/3] overflow-hidden rounded-xl bg-[rgb(var(--js-bg-alt))]">
      <img
        src={cs.image}
        alt={cs.title}
        loading="lazy"
        decoding="async"
        width={900}
        height={540}
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />
      <span className="absolute top-3 left-3 chip bg-white">{cs.type}</span>
    </div>
    <div className="mt-5 flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] uppercase tracking-widest text-[rgb(var(--js-muted))]">{cs.city}</p>
        <h3 className="mt-1 text-base font-semibold">{cs.title}</h3>
      </div>
      <ArrowUpRight className="h-4 w-4 text-[rgb(var(--js-muted))] transition group-hover:text-[rgb(var(--js-accent))]" />
    </div>
    <dl className="mt-4 grid grid-cols-3 gap-3 text-center">
      <Box k="Size" v={cs.size} />
      <Box k="Savings" v={cs.savings} />
      <Box k="Payback" v={cs.payback} />
    </dl>
  </Link>
);

const Box = ({ k, v }) => (
  <div className="rounded-lg bg-[rgb(var(--js-bg-alt))] py-2">
    <dt className="text-[10px] uppercase tracking-widest text-[rgb(var(--js-muted))]">{k}</dt>
    <dd className="mt-0.5 text-sm font-semibold text-[rgb(var(--js-text))]">{v}</dd>
  </div>
);

export const CASE_STUDIES = [
  {
    id: "home-hyd-5kw",
    type: "Home",
    title: "5 kW rooftop · independent house",
    city: "Hyderabad, Telangana",
    size: "5 kW",
    savings: "₹4.5–5.2k/mo*",
    payback: "~4 yrs*",
    image: IMG.caseHome1,
    summary: "Family of four offset 85% of their bill; benefited from residential subsidy guidance.",
  },
  {
    id: "society-blr-80kw",
    type: "Society",
    title: "80 kW common-area society plant",
    city: "Bengaluru, Karnataka",
    size: "80 kW",
    savings: "₹68k/mo*",
    payback: "~3.5 yrs*",
    image: IMG.caseSociety,
    summary: "Lift, pump and lobby loads covered; committee approval supported with documentation pack.",
  },
  {
    id: "ci-warehouse-250kw",
    type: "Business",
    title: "250 kW warehouse rooftop · cold-chain",
    city: "Pune, Maharashtra",
    size: "250 kW",
    savings: "₹2.1L/mo*",
    payback: "~3.8 yrs*",
    image: IMG.caseBusiness1,
    summary: "Daytime load alignment; net-metering enabled; ESG metrics improved for client.",
  },
  {
    id: "institution-school-30kw",
    type: "Institution",
    title: "30 kW school rooftop",
    city: "Vijayawada, AP",
    size: "30 kW",
    savings: "₹26k/mo*",
    payback: "~4.2 yrs*",
    image: IMG.caseInstitution,
    summary: "Day-school load profile matched; teaching aid for students on renewable energy.",
  },
  {
    id: "home-vja-3kw",
    type: "Home",
    title: "3 kW starter home system",
    city: "Vijayawada, AP",
    size: "3 kW",
    savings: "₹2.6k/mo*",
    payback: "~4.5 yrs*",
    image: IMG.caseHome2,
    summary: "Compact rooftop with smart string sizing for shaded slope.",
  },
  {
    id: "ci-factory-1mw",
    type: "Business",
    title: "1 MW factory ground-mount + rooftop hybrid",
    city: "Visakhapatnam, AP",
    size: "1 MW",
    savings: "₹9.2L/mo*",
    payback: "~3.6 yrs*",
    image: IMG.caseBusiness2,
    summary: "Hybrid roof + ground array; SCADA monitoring; AMC contracted.",
  },
];

export default CaseStudyCard;
