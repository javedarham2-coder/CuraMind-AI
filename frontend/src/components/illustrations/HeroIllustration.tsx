import { motion } from "framer-motion";

export function HeroIllustration() {
  return (
    <div className="relative w-full aspect-[5/4] max-w-[640px] mx-auto">
      {/* Ambient glow */}
      <div className="absolute -inset-10 bg-gradient-radial from-medical-500/20 via-cyan-400/10 to-transparent blur-3xl pointer-events-none" />

      {/* Floating background cards */}
      {/* Small badge showing current analysis status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hero-surface absolute -left-12 sm:-left-20 top-2 w-40 sm:w-48 rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-soft-lg p-3.5 z-20"
      >
        <div className="flex items-center gap-2">
          <div className="health-icon h-7 w-7 rounded-lg bg-success-50 flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-navy-200 font-semibold">Risk Score</p>
            <p className="health-value text-lg font-bold text-navy leading-none">Low · 18%</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full bg-surface-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "18%" }}
            transition={{ duration: 1.4, delay: 0.6 }}
            className="h-full bg-gradient-to-r from-success-500 to-cyan-400"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute -right-10 sm:-right-20 top-1/3 w-44 sm:w-52 rounded-2xl bg-navy-500 text-white p-3.5 shadow-soft-xl z-20"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">CuraCore™ Analysis</p>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
          </span>
        </div>
        <p className="mt-1.5 text-sm font-semibold">3,841 patterns analyzed</p>
        <div className="mt-3 grid grid-cols-7 gap-1">
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: 0.8 + i * 0.03, duration: 0.4 }}
              style={{ transformOrigin: "bottom" }}
              className="h-7 rounded-sm bg-gradient-to-t from-medical-500/30 to-cyan-400/80"
            />
          ))}
        </div>
      </motion.div>

      {/* Main dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="hero-surface relative h-full w-full rounded-3xl bg-white border border-surface-border shadow-soft-xl overflow-hidden"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-surface-border bg-surface-subtle">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
          <div className="h-2.5 w-2.5 rounded-full bg-success-500/70" />
          <div className="ml-4 flex-1 h-5 max-w-[200px] rounded-md bg-white border border-surface-border" />
        </div>

        <div className="p-4 sm:p-5 grid grid-cols-12 gap-3 h-[calc(100%-44px)]">
          {/* Sidebar */}
          <div className="hidden sm:flex col-span-3 flex-col gap-2">
            <div className="h-7 rounded-lg bg-navy-500" />
            <div className="h-5 rounded-md bg-surface-muted" />
            <div className="h-5 rounded-md bg-surface-muted" />
            <div className="h-5 rounded-md bg-medical-50" />
            <div className="h-5 rounded-md bg-surface-muted" />
            <div className="h-5 rounded-md bg-surface-muted" />
            <div className="mt-auto h-12 rounded-lg bg-surface-muted" />
          </div>

          {/* Main area */}
          <div className="col-span-12 sm:col-span-9 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-wider text-navy-200 font-semibold">
                  Risk Dashboard
                </p>
                <p className="text-sm font-semibold text-navy">Patient #A-4821</p>
              </div>
              <div className="px-2.5 py-1 rounded-full bg-success-50 text-success-600 text-[10px] font-semibold flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-success-500" />
                Low Risk
              </div>
            </div>

            {/* Circular chart */}
            <div className="hero-chart-surface flex-1 rounded-2xl bg-gradient-to-br from-surface-subtle to-white border border-surface-border p-4 flex items-center gap-4">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 shrink-0">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="url(#ringGrad)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    initial={{ strokeDashoffset: 264 }}
                    animate={{ strokeDashoffset: 264 - (264 * 18) / 100 }}
                    transition={{ duration: 1.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="100" y2="100">
                      <stop offset="0%" stopColor="#22C55E" />
                      <stop offset="100%" stopColor="#22D3EE" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="health-value text-lg font-bold text-navy leading-none">18%</p>
                  <p className="text-[9px] text-navy-200 mt-0.5">risk</p>
                </div>
              </div>

              <div className="flex-1 space-y-1.5">
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-medium text-navy">Lifestyle</span>
                    <span className="text-navy-200">12%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "12%" }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                      className="h-full bg-medical-500"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-medium text-navy">Family History</span>
                    <span className="text-navy-200">28%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "28%" }}
                      transition={{ duration: 1.2, delay: 0.95 }}
                      className="h-full bg-cyan-400"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1">
                    <span className="font-medium text-navy">Symptoms</span>
                    <span className="text-navy-200">8%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-surface-muted overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "8%" }}
                      transition={{ duration: 1.2, delay: 1.1 }}
                      className="h-full bg-accent-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom row */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-surface-border p-3">
                <p className="text-[10px] uppercase tracking-wider text-navy-200 font-semibold">
                  Confidence
                </p>
                <p className="health-value text-lg font-bold text-navy mt-0.5">94%</p>
                <div className="mt-1.5 h-1 rounded-full bg-surface-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "94%" }}
                    transition={{ duration: 1.4, delay: 1.2 }}
                    className="h-full bg-gradient-to-r from-medical-500 to-cyan-400"
                  />
                </div>
              </div>
              <div className="rounded-xl border border-surface-border p-3">
                <p className="text-[10px] uppercase tracking-wider text-navy-200 font-semibold">
                  Next Review
                </p>
                <p className="text-lg font-bold text-navy mt-0.5">12 mo</p>
                <p className="text-[10px] text-navy-200 mt-1.5">Annual screening</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating doctor card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="hero-surface absolute -bottom-2 left-4 sm:left-10 w-52 rounded-2xl bg-white border border-surface-border shadow-soft-lg p-3 z-30"
      >
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-medical-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
            SM
          </div>
          <div>
            <p className="text-xs font-semibold text-navy">Dr. Sarah Mitchell</p>
            <p className="text-[10px] text-navy-200">Oncologist · Verified</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
