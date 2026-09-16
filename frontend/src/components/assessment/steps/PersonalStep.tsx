import { Input, Select } from "@/components/ui/Input";
import Field from "@/components/assessment/Field";
import { useAssessment } from "@/context/AssessmentContext";

function calculateAge(dateOfBirth: string) {
  const [year, month, day] = dateOfBirth.split("-").map(Number);
  const today = new Date();
  let age = today.getFullYear() - year;

  if (today.getMonth() + 1 < month || (today.getMonth() + 1 === month && today.getDate() < day)) {
    age -= 1;
  }

  return Math.max(age, 0);
}

function calculateBMI(heightCm: number | string, weightKg: number | string) {
  const height = Number(heightCm);
  const weight = Number(weightKg);

  if (!height || !weight || height <= 0) {
    return "";
  }

  const bmi = weight / ((height / 100) ** 2);
  return bmi.toFixed(1);
}

function getBmiCategory(bmiValue: string) {
  const bmi = Number(bmiValue);

  if (!bmi || Number.isNaN(bmi)) {
    return "";
  }

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obesity";
}

export default function PersonalStep() {
  const { patient, updatePatient } = useAssessment();
  const personal = patient.personal_information;
  const bmiValue = calculateBMI(personal.height_cm, personal.weight_kg);
  const bmiCategory = getBmiCategory(bmiValue);
  const update = (key: keyof typeof personal, value: string | number) => updatePatient((current) => ({ ...current, personal_information: { ...current.personal_information, [key]: value } }));
  const updateDateOfBirth = (dateOfBirth: string) => updatePatient((current) => ({
    ...current,
    personal_information: {
      ...current.personal_information,
      date_of_birth: dateOfBirth,
      age: dateOfBirth ? calculateAge(dateOfBirth) : 0,
    },
  }));

  return <div className="grid sm:grid-cols-2 gap-5">
    <Field label="Full name" hint="Required">
      <Input value={personal.full_name} onChange={(e) => update("full_name", e.target.value)} placeholder="Enter your full name" required />
      </Field>


    <Field label="Date of birth" hint="Required"><Input type="date" value={personal.date_of_birth} onChange={(e) => updateDateOfBirth(e.target.value)} max={new Date().toISOString().split("T")[0]} required /></Field>
    <Field label="Sex" hint="Required">
      <Select
        value={personal.gender || ""}
        onChange={(e) => update("gender", e.target.value)}
        placeholder="Select your Gender"
        required
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
      </Select>
    </Field>



    <Field label="Age" hint="Required">
      <Input type="number" min="0" value={personal.date_of_birth ? personal.age : ""} placeholder="Your Current Age" readOnly required />
      </Field>


      
    <Field label="Height (cm)" hint="Required"><Input type="number" min="0" value={personal.height_cm || ""} onChange={(e) => update("height_cm", Number(e.target.value))} required /></Field>
    <Field label="Weight (kg)" hint="Required"><Input type="number" min="0" value={personal.weight_kg || ""} onChange={(e) => update("weight_kg", Number(e.target.value))} required /></Field>
    <Field label="BMI" hint="Auto-calculated" className="sm:col-span-2">
      <div className="flex h-11 w-full items-center justify-between rounded-xl border border-surface-border bg-white px-4 py-2 text-sm text-navy transition-colors duration-200 focus-within:border-medical-500 focus-within:ring-2 focus-within:ring-medical-500/20">
        <span className={bmiValue ? "text-[1.05rem] font-semibold text-navy" : "text-navy-200/60"}>
          {bmiValue || "BMI will appear here"}
        </span>

        {bmiCategory && (
          <span
            className={[
              "ml-4 text-base font-semibold tracking-wide",
              "drop-shadow-[0_0_10px_rgba(52,211,153,0.5)]",
              bmiCategory === "Underweight" ? "text-sky-300" : "",
              bmiCategory === "Normal" ? "text-emerald-400" : "",
              bmiCategory === "Overweight" ? "text-yellow-300" : "",
              bmiCategory === "Obesity" ? "text-red-400" : "",
            ].join(" ")}
          >
            {bmiCategory}
          </span>
        )}
      </div>
    </Field>
  </div>;
}
