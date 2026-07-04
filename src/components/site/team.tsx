import { motion } from "framer-motion";
import { User, Users } from "lucide-react";
import founderImg from "@/assets/founder.jpg";
import analystImg from "@/assets/analyst.jpg";
import marketImg from "@/assets/market.jpg";

const team = [
  {
    name: "Supriyaa Kubal",
    role: "Founder",
    img: founderImg,
    alt: "Supriyaa Kubal",
  },
  {
    name: "Jinal Mehta",
    role: "Marketing",
    img: marketImg,
    alt: "Jinal Mehta",
  },
  {
    name: "Aditya Hirve",
    role: "Research Analyst",
    img: analystImg,
    alt: "Aditya Hirve",
  },
];

export function Team() {
  return (
    <section id="team" className="relative py-24 md:py-32 bg-mesh-light">
      <div className="container-x">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
            Meet The Team
          </span>
          <h2 className="mt-4 font-display text-4xl md:text-5xl font-extrabold tracking-tight">
            People who care about <span className="text-gradient">your money</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Our dedicated team combines deep financial expertise with a personalised approach to help clients build, protect, and grow their wealth.
          </p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl bg-card border border-border p-6 text-center"
            >
              <div className="mx-auto h-24 w-24 rounded-full bg-gradient-to-br from-[#0F4C81] to-[#118AB2] flex items-center justify-center text-white overflow-hidden">
                {m.img ? (
                  <img src={m.img} alt={m.alt} className="h-full w-full object-cover" />
                ) : (
                  <User className="h-10 w-10" />
                )}
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{m.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
