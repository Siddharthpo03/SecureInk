const API_URL = "import.meta.env.VITE_API_URL";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.body instanceof FormData
        ? {}
        : {
            "Content-Type": "application/json",
          }),
      ...(options.headers || {}),
    },
  });

  return response.json();
};

export const uploadDocument = async (file: File) => {
  const token = getToken();

  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(`${API_URL}/documents/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  return response.json();
};

export const deleteDocument = async (documentId: string) => {
  return apiFetch(`/documents/${documentId}`, {
    method: "DELETE",
  });
};

export const updateSignatureField = (id: string, x: number, y: number) => {
  return apiFetch(`/signatures/${id}`, {
    method: "PUT",
    body: JSON.stringify({
      x,
      y,
    }),
  });
};

export const inviteSigner = (email: string, documentId: string) => {
  return apiFetch("/signers", {
    method: "POST",
    body: JSON.stringify({
      email,
      documentId,
    }),
  });
};

export const getSigners = (documentId: string) => {
  return apiFetch(`/signers/${documentId}`);
};

export const getSignatures = (documentId: string) => {
  return apiFetch(`/sign/${documentId}`);
};
