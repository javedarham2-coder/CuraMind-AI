import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Share2,
  Calendar,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  ChevronRight,
  FileText,
  TrendingDown,
  ShieldCheck,
  Activity,
  Users,
  Stethoscope,
  HeartPulse,
} from "lucide-react";
import { RiskGauge } from "@/components/dashboard/RiskGauge";
import { FactorBarChart, RiskTrendChart } from "@/components/dashboard/BarChart";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge, StatusPill } from "@/components/ui/Badge";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/PageContainer";
import { cn } from "@/lib/utils";

// Dashboard: displays CuraCore™ risk outputs and explainability details
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

export function DashboardPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const report = location.state?.report;
  if (!report) {
  navigate("/");
  return null;
}
console.log(report);
  const risk = 18;
  const trend = -18;

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Top bar */}
      <div className="border-b border-surface-border bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-navy transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2">
            <StatusPill status="complete">Report generated</StatusPill>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Share2 size={14} />
              Share with Doctor
            </Button>
            <Button variant="primary" size="sm" className="header-report-button" asChild>
              <Link to="/report">
                <FileText size={14} />
                View Full Report
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-8 sm:py-12">
        {/* Greeting */}
        <FadeIn>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="text-sm text-navy-200">Assessment completed · just now</p>
              <h1 className="mt-1 text-display-md text-navy text-balance">
                Hello, Patient. Here's your{" "}
                <span className="gradient-text">risk assessment</span>.
              </h1>
            </div>
            <div className="flex items-center gap-2 text-xs text-navy-300">
              <ShieldCheck size={14} className="text-success-500" />
              <span>HIPAA-grade encrypted · Patient ID #A-4821</span>
            </div>
          </div>
        </FadeIn>

        {/* Top row */}
        <div className="mt-8 grid lg:grid-cols-12 gap-5">
          {/* Risk score */}
          <FadeIn delay={0.05} className="lg:col-span-5">
            <Card className="p-6 sm:p-8 h-full relative overflow-hidden">
              <div className="absolute -top-20 -right-16 h-52 w-52 rounded-full bg-success-500/10 blur-3xl" />
              <div className="relative">
                <Badge variant="success" className="px-2.5 py-1">
                  <Sparkles size={11} />
                  CuraCore™ estimate
                </Badge>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy">
                  Low risk profile detected
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-300">
                  Based on 14 clinical signals, your estimated 5-year cancer risk is below the
                  general population average. Continue routine screening.
                </p>

                <div className="mt-6 border-t border-surface-border/80 pt-6">
                  <div className="mx-auto w-full max-w-[190px]">
                    <RiskGauge value={risk} size={190} />
                  </div>
                  <div className="mt-6 grid grid-cols-3 divide-x divide-surface-border">
                    <Metric className="px-2 text-center" label="Confidence" value={94} suffix="%" />
                    <Metric className="px-2 text-center" label="Signals" value={14} />
                    <Metric className="px-2 text-center" label="Compared to" value={48} suffix="k" />
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

          {/* Risk factors */}
          <FadeIn delay={0.1} className="lg:col-span-4">
            <Card className="p-6 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-navy">Risk factor breakdown</h3>
                  <p className="text-xs text-navy-200 mt-0.5">Weighted CuraCore™ attribution</p>
                </div>
                <Badge variant="ai" className="px-2 py-0.5 text-[10px]">
                  <Sparkles size={10} />
                  Explainable
                </Badge>
              </div>
              <div className="mt-6">
                <FactorBarChart />
              </div>
            </Card>
          </FadeIn>

          {/* Confidence + actions */}
          <FadeIn delay={0.15} className="lg:col-span-3 flex flex-col gap-5">
            <Card className="p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-medical-500/10 blur-2xl" />
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                CuraCore Confidence
              </p>
              <p className="health-value mt-2 text-4xl font-bold tracking-tight text-navy">
                <AnimatedNumber value={94} suffix="%" />
              </p>
              <p className="mt-1.5 text-xs text-navy-300">
                High agreement across 3 independent models
              </p>
              <div className="mt-4 flex items-end gap-1 h-12">
                {Array.from({ length: 24 }).map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 0.3 + (i / 24) * 0.7 }}
                    transition={{ delay: 0.4 + i * 0.02, duration: 0.4 }}
                    style={{ transformOrigin: "bottom" }}
                    className="flex-1 rounded-sm bg-gradient-to-t from-medical-500 to-cyan-400"
                  />
                ))}
              </div>
            </Card>
            <Card className="p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                Next review
              </p>
              <p className="health-value mt-2 text-2xl font-bold text-navy">12 months</p>
              <p className="mt-1 text-xs text-navy-300">Recommended on Mar 12, 2027</p>
              <Button variant="outline" size="sm" className="mt-4 w-full">
                <Calendar size={14} />
                Schedule reminder
              </Button>
            </Card>
            <Link to="/report" className="block">
              <Card className="final-report-card group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5">
                <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-success-500/20 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center gap-3">
                  <div className="final-report-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600">
                    <FileText size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">Ready to view</p>
                    <p className="mt-0.5 text-base font-semibold text-accent-500">Final Report</p>
                  </div>
                  <ChevronRight size={18} className="text-accent-500 transition-transform group-hover:translate-x-1" />
                </div>
              </Card>
            </Link>
          </FadeIn>
        </div>

        {/* Overall recommendation */}
        <FadeIn delay={0.18} className="mt-5">
          <Card className="assessment-recommendation relative overflow-hidden px-6 py-5 sm:px-8">
            <div className="absolute -right-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-success-500/10 blur-3xl" />
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="recommendation-summary-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600">
                  <ShieldCheck size={19} />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">Assessment recommendation</p>
                  <p className="mt-1 text-sm font-semibold text-navy sm:text-base">
                    Continue routine preventive screening—your current five-year risk is low.
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-navy-300">
                    Maintain your healthy lifestyle and schedule your next review in 12 months.
                  </p>
                </div>
              </div>
              <Badge variant="success" className="self-start sm:self-center">Low-risk plan</Badge>
            </div>
          </Card>
        </FadeIn>

        {/* Recommendations + Timeline */}
        <div className="mt-5 grid lg:grid-cols-12 gap-5">
          <FadeIn delay={0.25} className="lg:col-span-7">
            <Card className="p-6 sm:p-8 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-navy">CuraCore™ recommended next steps</h3>
                  <p className="text-sm text-navy-300 mt-0.5">
                    Suggested by CuraMind based on current clinical guidelines
                  </p>
                </div>
                <Badge variant="ai">
                  <Sparkles size={11} />
                  Personalized
                </Badge>
              </div>

              <div className="mt-6 space-y-3">
                <RecommendationItem
                  title="Annual primary care screening"
                  detail="Continue yearly physical exam and routine bloodwork."
                  priority="Routine"
                  priorityVariant="info"
                />
                <RecommendationItem
                  title="Mammography baseline at age 45"
                  detail="Family history warrants early baseline imaging. Discuss with your doctor."
                  priority="Recommended"
                  priorityVariant="success"
                />
                <RecommendationItem
                  title="Lifestyle optimization"
                  detail="Maintain 150+ min/week of moderate activity and Mediterranean-style diet."
                  priority="Lifestyle"
                  priorityVariant="ai"
                />
                <RecommendationItem
                  title="Genetic counseling consult"
                  detail="Given family history, a single session with a genetic counselor may inform future screening."
                  priority="Optional"
                  priorityVariant="neutral"
                />
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button variant="primary" size="md" asChild>
                  <Link to="/report">
                    <FileText size={14} />
                    Download CuraCore™ Report
                  </Link>
                </Button>
                <Button variant="outline" size="md">
                  <Calendar size={14} />
                  Book Appointment
                </Button>
              </div>
            </Card>
          </FadeIn>

          <FadeIn delay={0.3} className="lg:col-span-5">
            <Card className="p-6 sm:p-8 h-full">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-navy">Your health timeline</h3>
                  <p className="text-sm text-navy-300 mt-0.5">Risk trend over time</p>
                </div>
                <Badge variant="success" className="flex items-center gap-2">
                  <TrendingDown size={11} />
                  <AnimatedNumber value={Math.abs(trend)} suffix="%" />
                </Badge>
              </div>

              <div className="mt-6">
                <RiskTrendChart />
              </div>

              <div className="mt-6 pt-5 border-t border-surface-border space-y-3">
                <TimelineEvent
                  date="Today"
                  title="CuraCore™ risk assessment completed"
                  detail="CuraCore™ analysis · 14 signals"
                  status="current"
                />
                <TimelineEvent
                  date="Last week"
                  title="Annual blood panel uploaded"
                  detail="All markers within normal range"
                />
                <TimelineEvent
                  date="Mar 2024"
                  title="Baseline screening"
                  detail="Routine physical · no findings"
                />
              </div>
            </Card>
          </FadeIn>
        </div>

        {/* Explainability */}
        <FadeIn delay={0.35} className="mt-5">
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-medical-500 to-cyan-400 flex items-center justify-center text-white">
                  <Lightbulb size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy">Why did CuraCore™ reach this conclusion?</h3>
                  <p className="text-sm text-navy-300 mt-0.5 max-w-2xl">
                    Plain-language explanation of the top factors that influenced your risk estimate, ranked by attribution weight.
                  </p>
                </div>
              </div>
              <Badge variant="default" className="self-start sm:self-center">SHAP attribution</Badge>
            </div>
            <Stagger className="mt-7 grid md:grid-cols-2 gap-4" delay={0.08}>
              <ReasonCard title="Strong family history signal" body="First-degree relative with breast cancer contributed the most to your risk baseline. However, no genetic markers detected." impact="+0.28" color="amber" icon={Users} />
              <ReasonCard title="Healthy lifestyle patterns" body="Regular physical activity, balanced diet and 7-8h sleep reduced overall risk by an estimated 34%." impact="-0.34" color="success" icon={Activity} />
              <ReasonCard title="No active concerning symptoms" body="Reported symptoms are non-specific and not correlated with elevated cancer markers in similar profiles." impact="-0.08" color="success" icon={Stethoscope} />
              <ReasonCard title="Age and demographic baseline" body="Age 42 places you in a moderate baseline risk bracket. Routine screening recommended." impact="+0.18" color="info" icon={HeartPulse} />
            </Stagger>
          </Card>
        </FadeIn>

        {/* Disclaimer */}
        <FadeIn delay={0.4} className="mt-5">
          <div className="ai-disclaimer rounded-2xl border border-amber-200 bg-amber-50/50 p-5 sm:p-6 flex items-start gap-3">
            <div className="h-9 w-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
              <AlertTriangle size={16} className="text-amber-700" />
            </div>
            <div>
              <p className="text-sm font-semibold text-amber-900">
                This is a CuraCore™ risk estimate, not a diagnosis.
              </p>
              <p className="mt-1 text-xs text-amber-800/80 leading-relaxed max-w-3xl">
                CuraMind provides clinical decision support to help you and your healthcare provider
                make informed screening decisions. It does not diagnose cancer or any disease.
                Please discuss your results with a qualified medical professional before making
                health decisions.
              </p>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  suffix = "",
  className,
}: {
  label: string;
  value: number;
  suffix?: string;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-200">{label}</p>
      <p className="health-value text-base font-semibold text-navy mt-0.5">
        <AnimatedNumber value={value} suffix={suffix} />
      </p>
    </div>
  );
}

