import QuoteFormMultiStep from "@/components/QuoteFormMultiStep";
import { useSEO } from "@/lib/seo";

export default function Contact() {
  useSEO({
    title: "Book Free Rooftop Survey | Junna Solar",
    description: "Schedule a free rooftop solar survey with Junna Solar. Our team visits within 48 hours — no obligation.",
    path: "/contact",
  });
  return (
    <div style={{ background: "#FBF9F5", padding: "32px 0 0" }}>
      <div className="container-js" style={{ paddingTop: 24, paddingBottom: 8 }}>
        <h1 style={{ fontSize: "clamp(26px,3.2vw,36px)", color: "#1A2E4A", margin: 0, fontWeight: 700 }}>
          Book your free rooftop survey
        </h1>
        <p style={{ marginTop: 8, color: "#6B7280", maxWidth: 640 }}>
          Three quick steps. Junna Solar&apos;s engineer visits within 48 hours — at no cost, no obligation.
        </p>
      </div>
      <QuoteFormMultiStep compact />
    </div>
  );
}
