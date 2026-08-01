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
import { StepProgress } from "@/components/ui/Progress";
import { cn } from "@/lib/utils";
import { AssessmentProvider } from "@/context/AssessmentContext";
import PersonalStep from "@/components/assessment/steps/PersonalStep";
import LifestyleStep from "@/components/assessment/steps/LifestyleStep";
import MedicalStep from "@/components/assessment/steps/MedicalStep";
import ReportsStep from "@/components/assessment/steps/ReportsStep";

import { useAssessment } from "@/context/AssessmentContext";
import { predictPatient } from "@/api/patientApi";
import type {
  PredictRequest,
  PredictResponse,
} from "@/types/patient";




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
  return (
    <AssessmentProvider>
      <AssessmentContent />
    </AssessmentProvider>
  );
}

function AssessmentContent() {
  const navigate = useNavigate();
  const { patient } = useAssessment();

  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [loading, setLoading] = useState(false);

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleSubmit = async () => {
  try {
    setLoading(true);

    const response = await predictPatient<
      PredictRequest,
      PredictResponse
    >({
      patient,
    });

    navigate("/analysis", {
      state: response.data,
    });
  } 
  catch (error) {
  console.error("Prediction Error:", error);

  if (error instanceof Error) {
    alert(error.message);
  } else {
    alert("Unknown Error");
  }} 
  finally {
    setLoading(false);
  }
};

  return (
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
                  onClick={handleSubmit}
                  disabled={loading}
                  className="group"
                  >
                    {loading 
                    ? "Running CuraCore™ Analysis..."
                    : "Run CuraCore™ Analysis"}
                    
                    {!loading && (
                      <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5"
                      />
                      )}
                      </Button>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
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
