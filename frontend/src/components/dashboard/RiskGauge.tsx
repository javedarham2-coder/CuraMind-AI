import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function RiskGauge({
  value,
  label = "Overall risk",
  size = 220,
}: {
  value: number;
  label?: string;
  size?: number;
}) {
  const r = size / 2 - 18;
  const c = 2 * Math.PI * r;
  const offset = c - (c * Math.min(100, Math.max(0, value))) / 100;

  const color =
    value < 25
      ? { from: "#22C55E", to: "#22D3EE", stop: "Low" }
      : value < 50
      ? { from: "#22D3EE", to: "#2563EB", stop: "Moderate" }
      : value < 75
      ? { from: "#F59E0B", to: "#F97316", stop: "Elevated" }
      : { from: "#EF4444", to: "#F97316", stop: "High" };

  return (
    <div
      className="risk-gauge relative w-full shrink-0"
      style={{ maxWidth: size, aspectRatio: "1 / 1" }}
    >
      <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={`gauge-${size}`} x1="0" y1="0" x2={size} y2={size}>
            <stop offset="0%" stopColor={color.from} />
            <stop offset="100%" stopColor={color.to} />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className="gauge-track"
          stroke="#E2E8F0"
          strokeWidth="10"
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={`url(#gauge-${size})`}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Tick marks */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2 - Math.PI / 2;
          const x1 = size / 2 + Math.cos(angle) * (r - 16);
          const y1 = size / 2 + Math.sin(angle) * (r - 16);
          const x2 = size / 2 + Math.cos(angle) * (r - 12);
          const y2 = size / 2 + Math.sin(angle) * (r - 12);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              className="gauge-tick"
              stroke="#CBD5E1"
              strokeWidth={i % 5 === 0 ? 1.5 : 0.75}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pt-3">
        <p className="gauge-label text-center text-xs font-semibold uppercase tracking-wider text-navy-200">
          {label}
        </p>
        <motion.p
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="health-value mt-1 text-center text-5xl font-bold leading-none tracking-tight text-navy"
        >
          <AnimatedNumber value={Math.round(value)} />
          <span className="gauge-suffix text-2xl text-navy-300">%</span>
        </motion.p>
        <p
          className={cn(
            "gauge-status mt-3 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold",
            value < 25
              ? "bg-success-50 text-success-600"
              : value < 50
              ? "bg-cyan-50 text-cyan-700"
              : value < 75
              ? "bg-amber-50 text-amber-700"
              : "bg-red-50 text-red-700"
          )}
        >
          {color.stop}
        </p>
      </div>
    </div>
  );
}
