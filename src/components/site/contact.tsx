import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitContactForm } from "@/lib/contact-form";
import { ArrowRight, CheckCircle2, Loader2, Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");
  const submit = useServerFn(submitContactForm);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setState("loading");
    const result = await submit({
      data: {
        firstName: (formData.get("firstName") as string) || "",
        lastName: (formData.get("lastName") as string) || "",
        email: (formData.get("email") as string) || "",
        phone: (formData.get("phone") as string) || "",
        purpose: (formData.get("purpose") as string) || "",
        message: (formData.get("message") as string) || "",
      },
    });

    if (result.success) {
      setState("done");
    } else {
      setState("idle");
    }
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 bg-aurora text-white overflow-hidden">
      <div aria-hidden className="absolute inset-0 opacity-40 blob-anim"
           style={{ background: "radial-gradient(50% 40% at 80% 20%, rgba(79,195,224,0.5), transparent 60%)" }} />
      <div className="container-x relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">Contact</span>
          <h2 className="mt-4 font-display text-4xl md:text-6xl font-extrabold tracking-tight">
            Let&apos;s design your <span className="shimmer-text">next decade.</span>
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-white/70 text-lg">
            One conversation. Zero pressure. Come with your questions — we&apos;ll come with the whiteboard.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <h3 className="font-display text-xl font-bold mb-6">Get in Touch</h3>
              <ul className="space-y-5 text-white/85">
                <li className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-[#4FC3E0] mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Office</div>
                    <div>Office 11, 1st Floor, Dosti Shoppe Link,</div>
                    <div>Dosti Acres, Antop Hill, Mumbai, Maharashtra 400037</div>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Phone className="h-5 w-5 text-[#4FC3E0] mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Phone</div>
                    <a href="tel:+919967571463" className="hover:text-[#4FC3E0] transition-colors">9967571463</a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <Mail className="h-5 w-5 text-[#4FC3E0] mt-0.5" />
                  <div>
                    <div className="font-semibold mb-1">Email</div>
                    <a href="mailto:supriyaa@iyojana.com" className="hover:text-[#4FC3E0] transition-colors">supriyaa@iyojana.com</a>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-xs text-white/50">AMFI Registration Number: ARN 44645</p>
                <p className="text-xs text-white/50 mt-1">Validity Period: 30/10/2024 to 04/01/2028</p>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <iframe
                title="iYojana Office Location"
                src="https://maps.google.com/maps?q=Dosti+Acres,Antop+Hill,Mumbai,Maharashtra+400037&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="280"
                style={{ border: 0, display: 'block' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {state === "done" ? (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col items-center py-16 text-center h-full">
                  <motion.span
                    initial={{ scale: 0 }} animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 220, damping: 14 }}
                    className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#2ECC71]/20 text-[#2ECC71]"
                  >
                    <CheckCircle2 className="h-8 w-8" />
                  </motion.span>
                  <h3 className="mt-6 font-display text-2xl font-bold">Message received.</h3>
                  <p className="mt-2 text-white/70">We will be in touch within one business day.</p>
                </motion.div>
              ) : (
                <motion.div key="form" exit={{ opacity: 0 }}>
                  <h3 className="font-display text-2xl font-bold mb-6">Book Your Consultation</h3>
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field label="First name" name="firstName" />
                      <Field label="Last name" name="lastName" />
                      <Field label="Email" name="email" type="email" />
                      <Field label="Phone" name="phone" />
                      <div className="sm:col-span-2">
                        <Field label="Purpose" name="purpose" />
                      </div>
                    </div>
                    <div>
                      <Field label="Leave us a message..." name="message" textarea />
                    </div>
                    <button
                      type="submit"
                      disabled={state === "loading"}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-[#0F4C81] shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-70"
                    >
                      {state === "loading" ? (<><Loader2 className="h-4 w-4 animate-spin" /> Sending…</>) :
                        (<>Book my discovery call <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></>)}
                    </button>
                    <p className="text-xs text-white/50">We reply within 1 business day. Your details stay confidential.</p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", textarea }: { label: string; name: string; type?: string; textarea?: boolean }) {
  return (
    <label className="relative block">
      {textarea ? (
        <textarea name={name} rows={3} className="peer w-full bg-transparent border-b border-white/20 pt-6 pb-2 text-white outline-none focus:border-[#4FC3E0] transition-colors" />
      ) : (
        <input name={name} type={type} className="peer w-full bg-transparent border-b border-white/20 pt-6 pb-2 text-white outline-none focus:border-[#4FC3E0] transition-colors" />
      )}
      <span className="pointer-events-none absolute left-0 transition-all top-6 text-white/60 peer-focus:top-0 peer-focus:text-xs peer-focus:text-[#4FC3E0]">
        {label}
      </span>
    </label>
  );
}
