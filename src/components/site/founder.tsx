import { motion } from "framer-motion";
import CountUpNS from "react-countup";
const CountUp = CountUpNS.default;
import { useInView } from "react-intersection-observer";
import founderImg from "@/assets/founder.jpg";
import { Award, CheckCircle2, Quote } from "lucide-react";

export function Founder() {
  return (
    <section id="founder" className="relative py-24 md:py-32 bg-mesh-light">
      <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-[2rem] ring-1 ring-border">
            <img src={founderImg} alt="Supriyaa Kubal" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F4C81]/90 via-[#0F4C81]/30 to-transparent p-6 text-white">
              <div className="text-xs uppercase tracking-[0.25em] text-white/70">Founder</div>
              <div className="mt-1 font-display text-2xl font-bold">Supriyaa Kubal</div>
            </div>
          </div>
          <div className="glass absolute -right-4 -bottom-6 hidden md:flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl">
            <Award className="h-5 w-5 text-[#118AB2]" />
            <div>
              <div className="text-xs text-muted-foreground">AMFI Registered</div>
              <div className="text-sm font-semibold">ARN 44645</div>
            </div>
          </div>
        </motion.div>

        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">Founder</span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            Advice that answers to <span className="text-gradient">you</span>, not a product.
          </h2>
          <div className="mt-6 relative rounded-3xl border border-border bg-card p-6 md:p-8">
            <Quote className="absolute -top-4 left-6 h-8 w-8 text-[#118AB2]" />
            <p className="text-lg leading-relaxed text-foreground/85">
              At iYojana, we believe wealth is not just about numbers—it’s about creating a life of security, freedom, and purpose. With over 20 years of experience, we have been trusted partners to individuals and families in navigating their financial journeys.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {["Fiduciary, fee-only", "Direct plans only", "Written plan, always", "20+ years, 600+ families"].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-[#118AB2]" />{p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Stats />
    </section>
  );
}

function Stats() {
  const stats = [
    { v: 20, s: "+", label: "Years of experience" },
    { v: 900, s: "+", label: "Crores of AUA" },
    { v: 600, s: "+", label: "Clients" },
  ];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="container-x mt-20">
      <div className="grid grid-cols-2 md:grid-cols-4 rounded-3xl border border-border bg-card overflow-hidden">
        {stats.map((st, i) => (
          <div key={i} className="relative p-8 border-r border-b md:border-b-0 border-border last:border-r-0">
            <div className="font-display text-4xl md:text-5xl font-black text-primary">
              {inView ? <CountUp end={st.v} duration={2} separator="," /> : 0}
              <span>{st.s}</span>
            </div>
            <div className="mt-2 text-sm text-muted-foreground">{st.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
