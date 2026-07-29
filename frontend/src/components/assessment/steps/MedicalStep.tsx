import { Input, Select, Textarea, Label } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";
import { cn } from "@/lib/utils";

const symptoms = [
  "Unexplained weight loss",
  "Persistent fatigue",
  "Chronic cough",
  "Skin changes",
  "Lumps or swelling",
  "Pain",
  "None",
];

export default function MedicalStep() {
  const { patient, updateField, toggleSymptom } = useAssessment();

  return (
    <div className="space-y-6">
      <Field label="Family history of cancer" hint="Optional">
        <Select
          value={patient.family_history}
          onChange={(e) =>
            updateField("family_history", e.target.value)
          }
        >
          <option value="">Select</option>
          <option value="none">No known history</option>
          <option value="second">Second-degree relative</option>
          <option value="first">First-degree relative</option>
          <option value="multiple">Multiple relatives</option>
        </Select>
      </Field>

      <div>
        <Label>Current symptoms (select all that apply)</Label>

        <div className="mt-2 flex flex-wrap gap-2">
          {symptoms.map((symptom) => {
            const selected = patient.symptoms.includes(symptom);

            return (
              <button
                key={symptom}
                type="button"
                onClick={() => toggleSymptom(symptom)}
                className={cn(
                  "h-9 px-3.5 rounded-full border text-sm font-medium transition-all",
                  selected
                    ? "border-medical-500 bg-medical-50 text-medical-600"
                    : "border-surface-border text-navy-300 hover:border-navy-200"
                )}
              >
                {symptom}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Existing conditions">
          <Select
            value={patient.existing_conditions}
            onChange={(e) =>
              updateField("existing_conditions", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="diabetes">Diabetes</option>
            <option value="hypertension">Hypertension</option>
            <option value="autoimmune">Autoimmune</option>
          </Select>
        </Field>

        <Field label="Current medications">
          <Input
            value={patient.current_medications}
            onChange={(e) =>
              updateField("current_medications", e.target.value)
            }
            placeholder="List medications"
          />
        </Field>
      </div>

      <Field label="Additional notes for your clinician">
        <Textarea
          value={patient.clinician_notes}
          onChange={(e) =>
            updateField("clinician_notes", e.target.value)
          }
          placeholder="Anything else you would like CuraCore™ to consider…"
        />
      </Field>
    </div>
  );
}
