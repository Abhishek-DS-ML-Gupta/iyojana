import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const steps = [
  { n: "01", title: "Understanding your Goals and Risk Appetite" },
  { n: "02", title: "Review your Existing Portfolio" },
  { n: "03", title: "Build a Personalised Financial Plan" },
  { n: "04", title: "Implementation of the Plan" },
  { n: "05", title: "Monitor and Review" },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const pathLen = useTransform(scrollYProgress, [0.15, 0.85], [0, 1]);

  return (
    <section id="process" ref={ref} className="relative py-24 md:py-32 bg-[#06172B] text-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-30"
           style={{
             backgroundImage: "radial-gradient(circle at 20% 10%, rgba(17,138,178,0.4), transparent 40%), radial-gradient(circle at 90% 80%, rgba(79,195,224,0.25), transparent 40%)"
           }} />
      <div aria-hidden className="absolute inset-0 opacity-[0.06]"
           style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4FC3E0]" /> The Process
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-extrabold tracking-tight">
            A five-step financial plan shaped by <span className="text-gradient">20+ years of experience</span>
          </h2>
          <p className="mt-4 text-lg text-white/70">A rigorous, transparent method — refined over 20 years of practice.</p>
        </div>

        <div className="relative mt-16">
          {/* SVG timeline path */}
          <svg aria-hidden viewBox="0 0 1200 60" className="absolute left-0 right-0 top-8 h-14 w-full hidden md:block" preserveAspectRatio="none">
            <path d="M 40 40 Q 300 -10, 600 30 T 1160 20" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
            <motion.path
              d="M 40 40 Q 300 -10, 600 30 T 1160 20"
              stroke="url(#g1)" strokeWidth="3" fill="none"
              style={{ pathLength: pathLen }}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="g1" x1="0" x2="1">
                <stop offset="0" stopColor="#0F4C81" />
                <stop offset="0.5" stopColor="#118AB2" />
                <stop offset="1" stopColor="#4FC3E0" />
              </linearGradient>
            </defs>
          </svg>

          <ol className="grid gap-6 md:grid-cols-5 relative">
            {steps.map((s, i) => (
              <motion.li
                key={s.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl font-black text-transparent" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.35)" }}>
                    {s.n}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-[#4FC3E0] shadow-[0_0_20px_#4FC3E0]" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold leading-snug">{s.title}</h3>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
