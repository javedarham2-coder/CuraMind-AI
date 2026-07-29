import type { ReactNode } from "react";
import { Label } from "@/components/ui/Input";

interface FieldProps {
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}

export default function Field({
  label,
  hint,
  className,
  children,
}: FieldProps) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between">
        <Label>{label}</Label>

        {hint && (
          <span className="text-xs text-navy-200">
            {hint}
          </span>
        )}
      </div>

      <div className="mt-2">
        {children}
      </div>
    </div>
  );
}
