import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import CountUpNS from "react-countup";
const CountUp = CountUpNS.default;
import { useInView } from "react-intersection-observer";

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-mesh-light overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30"
           style={{ background: "radial-gradient(circle at 80% 20%, rgba(17,138,178,0.25), transparent 50%), radial-gradient(circle at 20% 80%, rgba(79,195,224,0.2), transparent 50%)" }} />

      <div className="container-x relative">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
            About Us
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            Building a future you can feel <span className="text-gradient">confident about</span>
          </h2>
        </div>

        {/* Stats white band */}
        <StatsRow />

        {/* Vision & Mission */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:border-transparent transition-all hover:-translate-y-1"
            style={{ boxShadow: "0 1px 0 rgba(15,76,129,0.04)" }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                 style={{ padding: 1, background: "linear-gradient(135deg, #0F4C81, #118AB2, #4FC3E0)",
                          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                          WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#118AB2] text-white shadow-lg shadow-[#0F4C81]/20 mb-5">
              <Target className="h-6 w-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Our Mission</div>
            <h3 className="font-display text-xl font-bold mb-3">Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              Empowering investors to map, track and crack milestones through tailor made plans.
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:border-transparent transition-all hover:-translate-y-1"
            style={{ boxShadow: "0 1px 0 rgba(15,76,129,0.04)" }}
          >
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                 style={{ padding: 1, background: "linear-gradient(135deg, #0F4C81, #118AB2, #4FC3E0)",
                          WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                          WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#118AB2] text-white shadow-lg shadow-[#0F4C81]/20 mb-5">
              <Eye className="h-6 w-6" />
            </div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-2">Our Vision</div>
            <h3 className="font-display text-xl font-bold mb-3">Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To make disciplined financial planning a way of life for every individual.
            </p>
          </motion.div>
        </div>

        {/* Blue banner — retained at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06172B] to-[#0F4C81] p-8 md:p-12 text-white"
        >
          <div className="relative z-10 max-w-3xl">
            <h3 className="font-display text-2xl md:text-3xl font-extrabold">
              With over 20 years of experience, we have been trusted partners to individuals and families in navigating their financial journeys.
            </h3>
            <p className="mt-4 text-white/75 leading-relaxed">
              Our approach is simple yet powerful: understand your life goals first, and then align your finances to support them. We offer a comprehensive suite of services including wealth management, retirement planning, insurance planning, estate planning and other services — designed to work together seamlessly.
            </p>
          </div>
          <div aria-hidden className="absolute -right-16 -bottom-16 h-64 w-64 rounded-full bg-[#4FC3E0]/20 blur-3xl" />
        </motion.div>
      </div>
    </section>
  );
}

function StatsRow() {
  const stats = [
    { v: 600, s: "+ cr", label: "AUE" },
    { v: 20, s: "+", label: "Years of Experience" },
    { v: 300, s: "+", label: "Clients" },
  ];
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  return (
    <div ref={ref} className="mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-3 rounded-3xl border border-border bg-white overflow-hidden shadow-sm">
        {stats.map((st, i) => (
          <div key={i} className={`relative p-8 flex flex-col items-center justify-center text-center ${i < stats.length - 1 ? "border-b sm:border-b-0 sm:border-r border-border" : ""}`}>
            <div className="font-display text-4xl md:text-5xl font-black text-primary">
              {inView ? <CountUp end={st.v} duration={2} separator="," /> : 0}
              <span>{st.s}</span>
            </div>
            <div className="mt-2 text-sm font-semibold text-muted-foreground uppercase tracking-wider">{st.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
