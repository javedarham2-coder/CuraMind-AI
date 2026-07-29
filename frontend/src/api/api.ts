// Base URL of the FastAPI backend
const BASE_URL = import.meta.env.VITE_API_URL;

// Generic API request function
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  // Parse JSON response
  const data = await response.json();

  // Handle HTTP errors
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong.");
  }

  return data as T;
}
