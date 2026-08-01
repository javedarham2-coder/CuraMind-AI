import { Textarea } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";
import { cn } from "@/lib/utils";

const conditions = [
  ["diabetes", "Diabetes"], ["hypertension", "Hypertension"], ["heart_disease", "Heart Disease"], ["copd", "COPD"], ["previous_cancer", "Previous Cancer"],
] as const;

type TextAreaQuestion = "has_medications" | "has_surgeries" | "has_allergies";

export default function MedicalStep() {
  const { patient, updatePatient } = useAssessment();
  const history = patient.medical_history;
  const update = (value: Partial<typeof history>) => updatePatient((current) => ({ ...current, medical_history: { ...current.medical_history, ...value } }));
  const setNoConditions = (checked: boolean) => update({
    no_existing_conditions: checked,
    ...(checked ? { diabetes: false, hypertension: false, heart_disease: false, copd: false, previous_cancer: false, other_condition: "" } : {}),
  });
  const setAnswer = (field: TextAreaQuestion, answer: boolean) => {
    const textField = field === "has_medications" ? "medications" : field === "has_surgeries" ? "surgeries" : "allergies";
    update({ [field]: answer, ...(!answer ? { [textField]: "" } : {}) });
  };
  const question = (label: string, field: TextAreaQuestion, textField: "medications" | "surgeries" | "allergies", placeholder: string) => (
    <Field label={label}>
      <div className="mb-2 flex gap-2">
        {[true, false].map((answer) => <button key={String(answer)} type="button" onClick={() => setAnswer(field, answer)} className={cn("h-9 rounded-xl border px-4 text-sm font-medium transition-all", history[field] === answer ? "border-medical-500 bg-medical-50 text-medical-600" : "border-surface-border text-navy-300 hover:border-navy-200")}>{answer ? "Yes" : "No"}</button>)}
      </div>
      <Textarea value={history[textField]} onChange={(e) => update({ [textField]: e.target.value })} placeholder={placeholder} disabled={history[field] !== true} />
    </Field>
  );

  return <div className="space-y-6">
    <div><p className="text-sm font-medium text-navy">Existing conditions</p><div className="mt-3 grid sm:grid-cols-2 gap-3">{conditions.map(([key, label]) => <label key={key} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all", history[key] ? "border-medical-500 bg-medical-50 text-medical-600" : "border-surface-border text-navy-300 hover:border-navy-200", history.no_existing_conditions && "cursor-not-allowed opacity-50")}><input type="checkbox" checked={history[key]} disabled={history.no_existing_conditions} onChange={(e) => update({ [key]: e.target.checked })} className="h-4 w-4 accent-medical-500" />{label}</label>)}<label className={cn("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all", history.no_existing_conditions ? "border-medical-500 bg-medical-50 text-medical-600" : "border-surface-border text-navy-300 hover:border-navy-200")}><input type="checkbox" checked={history.no_existing_conditions} onChange={(e) => setNoConditions(e.target.checked)} className="h-4 w-4 accent-medical-500" />No existing conditions</label></div></div>
    <Field label="Other condition"><Textarea value={history.other_condition} onChange={(e) => update({ other_condition: e.target.value })} placeholder="Write down any other existing condition" disabled={history.no_existing_conditions} /></Field>
    {question("Current medications", "has_medications", "medications", "List current medications")}
    {question("Past surgeries", "has_surgeries", "surgeries", "List previous surgeries")}
    {question("Allergies", "has_allergies", "allergies", "List known allergies")}
    <Field label="Clinician notes" hint="Optional"><Textarea value={history.clinician_notes} onChange={(e) => update({ clinician_notes: e.target.value })} placeholder="Anything else you would like CuraCore™ to consider…" /></Field>
  </div>;
}
