import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const FAQ = ({ items, title = "Questions, answered straight." }) => (
  <section className="container-js py-16 lg:py-24">
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-4">
        <span className="eyebrow">FAQ</span>
        <h2 className="section-title mt-3">{title}</h2>
        <p className="mt-3 text-sm text-[rgb(var(--js-muted))]">
          Don&apos;t see your question? WhatsApp us — a solar engineer will reply.
        </p>
      </div>
      <div className="lg:col-span-8">
        <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
          {items.map((it, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`} className="border-b border-[rgb(var(--js-border))]">
              <AccordionTrigger data-testid={`faq-q-${idx}`} className="text-left text-[15px] sm:text-base font-medium py-5">
                {it.q}
              </AccordionTrigger>
              <AccordionContent data-testid={`faq-a-${idx}`} className="text-sm text-[rgb(var(--js-muted))] leading-relaxed pb-5">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

export default FAQ;
