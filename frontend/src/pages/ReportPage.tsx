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
  Calendar,
  Stethoscope,
  HeartPulse,
  FlaskConical,
  FileText,
  Lightbulb,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge, StatusPill } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/PageContainer";
import { cn } from "@/lib/utils";

// Report: CuraCore™ generated findings and clinician-facing disclaimer

const findings = [
  {
    icon: HeartPulse,
    label: "Cardiovascular",
    status: "Within normal range",
    detail: "BP 118/76 · Resting HR 64 bpm · No risk indicators detected.",
    color: "success",
  },
  {
    icon: FlaskConical,
    label: "Lab markers",
    status: "Within normal range",
    detail: "CBC, lipid panel and metabolic panel all within reference range.",
    color: "success",
  },
  {
    icon: Activity,
    label: "Lifestyle",
    status: "Favorable",
    detail: "Active routine, balanced nutrition, adequate sleep duration.",
    color: "success",
  },
  {
    icon: Stethoscope,
    label: "Family history",
    status: "Monitor",
    detail: "First-degree relative history warrants earlier baseline imaging.",
    color: "amber",
  },
];

const tests = [
  {
    name: "Low-dose CT screening",
    detail: "Recommended baseline at age 45, then every 1-2 years.",
    priority: "Recommended",
  },
  {
    name: "Mammography",
    detail: "Discuss earlier baseline with your primary care provider.",
    priority: "Discuss",
  },
  {
    name: "Colonoscopy",
    detail: "Standard age-appropriate screening from age 45.",
    priority: "Routine",
  },
  {
    name: "Genetic counseling",
    detail: "Single consult to assess hereditary risk factors.",
    priority: "Optional",
  },
];

const recommendations = [
  "Maintain 150+ minutes/week of moderate aerobic activity.",
  "Adopt a Mediterranean-style diet rich in vegetables and whole grains.",
  "Limit alcohol to < 7 drinks per week.",
  "Continue annual primary care checkups and routine blood work.",
  "Schedule a baseline screening discussion with your doctor.",
  "Monitor and log any new symptoms in the CuraMind app.",
];

