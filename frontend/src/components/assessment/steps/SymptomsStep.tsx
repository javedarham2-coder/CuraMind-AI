import { useState } from "react";
import { Textarea } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";
import { cn } from "@/lib/utils";

const symptoms = [["persistent_cough", "Persistent cough"], ["weight_loss", "Weight loss"], ["fatigue", "Fatigue"], ["lump", "Lump"], ["blood_in_stool", "Blood in stool"], ["difficulty_swallowing", "Difficulty swallowing"], ["voice_change", "Voice change"], ["non_healing_ulcer", "Non healing ulcer"], ["abnormal_bleeding", "Abnormal bleeding"], ["skin_changes", "Skin changes"], ["loss_of_appetite", "Loss of appetite"]] as const;

export default function SymptomsStep() {
  const { patient, updatePatient } = useAssessment();
  const [showOther, setShowOther] = useState(Boolean(patient.symptoms.other));
  const update = (key: string, value: boolean | string) => updatePatient((current) => ({ ...current, symptoms: { ...current.symptoms, [key]: value } }));
  return <div className="space-y-6"><div><p className="text-sm font-medium text-navy">Current symptoms</p><p className="mt-1 text-xs text-navy-200">Select all that apply.</p><div className="mt-3 grid sm:grid-cols-2 gap-3">{symptoms.map(([key, label]) => <label key={key} className={cn("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all", patient.symptoms[key] ? "border-medical-500 bg-medical-50 text-medical-600" : "border-surface-border text-navy-300 hover:border-navy-200")}><input type="checkbox" checked={patient.symptoms[key]} onChange={(e) => update(key, e.target.checked)} className="h-4 w-4 accent-medical-500" />{label}</label>)}</div></div><label className={cn("flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all", showOther ? "border-medical-500 bg-medical-50 text-medical-600" : "border-surface-border text-navy-300 hover:border-navy-200")}><input type="checkbox" checked={showOther} onChange={(e) => { setShowOther(e.target.checked); if (!e.target.checked) update("other", ""); }} className="h-4 w-4 accent-medical-500" />Other symptoms</label>{showOther && <Field label="Please describe other symptoms"><Textarea value={patient.symptoms.other} onChange={(e) => update("other", e.target.value)} placeholder="Describe any other symptoms" /></Field>}</div>;
}
