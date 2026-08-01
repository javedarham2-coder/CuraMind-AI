import { useState } from "react";
import type { Patient } from "@/types/patient";

const initialPatient: Patient = {
  personal_information: { full_name: "", age: 0, gender: "", date_of_birth: "", height_cm: 0, weight_kg: 0, email: "", occupation: "" },
  lifestyle: { smoking: { status: "", cigarettes_per_day: 0, years: 0 }, alcohol: { status: "", frequency: "" }, tobacco: null, physical_activity: "", diet: "", sleep_hours: 0, stress_level: "" },
  family_history: { has_cancer_history: null, cancer_type: "", relationship: "", age_at_diagnosis: 0, multiple_members: null },
  medical_history: { diabetes: false, hypertension: false, heart_disease: false, copd: false, previous_cancer: false, no_existing_conditions: false, other_condition: "", has_medications: null, medications: "", has_surgeries: null, surgeries: "", has_allergies: null, allergies: "", clinician_notes: "" },
  symptoms: { persistent_cough: false, weight_loss: false, fatigue: false, lump: false, blood_in_stool: false, difficulty_swallowing: false, voice_change: false, non_healing_ulcer: false, abnormal_bleeding: false, skin_changes: false, loss_of_appetite: false, other: "" },
  additional_information: { chemical_exposure: null, radiation_exposure: null, air_pollution_exposure: null },
};

/** Standalone form state helper for any future assessment flow outside the page context. */
export function useAssessmentForm() {
  const [patient, setPatient] = useState<Patient>(initialPatient);
  return { patient, setPatient };
}
