import { motion } from "framer-motion";

const clients = ["DOCTORS", "LAWYERS", "PROFESSIONALS", "NRI'S", "BUSINESS OWNERS", "CXO'S"];

export function LogoMarquee() {
  const items = [...clients, ...clients];
  return (
    <section aria-label="Happy clients" className="border-y border-border bg-background/60 py-8">
      <div className="container-x mb-4 flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Our Happy Clients</p>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-[200%] items-center gap-14 whitespace-nowrap">
          {items.map((l, i) => (
            <motion.span
              key={i}
              whileHover={{ scale: 1.05, color: "#0F4C81" }}
              className="font-display text-2xl md:text-3xl font-bold tracking-tight text-muted-foreground/70"
            >
              {l}
            </motion.span>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}
