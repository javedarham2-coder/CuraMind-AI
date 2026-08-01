import { Input, Select } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";

export default function PersonalStep() {
  const { patient, updatePatient } = useAssessment();
  const personal = patient.personal_information;
  const update = (key: keyof typeof personal, value: string | number) => updatePatient((current) => ({ ...current, personal_information: { ...current.personal_information, [key]: value } }));
  return <div className="grid sm:grid-cols-2 gap-5">
    <Field label="Full name" hint="Required"><Input value={personal.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Enter your full name" required /></Field>
    <Field label="Age" hint="Required"><Input type="number" min="0" value={personal.age || ""} onChange={(e) => update("age", Number(e.target.value))} placeholder="Years" required /></Field>
    <Field label="Gender" hint="Required"><Select value={personal.gender} onChange={(e) => update("gender", e.target.value)} required><option value="">Select gender</option><option value="female">Female</option><option value="male">Male</option><option value="other">Other</option><option value="prefer-not">Prefer not to say</option></Select></Field>
    <Field label="Date of birth" hint="Required"><Input type="date" value={personal.date_of_birth} onChange={(e) => update("date_of_birth", e.target.value)} required /></Field>
    <Field label="Height (cm)" hint="Required"><Input type="number" min="0" value={personal.height_cm || ""} onChange={(e) => update("height_cm", Number(e.target.value))} required /></Field>
    <Field label="Weight (kg)" hint="Required"><Input type="number" min="0" value={personal.weight_kg || ""} onChange={(e) => update("weight_kg", Number(e.target.value))} required /></Field>
    <Field label="Email" hint="Optional"><Input type="email" value={personal.email} onChange={(e) => update("email", e.target.value)} placeholder="you@email.com" /></Field>
    <Field label="Occupation" hint="Optional"><Input value={personal.occupation} onChange={(e) => update("occupation", e.target.value)} placeholder="Your occupation" /></Field>
  </div>;
}
