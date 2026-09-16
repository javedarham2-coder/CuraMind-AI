import { Input, Select } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";

export default function LifestyleStep() {
  const { patient, updatePatient } = useAssessment();
  const lifestyle = patient.lifestyle;
  const update = (value: Partial<typeof lifestyle>) => updatePatient((current) => ({ ...current, lifestyle: { ...current.lifestyle, ...value } }));
  const selectBoolean = (value: string) => value === "yes";
  return <div className="space-y-6"><div className="grid sm:grid-cols-2 gap-5">
    <Field label="Smoking"><Select value={lifestyle.smoking.status} onChange={(e) => update({ smoking: { ...lifestyle.smoking, status: e.target.value } })}><option value="">Select</option><option value="never">Never</option><option value="former">Former</option><option value="occasional">Occasional</option><option value="regular">Regular</option></Select></Field>
    {lifestyle.smoking.status && lifestyle.smoking.status !== "never" && <><Field label="Cigarettes per day"><Input type="number" min="0" value={lifestyle.smoking.cigarettes_per_day || ""} onChange={(e) => update({ smoking: { ...lifestyle.smoking, cigarettes_per_day: Number(e.target.value) } })} /></Field><Field label="Years of smoking"><Input type="number" min="0" value={lifestyle.smoking.years || ""} onChange={(e) => update({ smoking: { ...lifestyle.smoking, years: Number(e.target.value) } })} /></Field></>}
    <Field label="Alcohol"><Select value={lifestyle.alcohol.status} onChange={(e) => update({ alcohol: { ...lifestyle.alcohol, status: e.target.value } })}><option value="">Select</option><option value="never">Never</option><option value="occasional">Occasional</option><option value="regular">Regular</option><option value="heavy">Heavy</option></Select></Field>
    {lifestyle.alcohol.status && lifestyle.alcohol.status !== "never" && <Field label="Alcohol frequency"><Input value={lifestyle.alcohol.frequency} onChange={(e) => update({ alcohol: { ...lifestyle.alcohol, frequency: e.target.value } })} placeholder="e.g. 3 times per week" /></Field>}
    <Field label="Tobacco"><Select value={lifestyle.tobacco ? "yes" : lifestyle.tobacco === false ? "no" : ""} onChange={(e) => update({ tobacco: selectBoolean(e.target.value) })}><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></Select></Field>
    <Field label="Physical activity">
      <Select value={lifestyle.physical_activity} onChange={(e) => update({ physical_activity: e.target.value })}>
        <option value="">Select</option>
        <option value="sedentary">Yes</option>
        <option value="light">No</option>
        </Select>
        </Field>
    <Field label="Diet"><Select value={lifestyle.diet} onChange={(e) => update({ diet: e.target.value })}><option value="">Select</option><option value="healthy">Healthy</option><option value="mixed">Mixed</option><option value="high_processed_food">High Processed Food</option><option value="vegetarian">Vegetarian</option></Select></Field>
    <Field label="Stress level"><Select value={lifestyle.stress_level} onChange={(e) => update({ stress_level: e.target.value })}><option value="">Select</option><option value="low">Low</option><option value="moderate">Moderate</option><option value="high">High</option></Select></Field>
    <div className="sm:col-span-2 rounded-2xl border border-medical-500/40 bg-medical-50/50 p-4 shadow-[0_0_0_1px_rgba(96,165,250,0.12),0_0_18px_rgba(59,130,246,0.12)] dark:border-medical-400/30 dark:bg-medical-500/10 dark:shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_0_18px_rgba(96,165,250,0.14)]">
      <p className="text-base font-medium leading-relaxed text-navy dark:text-navy-100">
        During the past 30 days, for how many days was your physical and mental health not good?
      </p>

      <div className="mt-4 grid gap-5 sm:grid-cols-2">
        <Field label="Poor Mental Health Days">
          <Input
            type="number"
            min={0}
            max={30}
            step={1}
            value={lifestyle.poor_mental_health_days || ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 0) return;
              if (value > 30) return;
              update({ poor_mental_health_days: Number.isNaN(value) ? 0 : value });
            }}
            placeholder="0–30 days"
          />
        </Field>
        <Field label="Poor Physical Health Days">
          <Input
            type="number"
            min={0}
            max={30}
            step={1}
            value={lifestyle.poor_physical_health_days || ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value < 0) return;
              if (value > 30) return;
              update({ poor_physical_health_days: Number.isNaN(value) ? 0 : value });
            }}
            placeholder="0–30 days"
          />
        </Field>
      </div>
    </div>

    <div className="sm:col-span-2 rounded-2xl border border-medical-500/40 bg-medical-50/50 p-4 shadow-[0_0_0_1px_rgba(96,165,250,0.12),0_0_18px_rgba(59,130,246,0.12)] dark:border-medical-400/30 dark:bg-medical-500/10 dark:shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_0_18px_rgba(96,165,250,0.14)]">
      <Field label="Do you currently have any kind of health-care coverage?">
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[{ label: "Yes", value: true }, { label: "No", value: false }].map((option) => (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => update({ healthcare_coverage: option.value })}
              className={[
                "rounded-xl border px-4 py-2.5 text-base font-medium transition-all duration-200",
                lifestyle.healthcare_coverage === option.value
                  ? "border-medical-500 bg-medical-100/90 text-medical-700 shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_0_14px_rgba(59,130,246,0.18)] dark:border-medical-400 dark:bg-medical-500/20 dark:text-medical-200"
                  : "border-surface-border bg-surface-muted/80 text-navy-300 hover:border-navy-200 hover:text-navy dark:bg-white/5 dark:text-navy-200",
              ].join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Field>
    </div>

    <div className="sm:col-span-2 rounded-2xl border border-medical-500/40 bg-medical-50/50 p-4 shadow-[0_0_0_1px_rgba(96,165,250,0.12),0_0_18px_rgba(59,130,246,0.12)] dark:border-medical-400/30 dark:bg-medical-500/10 dark:shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_0_18px_rgba(96,165,250,0.14)]">
      <Field label="Was there a time in the past 12 months when you needed to see a doctor but could not afford it?">
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[{ label: "Yes", value: true }, { label: "No", value: false }].map((option) => (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => update({ unable_to_afford_doctor: option.value })}
              className={[
                "rounded-xl border px-4 py-2.5 text-base font-medium transition-all duration-200",
                lifestyle.unable_to_afford_doctor === option.value
                  ? "border-medical-500 bg-medical-100/90 text-medical-700 shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_0_14px_rgba(59,130,246,0.18)] dark:border-medical-400 dark:bg-medical-500/20 dark:text-medical-200"
                  : "border-surface-border bg-surface-muted/80 text-navy-300 hover:border-navy-200 hover:text-navy dark:bg-white/5 dark:text-navy-200",
              ].join(" ")}
            >
              {option.label}
            </button>
          ))}
        </div>
      </Field>
    </div>

    <div className="sm:col-span-2 rounded-2xl border border-medical-500/40 bg-medical-50/50 p-4 shadow-[0_0_0_1px_rgba(96,165,250,0.12),0_0_18px_rgba(59,130,246,0.12)] dark:border-medical-400/30 dark:bg-medical-500/10 dark:shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_0_18px_rgba(96,165,250,0.14)]">
      <Field label="In general, would you say your health is:">
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            "Excellent",
            "Very good",
            "Good",
            "Fair",
            "Poor",
          ].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update({ general_health: option })}
              className={[
                "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200",
                lifestyle.general_health === option
                  ? "border-medical-500 bg-medical-100/90 text-medical-700 shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_0_14px_rgba(59,130,246,0.18)] dark:border-medical-400 dark:bg-medical-500/20 dark:text-medical-200"
                  : "border-surface-border bg-surface-muted/80 text-navy-300 hover:border-navy-200 hover:text-navy dark:bg-white/5 dark:text-navy-200",
              ].join(" ")}
            >
              {option}
            </button>
          ))}
        </div>
      </Field>
    </div>

    <div className="sm:col-span-2 rounded-2xl border border-medical-500/40 bg-medical-50/50 p-4 shadow-[0_0_0_1px_rgba(96,165,250,0.12),0_0_18px_rgba(59,130,246,0.12)] dark:border-medical-400/30 dark:bg-medical-500/10 dark:shadow-[0_0_0_1px_rgba(56,189,248,0.08),0_0_18px_rgba(96,165,250,0.14)]">
      <Field label="About how long has it been since you last visited a doctor for a routine checkup?">
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            "Within the past year",
            "1–2 years ago",
            "2–5 years ago",
            "5 or more years ago",
            "Never",
          ].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => update({ routine_checkup_history: option })}
              className={[
                "rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200",
                lifestyle.routine_checkup_history === option
                  ? "border-medical-500 bg-medical-100/90 text-medical-700 shadow-[0_0_0_1px_rgba(59,130,246,0.15),0_0_14px_rgba(59,130,246,0.18)] dark:border-medical-400 dark:bg-medical-500/20 dark:text-medical-200"
                  : "border-surface-border bg-surface-muted/80 text-navy-300 hover:border-navy-200 hover:text-navy dark:bg-white/5 dark:text-navy-200",
              ].join(" ")}
            >
              {option}
            </button>
          ))}
        </div>
      </Field>
    </div>
  </div></div>;
}
