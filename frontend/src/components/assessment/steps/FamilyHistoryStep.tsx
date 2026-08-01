import { Input, Select } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";

export default function FamilyHistoryStep() {
  const { patient, updatePatient } = useAssessment();
  const history = patient.family_history;
  const update = (value: Partial<typeof history>) => updatePatient((current) => ({ ...current, family_history: { ...current.family_history, ...value } }));
  return <div className="space-y-5"><Field label="Any family history of cancer?"><Select value={history.has_cancer_history === true ? "yes" : history.has_cancer_history === false ? "no" : ""} onChange={(e) => update({ has_cancer_history: e.target.value === "yes" })}><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></Select></Field>
  {history.has_cancer_history && <div className="grid sm:grid-cols-2 gap-5"><Field label="Cancer type"><Input value={history.cancer_type} onChange={(e) => update({ cancer_type: e.target.value })} placeholder="e.g. lung, breast" /></Field><Field label="Relationship"><Input value={history.relationship} onChange={(e) => update({ relationship: e.target.value })} placeholder="e.g. parent, sibling" /></Field><Field label="Age at diagnosis"><Input type="number" min="0" value={history.age_at_diagnosis || ""} onChange={(e) => update({ age_at_diagnosis: Number(e.target.value) })} /></Field><Field label="Multiple family members affected?"><Select value={history.multiple_members === true ? "yes" : history.multiple_members === false ? "no" : ""} onChange={(e) => update({ multiple_members: e.target.value === "yes" })}><option value="">Select</option><option value="yes">Yes</option><option value="no">No</option></Select></Field></div>}</div>;
}
