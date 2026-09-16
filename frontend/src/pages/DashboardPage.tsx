import { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Share2,
  Calendar,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  FileText,
  ShieldCheck,
  Activity,
} from "lucide-react";

import { useAssessment } from "@/context/AssessmentContext";

import {
  getOverallRisk,
  getPrimaryResult,
  getRecommendation,
  getRiskBreakdown,
  getSignalCount,
} from "@/lib/report";

import { RiskGauge } from "@/components/dashboard/RiskGauge";

import { FactorBarChart } from "@/components/dashboard/BarChart";

import { Button } from "@/components/ui/Button";

import { Card } from "@/components/ui/Card";

import { Badge, StatusPill } from "@/components/ui/Badge";

import { FadeIn } from "@/components/ui/PageContainer";

import { cn } from "@/lib/utils";

import { AnimatedNumber } from "@/components/ui/AnimatedNumber";

const riskVariant = (risk: string) =>
  risk === "High"
    ? "danger"
    : risk === "Moderate"
      ? "warning"
      : "success";

export function DashboardPage() {
  const navigate = useNavigate();

  const { patient, report } = useAssessment();

  useEffect(() => {
    if (!report) {
      navigate("/assessment", { replace: true });
    }
  }, [navigate, report]);

  if (!report) return null;

  const overall = getOverallRisk(report);

  const breakdown = getRiskBreakdown(report);

  const primary = getPrimaryResult(report);

  const recommendation = getRecommendation(report);

  const signalCount = getSignalCount(report);

  const mlPrediction = report.report.ml_prediction;

  const displayName =
    patient.personal_information.full_name || "Patient";

  const nextSteps = recommendation?.next_steps ?? [];

  /*
   * MAIN OVERALL DISPLAY
   * The main CuraCore gauge is now driven by the
   * integrated CuraMind V1 ML probability.
   */

  const mlProbability =
    mlPrediction?.prediction.probability_percent ??
    overall.percent;

  const mlRiskLevel =
    mlProbability < 20
      ? "Low"
      : mlProbability < 50
        ? "Medium"
        : "High";

  return (
    <div className="min-h-screen bg-gradient-soft">

      {/* Header */}

      <div className="border-b border-surface-border bg-white/80 backdrop-blur-xl sticky top-0 z-30">

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:flex-nowrap sm:px-8 sm:gap-4">

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-navy transition-colors"
          >
            <ArrowLeft size={16} />

            <span>Back</span>
          </button>

          <StatusPill
            status="complete"
            className="order-3 sm:order-none"
          >
            Report generated
          </StatusPill>

          <div className="flex flex-wrap items-center justify-end gap-2">

            <Button
              variant="outline"
              size="sm"
            >
              <Share2 size={14} />

              Share with Doctor
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="header-report-button"
              asChild
            >
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

              <p className="text-sm text-navy-200">
                Assessment completed · just now
              </p>

              <h1 className="mt-1 text-display-md text-navy text-balance">

                Hello, {displayName}. Here's your{" "}

                <span className="gradient-text">
                  risk assessment
                </span>

                .

              </h1>

            </div>

            <div className="flex items-center gap-2 text-xs text-navy-300">

              <ShieldCheck
                size={14}
                className="text-success-500"
              />

              <span>
                Your assessment data is protected
              </span>

            </div>

          </div>

        </FadeIn>

        {/* Main dashboard cards */}

        <div className="mt-8 grid lg:grid-cols-12 gap-5">

          {/* Overall risk */}

          <FadeIn
            delay={0.05}
            className="lg:col-span-5"
          >

            <Card className="p-6 sm:p-8 h-full relative overflow-hidden">

              <div className="absolute -top-20 -right-16 h-52 w-52 rounded-full bg-success-500/10 blur-3xl" />

              <div className="relative">

                <Badge
                  variant="success"
                  className="px-2.5 py-1"
                >

                  <Sparkles size={11} />

                  CuraCore™ estimate

                </Badge>

                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-navy">

                  {mlRiskLevel} risk profile detected

                </h3>

                <p className="mt-2 max-w-xl text-sm leading-relaxed text-navy-300">

                  Based on{" "}

                  <AnimatedNumber value={signalCount} />{" "}

                  matched risk signals across your assessment.
                  Review the cancer-specific breakdown and
                  recommended next steps below.

                </p>

                <div className="mt-6 border-t border-surface-border/80 pt-6">

                  <div className="mx-auto w-full max-w-[190px]">

                    <RiskGauge
                      value={mlProbability}
                      label="Overall risk"
                      size={190}
                    />

                  </div>

                  <div className="mt-6 grid grid-cols-3 divide-x divide-surface-border">

                    <Metric
                      className="px-2 text-center"
                      label="Overall risk score"
                      value={`${mlProbability.toFixed(2)}%`}
                    />

                    <Metric
                      className="px-2 text-center"
                      label="Signals"
                      value={signalCount}
                    />

                    <Metric
                      className="px-2 text-center"
                      label="Cancer types"
                      value={breakdown.length}
                    />

                  </div>

                </div>

              </div>

            </Card>

          </FadeIn>

          {/* Risk factor breakdown */}

          <FadeIn
            delay={0.1}
            className="lg:col-span-4"
          >

            <Card className="p-6 h-full">

              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-lg font-semibold text-navy">
                    Risk factor breakdown
                  </h3>

                  <p className="text-xs text-navy-200 mt-0.5">
                    Cancer-specific scores from CuraCore™
                  </p>

                </div>

                <Badge
                  variant="ai"
                  className="px-2 py-0.5 text-[10px]"
                >

                  <Sparkles size={10} />

                  Explainable

                </Badge>

              </div>

              <div className="mt-6">

                <FactorBarChart data={breakdown} />

              </div>

            </Card>

          </FadeIn>

          {/* Priority / specialist */}

          <FadeIn
            delay={0.15}
            className="lg:col-span-3 flex flex-col gap-5"
          >

            <Card className="p-6 relative overflow-hidden">

              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-medical-500/10 blur-2xl" />

              <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                Highest-priority area
              </p>

              <p className="health-value mt-2 text-3xl font-bold tracking-tight text-navy capitalize">

                {primary
                  ? breakdown.find(
                      (item) => item.score === primary.score
                    )?.label
                  : "—"}

              </p>

              <p className="mt-1.5 text-xs text-navy-300">

                {primary?.recommendation.urgency ??
                  "No recommendation available"}

              </p>

            </Card>

            <Card className="p-6">

              <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                Recommended specialist
              </p>

              <p className="health-value mt-2 text-xl font-bold text-navy">

                {recommendation?.specialist ??
                  "General Physician"}

              </p>

              <p className="mt-1 text-xs text-navy-300">
                Based on the highest current risk score
              </p>

              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
              >

                <Calendar size={14} />

                Schedule reminder

              </Button>

            </Card>

            <Link
              to="/report"
              className="block"
            >

              <Card className="final-report-card group relative overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5">

                <div className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-success-500/20 blur-2xl transition-opacity group-hover:opacity-100" />

                <div className="relative flex items-center gap-3">

                  <div className="final-report-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600">

                    <FileText size={18} />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                      Ready to view
                    </p>

                    <p className="mt-0.5 text-base font-semibold text-accent-500">
                      Final Report
                    </p>

                  </div>

                  <ChevronRight
                    size={18}
                    className="text-accent-500 transition-transform group-hover:translate-x-1"
                  />

                </div>

              </Card>

            </Link>

          </FadeIn>

        </div>

        {/* ML MODEL RESULT */}

        {mlPrediction && (

          <FadeIn
            delay={0.18}
            className="mt-5"
          >

            <Card className="p-6 sm:p-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                <div>

                  <Badge
                    variant="ai"
                    className="px-2.5 py-1"
                  >

                    <Sparkles size={11} />

                    ML-powered screening

                  </Badge>

                  <h3 className="mt-3 text-xl font-semibold text-navy">
                    CuraMind V1 prediction
                  </h3>

                  <p className="mt-1 text-sm text-navy-300">

                    Trained machine-learning screening model
                    using BRFSS-derived health and lifestyle
                    features.

                  </p>

                </div>

                <Badge
                  variant={
                    mlPrediction.prediction.risk_category ===
                    "elevated"
                      ? "warning"
                      : "success"
                  }
                  className="self-start"
                >

                  {mlPrediction.prediction.risk_category ===
                  "elevated"
                    ? "Elevated"
                    : "Lower"}

                </Badge>

              </div>

              {/* ML metrics */}

              <div className="mt-6 grid gap-4 md:grid-cols-3">

                <div className="rounded-xl border border-surface-border p-4">

                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                    ML probability
                  </p>

                  <p className="mt-2 text-3xl font-bold text-navy">

                    {mlPrediction.prediction.probability_percent}%

                  </p>

                  <p className="mt-1 text-xs text-navy-300">
                    Model-estimated probability
                  </p>

                </div>

                <div className="rounded-xl border border-surface-border p-4">

                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                    Risk category
                  </p>

                  <p className="mt-2 text-xl font-bold capitalize text-navy">

                    {mlPrediction.prediction.risk_category}

                  </p>

                  <p className="mt-1 text-xs text-navy-300">
                    Based on the model threshold
                  </p>

                </div>

                <div className="rounded-xl border border-surface-border p-4">

                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                    Decision threshold
                  </p>

                  <p className="mt-2 text-xl font-bold text-navy">

                    {mlPrediction.prediction.decision_threshold *
                      100}

                    %

                  </p>

                  <p className="mt-1 text-xs text-navy-300">
                    Classification threshold
                  </p>

                </div>

              </div>

              {/* SHAP explanations */}

              <div className="mt-7 border-t border-surface-border pt-6">

                <div className="flex items-start gap-3">

                  <div className="h-9 w-9 rounded-lg bg-medical-50 flex items-center justify-center shrink-0">

                    <Activity
                      size={17}
                      className="text-medical-500"
                    />

                  </div>

                  <div>

                    <h4 className="font-semibold text-navy">
                      Why did the ML model reach this result?
                    </h4>

                    <p className="mt-0.5 text-xs text-navy-300">

                      Top SHAP factors showing which features
                      influenced this individual prediction.

                    </p>

                  </div>

                </div>

                <div className="mt-5 grid gap-3 md:grid-cols-2">

                  {mlPrediction.explanations
                    .slice(0, 6)
                    .map((item) => (

                      <div
                        key={item.feature}
                        className="rounded-xl border border-surface-border p-4 transition-all hover:border-navy-200/60 hover:bg-surface-subtle/50"
                      >

                        <div className="flex items-start justify-between gap-3">

                          <div className="min-w-0">

                            <p className="text-sm font-semibold text-navy">
                              {item.label}
                            </p>

                            <p className="mt-1 text-xs text-navy-300">

                              Input value:{" "}

                              {String(item.input_value)}

                            </p>

                          </div>

                          <Badge
                            variant={
                              item.direction === "positive"
                                ? "warning"
                                : item.direction === "negative"
                                  ? "success"
                                  : "info"
                            }
                            className="shrink-0"
                          >

                            {item.direction}

                          </Badge>

                        </div>

                        <div className="mt-3 flex items-center justify-between">

                          <span className="text-[10px] uppercase tracking-wider font-semibold text-navy-200">
                            SHAP impact
                          </span>

                          <span className="text-xs font-semibold tabular-nums text-navy">

                            {item.shap_value > 0 ? "+" : ""}

                            {item.shap_value.toFixed(4)}

                          </span>

                        </div>

                      </div>

                    ))}

                </div>

              </div>

              <div className="mt-5 flex flex-col gap-1 border-t border-surface-border pt-4 sm:flex-row sm:items-center sm:justify-between">

                <p className="text-xs text-navy-300">

                  Model:{" "}

                  <span className="font-medium text-navy">

                    {mlPrediction.prediction.model_name}

                  </span>

                </p>

                <p className="text-xs text-navy-300">

                  Target: cancer-history proxy · not future
                  cancer prediction

                </p>

              </div>

            </Card>

          </FadeIn>

        )}

        {/* Assessment recommendation */}

        <FadeIn
          delay={0.2}
          className="mt-5"
        >

          <Card className="assessment-recommendation relative overflow-hidden px-6 py-5 sm:px-8">

            <div className="absolute -right-10 top-1/2 h-28 w-28 -translate-y-1/2 rounded-full bg-success-500/10 blur-3xl" />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div className="min-w-0 flex items-start gap-3">

                <div className="recommendation-summary-icon flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600">

                  <ShieldCheck size={19} />

                </div>

                <div>

                  <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
                    Assessment recommendation
                  </p>

                  <p className="mt-1 text-sm font-semibold text-navy sm:text-base">

                    {recommendation?.action ??
                      "Review your assessment results with a healthcare professional."}

                  </p>

                </div>

              </div>

              <Badge
                variant={riskVariant(overall.level)}
                className="shrink-0 self-start whitespace-nowrap px-3 sm:self-center"
              >

                {overall.level} risk plan

              </Badge>

            </div>

          </Card>

        </FadeIn>

        {/* Recommended next steps */}

        <FadeIn
          delay={0.25}
          className="mt-5"
        >

          <Card className="p-6 sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <h3 className="text-lg font-semibold text-navy">
                  CuraCore™ recommended next steps
                </h3>

                <p className="text-sm text-navy-300 mt-0.5">

                  Generated from your highest-priority
                  risk profile

                </p>

              </div>

              <Badge variant="ai">

                <Sparkles size={11} />

                Personalized

              </Badge>

            </div>

            <div className="mt-6 space-y-3">

              {nextSteps.map((step) => (

                <RecommendationItem
                  key={step}
                  title={step}
                  priority={
                    recommendation?.urgency ??
                    overall.level
                  }
                  priorityVariant={riskVariant(
                    overall.level
                  )}
                />

              ))}

            </div>

            <div className="mt-7 flex flex-wrap gap-3">

              <Button
                variant="primary"
                size="md"
                asChild
              >

                <Link to="/report">

                  <FileText size={14} />

                  View CuraCore™ Report

                </Link>

              </Button>

              <Button
                variant="outline"
                size="md"
              >

                <Calendar size={14} />

                Book Appointment

              </Button>

            </div>

          </Card>

        </FadeIn>

        {/* Disclaimer */}

        <FadeIn
          delay={0.4}
          className="mt-5"
        >

          <div className="ai-disclaimer rounded-2xl border border-amber-200 bg-amber-50/50 p-5 sm:p-6 flex items-start gap-3">

            <div className="h-9 w-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">

              <AlertTriangle
                size={16}
                className="text-amber-700"
              />

            </div>

            <div>

              <p className="text-sm font-semibold text-amber-900">

                This is a CuraCore™ risk estimate, not a
                diagnosis.

              </p>

              <p className="mt-1 text-xs text-amber-800/80 leading-relaxed max-w-3xl">

                CuraMind provides clinical decision support
                to help you and your healthcare provider make
                informed screening decisions. Please discuss
                your results with a qualified medical
                professional.

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
  className,
}: {
  label: string;
  value: string | number;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>

      <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-200">
        {label}
      </p>

      <p className="health-value text-base font-semibold text-navy mt-0.5">

        {typeof value === "number" ? (
          <AnimatedNumber value={value} />
        ) : (
          value
        )}

      </p>

    </div>
  );
}

function RecommendationItem({
  title,
  priority,
  priorityVariant,
}: {
  title: string;
  priority: string;
  priorityVariant: "danger" | "warning" | "success";
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-surface-border p-4 transition-all hover:border-navy-200/60 hover:bg-surface-subtle/50 sm:grid sm:grid-cols-[2.25rem_minmax(0,1fr)_13rem] sm:items-center sm:gap-4">

      <div className="recommendation-icon flex h-9 w-9 items-center justify-center rounded-lg border border-medical-100 bg-gradient-to-br from-medical-50 to-cyan-50">

        <ChevronRight
          size={16}
          className="text-medical-500"
        />

      </div>

      <p className="min-w-0 text-sm font-semibold leading-relaxed text-navy">
        {title}
      </p>

      <div className="w-full sm:w-52 sm:justify-self-end">

        <Badge
          variant={priorityVariant}
          className="w-full justify-center whitespace-normal px-3 py-1.5 text-center text-[10px] leading-4"
        >

          {priority}

        </Badge>

      </div>

    </div>
  );
}