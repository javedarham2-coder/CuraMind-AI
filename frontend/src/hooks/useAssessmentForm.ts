import { useState } from "react";
import type { Patient } from "@/types/patient";

const initialPatient: Patient = {
  full_name: "",
  age: 0,
  gender: "",
  date_of_birth: "",

  height: 0,
  weight: 0,
  email: "",

  smoking_status: "",
  alcohol_consumption: "",
  exercise_frequency: "",
  diet_pattern: "",
  sleep_average: "",
  lifestyle_notes: "",

  family_history: "",
  symptoms: [],
  existing_conditions: "",
  current_medications: "",
  clinician_notes: "",
};

export function useAssessmentForm() {
  const [patient, setPatient] = useState<Patient>(initialPatient);

  function updateField<K extends keyof Patient>(
    field: K,
    value: Patient[K]
  ) {
    setPatient((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function toggleSymptom(symptom: string) {
    setPatient((prev) => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter((s) => s !== symptom)
        : [...prev.symptoms, symptom],
    }));
  }

  return {
    patient,
    updateField,
    toggleSymptom,
    setPatient,
  };
}
