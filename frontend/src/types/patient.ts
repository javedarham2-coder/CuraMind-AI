export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface Patient {
  personal_information: {
    full_name: string;
    age: number;
    gender: string;
    date_of_birth: string;
    height_cm: number;
    weight_kg: number;
    email: string;
    occupation: string;
  };
  lifestyle: {
    smoking: { status: string; cigarettes_per_day: number; years: number };
    alcohol: { status: string; frequency: string };
    tobacco: boolean | null;
    physical_activity: string;
    diet: string;
    sleep_hours: number;
    stress_level: string;
  };
  family_history: {
    has_cancer_history: boolean | null;
    cancer_type: string;
    relationship: string;
    age_at_diagnosis: number;
    multiple_members: boolean | null;
  };
  medical_history: {
    diabetes: boolean;
    hypertension: boolean;
    heart_disease: boolean;
    copd: boolean;
    previous_cancer: boolean;
    no_existing_conditions: boolean;
    other_condition: string;
    has_medications: boolean | null;
    medications: string;
    has_surgeries: boolean | null;
    surgeries: string;
    has_allergies: boolean | null;
    allergies: string;
    clinician_notes: string;
  };
  symptoms: Symptoms;
  additional_information: {
    chemical_exposure: boolean | null;
    radiation_exposure: boolean | null;
    air_pollution_exposure: boolean | null;
  };
}

export interface Symptoms {
  persistent_cough: boolean;
  weight_loss: boolean;
  fatigue: boolean;
  lump: boolean;
  blood_in_stool: boolean;
  difficulty_swallowing: boolean;
  voice_change: boolean;
  non_healing_ulcer: boolean;
  abnormal_bleeding: boolean;
  skin_changes: boolean;
  loss_of_appetite: boolean;
  other: string;
}

export interface PredictRequest { patient: Patient; }
export interface PredictResponse { report: Record<string, unknown>; }
