import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import CountUpNS from "react-countup";
const CountUp = CountUpNS.default;
import { Calculator, TrendingUp } from "lucide-react";

function fmtINR(n: number) {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (n >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function CalculatorSection() {
  const [monthly, setMonthly] = useState(25000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  const { future, invested, gains, series } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const inv = monthly * n;
    const s: number[] = [];
    for (let m = 1; m <= n; m += Math.max(1, Math.floor(n / 40))) {
      s.push(monthly * ((Math.pow(1 + r, m) - 1) / r) * (1 + r));
    }
    return { future: fv, invested: inv, gains: fv - inv, series: s };
  }, [monthly, years, rate]);

  const maxY = series[series.length - 1] || 1;
  const points = series
    .map((v, i) => `${(i / (series.length - 1)) * 100},${100 - (v / maxY) * 100}`)
    .join(" ");
  const areaPoints = `0,100 ${points} 100,100`;

  return (
    <section id="calculator" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-3 py-1 text-xs font-medium text-primary">
              <Calculator className="h-3.5 w-3.5" /> Investment Calculator
            </span>
            <h2 className="mt-4 font-display text-4xl md:text-6xl font-extrabold tracking-tight">
              See your <span className="text-gradient">future value</span> take shape.
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-lg">
              A quick projection. Every real plan we deliver models inflation, tax and drawdown.
            </p>

            <div className="mt-10 space-y-8">
              <Slider label="Monthly Investment" value={monthly} setValue={setMonthly} min={1000} max={200000} step={1000} format={(v) => fmtINR(v)} />
              <Slider label="Time Horizon" value={years} setValue={setYears} min={1} max={40} step={1} format={(v) => `${v} yrs`} />
              <Slider label="Expected Return" value={rate} setValue={setRate} min={4} max={18} step={0.5} format={(v) => `${v}%`} />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.7 }}
            className="relative rounded-3xl bg-gradient-to-br from-[#06172B] to-[#0F4C81] p-8 md:p-10 text-white ring-glow overflow-hidden"
          >
            <div aria-hidden className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-60"
                 style={{ background: "radial-gradient(circle, rgba(79,195,224,0.5), transparent 60%)" }} />
            <div className="relative">
              <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
                <TrendingUp className="h-4 w-4 text-[#4FC3E0]" /> Projected Corpus
              </div>
              <div className="mt-3 font-display text-5xl md:text-6xl font-black tracking-tight">
                <CountUp end={future} duration={1.6} decimals={0} formattingFn={fmtINR} preserveValue />
              </div>

              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="mt-8 h-40 w-full">
                <defs>
                  <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4FC3E0" stopOpacity="0.55" />
                    <stop offset="100%" stopColor="#4FC3E0" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.polygon key={areaPoints} points={areaPoints} fill="url(#area)"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} />
                <motion.polyline key={points} points={points} fill="none" stroke="#4FC3E0" strokeWidth="1.2" vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.2 }} />
              </svg>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <Stat label="Invested" value={invested} />
                <Stat label="Wealth Gain" value={gains} accent />
              </div>

              <p className="mt-6 text-xs text-white/50">
                Illustrative. Actual outcomes depend on market conditions, expenses and taxes.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Slider({
  label, value, setValue, min, max, step, format,
}: {
  label: string; value: number; setValue: (v: number) => void;
  min: number; max: number; step: number; format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-foreground/80">{label}</label>
        <span className="font-display text-xl font-bold text-primary">{format(value)}</span>
      </div>
      <div className="relative mt-3 h-2 rounded-full bg-accent">
        <div className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#118AB2]" style={{ width: `${pct}%` }} />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label={label}
          className="absolute inset-0 w-full opacity-0 cursor-pointer"
        />
        <div className="pointer-events-none absolute -top-1.5 h-5 w-5 rounded-full bg-white shadow-md ring-2 ring-[#118AB2]" style={{ left: `calc(${pct}% - 10px)` }} />
      </div>
    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border border-white/10 p-4 ${accent ? "bg-white/10" : "bg-white/[0.03]"}`}>
      <div className="text-[11px] uppercase tracking-[0.2em] text-white/55">{label}</div>
      <div className="mt-1 font-display text-2xl font-bold">
        <CountUp end={value} duration={1.2} decimals={0} formattingFn={fmtINR} preserveValue />
      </div>
    </div>
  );
}
