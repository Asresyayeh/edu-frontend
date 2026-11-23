const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function apiRequest(endpoint, options = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const message =
      data?.message || `Request failed with status ${response.status}`;

    throw new Error(Array.isArray(message) ? message.join(", ") : message);
  }

  return data;
}
