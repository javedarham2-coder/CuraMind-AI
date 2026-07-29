import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Save,
  User,
  Activity,
  HeartPulse,
  FileUp,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Label, Select, Textarea } from "@/components/ui/Input";
import { StepProgress } from "@/components/ui/Progress";
import { FileUpload } from "@/components/assessment/FileUpload";
import { cn } from "@/lib/utils";
import { AssessmentProvider } from "@/context/AssessmentContext";


const steps = [
  { id: "personal", title: "Personal", icon: User },
  { id: "lifestyle", title: "Lifestyle", icon: Activity },
  { id: "medical", title: "Medical", icon: HeartPulse },
  { id: "reports", title: "Reports", icon: FileUp },
];

const sectionMeta = [
  {
    title: "Personal information",
    description: "Help us establish your baseline.",
    icon: User,
  },
  {
    title: "Lifestyle habits",
    description: "Daily behaviors inform risk context.",
    icon: Activity,
  },
  {
    title: "Medical history",
    description: "Past and current health context.",
    icon: HeartPulse,
  },
  {
    title: "Medical reports",
    description: "Optionally attach supporting documents.",
    icon: FileUp,
  },
];

export function AssessmentPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  return (
    <AssessmentProvider>
    <div className="min-h-screen bg-gradient-soft">
      {/* Top bar */}
      <div className="border-b border-surface-border bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-navy transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Back to home</span>
          </button>
          <div className="flex-1 max-w-md">
            <StepProgress steps={steps.map((s) => s.title)} current={step} />
          </div>
          <Button variant="ghost" size="sm" className="text-navy-300">
            <Save size={14} />
            <span className="hidden sm:inline">Save draft</span>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8 py-10 sm:py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Step rail */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-1">
              {steps.map((s, i) => {
                const active = i === step;
                const complete = i < step;
                const Icon = s.icon;
                const MetaIcon = sectionMeta[i].icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => go(i)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-2xl p-3 text-left transition-all",
                      active
                        ? "bg-white border border-surface-border shadow-soft"
                        : "hover:bg-white/60"
                    )}
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors",
                        active
                          ? "bg-navy-500 text-white"
                          : complete
                          ? "bg-success-50 text-success-600"
                          : "bg-surface-muted text-navy-200"
                      )}
                    >
                      {complete ? <Check size={16} /> : <Icon size={16} />}
                    </div>
                    <div className="min-w-0">
                      <p
                        className={cn(
                          "text-sm font-semibold",
                          active ? "text-navy" : "text-navy-300"
                        )}
                      >
                        {sectionMeta[i].title}
                      </p>
                      <p className="text-xs text-navy-200 truncate">
                        {sectionMeta[i].description}
                      </p>
                    </div>
                  </button>
                );
              })}

              <div className="mt-6 rounded-2xl border border-surface-border bg-white p-4">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-lg bg-medical-50 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} className="text-medical-500" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-navy">Your data is private</p>
                    <p className="text-xs text-navy-300 mt-1 leading-relaxed">
                      All information is encrypted end-to-end and used only to power your risk
                      assessment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Form card */}
          <main className="lg:col-span-8">
            <div className="relative rounded-3xl border border-surface-border bg-white shadow-soft overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-medical-500/40 to-transparent" />
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={step}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -direction * 24 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="p-6 sm:p-10"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-medical-50 flex items-center justify-center">
                      {(() => {
                        const Icon = sectionMeta[step].icon;
                        return <Icon size={18} className="text-medical-500" />;
                      })()}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-navy tracking-tight">
                        {sectionMeta[step].title}
                      </h2>
                      <p className="text-sm text-navy-300">{sectionMeta[step].description}</p>
                    </div>
                  </div>

                  <div className="mt-8">{renderStep(step)}</div>
                </motion.div>
              </AnimatePresence>

              <div className="px-6 sm:px-10 py-5 border-t border-surface-border bg-surface-subtle/60 flex items-center justify-between">
                <Button
                  variant="ghost"
                  size="md"
                  disabled={step === 0}
                  onClick={() => go(step - 1)}
                >
                  <ArrowLeft size={16} />
                  Previous
                </Button>
                {step < steps.length - 1 ? (
                  <Button variant="primary" size="md" onClick={() => go(step + 1)}>
                    Next
                    <ArrowRight size={16} />
                  </Button>
                ) : (
                  <Button
                    variant="glow"
                    size="md"
                    onClick={() => navigate("/analysis")}
                    className="group"
                  >
                    Run CuraCore™ Analysis
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                    />
                  </Button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    </AssessmentProvider>
  );
}

function renderStep(step: number) {
  switch (step) {
    case 0:
      return <PersonalStep />;
    case 1:
      return <LifestyleStep />;
    case 2:
      return <MedicalStep />;
    case 3:
      return <ReportsStep />;
    default:
      return null;
  }
}

