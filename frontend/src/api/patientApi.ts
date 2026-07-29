import { apiRequest } from "./api";

/* ---------- API Response Wrapper ---------- */

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

/* ---------- Health Endpoint ---------- */

export interface HealthResponse {
  status: string;
}

export async function checkHealth() {
  return apiRequest<ApiResponse<HealthResponse>>("/health");
}

/* ---------- Predict Endpoint ---------- */

export async function predictPatient<TRequest, TResponse>(
  patientData: TRequest
) {
  return apiRequest<ApiResponse<TResponse>>("/predict", {
    method: "POST",
    body: JSON.stringify(patientData),
  });
}
