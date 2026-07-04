import { motion } from "framer-motion";
import {
  TrendingUp, ShieldCheck, PiggyBank, Landmark,
} from "lucide-react";

const services = [
  { icon: TrendingUp, title: "Wealth Management", desc: "Portfolio Analysis, Investment Advisory, and Risk Profiling & Suitability tailored to your financial goals.", tag: "Wealth" },
  { icon: ShieldCheck, title: "Insurance Planning", desc: "Life & Term Insurance, Health Insurance, and General Insurance with no product bias.", tag: "Protect" },
  { icon: PiggyBank, title: "Retirement Planning", desc: "Pension Planning, Corpus Structuring, and Income Planning for a secure golden years.", tag: "Golden Years" },
  { icon: Landmark, title: "Estate Planning", desc: "Succession Planning, Will & Trust Advisory, and Estate Optimisation passed on with dignity.", tag: "Legacy" },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-mesh-light">
      <div className="container-x">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> What we do
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-extrabold tracking-tight">
            Services designed <span className="text-gradient">around your life</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Four core practice areas. One coherent plan. All aligned to a single fiduciary standard.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <motion.article
              key={s.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative overflow-hidden rounded-3xl bg-card p-7 border border-border hover:border-transparent transition-all hover:-translate-y-1"
              style={{ boxShadow: "0 1px 0 rgba(15,76,129,0.04)" }}
            >
              {/* Gradient border on hover */}
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ padding: 1, background: "linear-gradient(135deg, #0F4C81, #118AB2, #4FC3E0)",
                            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                            WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
              <div aria-hidden className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"
                   style={{ background: "radial-gradient(circle, rgba(17,138,178,0.35), transparent 65%)" }} />

              <div className="flex items-center justify-between">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#118AB2] text-white shadow-lg shadow-[#0F4C81]/20">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{s.tag}</span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
