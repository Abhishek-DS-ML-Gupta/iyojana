import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp, Target, ArrowDownCircle, Landmark,
  ChevronDown, ChevronUp, ArrowRight, Calculator,
} from "lucide-react";
import CountUpNS from "react-countup";
const CountUp = CountUpNS.default;
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

/* ─── Formatting helpers ─────────────────────────────────────── */
function fmtINR(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `₹${(n / 1e5).toFixed(2)} L`;
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}
function fmtShort(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1e7) return `${(n / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `${(n / 1e5).toFixed(2)} L`;
  return Math.round(n).toLocaleString("en-IN");
}

/* ─── Donut Chart ─────────────────────────────────────────────── */
function DonutChart({
  invested,
  gains,
  size = 220,
}: {
  invested: number;
  gains: number;
  size?: number;
}) {
  const total = invested + gains;
  if (total <= 0) return null;
  const r = 80;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const investedFrac = invested / total;
  const gainsFrac = gains / total;
  const gap = 2; // degrees gap between segments
  const gapRad = (gap / 360) * circ;

  const investedLen = investedFrac * circ - gapRad;
  const gainsLen = gainsFrac * circ - gapRad;
  const investedOffset = 0;
  const gainsOffset = -(investedLen + gapRad);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="28" />
        {/* Invested segment */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#4FC3E0"
          strokeWidth="28"
          strokeDasharray={`${investedLen} ${circ}`}
          strokeDashoffset={-investedOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {/* Gains segment */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="#06B6D4"
          strokeWidth="28"
          strokeDasharray={`${gainsLen} ${circ}`}
          strokeDashoffset={gainsOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
          style={{ filter: "brightness(1.4)" }}
        />
        {/* Inner glow */}
        <circle cx={cx} cy={cy} r={r - 20} fill="rgba(255,255,255,0.03)" />
      </svg>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-[10px] uppercase tracking-widest text-white/50">Total</span>
        <span className="font-display text-xl font-black text-white leading-tight">{fmtShort(total)}</span>
      </div>
    </div>
  );
}

/* ─── Area sparkline ───────────────────────────────────────────── */
function AreaChart({ series, invested }: { series: number[]; invested: number[] }) {
  if (series.length < 2) return null;
  const maxV = Math.max(...series);
  const toXY = (arr: number[]) =>
    arr.map((v, i) => `${(i / (arr.length - 1)) * 100},${100 - (v / maxV) * 100}`).join(" ");
  const corpusLine = toXY(series);
  const investedLine = toXY(invested);
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-40 w-full">
      <defs>
        <linearGradient id="areaCorpus" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#4FC3E0" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4FC3E0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="areaInvested" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#0F4C81" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0F4C81" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`0,100 ${corpusLine} 100,100`} fill="url(#areaCorpus)" />
      <polyline points={corpusLine} fill="none" stroke="#4FC3E0" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <polygon points={`0,100 ${investedLine} 100,100`} fill="url(#areaInvested)" />
      <polyline points={investedLine} fill="none" stroke="#118AB2" strokeWidth="1" vectorEffect="non-scaling-stroke" strokeDasharray="3 2" />
    </svg>
  );
}

/* ─── Slider ───────────────────────────────────────────────────── */
function Slider({
  label, value, setValue, min, max, step, format,
}: {
  label: string; value: number; setValue: (v: number) => void;
  min: number; max: number; step: number; format: (v: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-foreground/70">{label}</label>
        <div className="flex items-center gap-2">
          <span className="font-display text-lg font-bold text-primary">{format(value)}</span>
        </div>
      </div>
      <div className="relative h-2 rounded-full bg-accent">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#118AB2]"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range" min={min} max={max} step={step} value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          aria-label={label}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
        <div
          className="pointer-events-none absolute -top-1.5 h-5 w-5 rounded-full bg-white shadow-md ring-2 ring-[#118AB2] transition-all"
          style={{ left: `calc(${pct}% - 10px)` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-muted-foreground mt-1">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

/* ─── Yearly breakdown table ───────────────────────────────────── */
function YearlyTable({ rows }: { rows: { year: number; invested: number; corpus: number; gains: number }[] }) {
  const [open, setOpen] = useState(false);
  const displayed = open ? rows : rows.slice(0, 5);
  return (
    <div className="mt-6 rounded-2xl border border-border overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-accent/60 text-left">
              <th className="px-4 py-3 font-semibold text-foreground/70">Year</th>
              <th className="px-4 py-3 font-semibold text-foreground/70">Invested</th>
              <th className="px-4 py-3 font-semibold text-foreground/70 text-[#0F4C81]">Wealth Gain</th>
              <th className="px-4 py-3 font-semibold text-foreground/70">Corpus</th>
            </tr>
          </thead>
          <tbody>
            {displayed.map((r, i) => (
              <motion.tr
                key={r.year}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                className="border-t border-border hover:bg-accent/30 transition-colors"
              >
                <td className="px-4 py-3 font-medium">{r.year}</td>
                <td className="px-4 py-3 text-muted-foreground">{fmtINR(r.invested)}</td>
                <td className="px-4 py-3 font-semibold text-[#118AB2]">{fmtINR(r.gains)}</td>
                <td className="px-4 py-3 font-bold text-primary">{fmtINR(r.corpus)}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
      {rows.length > 5 && (
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-center gap-2 py-3 text-xs font-semibold text-primary hover:bg-accent/40 transition-colors border-t border-border"
        >
          {open ? <><ChevronUp className="h-4 w-4" /> Show less</> : <><ChevronDown className="h-4 w-4" /> Show all {rows.length} years</>}
        </button>
      )}
    </div>
  );
}

/* ─── SIP Calculator ───────────────────────────────────────────── */
function SIPCalculator() {
  const [monthly, setMonthly] = useState(25000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  const { future, invested, gains, series, investedSeries, rows } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    const fv = monthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const inv = monthly * n;
    const s: number[] = [];
    const invS: number[] = [];
    const tableRows: { year: number; invested: number; corpus: number; gains: number }[] = [];
    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      const corpus = monthly * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);
      const investedAtY = monthly * m;
      tableRows.push({ year: y, invested: investedAtY, corpus, gains: corpus - investedAtY });
    }
    for (let m = 1; m <= n; m += Math.max(1, Math.floor(n / 60))) {
      s.push(monthly * ((Math.pow(1 + r, m) - 1) / r) * (1 + r));
      invS.push(monthly * m);
    }
    return { future: fv, invested: inv, gains: fv - inv, series: s, investedSeries: invS, rows: tableRows };
  }, [monthly, years, rate]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      {/* Controls */}
      <div className="space-y-8">
        <Slider label="Monthly Investment" value={monthly} setValue={setMonthly} min={500} max={500000} step={500} format={(v) => fmtINR(v)} />
        <Slider label="Investment Period" value={years} setValue={setYears} min={1} max={40} step={1} format={(v) => `${v} yr${v > 1 ? "s" : ""}`} />
        <Slider label="Expected Return (p.a.)" value={rate} setValue={setRate} min={4} max={30} step={0.5} format={(v) => `${v}%`} />

        {/* Result summary cards */}
        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Invested" value={invested} color="text-foreground" />
          <ResultCard label="Wealth Gain" value={gains} color="text-[#118AB2]" />
          <ResultCard label="Corpus" value={future} color="text-primary" highlight />
        </div>

        <YearlyTable rows={rows} />
      </div>

      {/* Visual panel */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#06172B] to-[#0F4C81] p-8 text-white ring-glow overflow-hidden flex flex-col gap-6">
        <div aria-hidden className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(79,195,224,0.5), transparent 60%)" }} />

        <div className="relative">
          <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">Projected Corpus</div>
          <div className="font-display text-5xl font-black">
            <CountUp end={future} duration={1.4} decimals={0} formattingFn={fmtINR} preserveValue />
          </div>
          <div className="text-sm text-white/60 mt-1">after {years} year{years > 1 ? "s" : ""} @ {rate}% p.a.</div>
        </div>

        {/* Donut */}
        <div className="flex items-center gap-6">
          <DonutChart invested={invested} gains={gains} />
          <div className="space-y-4">
            <LegendItem color="#4FC3E0" label="Invested Amount" value={fmtINR(invested)} />
            <LegendItem color="#06B6D4" label="Wealth Gain" value={fmtINR(gains)} bright />
            <div className="border-t border-white/10 pt-3">
              <div className="text-xs text-white/50">Returns multiple</div>
              <div className="font-display text-xl font-bold mt-0.5">
                {(future / invested).toFixed(2)}x
              </div>
            </div>
          </div>
        </div>

        {/* Area chart */}
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Growth over time</div>
          <AreaChart series={series} invested={investedSeries} />
          <div className="flex gap-4 mt-2 text-[11px] text-white/50">
            <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-4 rounded-full bg-[#4FC3E0]" />Corpus</span>
            <span className="flex items-center gap-1.5"><span className="inline-block h-2 w-4 rounded-full bg-[#118AB2] opacity-60" />Invested</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Lumpsum Calculator ───────────────────────────────────────── */
function LumpsumCalculator() {
  const [principal, setPrincipal] = useState(500000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  const { future, gains, series, rows } = useMemo(() => {
    const fv = principal * Math.pow(1 + rate / 100, years);
    const tableRows: { year: number; invested: number; corpus: number; gains: number }[] = [];
    const s: number[] = [];
    for (let y = 1; y <= years; y++) {
      const corpus = principal * Math.pow(1 + rate / 100, y);
      tableRows.push({ year: y, invested: principal, corpus, gains: corpus - principal });
      s.push(corpus);
    }
    return { future: fv, gains: fv - principal, series: s, rows: tableRows };
  }, [principal, years, rate]);

  const investedSeries = Array(series.length).fill(principal);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-8">
        <Slider label="Investment Amount" value={principal} setValue={setPrincipal} min={10000} max={10000000} step={10000} format={(v) => fmtINR(v)} />
        <Slider label="Investment Period" value={years} setValue={setYears} min={1} max={40} step={1} format={(v) => `${v} yr${v > 1 ? "s" : ""}`} />
        <Slider label="Expected Return (p.a.)" value={rate} setValue={setRate} min={4} max={30} step={0.5} format={(v) => `${v}%`} />

        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Invested" value={principal} color="text-foreground" />
          <ResultCard label="Wealth Gain" value={gains} color="text-[#118AB2]" />
          <ResultCard label="Corpus" value={future} color="text-primary" highlight />
        </div>
        <YearlyTable rows={rows} />
      </div>

      <div className="relative rounded-3xl bg-gradient-to-br from-[#06172B] to-[#0F4C81] p-8 text-white ring-glow overflow-hidden flex flex-col gap-6">
        <div aria-hidden className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(79,195,224,0.5), transparent 60%)" }} />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">Projected Corpus</div>
          <div className="font-display text-5xl font-black">
            <CountUp end={future} duration={1.4} decimals={0} formattingFn={fmtINR} preserveValue />
          </div>
          <div className="text-sm text-white/60 mt-1">after {years} year{years > 1 ? "s" : ""} @ {rate}% p.a.</div>
        </div>
        <div className="flex items-center gap-6">
          <DonutChart invested={principal} gains={gains} />
          <div className="space-y-4">
            <LegendItem color="#4FC3E0" label="Invested Amount" value={fmtINR(principal)} />
            <LegendItem color="#06B6D4" label="Wealth Gain" value={fmtINR(gains)} bright />
            <div className="border-t border-white/10 pt-3">
              <div className="text-xs text-white/50">Returns multiple</div>
              <div className="font-display text-xl font-bold mt-0.5">
                {(future / principal).toFixed(2)}x
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Growth over time</div>
          <AreaChart series={series} invested={investedSeries} />
        </div>
      </div>
    </div>
  );
}

/* ─── SWP Calculator ───────────────────────────────────────────── */
function SWPCalculator() {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(30000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(10);

  const { remaining, totalWithdrawn, rows, series } = useMemo(() => {
    const r = rate / 100 / 12;
    let balance = corpus;
    const tableRows: { year: number; invested: number; corpus: number; gains: number }[] = [];
    const s: number[] = [];
    let totalW = 0;
    for (let y = 1; y <= years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + r) - withdrawal;
        totalW += withdrawal;
        if (balance < 0) { balance = 0; break; }
      }
      tableRows.push({ year: y, invested: totalW, corpus: Math.max(0, balance), gains: corpus - totalW });
      s.push(Math.max(0, balance));
      if (balance <= 0) break;
    }
    return { remaining: Math.max(0, balance), totalWithdrawn: totalW, rows: tableRows, series: s };
  }, [corpus, withdrawal, years, rate]);

  const investedSeries = rows.map((r) => r.invested);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-8">
        <Slider label="Initial Corpus" value={corpus} setValue={setCorpus} min={100000} max={50000000} step={100000} format={(v) => fmtINR(v)} />
        <Slider label="Monthly Withdrawal" value={withdrawal} setValue={setWithdrawal} min={1000} max={500000} step={1000} format={(v) => fmtINR(v)} />
        <Slider label="Withdrawal Period" value={years} setValue={setYears} min={1} max={40} step={1} format={(v) => `${v} yr${v > 1 ? "s" : ""}`} />
        <Slider label="Expected Return (p.a.)" value={rate} setValue={setRate} min={4} max={20} step={0.5} format={(v) => `${v}%`} />

        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Total Withdrawn" value={totalWithdrawn} color="text-foreground" />
          <ResultCard label="Remaining Corpus" value={remaining} color="text-[#118AB2]" />
          <ResultCard label="Initial Corpus" value={corpus} color="text-primary" highlight />
        </div>
        <YearlyTable rows={rows} />
      </div>

      <div className="relative rounded-3xl bg-gradient-to-br from-[#06172B] to-[#0F4C81] p-8 text-white ring-glow overflow-hidden flex flex-col gap-6">
        <div aria-hidden className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(79,195,224,0.5), transparent 60%)" }} />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">Remaining Corpus</div>
          <div className="font-display text-5xl font-black">
            <CountUp end={remaining} duration={1.4} decimals={0} formattingFn={fmtINR} preserveValue />
          </div>
          <div className="text-sm text-white/60 mt-1">after withdrawing {fmtINR(withdrawal)}/mo for {years} yr{years > 1 ? "s" : ""}</div>
        </div>
        <div className="flex items-center gap-6">
          <DonutChart invested={totalWithdrawn} gains={remaining} />
          <div className="space-y-4">
            <LegendItem color="#4FC3E0" label="Total Withdrawn" value={fmtINR(totalWithdrawn)} />
            <LegendItem color="#06B6D4" label="Remaining Corpus" value={fmtINR(remaining)} bright />
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Corpus drawdown</div>
          <AreaChart series={series} invested={investedSeries} />
        </div>
      </div>
    </div>
  );
}

/* ─── Goal Calculator ──────────────────────────────────────────── */
function GoalCalculator() {
  const [goal, setGoal] = useState(10000000);
  const [years, setYears] = useState(15);
  const [rate, setRate] = useState(12);

  const { monthly, lumpsum, invested, gains, series, investedSeries, rows } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;
    // Required SIP
    const sip = (goal * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
    // Lumpsum needed
    const ls = goal / Math.pow(1 + rate / 100, years);
    const inv = sip * n;
    const s: number[] = [];
    const invS: number[] = [];
    const tableRows: { year: number; invested: number; corpus: number; gains: number }[] = [];
    for (let y = 1; y <= years; y++) {
      const m = y * 12;
      const corpus = sip * ((Math.pow(1 + r, m) - 1) / r) * (1 + r);
      const investedAtY = sip * m;
      tableRows.push({ year: y, invested: investedAtY, corpus, gains: corpus - investedAtY });
    }
    for (let m = 1; m <= n; m += Math.max(1, Math.floor(n / 60))) {
      s.push(sip * ((Math.pow(1 + r, m) - 1) / r) * (1 + r));
      invS.push(sip * m);
    }
    return { monthly: sip, lumpsum: ls, invested: inv, gains: goal - inv, series: s, investedSeries: invS, rows: tableRows };
  }, [goal, years, rate]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="space-y-8">
        <Slider label="Target Goal Amount" value={goal} setValue={setGoal} min={100000} max={100000000} step={100000} format={(v) => fmtINR(v)} />
        <Slider label="Time Horizon" value={years} setValue={setYears} min={1} max={40} step={1} format={(v) => `${v} yr${v > 1 ? "s" : ""}`} />
        <Slider label="Expected Return (p.a.)" value={rate} setValue={setRate} min={4} max={30} step={0.5} format={(v) => `${v}%`} />

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-primary/20 bg-accent p-4 text-center">
            <div className="text-[11px] uppercase tracking-wider text-primary font-semibold mb-1">Required SIP / month</div>
            <div className="font-display text-2xl font-black text-primary">{fmtINR(monthly)}</div>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 text-center">
            <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">Or Lumpsum Today</div>
            <div className="font-display text-2xl font-black text-foreground">{fmtINR(lumpsum)}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <ResultCard label="Total Invested" value={invested} color="text-foreground" />
          <ResultCard label="Wealth Gain" value={Math.max(0, gains)} color="text-[#118AB2]" />
          <ResultCard label="Goal" value={goal} color="text-primary" highlight />
        </div>
        <YearlyTable rows={rows} />
      </div>

      <div className="relative rounded-3xl bg-gradient-to-br from-[#06172B] to-[#0F4C81] p-8 text-white ring-glow overflow-hidden flex flex-col gap-6">
        <div aria-hidden className="absolute -top-32 -right-24 h-72 w-72 rounded-full blur-3xl opacity-50"
          style={{ background: "radial-gradient(circle, rgba(79,195,224,0.5), transparent 60%)" }} />
        <div className="relative">
          <div className="text-xs uppercase tracking-[0.2em] text-white/50 mb-1">Monthly SIP Needed</div>
          <div className="font-display text-5xl font-black">
            <CountUp end={monthly} duration={1.4} decimals={0} formattingFn={fmtINR} preserveValue />
          </div>
          <div className="text-sm text-white/60 mt-1">to reach {fmtINR(goal)} in {years} yr{years > 1 ? "s" : ""}</div>
        </div>
        <div className="flex items-center gap-6">
          <DonutChart invested={Math.max(0, invested)} gains={Math.max(0, gains)} />
          <div className="space-y-4">
            <LegendItem color="#4FC3E0" label="Total Invested" value={fmtINR(Math.max(0, invested))} />
            <LegendItem color="#06B6D4" label="Wealth Gain" value={fmtINR(Math.max(0, gains))} bright />
            <div className="border-t border-white/10 pt-3">
              <div className="text-xs text-white/50">Lumpsum Alternative</div>
              <div className="font-display text-xl font-bold mt-0.5">{fmtINR(lumpsum)}</div>
            </div>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.15em] text-white/40 mb-2">Progress to goal</div>
          <AreaChart series={series} invested={investedSeries} />
        </div>
      </div>
    </div>
  );
}

/* ─── Helper sub-components ────────────────────────────────────── */
function ResultCard({ label, value, color, highlight }: { label: string; value: number; color: string; highlight?: boolean }) {
  return (
    <div className={`rounded-2xl border p-3 text-center ${highlight ? "border-primary/30 bg-accent" : "border-border bg-card"}`}>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-1">{label}</div>
      <div className={`font-display text-base font-black ${color}`}>{fmtINR(value)}</div>
    </div>
  );
}

function LegendItem({ color, label, value, bright }: { color: string; label: string; value: string; bright?: boolean }) {
  return (
    <div className="flex items-start gap-2">
      <div className="mt-1 h-3 w-3 rounded-full flex-shrink-0" style={{ background: color, filter: bright ? "brightness(1.4)" : "none" }} />
      <div>
        <div className="text-[11px] text-white/50 leading-tight">{label}</div>
        <div className="font-display text-base font-bold leading-tight">{value}</div>
      </div>
    </div>
  );
}

/* ─── Tab types ─────────────────────────────────────────────────── */
const TABS = [
  { id: "sip", label: "SIP", icon: TrendingUp, desc: "Systematic Investment Plan" },
  { id: "lumpsum", label: "Lumpsum", icon: Landmark, desc: "One-time Investment" },
  { id: "swp", label: "SWP", icon: ArrowDownCircle, desc: "Systematic Withdrawal Plan" },
  { id: "goal", label: "Goal", icon: Target, desc: "Plan for a Target" },
] as const;

type TabId = (typeof TABS)[number]["id"];

/* ─── Main page ─────────────────────────────────────────────────── */
export function CalculatorPage() {
  const [activeTab, setActiveTab] = useState<TabId>("sip");

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-mesh-light">
        {/* Hero banner */}
        <div className="relative bg-aurora text-white overflow-hidden pt-32 pb-16">
          <div aria-hidden className="absolute inset-0 opacity-40"
            style={{ background: "radial-gradient(50% 60% at 80% 20%, rgba(79,195,224,0.4), transparent 60%)" }} />
          <div className="container-x relative text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium mb-6"
            >
              <Calculator className="h-3.5 w-3.5 text-[#4FC3E0]" />
              Financial Calculators
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl font-extrabold tracking-tight"
            >
              Plan your <span className="shimmer-text">financial future</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-4 text-lg text-white/70 max-w-xl mx-auto"
            >
              SIP · Lumpsum · SWP · Goal — four calculators, one place. Projections are illustrative.
            </motion.p>
          </div>
        </div>

        <div className="container-x py-12">
          {/* Tab bar */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`calc-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-[#0F4C81] to-[#118AB2] text-white shadow-[0_8px_24px_-8px_rgba(15,76,129,0.5)]"
                    : "bg-card border border-border text-foreground/70 hover:text-foreground hover:border-[#118AB2]/40"
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
                <span className={`hidden md:inline text-[11px] font-normal ${activeTab === tab.id ? "text-white/70" : "text-muted-foreground"}`}>
                  — {tab.desc}
                </span>
              </button>
            ))}
          </div>

          {/* Calculator panels */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              {activeTab === "sip" && <SIPCalculator />}
              {activeTab === "lumpsum" && <LumpsumCalculator />}
              {activeTab === "swp" && <SWPCalculator />}
              {activeTab === "goal" && <GoalCalculator />}
            </motion.div>
          </AnimatePresence>

          {/* Disclaimer */}
          <p className="mt-12 text-xs text-muted-foreground text-center max-w-2xl mx-auto">
            * All projections are illustrative and do not guarantee returns. Mutual fund investments are subject to market risks. 
            Please read all scheme-related documents carefully. Past performance is not indicative of future results.
          </p>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <a
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0F4C81] to-[#118AB2] px-8 py-4 text-sm font-semibold text-white shadow-[0_16px_40px_-12px_rgba(15,76,129,0.6)] hover:shadow-[0_20px_50px_-12px_rgba(15,76,129,0.7)] hover:-translate-y-0.5 transition-all"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
