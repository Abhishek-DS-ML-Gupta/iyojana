import { motion } from "framer-motion";
import {
  TrendingUp, ShieldCheck, PiggyBank, Landmark, AlertTriangle, Target,
  BookOpen, Coins, BarChart3, LineChart, Building2, FileText,
} from "lucide-react";

const services = [
  { icon: AlertTriangle, title: "Contingency Planning", desc: "Build a robust emergency fund and safety net tailored to your lifestyle and obligations.", tag: "Safety" },
  { icon: ShieldCheck, title: "Insurance Planning", desc: "Life, term, health and general insurance — structured with zero product bias to protect what matters most.", tag: "Protect" },
  { icon: Target, title: "Goal Based Investment Planning", desc: "Align every rupee to a purpose — home, education, wedding, or any life milestone you envision.", tag: "Goals" },
  { icon: PiggyBank, title: "Retirement Planning", desc: "Pension planning, corpus structuring, and income planning for a secure and comfortable golden era.", tag: "Golden Years" },
  { icon: Landmark, title: "Estate Planning", desc: "Succession planning, will & trust advisory, and estate optimisation passed on with dignity.", tag: "Legacy" },
];

const products = [
  { icon: TrendingUp, title: "Mutual Funds", desc: "Diversified equity, debt and hybrid funds for every risk appetite and time horizon." },
  { icon: BarChart3, title: "Portfolio Management Services (PMS)", desc: "Professionally managed, customised equity portfolios for high-net-worth investors." },
  { icon: LineChart, title: "Alternative Investment Fund (AIF)", desc: "Access to curated alternative strategies — private equity, real assets and more." },
  { icon: BookOpen, title: "Specialised Investment Fund (SIF)", desc: "Disciplined, specialised investment strategies designed for long-term wealth creation." },
  { icon: Building2, title: "Insurance", desc: "Comprehensive insurance products spanning life, health and general insurance." },
  { icon: FileText, title: "Bonds", desc: "Fixed income and government bonds to stabilise your portfolio and generate predictable returns." },
];

export function Services() {
  return (
    <section id="services" className="relative py-24 md:py-32 bg-mesh-light">
      <div className="container-x">
        {/* Section label */}
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" /> What we do
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-extrabold tracking-tight">
            Services and products <span className="text-gradient">designed around your life</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Five core practice areas. One coherent plan. All aligned to a single fiduciary standard — Devashree.
          </p>
        </div>

        {/* ── SERVICES ── */}
        <div className="mt-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-6">Services</h3>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                <h4 className="mt-6 font-display text-xl font-bold">{s.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>

        {/* ── PRODUCTS ── */}
        <div className="mt-20">
          <h3 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">Products</h3>
          <p className="text-muted-foreground text-base mb-6">A curated shelf of financial instruments — each selected to serve your plan.</p>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06172B] to-[#0F4C81] p-7 border border-white/10 hover:border-[#4FC3E0]/40 transition-all hover:-translate-y-1 text-white"
              >
                <div aria-hidden className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"
                     style={{ background: "radial-gradient(circle, rgba(79,195,224,0.35), transparent 65%)" }} />

                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-[#4FC3E0] border border-white/10 mb-5">
                  <p.icon className="h-6 w-6" />
                </div>
                <h4 className="font-display text-lg font-bold text-white">{p.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
