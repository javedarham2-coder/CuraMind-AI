import { Select, Textarea, Label } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";
import { cn } from "@/lib/utils";

const sleepOptions = ["< 5h", "5-6h", "7-8h", "8h+"];

export default function LifestyleStep() {
  const { patient, updateField } = useAssessment();

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Smoking status">
          <Select
            value={patient.smoking_status}
            onChange={(e) =>
              updateField("smoking_status", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="never">Never smoked</option>
            <option value="former">Former smoker</option>
            <option value="occasional">Occasional</option>
            <option value="regular">Regular smoker</option>
          </Select>
        </Field>

        <Field label="Alcohol consumption">
          <Select
            value={patient.alcohol_consumption}
            onChange={(e) =>
              updateField("alcohol_consumption", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="none">None</option>
            <option value="moderate">
              Moderate (1-7 drinks / week)
            </option>
            <option value="heavy">
              Heavy (8+ drinks / week)
            </option>
          </Select>
        </Field>

        <Field label="Exercise frequency">
          <Select
            value={patient.exercise_frequency}
            onChange={(e) =>
              updateField("exercise_frequency", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="sedentary">Sedentary</option>
            <option value="light">1-2 days / week</option>
            <option value="regular">3-5 days / week</option>
            <option value="active">Daily</option>
          </Select>
        </Field>

        <Field label="Diet pattern">
          <Select
            value={patient.diet_pattern}
            onChange={(e) =>
              updateField("diet_pattern", e.target.value)
            }
          >
            <option value="">Select</option>
            <option value="balanced">Balanced</option>
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="high-processed">
              High processed food
            </option>
          </Select>
        </Field>
      </div>

      <div>
        <Label>Sleep average per night</Label>

        <div className="mt-2 grid grid-cols-4 gap-2">
          {sleepOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() =>
                updateField("sleep_average", option)
              }
              className={cn(
                "h-10 rounded-xl border text-sm font-medium transition-all",
                patient.sleep_average === option
                  ? "border-medical-500 bg-medical-50 text-medical-600"
                  : "border-surface-border text-navy-300 hover:border-navy-200"
              )}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <Field label="Anything else we should know about your lifestyle?">
        <Textarea
          value={patient.lifestyle_notes}
          onChange={(e) =>
            updateField("lifestyle_notes", e.target.value)
          }
          placeholder="E.g. recent weight changes, stress levels, occupation hazards…"
        />
      </Field>
    </div>
  );
}

