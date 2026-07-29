import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

import type { Patient } from "@/types/patient";

interface AssessmentContextType {
  patient: Patient;
  updateField: <K extends keyof Patient>(
    field: K,
    value: Patient[K]
  ) => void;
  toggleSymptom: (symptom: string) => void;
  setPatient: React.Dispatch<React.SetStateAction<Patient>>;
}

const AssessmentContext = createContext<AssessmentContextType | undefined>(
  undefined
);

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

export function AssessmentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [patient, setPatient] = useState(initialPatient);

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

  return (
    <AssessmentContext.Provider
      value={{
        patient,
        updateField,
        toggleSymptom,
        setPatient,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);

  if (!context) {
    throw new Error(
      "useAssessment must be used inside AssessmentProvider"
    );
  }

  return context;
}
