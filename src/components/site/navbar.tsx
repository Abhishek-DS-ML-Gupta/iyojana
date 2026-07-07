import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

const hashLinks = [
  { hash: "services", label: "Services" },
  { hash: "process", label: "Process" },
  { hash: "stories", label: "Stories" },
  { hash: "insights", label: "Insights" },
  { hash: "contact", label: "Contact" },
];

/** Returns the correct href for a hash-link depending on current page */
function useHashHref(hash: string) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  // If we're on the home page, just jump to the anchor.
  // On any other page, navigate to home first then scroll to anchor.
  return pathname === "/" ? `#${hash}` : `/#${hash}`;
}

/** A nav link that works correctly from any page */
function NavHashLink({
  hash,
  label,
  className,
  onClick,
  children,
}: {
  hash: string;
  label?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  const href = useHashHref(hash);
  return (
    <a href={href} className={className} onClick={onClick}>
      {children ?? label}
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const logoEl = (
    <>
      <img
        src={logo}
        alt="i-Yojana Logo"
        className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg tracking-tight leading-tight">
          <span className="text-gradient">i</span><span className="text-gradient">-Yojana</span>
        </span>
        <span className="text-[9px] font-semibold tracking-[0.18em] uppercase text-gradient leading-tight">
          Plan / Execute / Review
        </span>
      </div>
    </>
  );

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "pt-3" : "pt-5"}`}>
      <div className="container-x">
        <nav
          className={`flex items-center justify-between rounded-full px-4 md:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass shadow-[0_10px_40px_-12px_rgba(15,76,129,0.18)]" : "bg-transparent"
          }`}
        >
          {/* Logo — Link to "/" from other pages, #top on home */}
          {isHome ? (
            <a href="#top" className="flex items-center gap-3 group">
              {logoEl}
            </a>
          ) : (
            <Link to="/" className="flex items-center gap-3 group">
              {logoEl}
            </Link>
          )}

          {/* Desktop nav links */}
          <ul className="hidden lg:flex items-center gap-1">
            {hashLinks.map((l) => (
              <li key={l.hash}>
                <NavHashLink
                  hash={l.hash}
                  label={l.label}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors group block"
                >
                  {l.label}
                  <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#0F4C81] to-[#118AB2] transition-transform duration-300 group-hover:scale-x-100" />
                </NavHashLink>
              </li>
            ))}
            <li>
              <Link
                to="/calculator"
                className={`relative px-4 py-2 text-sm font-medium transition-colors group block ${
                  pathname === "/calculator"
                    ? "text-primary font-semibold"
                    : "text-foreground/80 hover:text-foreground"
                }`}
              >
                Calculator
                <span className="absolute left-4 right-4 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#0F4C81] to-[#118AB2] transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            {/* Book Consultation — works from any page */}
            <NavHashLink
              hash="contact"
              className="hidden md:inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#118AB2] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(15,76,129,0.6)] hover:shadow-[0_16px_44px_-10px_rgba(15,76,129,0.7)] hover:-translate-y-0.5 transition-all"
            >
              Book Consultation
              <ArrowRight className="h-4 w-4" />
            </NavHashLink>

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

      {/* Mobile menu */}
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
                {hashLinks.map((l, i) => (
                  <motion.li
                    key={l.hash}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04 } }}
                  >
                    <NavHashLink
                      hash={l.hash}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-accent"
                    >
                      <span className="font-medium">{l.label}</span>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </NavHashLink>
                  </motion.li>
                ))}

                <motion.li
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0, transition: { delay: hashLinks.length * 0.04 } }}
                >
                  <Link
                    to="/calculator"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-accent"
                  >
                    <span className="font-medium">Calculator</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </motion.li>

                <li className="pt-2">
                  <NavHashLink
                    hash="contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#118AB2] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Book Consultation <ArrowRight className="h-4 w-4" />
                  </NavHashLink>
                </li>
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
