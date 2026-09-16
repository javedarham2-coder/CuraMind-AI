import { Select } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";

const fields = [["chemical_exposure", "Chemical exposure"], ["radiation_exposure", "Radiation exposure"], ["air_pollution_exposure", "Air pollution exposure"]] as const;
export default function EnvironmentalStep() {
  const { patient, updatePatient } = useAssessment();
  const factors = patient.additional_information;
  return <div className="grid gap-5">{fields.map(([key, label]) => <Field key={key} label={label}><Select value={factors[key] === true ? "yes" : factors[key] === false ? "no" : ""} onChange={(e) => updatePatient((current) => ({ ...current, additional_information: { ...current.additional_information, [key]: e.target.value === "yes" } }))}><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></Select></Field>)}</div>;
}
