import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#calculator", label: "Calculator" },
  { href: "#stories", label: "Stories" },
  { href: "#insights", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "pt-3" : "pt-5"}`}>
      <div className="container-x">
        <nav
          className={`flex items-center justify-between rounded-full px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_10px_40px_-12px_rgba(15,76,129,0.18)]" : "bg-transparent"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 group">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0F4C81] to-[#118AB2] text-white font-bold shadow-lg">
              iY
              <span className="absolute inset-0 rounded-xl ring-1 ring-white/30" />
            </span>
            <span className="font-display font-bold text-lg tracking-tight">
              i<span className="text-gradient">Yojana</span>
            </span>
          </a>

          <ul className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group"
                >
                  {l.label}
                  <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#0F4C81] to-[#118AB2] transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href="#contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#118AB2] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(15,76,129,0.6)] hover:shadow-[0_16px_44px_-10px_rgba(15,76,129,0.7)] hover:-translate-y-0.5 transition-all"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-full glass"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-x mt-2 lg:hidden"
          >
            <div className="glass rounded-3xl p-4 shadow-xl">
              <ul className="flex flex-col">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04 } }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-accent"
                    >
                      <span className="font-medium">{l.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </a>
                  </motion.li>
                ))}
                <li className="pt-2">
                  <a
                    href="#contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#118AB2] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Book Consultation <ArrowRight className="h-4 w-4" />
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
