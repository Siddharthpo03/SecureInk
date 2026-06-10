const API_URL = "http://localhost:5000/api";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });

  return response.json();
};
