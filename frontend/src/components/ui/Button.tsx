import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "glow";
type Size = "sm" | "md" | "lg";

type ButtonProps = Omit<HTMLMotionProps<"button">, "ref" | "children"> & {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
  children?: React.ReactNode;
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-navy-500 text-white hover:bg-navy-600 shadow-soft hover:shadow-soft-lg border border-navy-500/0",
  secondary:
    "bg-surface-muted text-navy hover:bg-surface-border border border-transparent",
  ghost: "bg-transparent text-navy hover:bg-surface-muted",
  outline:
    "bg-white text-navy border border-surface-border hover:border-navy-300 hover:bg-surface-subtle",
  glow:
    "relative text-white bg-gradient-to-r from-medical-500 to-cyan-500 shadow-glow hover:shadow-soft-xl border-0",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-lg",
  md: "h-11 px-5 text-sm rounded-xl",
  lg: "h-14 px-7 text-[15px] rounded-2xl",
};

const baseClasses =
  "relative inline-flex items-center justify-center gap-2 font-medium " +
  "transition-all duration-200 ease-out " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-medical-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
  "disabled:opacity-50 disabled:pointer-events-none select-none whitespace-nowrap";

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", asChild = false, children, ...props },
    ref
  ) => {
    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    if (asChild && React.isValidElement(children)) {
      // Render the child (e.g. <Link>) with our classes and a real <button> wrapper? No —
      // we want to render the child AS the button. To keep this lightweight we attach
      // classes to the child and keep semantics via the child element.
      const child = children as React.ReactElement<{ className?: string }>;
      return (
        <motion.span
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className={cn("inline-flex", className)}
        >
          {React.cloneElement(child, {
            className: cn(classes, child.props.className),
          })}
        </motion.span>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={classes}
        {...props}
      >
        {variant === "glow" && (
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-medical-500 via-cyan-500 to-medical-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
        )}
        <span className="relative inline-flex items-center gap-2">{children}</span>
      </motion.button>
    );
  }
);
Button.displayName = "Button";
