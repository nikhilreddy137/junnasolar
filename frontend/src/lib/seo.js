import { useEffect } from "react";

const ORIGIN = (typeof window !== "undefined" && window.location?.origin) || "https://junnasolar.com";

function upsertMeta(attr, name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function useSEO({ title, description, path = "/", image, jsonLd, jsonLdId = "page-jsonld" }) {
  useEffect(() => {
    if (title) document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:url", `${ORIGIN}${path}`);
    if (image) upsertMeta("property", "og:image", image);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertLink("canonical", `${ORIGIN}${path}`);
    if (jsonLd) upsertJsonLd(jsonLdId, jsonLd);
  }, [title, description, path, image, jsonLd, jsonLdId]);
}

export const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Junna Solar",
  url: ORIGIN,
  logo: `${ORIGIN}/logo.svg`,
  sameAs: [],
  contactPoint: [{
    "@type": "ContactPoint",
    contactType: "sales",
    areaServed: "IN",
    availableLanguage: ["en", "hi", "te"],
  }],
};

export const LOCAL_BUSINESS_JSONLD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Junna Solar",
  url: ORIGIN,
  image: `${ORIGIN}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Hyderabad",
    addressRegion: "Telangana",
    addressCountry: "IN",
  },
};

export const faqJsonLd = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});
