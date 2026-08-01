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
    <Field label="Physical activity"><Select value={lifestyle.physical_activity} onChange={(e) => update({ physical_activity: e.target.value })}><option value="">Select</option><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option></Select></Field>
    <Field label="Diet"><Select value={lifestyle.diet} onChange={(e) => update({ diet: e.target.value })}><option value="">Select</option><option value="healthy">Healthy</option><option value="mixed">Mixed</option><option value="high_processed_food">High Processed Food</option><option value="vegetarian">Vegetarian</option></Select></Field>
    <Field label="Average sleep (hours)"><Input type="number" min="0" max="24" step="0.5" value={lifestyle.sleep_hours || ""} onChange={(e) => update({ sleep_hours: Number(e.target.value) })} /></Field>
    <Field label="Stress level"><Select value={lifestyle.stress_level} onChange={(e) => update({ stress_level: e.target.value })}><option value="">Select</option><option value="low">Low</option><option value="moderate">Moderate</option><option value="high">High</option></Select></Field>
  </div></div>;
}
