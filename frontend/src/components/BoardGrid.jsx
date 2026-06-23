import { Linkedin } from "lucide-react";

const JUNNA_CDN = "https://admin.junnasolar.com";

const BOARD_MEMBERS = [
  {
    id: "1",
    name: "Junna Shekar Reddy",
    role: "Chairman & Managing Director",
    group: "board",
    bio: "Founded Junna Solar in 2012 to solve the energy challenges he saw in his own farming community. Drives strategic direction and Junna's mission to make quality solar accessible across India.",
    initials: "JS",
    image_url: "/team/shekar_reddy.jpg",
    linkedin: "https://www.linkedin.com/in/shekar-reddy-junna-0b9a6534b/",
    order: 1,
  },
  {
    id: "2",
    name: "B. Anil Babu",
    role: "CEO & Director",
    group: "board",
    bio: "Leads end-to-end EPC delivery, manufacturing scale-up, and customer experience across residential, C&I and institutional segments.",
    initials: "AB",
    image_url: "/team/anil_babu.png",
    linkedin: "https://www.linkedin.com/in/anilb",
    order: 2,
  },
  {
    id: "3",
    name: "Junna Basvi Reddy",
    role: "Director",
    group: "board",
    bio: "Provides oversight and counsel on long-term strategy, governance and Junna's expansion across India.",
    initials: "BR",
    image_url: "/team/basvi_reddy.jpg",
    linkedin: null,
    order: 3,
  },
  {
    id: "4",
    name: "Narendar Reddy Idula",
    role: "Executive Director",
    group: "core",
    bio: "Oversees execution, partnerships and Junna's pan-India operations network.",
    initials: "NR",
    image_url: "/team/narendar_reddy.jpg",
    linkedin: null,
    order: 10,
  },
  {
    id: "5",
    name: "Chandrashekar B",
    role: "Senior VP — Projects",
    group: "core",
    bio: "Senior VP heading Commercial & Industrial project delivery across factories, offices, hospitals and ground-mount solar.",
    initials: "CB",
    image_url: "/team/chandrashekar_b.jpg",
    linkedin: "https://www.linkedin.com/in/chandrashekar-bhonagiri-313621100/",
    order: 11,
  },
  {
    id: "6",
    name: "G. Suresh Kumar",
    role: "VP — Projects",
    group: "core",
    bio: "Leads residential rooftop project delivery, subsidy guidance and customer success.",
    initials: "SK",
    image_url: "/team/suresh_kumar.jpg",
    linkedin: "https://www.linkedin.com/in/g-suresh-kumar-39206255/",
    order: 12,
  },
  {
    id: "7",
    name: "CA. Rajeswari Potla",
    role: "Finance Head",
    group: "core",
    bio: "Chartered Accountant leading finance, compliance and investor relations as Junna scales nationally.",
    initials: "RP",
    image_url: "/team/rajeswari_potla.jpg",
    linkedin: "https://www.linkedin.com/in/ca-rajeswari-potla-3130b5213/",
    order: 13,
  },
  {
    id: "8",
    name: "Junna Manoj Reddy",
    role: "Production Head",
    group: "core",
    bio: "Runs the 650 MW TopCon module manufacturing facility — quality, throughput and on-time delivery.",
    initials: "MR",
    image_url: "/team/manoj_reddy.jpg",
    linkedin: "https://www.linkedin.com/in/manojreddyjunna/",
    order: 14,
  },
];

/** Reusable board / leadership grid using static local data */
export const BoardGrid = ({ group, title, subtitle }) => {
  const members = BOARD_MEMBERS
    .filter((m) => !group || m.group === group)
    .sort((a, b) => a.order - b.order);

  return (
    <section data-testid={`board-grid-${group || "all"}`} className="container-js py-16 lg:py-24">
      <div className="max-w-2xl">
        {title && <h2 className="section-title">{title}</h2>}
        {subtitle && <p className="mt-4 text-[rgb(var(--js-muted))]">{subtitle}</p>}
      </div>

      <ul className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {members.map((m) => (
          <li
            key={m.id}
            data-testid={`member-${m.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            className="group relative overflow-hidden rounded-[28px] bg-white border border-[rgb(var(--js-border))] shadow-[0_1px_2px_rgba(22,29,27,0.04),0_18px_36px_-24px_rgba(22,29,27,0.18)] transition hover:-translate-y-1 hover:shadow-[0_28px_50px_-20px_rgba(22,29,27,0.28)]"
          >
            {/* Photo */}
            <div className="relative aspect-[4/5] overflow-hidden bg-[rgb(var(--js-bg-alt))]">
              {/* Gradient fallback behind image */}
              <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-[rgb(var(--js-text))] to-[rgb(var(--js-primary))]">
                <span className="serif-display text-6xl text-[rgb(var(--js-accent))]">
                  {m.initials || m.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                </span>
              </div>
              <img
                src={m.image_url}
                alt={m.name}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--js-text))]/60 via-transparent to-transparent pointer-events-none" />
              {/* LinkedIn badge */}
              {m.linkedin && m.linkedin !== "#" && (
                <a
                  href={m.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${m.name} on LinkedIn`}
                  className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/20 text-white backdrop-blur-sm transition hover:bg-[#0A66C2] hover:scale-110"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              )}
              {/* Name overlay on photo */}
              <div className="absolute left-4 right-4 bottom-4 text-white">
                <p className="font-semibold text-base leading-tight drop-shadow">{m.name}</p>
                <p className="text-[11px] text-white/80 mt-0.5 font-medium tracking-wide drop-shadow">{m.role}</p>
              </div>
            </div>
            {/* Bio card */}
            {m.bio && (
              <div className="px-5 py-4">
                <p className="text-[13px] leading-relaxed text-[rgb(var(--js-muted))]">{m.bio}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default BoardGrid;
