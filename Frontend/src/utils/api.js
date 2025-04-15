// Centralized API base URL for EcoConnect
export const API_BASE_URL = "https://eco-connect-backend.vercel.app";

// Helper for fetch requests
export const apiFetch = (endpoint, options = {}) => {
  return fetch(`${API_BASE_URL}${endpoint}`, options);
};
