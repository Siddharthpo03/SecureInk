import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

interface Document {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingId, setLoadingId] = useState("");

  useEffect(() => {
    const loadDocuments = async () => {
      const data = await apiFetch("/documents");
      setDocuments(data);
    };

    loadDocuments();
  }, []);

  const viewDocument = async (documentId: string) => {
    try {
      setLoadingId(documentId);

      const data = await apiFetch(`/documents/${documentId}/view`);

      window.open(data.url, "_blank");
    } catch (error) {
      console.error(error);
      alert("Failed to open document");
    } finally {
      setLoadingId("");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">My Documents</h1>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="bg-zinc-900 text-white p-5 rounded-xl flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold text-lg">{doc.title}</h2>

              <p className="text-gray-400">Status: {doc.status}</p>

              <p className="text-gray-400">
                Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
              </p>
            </div>

            <button
              onClick={() => viewDocument(doc.id)}
              disabled={loadingId === doc.id}
              className="
                bg-blue-600
                hover:bg-blue-700
                px-4
                py-2
                rounded-lg
                font-medium
              "
            >
              {loadingId === doc.id ? "Opening..." : "View PDF"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
