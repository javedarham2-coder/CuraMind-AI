import { Input, Select } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";

export default function PersonalStep() {
  const { patient, updateField } = useAssessment();

  return (
    <div className="grid sm:grid-cols-2 gap-5">
      <Field label="Full name">
        <Input
          value={patient.full_name}
          onChange={(e) => updateField("full_name", e.target.value)}
          placeholder="Enter your full name"
        />
      </Field>

      <Field label="Age">
        <Input
          type="number"
          value={patient.age || ""}
          onChange={(e) => updateField("age", Number(e.target.value))}
          placeholder="Years"
        />
      </Field>

      <Field label="Gender">
        <Select
          value={patient.gender}
          onChange={(e) => updateField("gender", e.target.value)}
        >
          <option value="">Select Gender</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="other">Other</option>
          <option value="prefer-not">Prefer not to say</option>
        </Select>
      </Field>

      <Field label="Date of birth">
        <Input
          type="date"
          value={patient.date_of_birth}
          onChange={(e) => updateField("date_of_birth", e.target.value)}
        />
      </Field>

      <Field label="Height (cm)">
        <Input
          type="number"
          value={patient.height || ""}
          onChange={(e) => updateField("height", Number(e.target.value))}
          placeholder="cm"
        />
      </Field>

      <Field label="Weight (kg)">
        <Input
          type="number"
          value={patient.weight || ""}
          onChange={(e) => updateField("weight", Number(e.target.value))}
          placeholder="kg"
        />
      </Field>

      <Field label="Email" className="sm:col-span-2">
        <Input
          type="email"
          value={patient.email}
          onChange={(e) => updateField("email", e.target.value)}
          placeholder="you@email.com"
        />
      </Field>
    </div>
  );
}