function ReasonCard({
  title,
  body,
  impact,
  color,
  icon: Icon,
}: {
  title: string;
  body: string;
  impact: string;
  color: "amber" | "success" | "info";
  icon: React.ComponentType<{ size?: number; className?: string }>;
}) {
  const map = {
    amber: "bg-amber-50 text-amber-700 border-amber-200",
    success: "bg-success-50 text-success-600 border-success-100",
    info: "bg-medical-50 text-medical-600 border-medical-100",
  };
  return (
    <StaggerItem>
      <div
        className={cn(
          "relative rounded-2xl border p-5 bg-white hover:shadow-soft transition-all group"
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className={cn(
                "h-9 w-9 rounded-lg flex items-center justify-center border",
                map[color]
              )}
            >
              <Icon size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-navy">{title}</p>
              <p className="text-xs text-navy-300 mt-1 leading-relaxed">{body}</p>
            </div>
          </div>
          <span
            className={cn(
              "text-xs font-semibold tabular-nums px-2 py-0.5 rounded-full border",
              map[color]
            )}
          >
            {impact}
          </span>
        </div>
      </div>
    </StaggerItem>
  );
}

function RecommendationItem({
  title,
  detail,
  priority,
  priorityVariant,
}: {
  title: string;
  detail: string;
  priority: string;
  priorityVariant: "info" | "success" | "ai" | "neutral";
}) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-surface-border p-4 hover:border-navy-200/60 hover:bg-surface-subtle/50 transition-all cursor-pointer group">
      <div className="recommendation-icon h-9 w-9 rounded-lg bg-gradient-to-br from-medical-50 to-cyan-50 flex items-center justify-center shrink-0 border border-medical-100">
        <ChevronRight size={16} className="text-medical-500" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-navy">{title}</p>
          <Badge variant={priorityVariant} className="text-[10px]">
            {priority}
          </Badge>
        </div>
        <p className="text-xs text-navy-300 mt-0.5">{detail}</p>
      </div>
      <ChevronRight
        size={16}
        className="text-navy-200 group-hover:text-navy-300 group-hover:translate-x-0.5 transition-all"
      />
    </div>
  );
}

function TimelineEvent({
  date,
  title,
  detail,
  status,
}: {
  date: string;
  title: string;
  detail: string;
  status?: "current";
}) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            status === "current" ? "bg-cyan-400 ring-4 ring-cyan-400/20" : "bg-surface-border"
          )}
        />
        <div className="w-px flex-1 bg-surface-border mt-1" />
      </div>
      <div className="pb-2 -mt-1">
        <p className="text-[11px] uppercase tracking-wider text-navy-200 font-semibold">{date}</p>
        <p className="text-sm font-medium text-navy mt-0.5">{title}</p>
        <p className="text-xs text-navy-300 mt-0.5">{detail}</p>
      </div>
    </div>
  );
}
