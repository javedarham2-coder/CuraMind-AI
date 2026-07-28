import { cn } from "@/lib/utils";

export function Logo({
  className,
  withText = true,
  size = "md",
  tone = "light",
}: {
  className?: string;
  withText?: boolean;
  size?: "sm" | "md" | "lg";
  tone?: "light" | "dark";
}) {
  const dim = size === "sm" ? 24 : size === "md" ? 32 : 40;
  const text = size === "sm" ? "text-base" : size === "md" ? "text-lg" : "text-xl";
  const primaryText = tone === "dark" ? "text-white" : "text-navy";
  const secondaryText = tone === "dark" ? "text-white/60" : "text-navy-200";
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoG" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="#081B33" />
              <stop offset="0.5" stopColor="#2563EB" />
              <stop offset="1" stopColor="#22D3EE" />
            </linearGradient>
            <linearGradient id="logoGInner" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.95" />
              <stop offset="1" stopColor="white" stopOpacity="0.85" />
            </linearGradient>
          </defs>
          <rect width="40" height="40" rx="11" fill="url(#logoG)" />
          <path
            d="M14 20h12M20 14v12"
            stroke="url(#logoGInner)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="20" cy="20" r="4.5" fill="url(#logoGInner)" />
          <circle cx="20" cy="20" r="9" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
        </svg>
        <span className="absolute -inset-1 rounded-2xl bg-medical-500/20 blur-xl -z-10" />
      </div>
      {withText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-semibold tracking-tight", text, primaryText)}>CuraMind</span>
          <span className={cn("text-[10px] font-medium mt-0.5 tracking-wide", secondaryText)}>
            CuraCore™ Health Intelligence
          </span>
        </div>
      )}
    </div>
  );
}
