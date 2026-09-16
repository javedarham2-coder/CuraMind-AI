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
        <img
          src="/curamind-logo.png"
          alt=""
          aria-hidden="true"
          width={dim}
          height={dim}
          className="relative z-10 h-full w-full object-contain"
        />
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
