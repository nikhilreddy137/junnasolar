import { useSearchParams } from "react-router-dom";
import LeadForm from "@/components/LeadForm";
import { useSEO, LOCAL_BUSINESS_JSONLD } from "@/lib/seo";
import { Phone, Mail, MapPin, MessageCircle, Clock, ExternalLink, Factory } from "lucide-react";
import { BRAND, WHATSAPP_URL } from "@/lib/brand";
import { track, EVENTS } from "@/lib/analytics";

export default function Contact() {
  const [params] = useSearchParams();
  const intent = params.get("action") || "general";

  useSEO({
    title: "Contact Junna Solar — Toll-free 1800 890 6987",
    description:
      "Get in touch with Junna Solar to book a free rooftop survey. Toll-free 1800 890 6987 · WhatsApp · email info@junnasolar.com · Hyderabad offices.",
    path: "/contact",
    jsonLd: LOCAL_BUSINESS_JSONLD,
  });

  const title = intent === "survey"
    ? "Get a free rooftop assessment"
    : intent === "subsidy"
    ? "Check subsidy & savings"
    : "Talk to a Junna solar expert";

  return (
    <>
      <section className="relative bg-dusk">
        <div className="container-js relative pt-14 pb-10 lg:pt-24 lg:pb-16">
          <span className="eyebrow">Contact Junna Solar</span>
          <h1 className="mt-4 serif-display text-[44px] sm:text-6xl lg:text-[76px] leading-[1.0] font-medium tracking-tight max-w-3xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-[rgb(var(--js-muted))] text-base sm:text-lg">
            Share a few details and a Junna solar expert will reach out within one business day. No payment, no obligation.
          </p>

          {/* Toll-free banner */}
          <div className="mt-8 inline-flex flex-wrap items-center gap-x-6 gap-y-3 rounded-full border border-[rgb(var(--js-border))] bg-[rgb(var(--js-bg))] px-6 py-3.5">
            <a
              href={BRAND.phoneTollHref}
              onClick={() => track(EVENTS.CALL, { location: "contact_banner", number: "tollfree" })}
              data-testid="contact-tollfree"
              className="flex items-center gap-2 text-[rgb(var(--js-text))]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[rgb(var(--js-accent))] text-white">
                <Phone className="h-3.5 w-3.5" />
              </span>
              <span>
                <span className="block text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--js-muted))]">Toll-free</span>
                <span className="serif-display text-xl">{BRAND.phoneToll}</span>
              </span>
            </a>
            <span className="hidden sm:block h-8 w-px bg-[rgb(var(--js-border))]" />
            <a
              href={BRAND.phoneMobileHref}
              onClick={() => track(EVENTS.CALL, { location: "contact_banner", number: "mobile" })}
              data-testid="contact-mobile"
              className="flex items-center gap-2 text-[rgb(var(--js-text))]"
            >
              <Phone className="h-4 w-4 text-[rgb(var(--js-muted))]" />
              <span className="font-medium">{BRAND.phoneMobile}</span>
            </a>
            <span className="hidden sm:block h-8 w-px bg-[rgb(var(--js-border))]" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              onClick={() => track(EVENTS.WHATSAPP, { location: "contact_banner" })}
              data-testid="contact-wa-banner"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#1FA855]"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp us
            </a>
          </div>
        </div>
      </section>

      <section className="container-js py-12 lg:py-20 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 space-y-3">
          <InfoCard icon={Mail} label="Sales & enquiries" value={BRAND.email} href={`mailto:${BRAND.email}`} />
          <InfoCard icon={Mail} label="Marketing & partnerships" value={BRAND.emailMarketing} href={`mailto:${BRAND.emailMarketing}`} />
          <InfoCard icon={Clock} label="Hours" value="Mon – Sat, 9 AM – 7 PM IST" />
          <InfoCard icon={MessageCircle} label="WhatsApp" value="Chat instantly with our team" href={WHATSAPP_URL} highlight />

          <div className="pt-3">
            <h3 className="serif-display text-xl text-[rgb(var(--js-text))]">Our offices</h3>
            <p className="text-sm text-[rgb(var(--js-muted))]">Walk-in welcome with prior appointment.</p>
            <ul className="mt-4 space-y-3">
              {BRAND.offices.map((o, i) => (
                <li key={i} className="card-js !p-5">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[rgb(var(--js-bg-alt))] text-[rgb(var(--js-accent))]">
                      {i === 2 ? <Factory className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                    </span>
                    <div className="flex-1">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-[rgb(var(--js-muted))]">{o.label}</p>
                      <p className="mt-0.5 font-semibold text-[rgb(var(--js-text))]">{o.city}</p>
                      <p className="mt-1.5 text-[13.5px] text-[rgb(var(--js-muted))] leading-relaxed">{o.addr}</p>
                      {o.sub && <p className="mt-1 text-[12px] text-[rgb(var(--js-accent))] font-medium">{o.sub}</p>}
                      <a
                        href={`https://www.google.com/maps?q=${encodeURIComponent(o.mapQuery)}`}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`map-${o.label.toLowerCase().replace(/\s+/g, '-')}`}
                        className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-[rgb(var(--js-text))] link-underline"
                      >
                        Open in Maps <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="overflow-hidden rounded-3xl border border-[rgb(var(--js-border))] aspect-[4/3] bg-[rgb(var(--js-bg-alt))]">
            <iframe
              title="Junna Solar — Head Office, Hyderabad"
              src={`https://www.google.com/maps?q=${encodeURIComponent(BRAND.offices[0].mapQuery)}&output=embed`}
              loading="lazy"
              className="h-full w-full border-0"
            />
          </div>

          <p className="text-[11px] text-[rgb(var(--js-muted))] mt-2">
            Service areas: {BRAND.serviceAreas.join(" · ")}.
          </p>
        </div>

        <div className="lg:col-span-7">
          <LeadForm
            defaultSegment={params.get("segment") || "home"}
            source={intent}
            title={title}
            subtitle="A solar expert will review your details and contact you within one business day."
          />
        </div>
      </section>
    </>
  );
}

const InfoCard = ({ icon: Icon, label, value, href, highlight }) => {
  const inner = (
    <div className={`card-js !p-5 flex items-center gap-4 ${highlight ? "border-[rgb(var(--js-accent))]/30 bg-[rgb(var(--js-accent))]/5" : ""}`}>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[rgb(var(--js-bg-alt))] text-[rgb(var(--js-accent))]">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="text-[10px] uppercase tracking-[0.22em] text-[rgb(var(--js-muted))]">{label}</p>
        <p className="mt-0.5 text-[15px] font-semibold text-[rgb(var(--js-text))]">{value}</p>
      </div>
    </div>
  );
  if (!href) return inner;
  const isExternal = href.startsWith("https://wa.me") || href.startsWith("https://");
  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      data-testid={`contact-info-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className="block"
    >
      {inner}
    </a>
  );
};
