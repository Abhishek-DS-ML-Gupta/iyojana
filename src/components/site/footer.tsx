function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 19V5" />
      <path d="M5 12l7-7 7 7" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-[#06172B] text-white overflow-hidden">
      <svg viewBox="0 0 1440 80" className="block w-full text-[#06172B]" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0,32 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z" />
      </svg>

      <div className="container-x pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#118AB2] text-white font-bold text-lg shadow-lg shadow-[#0F4C81]/20">iY</span>
              <span className="font-display text-3xl font-bold">i<span className="text-gradient">Yojana</span></span>
            </div>
            <p className="mt-6 max-w-md text-white/60 leading-relaxed text-lg">
              Office 11, 1st Floor, Dosti Shoppe Link, Dosti Acres, Antop Hill, Mumbai, Maharashtra 400037
            </p>
            <div className="mt-4 space-y-1.5 text-white/60">
              <p>Tel: 9967571463</p>
              <p>Email: supriyaa@iyojana.com</p>
            </div>
            <p className="mt-4 text-xs text-white/40">AMFI Registration Number: ARN 44645</p>
            <p className="mt-1 text-xs text-white/40">Validity Period: 30/10/2024 to 04/01/2028</p>

            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-3">Follow us</p>
              <div className="flex items-center gap-3">
                <SocialLink href="https://www.facebook.com/iYojanaFinancials/" label="Facebook" icon={<FacebookIcon className="h-5 w-5" />} />
                <SocialLink href="https://x.com/intent/post?text=Hey%2C+check+out+this+cool+site+I+found%3A+www.yourname.com+%23Topic+via%40my_twitter_name+http%3A%2F%2Fiyojana.com%2Fservices%2Fsuccession-planning" label="X" icon={<XIcon className="h-5 w-5" />} />
                <SocialLink href="https://in.linkedin.com/in/supriyaa-kubal-94073130" label="LinkedIn" icon={<LinkedInIcon className="h-5 w-5" />} />
                <SocialLink href="https://wa.me/919967571463" label="WhatsApp" icon={<WhatsAppIcon className="h-5 w-5" />} />
              </div>
            </div>
          </div>

          <Col title="Services" items={["Wealth Management", "Insurance Planning", "Retirement Planning", "Estate Planning"]} />
          <Col title="Company" items={["About", "Services", "Process", "Contact"]} />
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-8">
          <p className="text-sm text-white/40">© {new Date().getFullYear()} iYojana Financials. All rights reserved.</p>
          <a
            href="#top"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-all hover:-translate-y-0.5 hover:border-[#118AB2] hover:text-white"
          >
            Back to top
            <ArrowUpIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:-translate-y-1 hover:border-[#118AB2] hover:text-white"
    >
      {icon}
    </a>
  );
}

function Col({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white/80">{title}</div>
      <ul className="mt-5 space-y-3 text-white/60">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="inline-flex text-sm transition-colors hover:text-white hover:translate-x-1">{it}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
