import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  { name: "Ananya & Vikram S.", role: "Bengaluru · Tech leads", body: "We finally understand our money. The written plan gave us a shared language and a real path to FI by 50." },
  { name: "Dr. Priya Nair", role: "Kochi · Physician", body: "Zero product bias. Clear fees. My insurance and MF portfolio were rebuilt from first principles — I sleep better." },
  { name: "Rajat Bansal", role: "Delhi · Founder", body: "Quarterly reviews are the calmest hour of my quarter. iYojana treats my family's plan as seriously as my cap table." },
  { name: "Meera Iyer", role: "Pune · CFO", body: "Even as a finance professional, I outsource my own planning here. Rigour, discipline, no noise." },
  { name: "Karthik R.", role: "Chennai · Consultant", body: "The retirement model showed me trade-offs I'd never considered. Decisions became obvious." },
];

export function Testimonials() {
  const [ref, api] = useEmblaCarousel({ loop: true, align: "start" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSel = () => setIndex(api.selectedScrollSnap());
    api.on("select", onSel); onSel();
    const id = setInterval(() => api.scrollNext(), 5000);
    return () => { clearInterval(id); api.off("select", onSel); };
  }, [api]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);

  return (
    <section id="stories" className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">Success stories</span>
            <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
              Real families. <span className="text-gradient">Real outcomes.</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button aria-label="Previous testimonial" onClick={scrollPrev}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-accent transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button aria-label="Next testimonial" onClick={scrollNext}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-accent transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-12 overflow-hidden" ref={ref}>
          <div className="flex gap-6">
            {testimonials.map((t, i) => (
              <motion.blockquote
                key={i}
                whileHover={{ y: -4 }}
                className="min-w-[86%] md:min-w-[46%] lg:min-w-[32%] rounded-3xl border border-border bg-card p-8"
              >
                <div className="flex gap-0.5 text-[#F4A261]">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-4 text-lg leading-relaxed">&ldquo;{t.body}&rdquo;</p>
                <footer className="mt-6">
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </footer>
              </motion.blockquote>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-1.5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-8 bg-primary" : "w-2 bg-border"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
