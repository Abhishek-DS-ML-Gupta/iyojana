import { motion } from "framer-motion";
import { ShieldCheck, Target, TrendingUp, Users, Heart, Award } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Purpose First",
    text: "We believe wealth is not just about numbers—it's about creating a life of security, freedom, and purpose.",
  },
  {
    icon: ShieldCheck,
    title: "Fiduciary Standard",
    text: "Every recommendation is tailored, thoughtful, and built with a long-term perspective. No product bias, ever.",
  },
  {
    icon: TrendingUp,
    title: "Discipline & Clarity",
    text: "Successful wealth management isn't about chasing trends—it's about discipline, clarity, and consistency.",
  },
  {
    icon: Users,
    title: "20+ Years of Trust",
    text: "Trusted partners to individuals and families navigating their financial journeys with simplicity and rigour.",
  },
  {
    icon: Target,
    title: "Goals Aligned",
    text: "We understand your life goals first, then align your finances to support them—seamlessly and transparently.",
  },
  {
    icon: Award,
    title: "Confident Future",
    text: "We don't just manage money. We help you build a future you can feel confident about.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 bg-mesh-light overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30"
           style={{ background: "radial-gradient(circle at 80% 20%, rgba(17,138,178,0.25), transparent 50%), radial-gradient(circle at 20% 80%, rgba(79,195,224,0.2), transparent 50%)" }} />

      <div className="container-x relative">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
            About Us
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            Our Experts Are the Finest
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            At iYojana, we don't just manage money. We help you build a future you can feel confident about.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border p-8 hover:border-transparent transition-all hover:-translate-y-1"
              style={{ boxShadow: "0 1px 0 rgba(15,76,129,0.04)" }}
            >
              <div aria-hidden className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                   style={{ padding: 1, background: "linear-gradient(135deg, #0F4C81, #118AB2, #4FC3E0)",
                            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                            WebkitMaskComposite: "xor", maskComposite: "exclude" }} />
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#118AB2] text-white shadow-lg shadow-[#0F4C81]/20 mb-5">
                <v.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#06172B] to-[#0F4C81] p-8 md:p-12 text-white"
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
