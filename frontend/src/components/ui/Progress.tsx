import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Progress({
  value,
  className,
  showLabel = false,
  variant = "brand",
}: {
  value: number;
  className?: string;
  showLabel?: boolean;
  variant?: "brand" | "success" | "warning" | "danger";
}) {
  const bar = {
    brand: "bg-gradient-to-r from-medical-500 via-cyan-400 to-medical-500",
    success: "bg-gradient-to-r from-success-500 to-cyan-400",
    warning: "bg-gradient-to-r from-amber-500 to-orange-400",
    danger: "bg-gradient-to-r from-red-500 to-orange-400",
  }[variant];

  return (
    <div className={cn("w-full", className)}>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-surface-muted">
        <motion.div
          className={cn("absolute inset-y-0 left-0 rounded-full", bar)}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
        <div
          className="absolute inset-0 opacity-30 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
            backgroundSize: "200% 100%",
          }}
        />
      </div>
      {showLabel && (
        <div className="mt-1.5 text-xs font-medium text-navy-200">{Math.round(value)}%</div>
      )}
    </div>
  );
}

export function StepProgress({ steps, current }: { steps: string[]; current: number }) {
  const pct = ((current + 1) / steps.length) * 100;
  return (
    <div>
      <div className="flex items-center justify-between text-xs font-medium text-navy-200 mb-2">
        <span>
          Step {current + 1} of {steps.length}
        </span>
        <span>{Math.round(pct)}% complete</span>
      </div>
      <Progress value={pct} />
    </div>
  );
}
