import { motion } from "framer-motion";
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
    <section
      id="team"
      className="relative py-24 md:py-32 bg-mesh-light overflow-hidden"
    >
      <div className="container-x">
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-flex items-center rounded-full bg-accent px-4 py-1.5 text-xs font-semibold tracking-wide text-primary uppercase">
            Meet The Team
          </span>

          <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            People who care about{" "}
            <span className="text-gradient">your money</span>
          </h2>

          <p className="mt-5 text-lg text-muted-foreground">
            Our dedicated team combines deep financial expertise with a
            personalised approach to help clients build, protect, and grow their
            wealth.
          </p>
        </div>

        {/* Team Cards */}
        <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}
              whileHover={{ y: -10 }}
              className="group rounded-3xl border border-border bg-card p-7 shadow-md transition-all duration-500 hover:shadow-2xl hover:border-primary/20"
            >
              {/* Image */}
              <div className="mx-auto w-52 aspect-[223/366] overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
                <img
                  src={member.img}
                  alt={member.alt}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <h3 className="mt-6 text-center font-display text-2xl font-bold text-foreground">
                {member.name}
              </h3>

              {/* Role */}
              <p className="mt-2 text-center text-primary font-medium">
                {member.role}
              </p>

              {/* Divider */}
              <div className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#118AB2]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}