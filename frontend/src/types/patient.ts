/* ===========================
   Common API Response
=========================== */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ===========================
   Health Check
=========================== */

export interface HealthResponse {
  status: string;
}

/* ===========================
   Patient Information
=========================== */

export interface Patient {
  full_name: string;
  age: number;
  gender: string;
  date_of_birth: string;

  height: number;
  weight: number;
  email: string;

  smoking_status: string;
  alcohol_consumption: string;
  exercise_frequency: string;
  diet_pattern: string;
  sleep_average: string;
  lifestyle_notes: string;

  family_history: string;
  symptoms: string[];
  existing_conditions: string;
  current_medications: string;
  clinician_notes: string;
}

/* ===========================
   Predict Request
=========================== */

export interface PredictRequest {
  patient: Patient;
}

/* ===========================
   Predict Response
=========================== */

export interface PredictResponse {
  report: Record<string, unknown>;
}
