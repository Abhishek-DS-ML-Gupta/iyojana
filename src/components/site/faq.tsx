import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  { q: "Are you fee-only or commission-based?", a: "Fee-only. We are compensated exclusively by our clients, never by product manufacturers. All investments are placed via direct plans." },
  { q: "What is the minimum engagement?", a: "We work best with families that value a written plan. Retainers start at ₹36,000/year and scale with complexity, never with AUM." },
  { q: "Can you serve NRIs?", a: "Yes. We serve NRIs across GCC, UK, US and Singapore with jurisdiction-aware planning and coordinated tax counsel." },
  { q: "How do reviews work?", a: "Quarterly deep-dives, monthly cash-flow check-ins, and always-on email for changes. Every action is logged in your plan." },
  { q: "What if my situation changes?", a: "Plans are living documents. Job change, new goal, illness — we re-run the model and update in one working week." },
];

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="insights" className="py-24 md:py-32 bg-mesh-light">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">FAQ</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            Straight answers <span className="text-gradient">to real questions</span>
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
