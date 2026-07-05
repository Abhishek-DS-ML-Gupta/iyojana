import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "What financial services do you provide?",
    a: "We offer financial planning, mutual fund investments, insurance solutions, retirement planning, tax-saving strategies, and wealth management tailored to your financial goals.",
  },
  {
    q: "Can I start investing with a small amount?",
    a: "Yes. You can begin your investment journey with SIPs starting from as little as ₹500 per month, making it easy to build wealth consistently over time.",
  },
  {
    q: "How do you help me choose the right investment plan?",
    a: "We assess your financial goals, risk appetite, investment horizon, and current financial situation to recommend personalized investment and insurance solutions.",
  },
  {
    q: "How often is my portfolio reviewed?",
    a: "We regularly review your portfolio and recommend changes whenever needed to ensure it stays aligned with your financial goals and changing market conditions.",
  },
  {
    q: "How can I get started?",
    a: "Simply book a free consultation through our website or contact us directly. We'll understand your financial objectives and create a personalized roadmap to help you achieve them.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="insights" className="py-24 md:py-32 bg-mesh-light">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">FAQ</span>
<h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            Clear answers to your investment and insurance queries
          </h2>
          <p className="mt-4 text-muted-foreground max-w-md">
            Still curious? Book a free 30-minute discovery call — no obligation, no pitch.
          </p>
          <a href="#contact" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:-translate-y-0.5 transition">
            Book discovery call
          </a>
        </div>

        <ul className="rounded-3xl border border-border bg-card overflow-hidden">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={i} className="border-b border-border last:border-b-0">
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left"
                >
                  <span className="font-display text-lg font-semibold">{f.q}</span>
                  <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border transition-all ${isOpen ? "bg-primary text-primary-foreground rotate-45 border-transparent" : ""}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
