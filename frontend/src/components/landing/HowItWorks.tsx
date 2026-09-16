import { UserCircle2, Brain, FileBarChart, Stethoscope, Check } from "lucide-react";
import { FadeIn, Section, PageContainer } from "@/components/ui/PageContainer";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    icon: UserCircle2,
    title: "Patient Intake",
    description: "Securely share health history, lifestyle and symptoms in a guided flow.",
    color: "text-medical-500",
    bg: "bg-medical-50",
  },
  {
    icon: Brain,
    title: "CuraCore™ Analysis",
    description: "Multi-modal CuraCore™ models evaluate patterns against clinical knowledge.",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    icon: FileBarChart,
    title: "Risk Report",
    description: "Receive an explainable risk profile and screening suggestions.",
    color: "text-accent-500",
    bg: "bg-accent-500/10",
  },
  {
    icon: Stethoscope,
    title: "Doctor Review",
    description: "A qualified clinician reviews, confirms and guides next steps.",
    color: "text-success-600",
    bg: "bg-success-50",
  },
];

export function HowItWorks() {
  return (
    <Section id="how" className="relative bg-surface-subtle/50">
      <div className="absolute inset-0 grid-pattern opacity-50 mask-radial pointer-events-none" />
      <PageContainer>
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-medical-500">
            How it works
          </p>
          <h2 className="mt-3 text-display-lg text-navy text-balance">
            A clinical-grade workflow in{" "}
            <span className="gradient-text">four simple steps</span>.
          </h2>
          <p className="mt-4 text-lg text-navy-300 leading-relaxed">
            From intake to actionable insight — designed to fit naturally into existing clinical
            practice.
          </p>
        </FadeIn>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-px">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-gradient-to-r from-medical-500/40 via-cyan-400/40 to-success-500/40" />
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
                className="absolute inset-0 bg-gradient-to-r from-medical-500 via-cyan-400 to-success-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6 md:gap-5 relative">
            {steps.map((s, i) => (
              <FadeIn key={s.title} delay={i * 0.1} className="relative">
                <div className="flex flex-col items-start">
                  <div className="relative">
                    <div
                      className={cn(
                        "h-24 w-24 rounded-3xl bg-white border border-surface-border shadow-soft flex items-center justify-center relative z-10"
                      )}
                    >
                      <s.icon size={32} className={s.color} strokeWidth={1.5} />
                    </div>
                    <div className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-navy-500 text-white text-xs font-bold flex items-center justify-center shadow-soft z-20 border-2 border-white">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-navy">{s.title}</h3>
                  <p className="mt-1.5 text-sm text-navy-300 leading-relaxed">{s.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute left-12 -bottom-6 h-6 w-px bg-gradient-to-b from-surface-border to-transparent" />
                )}
              </FadeIn>
            ))}
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}
