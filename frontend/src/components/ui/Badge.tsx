import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "success" | "warning" | "danger" | "info" | "neutral" | "ai";

const variants: Record<Variant, string> = {
  default: "bg-medical-50 text-medical-600 border-medical-100",
  success: "bg-success-50 text-success-600 border-success-100",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-cyan-50 text-cyan-700 border-cyan-100",
  neutral: "bg-surface-muted text-navy-300 border-surface-border",
  ai: "bg-gradient-to-r from-medical-50 to-cyan-50 text-medical-600 border-medical-100",
};

export function Badge({
  className,
  variant = "default",
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function StatusPill({
  status,
  children,
  className,
}: {
  status: "low" | "moderate" | "elevated" | "high" | "pending" | "complete";
  children: React.ReactNode;
  className?: string;
}) {
  const map: Record<string, { dot: string; bg: string; text: string }> = {
    low: { dot: "bg-success-500", bg: "bg-success-50", text: "text-success-600" },
    moderate: { dot: "bg-cyan-400", bg: "bg-cyan-50", text: "text-cyan-700" },
    elevated: { dot: "bg-amber-500", bg: "bg-amber-50", text: "text-amber-700" },
    high: { dot: "bg-red-500", bg: "bg-red-50", text: "text-red-700" },
    pending: { dot: "bg-navy-200", bg: "bg-surface-muted", text: "text-navy-300" },
    complete: { dot: "bg-medical-500", bg: "bg-medical-50", text: "text-medical-600" },
  };
  const s = map[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold",
        s.bg,
        s.text,
        className
      )}
    >
      <span className="relative flex h-2 w-2">
        <span className={cn("absolute inline-flex h-full w-full rounded-full opacity-60 animate-ping", s.dot)} />
        <span className={cn("relative inline-flex h-2 w-2 rounded-full", s.dot)} />
      </span>
      {children}
    </span>
  );
}
