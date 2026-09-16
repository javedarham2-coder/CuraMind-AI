import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Download,
  Printer,
  Share2,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Lightbulb,
  Activity,
} from "lucide-react";

import { useAssessment } from "@/context/AssessmentContext";
import {
  getOverallRisk,
  getRecommendation,
  getRiskBreakdown,
  uniqueReportValues,
} from "@/lib/report";

import { Button } from "@/components/ui/Button";
import { Badge, StatusPill } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import {
  FadeIn,
  Stagger,
  StaggerItem,
} from "@/components/ui/PageContainer";
import { cn } from "@/lib/utils";

const variantFor = (risk: string) =>
  risk === "High"
    ? "danger"
    : risk === "Moderate"
      ? "warning"
      : "success";

export function ReportPage() {
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
  const recommendation = getRecommendation(report);

  const tests = uniqueReportValues(
    report,
    "tests_to_discuss"
  );

  const lifestyle = uniqueReportValues(
    report,
    "lifestyle"
  );

  const fullName =
    patient.personal_information.full_name || "Patient";

  const mlPrediction = report.report.ml_prediction;

  /*
   * MAIN OVERALL REPORT DISPLAY
   * Uses the same ML probability shown on the Dashboard.
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

  const mlRiskVariant = variantFor(
    mlRiskLevel === "Medium" ? "Moderate" : mlRiskLevel
  );

  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Header */}
      <div className="border-b border-surface-border bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4 sm:flex-nowrap sm:px-8 sm:gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-navy transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to dashboard</span>
          </button>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <Button variant="ghost" size="sm">
              <Printer size={14} />
              Print
            </Button>

            <Button variant="outline" size="sm">
              <Share2 size={14} />
              Share
            </Button>

            <Button
              variant="primary"
              size="sm"
              className="report-download-button"
            >
              <Download size={14} />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-10 sm:py-14">
        {/* Report cover */}
        <FadeIn>
          <Card className="overflow-hidden">
            <div className="relative bg-navy-500 text-white p-8 sm:p-12 overflow-hidden">
              <div className="absolute inset-0 bg-mesh-hero opacity-60" />
              <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
              <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-medical-500/20 blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center">
                      <Sparkles
                        size={16}
                        className="text-cyan-400"
                      />
                    </div>

                    <div>
                      <p className="text-sm font-semibold">
                        CuraCore™ Report
                      </p>

                      <p className="text-[10px] text-white/50 uppercase tracking-wider">
                        CuraCore™ Risk Assessment
                      </p>
                    </div>
                  </div>

                  <StatusPill
                    status="complete"
                    className="bg-white/10 border border-white/15"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
                    Final
                  </StatusPill>
                </div>

                <h1 className="report-cover-title mt-10 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                  Early cancer risk screening report
                </h1>

                <p className="mt-2 text-white/70 text-sm">
                  Generated from your submitted assessment
                </p>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    {
                      label: "Patient",
                      value: fullName,
                    },
                    {
                      label: "Age",
                      value: String(
                        patient.personal_information.age || "—"
                      ),
                    },
                    {
                      label: "Sex",
                      value:
                        patient.personal_information.gender || "—",
                    },
                    {
                      label: "Overall risk",
                      value: mlRiskLevel,
                    },
                  ].map((field) => (
                    <div
                      key={field.label}
                      className="rounded-xl bg-white/5 border border-white/10 p-3"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
                        {field.label}
                      </p>

                      <p className="text-sm font-semibold mt-1">
                        {field.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary stats */}
            <div className="p-6 sm:p-10 grid sm:grid-cols-3 gap-5">
              <SummaryStat
                label="Overall score"
                value={`${mlProbability.toFixed(2)}%`}
                sub={`${mlRiskLevel} risk`}
                color={mlRiskVariant}
              />

              <SummaryStat
                label="Cancer types assessed"
                value={
                  <AnimatedNumber value={breakdown.length} />
                }
                sub="Backend risk engine"
                color="info"
              />

              <SummaryStat
                label="Recommended specialist"
                value={
                  recommendation?.specialist ??
                  "General Physician"
                }
                sub={
                  recommendation?.urgency ??
                  "Review recommended"
                }
                color="neutral"
              />
            </div>
          </Card>
        </FadeIn>

        {/* Important notice */}
        <FadeIn delay={0.05}>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3">
            <AlertCircle
              size={16}
              className="text-amber-700 mt-0.5 shrink-0"
            />

            <p className="text-xs text-amber-900 leading-relaxed">
              <span className="font-semibold">
                Important:
              </span>{" "}
              This report is generated by CuraCore™ to
              support—not replace—clinical judgment. It does
              not constitute a diagnosis. Please discuss
              results with a qualified healthcare provider.
            </p>
          </div>
        </FadeIn>

        {/* 01 Overall assessment */}
        <FadeIn delay={0.1}>
          <ReportSection
            number="01"
            title="Overall assessment"
            subtitle="CuraMind screening assessment powered by CuraCore™"
          >
            <p className="text-[15px] text-navy-300 leading-relaxed">
              CuraMind's current machine-learning screening
              model produced a model output of{" "}
              <span className="font-semibold text-navy">
                {mlProbability.toFixed(2)}%
              </span>
              , classified as{" "}
              <span className="font-semibold text-navy">
                {mlRiskLevel}
              </span>{" "}
              using the model's decision threshold.
            </p>

            <p className="mt-3 text-sm text-navy-300 leading-relaxed">
              The cancer-specific screening scores below are
              generated separately by the CuraCore™ risk
              engine and are used to identify areas that may
              require further medical evaluation.
            </p>
          </ReportSection>
        </FadeIn>

        {/* 02 Cancer-wise scores */}
        <FadeIn delay={0.12}>
          <ReportSection
            number="02"
            title="Cancer-wise scores"
            subtitle="Scores and explanation from the backend risk engine"
          >
            <Stagger
              className="space-y-3"
              delay={0.06}
            >
              {breakdown.map((item) => {
                const result = report.report[item.key];

                return (
                  <StaggerItem key={item.key}>
                    <div className="rounded-xl border border-surface-border p-4">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-navy">
                            {item.label}
                          </p>

                          <p className="text-xs text-navy-300 mt-1">
                            Score{" "}
                            <AnimatedNumber
                              value={item.score}
                            />
                          </p>
                        </div>

                        <Badge
                          variant={variantFor(item.risk)}
                        >
                          {item.risk}
                        </Badge>
                      </div>

                      {result.reasons.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {result.reasons.map((reason) => (
                            <span
                              key={reason}
                              className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-navy-300"
                            >
                              {reason}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </StaggerItem>
                );
              })}
            </Stagger>
          </ReportSection>
        </FadeIn>

        {/* 03 ML screening */}
        {mlPrediction && (
          <FadeIn delay={0.14}>
            <ReportSection
              number="03"
              title="CuraMind V1 ML screening"
              subtitle="Machine-learning signal integrated into CuraMind"
            >
              <div className="rounded-2xl border border-surface-border bg-surface-subtle p-5 sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-medical-50 flex items-center justify-center shrink-0">
                      <Sparkles
                        size={18}
                        className="text-medical-500"
                      />
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-navy">
                        ML screening signal
                      </h3>

                      <p className="mt-1 text-xs text-navy-300 leading-relaxed">
                        A Gradient Boosting model using
                        BRFSS-derived health and lifestyle
                        features.
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant={mlRiskVariant}
                    className="self-start"
                  >
                    {mlRiskLevel}
                  </Badge>
                </div>

                {/* ML metrics */}
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-surface-border bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-200">
                      Model output
                    </p>

                    <p className="mt-2 text-2xl font-bold text-navy">
                      {mlPrediction.prediction.probability_percent}%
                    </p>

                    <p className="mt-1 text-xs text-navy-300">
                      BRFSS-derived target probability
                    </p>
                  </div>

                  <div className="rounded-xl border border-surface-border bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-200">
                      Model classification
                    </p>

                    <p className="mt-2 text-xl font-bold capitalize text-navy">
                      {mlRiskLevel}
                    </p>

                    <p className="mt-1 text-xs text-navy-300">
                      Based on the model threshold
                    </p>
                  </div>

                  <div className="rounded-xl border border-surface-border bg-white p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-navy-200">
                      Decision threshold
                    </p>

                    <p className="mt-2 text-xl font-bold text-navy">
                      {(
                        mlPrediction.prediction
                          .decision_threshold * 100
                      ).toFixed(0)}
                      %
                    </p>

                    <p className="mt-1 text-xs text-navy-300">
                      Classification threshold
                    </p>
                  </div>
                </div>

                {/* SHAP */}
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
                        influenced this individual model output.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {mlPrediction.explanations
                      .slice(0, 6)
                      .map((item) => (
                        <div
                          key={item.feature}
                          className="rounded-xl border border-surface-border bg-white p-4"
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
                                item.direction ===
                                "positive"
                                  ? "warning"
                                  : item.direction ===
                                      "negative"
                                    ? "success"
                                    : "info"
                              }
                              className="shrink-0"
                            >
                              {item.direction ===
                              "positive"
                                ? "Increases output"
                                : item.direction ===
                                    "negative"
                                  ? "Decreases output"
                                  : "Neutral"}
                            </Badge>
                          </div>

                          <div className="mt-3 flex items-center justify-between">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-navy-200">
                              SHAP impact
                            </span>

                            <span className="text-xs font-semibold tabular-nums text-navy">
                              {item.shap_value > 0
                                ? "+"
                                : ""}
                              {item.shap_value.toFixed(4)}
                            </span>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>

                {/* Model information */}
                <div className="mt-6 border-t border-surface-border pt-4 space-y-2">
                  <p className="text-xs text-navy-300">
                    Model:{" "}
                    <span className="font-medium text-navy">
                      {
                        mlPrediction.prediction
                          .model_name
                      }
                    </span>
                  </p>

                  <p className="text-xs text-navy-300 leading-relaxed">
                    Target:{" "}
                    <span className="font-medium text-navy">
                      cancer-history proxy
                    </span>{" "}
                    · not future cancer prediction
                  </p>
                </div>
              </div>
            </ReportSection>
          </FadeIn>
        )}

        {/* 04 Recommendations */}
        <FadeIn delay={0.18}>
          <ReportSection
            number="04"
            title="Recommendations"
            subtitle={
              recommendation?.urgency ??
              "Recommended next steps"
            }
          >
            <div className="rounded-xl bg-surface-subtle p-4 flex items-start gap-3">
              <Lightbulb
                size={16}
                className="text-medical-500 mt-0.5 shrink-0"
              />

              <p className="text-sm text-navy-300 leading-relaxed">
                {recommendation?.action ??
                  "Review the cancer-specific guidance below."}
              </p>
            </div>

            <Stagger
              className="mt-5 space-y-3"
              delay={0.06}
            >
              {(recommendation?.next_steps ?? []).map(
                (step) => (
                  <StaggerItem key={step}>
                    <div className="flex items-start gap-3 rounded-xl border border-surface-border p-4">
                      <div className="h-9 w-9 rounded-lg bg-success-50 flex items-center justify-center shrink-0">
                        <CheckCircle2
                          size={16}
                          className="text-success-600"
                        />
                      </div>

                      <p className="text-sm text-navy-300 leading-relaxed">
                        {step}
                      </p>
                    </div>
                  </StaggerItem>
                )
              )}
            </Stagger>
          </ReportSection>
        </FadeIn>

        {/* 05 Suggested tests */}
        <FadeIn delay={0.2}>
          <ReportSection
            number="05"
            title="Suggested tests"
            subtitle="Tests returned by the backend recommendation engine"
          >
            {tests.length ? (
              <Stagger
                className="space-y-3"
                delay={0.06}
              >
                {tests.map((test) => (
                  <StaggerItem key={test}>
                    <div className="flex items-center gap-4 rounded-xl border border-surface-border p-4">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-medical-50 to-cyan-50 flex items-center justify-center border border-medical-100 shrink-0">
                        <FlaskConical
                          size={16}
                          className="text-medical-500"
                        />
                      </div>

                      <p className="text-sm font-semibold text-navy">
                        {test}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : (
              <p className="text-sm text-navy-300">
                No additional tests were included for the
                current risk level.
              </p>
            )}
          </ReportSection>
        </FadeIn>

        {/* 06 Lifestyle advice */}
        <FadeIn delay={0.22}>
          <ReportSection
            number="06"
            title="Lifestyle advice"
            subtitle="CuraCore™-curated recommendations"
          >
            {lifestyle.length ? (
              <ul className="space-y-2.5">
                {lifestyle.map((item) => (
                  <motion.li
                    key={item}
                    initial={{
                      opacity: 0,
                      x: -8,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <div className="h-6 w-6 rounded-md bg-success-50 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2
                        size={12}
                        className="text-success-600"
                      />
                    </div>

                    <span className="text-sm text-navy-300 leading-relaxed">
                      {item}
                    </span>
                  </motion.li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-navy-300">
                No lifestyle advice was included for the
                current risk level.
              </p>
            )}
          </ReportSection>
        </FadeIn>

        {/* Final disclaimer */}
        <FadeIn delay={0.25}>
          <div className="mt-8 rounded-2xl border border-surface-border bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-medical-50 flex items-center justify-center shrink-0">
                <ShieldCheck
                  size={18}
                  className="text-medical-500"
                />
              </div>

              <div className="flex-1">
                <h4 className="text-sm font-semibold text-navy">
                  CuraCore™ disclaimer
                </h4>

                <p className="mt-2 text-xs text-navy-300 leading-relaxed">
                  This report is produced by CuraMind, powered
                  by CuraCore™, a clinical decision support
                  system. It is not a medical diagnosis and
                  does not replace consultation with a
                  qualified healthcare provider.
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function ReportSection({
  number,
  title,
  subtitle,
  children,
}: {
  number: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="mt-6 p-6 sm:p-8">
      <div className="flex items-start gap-4 mb-6">
        <div className="text-xs font-bold tracking-wider text-medical-500 bg-medical-50 rounded-md px-2 py-1 mt-1">
          {number}
        </div>

        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-navy tracking-tight">
            {title}
          </h2>

          <p className="text-sm text-navy-300 mt-1">
            {subtitle}
          </p>
        </div>
      </div>

      {children}
    </Card>
  );
}

function SummaryStat({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: React.ReactNode;
  sub: string;
  color:
    | "success"
    | "warning"
    | "danger"
    | "info"
    | "neutral";
}) {
  const styles =
    color === "success"
      ? "bg-success-50/50 border-success-100"
      : color === "warning"
        ? "bg-amber-50/50 border-amber-100"
        : color === "danger"
          ? "bg-red-50/50 border-red-100"
          : color === "info"
            ? "bg-medical-50/50 border-medical-100"
            : "bg-surface-subtle border-surface-border";

  return (
    <div
      className={cn(
        "summary-stat rounded-2xl p-5 border",
        styles
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">
        {label}
      </p>

      <p className="mt-2 text-2xl font-bold text-navy">
        {value}
      </p>

      <p className="text-xs text-navy-300 mt-0.5">
        {sub}
      </p>
    </div>
  );
}