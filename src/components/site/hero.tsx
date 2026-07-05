import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import heroImg from "@/assets/hero-finance.jpg";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const headline = "The Power of Good Advice";
  const words = headline.split(" ");

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-aurora noise">
      {/* Animated blobs */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 h-[520px] w-[520px] rounded-full blur-3xl opacity-60 blob-anim"
          style={{ background: "radial-gradient(circle, rgba(17,138,178,0.55), transparent 60%)" }} />
        <div className="absolute top-1/3 -right-32 h-[560px] w-[560px] rounded-full blur-3xl opacity-50 blob-anim"
          style={{ background: "radial-gradient(circle, rgba(79,195,224,0.45), transparent 60%)", animationDelay: "-6s" }} />
        <div className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage: "radial-gradient(ellipse at 50% 40%, black 40%, transparent 75%)",
          }} />
        <div className="noise-overlay" />
      </div>

      <motion.div style={{ y, opacity }} className="container-x relative z-10 pt-36 md:pt-40 pb-24 md:pb-32">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full glass-dark px-4 py-1.5 text-xs md:text-sm text-white/90"
            >
              AMFI registered MFD & IRDAI Insurance Advisor
            </motion.div>

            <h1 className="mt-6 font-display text-white text-[clamp(2.6rem,6.4vw,5.5rem)] leading-[1.02] font-extrabold tracking-tight">
              {words.map((w, wi) => (
                <span key={wi} className="inline-block overflow-hidden align-top mr-[0.25em]">
                  <motion.span
                    className="inline-block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.15 + wi * 0.08, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-6 max-w-xl text-lg text-white/75 leading-relaxed"
            >
              Our Goal is to make complex financial matters feel simple, structured and stress free
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <a href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#0F4C81] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-0.5 transition-all">
                Speak to an Expert
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/10 backdrop-blur transition-colors">
                Our Services
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              className="mt-10 flex flex-wrap items-center gap-6 text-white/70"
            >
            </motion.div>
          </div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/3] w-full">
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden ring-1 ring-white/15 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
                <img src={heroImg} alt="Portfolio dashboard visualization" className="h-full w-full object-cover" />
              </div>

              {/* Floating cards */}
              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.7 }}
                className="absolute -left-4 md:-left-10 top-8 glass-dark rounded-2xl p-4 text-white float-slow"
              >
                <div className="text-xs text-white/60">Portfolio IRR</div>
                <div className="mt-1 flex items-baseline gap-2">
                  <div className="text-2xl font-bold">14.8%</div>
                  <span className="text-xs text-[#4FC3E0]">+2.3%</span>
                </div>
                <svg viewBox="0 0 100 30" className="mt-1 h-8 w-32">
                  <motion.path
                    d="M0,22 L15,18 L30,20 L45,12 L60,15 L75,8 L100,4"
                    fill="none" stroke="#4FC3E0" strokeWidth="2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 1.6, delay: 1.2 }}
                  />
                </svg>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.15, duration: 0.7 }}
                className="absolute -right-3 md:-right-8 bottom-6 glass-dark rounded-2xl p-4 text-white float-slow"
                style={{ animationDelay: "-3s" }}
              >
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#0F4C81] to-[#118AB2]">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <div>
                    <div className="text-xs text-white/60">Retirement Plan</div>
                    <div className="text-sm font-semibold">On Track · 92%</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-white/60">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="h-8 w-[1px] bg-gradient-to-b from-white/70 to-transparent" />
        </div>
      </div>
    </section>
  );
}
