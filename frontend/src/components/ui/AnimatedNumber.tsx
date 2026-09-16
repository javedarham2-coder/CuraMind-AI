import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export function AnimatedNumber({
  value,
  duration = 800,
  suffix = "",
}: {
  value: number;
  duration?: number;
  suffix?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReducedMotion ? value : 0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    const startedAt = performance.now();
    let frameId = 0;

    const update = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      setDisplayValue(Math.round(value * progress));

      if (progress < 1) frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId);
  }, [duration, prefersReducedMotion, value]);

  return (
    <span className="tabular-nums">
      {displayValue}
      {suffix}
    </span>
  );
}
