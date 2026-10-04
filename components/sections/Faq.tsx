"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { FAQS } from "@/content/faq";

export function Faq() {
  return (
    <section aria-labelledby="faq-title" className="section border-t border-rule">
      <div className="wrap grid grid-1 gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <h2 id="faq-title">Questions people ask first</h2>
        <Accordion.Root type="single" collapsible className="ruled border-y border-rule">
          {FAQS.map((f, i) => (
            <Accordion.Item key={f.q} value={`q${i}`}>
              <Accordion.Header asChild>
                <h3>
                  <Accordion.Trigger className="group flex min-h-14 w-full items-center justify-between gap-6 py-3 text-left text-[1.0625rem] font-semibold hover:text-accent">
                    {f.q}
                    <span aria-hidden="true" className="relative size-3.5 shrink-0">
                      <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 bg-current" />
                      <span className="absolute top-0 left-1/2 h-full w-[1.5px] -translate-x-1/2 bg-current transition-transform duration-200 group-data-[state=open]:scale-y-0 motion-reduce:transition-none" />
                    </span>
                  </Accordion.Trigger>
                </h3>
              </Accordion.Header>
              <Accordion.Content className="faq-content overflow-hidden">
                <p className="max-w-[65ch] pb-5 text-ink-soft">{f.a}</p>
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </section>
  );
}
