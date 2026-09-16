import { motion } from "framer-motion";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { RiskBreakdown } from "@/types/patient";

const colors = ["#2563EB", "#22D3EE", "#8B5CF6", "#22C55E", "#F59E0B", "#F97316"];

export function FactorBarChart({ data }: { data: RiskBreakdown[] }) {
  return (
    <div className="space-y-4">
      {data.map((d, i) => (
        <div key={d.label}>
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-navy">{d.label}</span>
            <span className="text-navy-200 font-medium">
              <AnimatedNumber value={d.score} />
            </span>
          </div>
          <div className="mt-1.5 h-2 rounded-full bg-surface-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, ${colors[i % colors.length]}aa, ${colors[i % colors.length]})`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, d.score)}%` }}
              transition={{ duration: 0.8, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const trendData = [
  { x: "Jan", y: 22 },
  { x: "Feb", y: 21 },
  { x: "Mar", y: 20 },
  { x: "Apr", y: 19 },
  { x: "May", y: 18 },
  { x: "Jun", y: 18 },
];

export function RiskTrendChart() {
  const w = 320;
  const h = 120;
  const max = 25;
  const min = 10;
  const stepX = w / (trendData.length - 1);
  const points = trendData
    .map((p, i) => {
      const x = i * stepX;
      const y = h - ((p.y - min) / (max - min)) * h;
      return `${x},${y}`;
    })
    .join(" ");

  const areaPath = `M0,${h} L${points.split(" ").join(" L")} L${w},${h} Z`;
  const linePath = `M${points.split(" ").join(" L")}`;

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
        <defs>
          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(34,211,238,0.4)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </linearGradient>
        </defs>
        {/* grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((p) => (
          <line
            key={p}
            x1="0"
            y1={h * p}
            x2={w}
            y2={h * p}
            stroke="#E2E8F0"
            strokeWidth="1"
            strokeDasharray={p === 0.5 ? "0" : "2 4"}
          />
        ))}
        <motion.path
          d={areaPath}
          fill="url(#trendGrad)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke="#22D3EE"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
        />
        {trendData.map((p, i) => {
          const x = i * stepX;
          const y = h - ((p.y - min) / (max - min)) * h;
          return (
            <g key={p.x}>
              <motion.circle
                cx={x}
                cy={y}
                r="3.5"
                fill="white"
                stroke="#22D3EE"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8 + i * 0.05 }}
              />
              <text
                x={x}
                y={h + 14}
                textAnchor="middle"
                className="text-[10px] fill-slate-400 font-medium"
              >
                {p.x}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