function Field({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-baseline justify-between">
        <Label>{label}</Label>
        {hint && <span className="text-xs text-navy-200">{hint}</span>}
      </div>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function PersonalStep() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <Field label="Full name">
        <Input defaultValue="Jordan Avery" placeholder="Enter your full name" />
      </Field>
      <Field label="Age">
        <Input type="number" defaultValue="42" placeholder="Years" />
      </Field>
      <Field label="Gender">
        <Select defaultValue="female">
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
          <option value="prefer-not">Prefer not to say</option>
        </Select>
      </Field>
      <Field label="Date of birth">
        <Input type="date" defaultValue="1984-03-12" />
      </Field>
      <Field label="Height (cm)">
        <Input type="number" defaultValue="170" placeholder="cm" />
      </Field>
      <Field label="Weight (kg)">
        <Input type="number" defaultValue="64" placeholder="kg" />
      </Field>
      <Field label="Email" className="sm:col-span-2">
        <Input type="email" defaultValue="jordan.avery@example.com" placeholder="you@email.com" />
      </Field>
    </div>
  );
}

function LifestyleStep() {
  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Smoking status">
          <Select defaultValue="never">
            <option value="never">Never smoked</option>
            <option value="former">Former smoker</option>
            <option value="occasional">Occasional</option>
            <option value="regular">Regular smoker</option>
          </Select>
        </Field>
        <Field label="Alcohol consumption">
          <Select defaultValue="moderate">
            <option value="none">None</option>
            <option value="moderate">Moderate (1-7 drinks / week)</option>
            <option value="heavy">Heavy (8+ drinks / week)</option>
          </Select>
        </Field>
        <Field label="Exercise frequency">
          <Select defaultValue="regular">
            <option value="sedentary">Sedentary</option>
            <option value="light">1-2 days / week</option>
            <option value="regular">3-5 days / week</option>
            <option value="active">Daily</option>
          </Select>
        </Field>
        <Field label="Diet pattern">
          <Select defaultValue="balanced">
            <option value="balanced">Balanced</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="high-processed">High processed food</option>
          </Select>
        </Field>
      </div>

      <div>
        <Label>Sleep average per night</Label>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {["< 5h", "5-6h", "7-8h", "8h+"].map((opt, i) => (
            <button
              key={opt}
              type="button"
              className={cn(
                "h-10 rounded-xl border text-sm font-medium transition-all",
                i === 2
                  ? "border-medical-500 bg-medical-50 text-medical-600"
                  : "border-surface-border text-navy-300 hover:border-navy-200"
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      <Field label="Anything else we should know about your lifestyle?">
        <Textarea placeholder="E.g. recent weight changes, stress levels, occupation hazards…" />
      </Field>
    </div>
  );
}

function MedicalStep() {
  return (
    <div className="space-y-6">
      <Field label="Family history of cancer" hint="Optional">
        <Select defaultValue="second">
          <option value="none">No known history</option>
          <option value="second">Second-degree relative</option>
          <option value="first">First-degree relative</option>
          <option value="multiple">Multiple relatives</option>
        </Select>
      </Field>

      <div>
        <Label>Current symptoms (select all that apply)</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            "Unexplained weight loss",
            "Persistent fatigue",
            "Chronic cough",
            "Skin changes",
            "Lumps or swelling",
            "Pain",
            "None",
          ].map((s, i) => (
            <button
              key={s}
              type="button"
              className={cn(
                "h-9 px-3.5 rounded-full border text-sm font-medium transition-all",
                i === 1
                  ? "border-medical-500 bg-medical-50 text-medical-600"
                  : "border-surface-border text-navy-300 hover:border-navy-200"
              )}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Existing conditions">
          <Select defaultValue="none">
            <option value="none">None</option>
            <option value="diabetes">Diabetes</option>
            <option value="hypertension">Hypertension</option>
            <option value="autoimmune">Autoimmune</option>
          </Select>
        </Field>
        <Field label="Current medications">
          <Input defaultValue="None" placeholder="List medications" />
        </Field>
      </div>

      <Field label="Additional notes for your clinician">
        <Textarea placeholder="Anything else you would like CuraCore™ to consider…" />
      </Field>
    </div>
  );
}

function ReportsStep() {
  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-medical-100 bg-medical-50/40 p-4 flex items-start gap-3">
        <div className="h-9 w-9 rounded-lg bg-white flex items-center justify-center border border-medical-100">
          <ShieldCheck size={16} className="text-medical-500" />
        </div>
        <div>
          <p className="text-sm font-semibold text-navy">Optional but recommended</p>
          <p className="text-xs text-navy-300 mt-1 leading-relaxed">
            Uploading recent lab results, imaging or pathology reports can improve the accuracy of
            your CuraCore™ risk assessment. All files are encrypted.
          </p>
        </div>
      </div>

      <FileUpload />
    </div>
  );
}