export function ReportPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface-subtle">
      {/* Top bar */}
      <div className="border-b border-surface-border bg-white/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center gap-2 text-sm text-navy-300 hover:text-navy transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to dashboard</span>
          </button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">
              <Printer size={14} />
              Print
            </Button>
            <Button variant="outline" size="sm">
              <Share2 size={14} />
              Share
            </Button>
            <Button variant="primary" size="sm" className="report-download-button">
              <Download size={14} />
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-5 sm:px-8 py-10 sm:py-14">
        {/* Cover */}
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
                      <Sparkles size={16} className="text-cyan-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold">CuraCore™ Report</p>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">
                        CuraCore™ Risk Assessment
                      </p>
                    </div>
                  </div>
                  <StatusPill status="complete" className="bg-white/10 border border-white/15">
                    <span className="h-1.5 w-1.5 rounded-full bg-success-400" />
                    Final
                  </StatusPill>
                </div>

                <h1 className="report-cover-title mt-10 text-3xl sm:text-4xl font-bold tracking-tight text-balance">
                  Early cancer risk screening report
                </h1>
                <p className="mt-2 text-white/70 text-sm">
                  Generated on Mar 12, 2026 · Report ID #CM-2026-004821
                </p>

                <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Patient", value: "Jordan Avery" },
                    { label: "Age", value: "42" },
                    { label: "Sex", value: "Female" },
                    { label: "Patient ID", value: "A-4821" },
                  ].map((f) => (
                    <div key={f.label} className="rounded-xl bg-white/5 border border-white/10 p-3">
                      <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
                        {f.label}
                      </p>
                      <p className="text-sm font-semibold mt-1">{f.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary section */}
            <div className="p-6 sm:p-10 grid sm:grid-cols-3 gap-5">
              <SummaryStat
                label="Risk score"
                value={<AnimatedNumber value={18} suffix="%" />}
                sub="Low risk"
                color="success"
              />
              <SummaryStat
                label="Confidence"
                value={<AnimatedNumber value={94} suffix="%" />}
                sub="High agreement"
                color="info"
              />
              <SummaryStat
                label="Reviewed by"
                value="Dr. S. Mitchell"
                sub="Oncology · Verified"
                color="neutral"
              />
            </div>
          </Card>
        </FadeIn>

        {/* Disclaimer */}
        <FadeIn delay={0.05}>
          <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/60 p-4 flex items-start gap-3">
            <AlertCircle size={16} className="text-amber-700 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-900 leading-relaxed">
              <span className="font-semibold">Important:</span> This report is generated by CuraCore™ and is intended to support — not replace — clinical judgment. It does not
              constitute a diagnosis. All findings should be reviewed with a qualified healthcare
              provider.
            </p>
          </div>
        </FadeIn>

        {/* Executive summary */}
        <FadeIn delay={0.1}>
          <ReportSection
            number="01"
            title="Executive summary"
            subtitle="CuraCore™-generated plain-language summary"
          >
            <p className="text-[15px] text-navy-300 leading-relaxed">
              Based on the information provided, CuraCore™ estimates the patient's 5-year cancer
              risk at <span className="font-semibold text-navy"><AnimatedNumber value={18} suffix="%" /></span>, which falls within the{" "}
              <span className="font-semibold text-success-600">low-risk category</span> for the
              patient's demographic group. The estimate is based on 14 clinical signals across
              lifestyle, family history, and lab markers, and is consistent across three
              independent model evaluations (confidence 94%).
            </p>
            <p className="mt-4 text-[15px] text-navy-300 leading-relaxed">
              We recommend continuing routine annual screening, with a discussion of earlier
              baseline imaging due to family history. Detailed findings and recommended actions
              follow.
            </p>
          </ReportSection>
        </FadeIn>

        {/* Risk classification */}
        <FadeIn delay={0.12}>
          <ReportSection
            number="02"
            title="Risk classification"
            subtitle="Stratified risk across model output"
          >
            <div className="grid sm:grid-cols-4 gap-3">
              {[
                { label: "Low", range: "0–25%", active: true },
                { label: "Moderate", range: "25–50%", active: false },
                { label: "Elevated", range: "50–75%", active: false },
                { label: "High", range: "75%+", active: false },
              ].map((r) => (
                <div
                  key={r.label}
                  className={cn(
                    "rounded-2xl border p-4 text-center transition-all",
                    r.active
                      ? "border-success-500 bg-success-50 shadow-soft"
                      : "border-surface-border bg-white"
                  )}
                >
                  <p
                    className={cn(
                      "text-xs uppercase tracking-wider font-semibold",
                      r.active ? "text-success-600" : "text-navy-200"
                    )}
                  >
                    {r.label}
                  </p>
                  <p
                    className={cn(
                      "text-2xl font-bold mt-1",
                      r.active ? "text-success-600" : "text-navy-300"
                    )}
                  >
                    {r.range}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-xl bg-surface-subtle p-4 flex items-start gap-3">
              <Lightbulb size={16} className="text-medical-500 mt-0.5 shrink-0" />
              <p className="text-sm text-navy-300 leading-relaxed">
                Your score of <span className="font-semibold text-navy">18%</span> places you in
                the low-risk category. Individuals in this range typically follow routine annual
                screening schedules.
              </p>
            </div>
          </ReportSection>
        </FadeIn>

        {/* Key findings */}
        <FadeIn delay={0.15}>
          <ReportSection
            number="03"
            title="Key findings"
            subtitle="CuraCore™-attributed observations"
          >
            <Stagger className="space-y-3" delay={0.06}>
              {findings.map((f) => (
                <StaggerItem key={f.label}>
                  <div className="flex items-start gap-3 rounded-xl border border-surface-border p-4">
                    <div
                      className={cn(
                        "h-9 w-9 rounded-lg flex items-center justify-center shrink-0",
                        f.color === "success" ? "bg-success-50" : "bg-amber-50"
                      )}
                    >
                      <f.icon
                        size={16}
                        className={f.color === "success" ? "text-success-600" : "text-amber-700"}
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-navy">{f.label}</p>
                        <Badge variant={f.color === "success" ? "success" : "warning"}>
                          {f.color === "success" ? (
                            <CheckCircle2 size={10} />
                          ) : (
                            <AlertCircle size={10} />
                          )}
                          {f.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-navy-300 mt-1 leading-relaxed">{f.detail}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </ReportSection>
        </FadeIn>

        {/* Recommended tests */}
        <FadeIn delay={0.18}>
          <ReportSection
            number="04"
            title="Recommended tests"
            subtitle="Curated by CuraMind based on clinical guidelines"
          >
            <Stagger className="space-y-3" delay={0.06}>
              {tests.map((t) => (
                <StaggerItem key={t.name}>
                  <div className="flex items-center gap-4 rounded-xl border border-surface-border p-4 hover:border-navy-200/60 transition-colors">
                    <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-medical-50 to-cyan-50 flex items-center justify-center border border-medical-100 shrink-0">
                      <FlaskConical size={16} className="text-medical-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-navy">{t.name}</p>
                      <p className="text-xs text-navy-300 mt-0.5">{t.detail}</p>
                    </div>
                    <Badge
                      variant={
                        t.priority === "Recommended"
                          ? "success"
                          : t.priority === "Discuss"
                          ? "ai"
                          : t.priority === "Routine"
                          ? "info"
                          : "neutral"
                      }
                    >
                      {t.priority}
                    </Badge>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </ReportSection>
        </FadeIn>

        {/* Lifestyle recommendations */}
        <FadeIn delay={0.2}>
          <ReportSection
            number="05"
            title="Lifestyle recommendations"
            subtitle="CuraCore™-curated, evidence-informed"
          >
            <ul className="space-y-2.5">
              {recommendations.map((r, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className="h-6 w-6 rounded-md bg-success-50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 size={12} className="text-success-600" />
                  </div>
                  <span className="text-sm text-navy-300 leading-relaxed">{r}</span>
                </motion.li>
              ))}
            </ul>
          </ReportSection>
        </FadeIn>

        {/* Doctor notes */}
        <FadeIn delay={0.22}>
          <ReportSection
            number="06"
            title="Clinician review"
            subtitle="Pending — for your doctor's review"
          >
            <div className="rounded-2xl border-2 border-dashed border-surface-border bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-medical-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                  SM
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">Dr. Sarah Mitchell</p>
                  <p className="text-xs text-navy-200">Oncology · Verified clinician</p>
                </div>
              </div>
              <div className="mt-5 min-h-[120px] rounded-xl bg-surface-subtle p-4 text-sm text-navy-200 italic">
                Doctor's notes will appear here once a licensed clinician reviews the report and
                adds their professional assessment.
              </div>
              <Button variant="outline" size="sm" className="mt-4">
                <Calendar size={14} />
                Schedule review with a doctor
              </Button>
            </div>
          </ReportSection>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.25}>
          <div className="mt-8 rounded-2xl border border-surface-border bg-white p-6 sm:p-8">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 rounded-xl bg-medical-50 flex items-center justify-center shrink-0">
                <ShieldCheck size={18} className="text-medical-500" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-navy">CuraCore™ disclaimer</h4>
                <p className="mt-2 text-xs text-navy-300 leading-relaxed">
                  This report is produced by CuraMind, powered by CuraCore™, a clinical decision support
                  system. It is not a medical diagnosis, does not prescribe treatment, and is not
                  intended to replace consultation with a qualified healthcare provider. The risk
                  estimates are based on statistical models trained on population-level data and
                  may not reflect individual clinical realities. Always discuss your results with
                  your doctor before making health decisions.
                </p>
                <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] text-navy-200">
                  <span>Report ID: CM-2026-004821</span>
                  <span>·</span>
                  <span>Model: CuraMind v3.2 · Ensemble</span>
                  <span>·</span>
                  <span>Generated: Mar 12, 2026 09:42 UTC</span>
                </div>
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
          <h2 className="text-xl sm:text-2xl font-semibold text-navy tracking-tight">{title}</h2>
          <p className="text-sm text-navy-300 mt-1">{subtitle}</p>
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
  color: "success" | "info" | "neutral";
}) {
  return (
    <div
      className={cn(
        "summary-stat rounded-2xl p-5 border",
        color === "success"
          ? "summary-stat-success bg-success-50/50 border-success-100"
          : color === "info"
          ? "summary-stat-info bg-medical-50/50 border-medical-100"
          : "summary-stat-neutral bg-surface-subtle border-surface-border"
      )}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-navy-200">{label}</p>
      <p className="mt-2 text-2xl font-bold text-navy">{value}</p>
      <p className="text-xs text-navy-300 mt-0.5">{sub}</p>
    </div>
  );
}
