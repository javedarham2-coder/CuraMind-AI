import { motion } from "framer-motion";
import {
  Brain,
  FileText,
  Sparkles,
  Stethoscope,
  Lock,
  Users,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Card, CardDescription, CardTitle } from "@/components/ui/Card";
import { FadeIn, Stagger, StaggerItem, Section, PageContainer } from "@/components/ui/PageContainer";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Brain,
    title: "CuraCore™ Risk Assessment",
    description:
      "Multi-modal CuraCore™ models analyze lifestyle, history and clinical signals to estimate individualized risk scores.",
    color: "from-medical-500/10 to-cyan-400/10",
    iconColor: "text-medical-500",
    accent: "bg-medical-50",
  },
  {
    icon: FileText,
    title: "Smart Health Reports",
    description:
      "Generate clear, structured reports with explainable findings that clinicians can review and share.",
    color: "from-cyan-400/10 to-medical-500/10",
    iconColor: "text-cyan-500",
    accent: "bg-cyan-50",
  },
  {
    icon: Sparkles,
    title: "Explainable CuraCore™",
    description:
      "Every risk score is backed by transparent factor attribution so you always understand the why.",
    color: "from-accent-500/10 to-medical-500/10",
    iconColor: "text-accent-500",
    accent: "bg-accent-500/10",
  },
  {
    icon: Stethoscope,
    title: "Personalized Recommendations",
    description:
      "Curated screening suggestions aligned with current clinical guidelines and patient context.",
    color: "from-success-500/10 to-cyan-400/10",
    iconColor: "text-success-600",
    accent: "bg-success-50",
  },
  {
    icon: Lock,
    title: "Secure Medical Data",
    description:
      "End-to-end encryption, granular access controls, and zero data retention for model training.",
    color: "from-navy-500/10 to-medical-500/10",
    iconColor: "text-navy-500",
    accent: "bg-navy-50",
  },
  {
    icon: Users,
    title: "Doctor Collaboration",
    description:
      "Share findings with verified specialists, request second opinions, and track care journeys.",
    color: "from-cyan-400/10 to-success-500/10",
    iconColor: "text-medical-500",
    accent: "bg-medical-50",
  },
];

export function Features() {
  return (
    <Section id="features" className="bg-white">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent" />
      <PageContainer>
        <FadeIn className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-medical-500">
            Capabilities
          </p>
          <h2 className="mt-3 text-display-lg text-navy text-balance">
            Everything you need for intelligent,{" "}
            <span className="gradient-text">trustworthy screening</span>.
          </h2>
          <p className="mt-4 text-lg text-navy-300 leading-relaxed">
            A complete CuraCore™ workflow built around clinical safety, explainability, and
            human oversight.
          </p>
        </FadeIn>

        <Stagger className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5" delay={0.06}>
          {features.map((f) => (
            <StaggerItem key={f.title}>
              <FeatureCard {...f} />
            </StaggerItem>
          ))}
        </Stagger>
      </PageContainer>
    </Section>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
  iconColor,
  accent,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  iconColor: string;
  accent: string;
}) {
  return (
    <Card className="group relative p-6 h-full hover:border-navy-200/60 hover:shadow-soft-lg transition-all duration-300 overflow-hidden">
      <div
        className={cn(
          "absolute -top-12 -right-12 h-40 w-40 rounded-full bg-gradient-to-br opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500",
          color
        )}
      />
      <div className="relative flex items-start justify-between">
        <div
          className={cn(
            "feature-icon h-11 w-11 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
            accent
          )}
        >
          <Icon size={22} className={iconColor} strokeWidth={1.75} />
        </div>
        <ArrowUpRight
          size={18}
          className="text-navy-200/40 group-hover:text-navy-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
        />
      </div>
      <CardTitle className="mt-5">{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </Card>
  );
}
