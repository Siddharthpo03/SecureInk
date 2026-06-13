import { useEffect, useState } from "react";
import { apiFetch, uploadDocument, deleteDocument } from "../services/api";

interface Document {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

export default function Documents() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loadingId, setLoadingId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const loadDocuments = async () => {
    const data = await apiFetch("/documents");
    setDocuments(data);
  };

  useEffect(() => {
    loadDocuments();
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploading(true);

      await uploadDocument(selectedFile);

      setSelectedFile(null);

      await loadDocuments();
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

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

  const handleDelete = async (documentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this document?",
    );

    if (!confirmed) return;

    try {
      await deleteDocument(documentId);

      await loadDocuments();
    } catch (error) {
      console.error(error);

      alert("Failed to delete document");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Documents</h1>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-8">
        <div className="flex gap-4 items-center">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
            className="border p-2 rounded-lg"
          />

          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-blue-700
              disabled:opacity-50
            "
          >
            {uploading ? "Uploading..." : "Upload PDF"}
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {documents.length === 0 ? (
          <div className="bg-white p-6 rounded-xl shadow">
            No documents uploaded yet.
          </div>
        ) : (
          documents.map((doc) => (
            <div
              key={doc.id}
              className="
                bg-white
                rounded-xl
                shadow
                p-5
                flex
                justify-between
                items-center
              "
            >
              <div>
                <h2 className="font-semibold text-lg">{doc.title}</h2>

                <div className="mt-2 flex gap-4 text-sm text-slate-500">
                  <span
                    className={`
                      px-3
                      py-1
                      rounded-full
                      text-xs
                      font-semibold
                      ${
                        doc.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : doc.status === "SIGNED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {doc.status}
                  </span>

                  <span>
                    Uploaded: {new Date(doc.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => viewDocument(doc.id)}
                  disabled={loadingId === doc.id}
                  className="
      bg-blue-600
      text-white
      px-4
      py-2
      rounded-lg
      hover:bg-blue-700
    "
                >
                  {loadingId === doc.id ? "Opening..." : "View PDF"}
                </button>

                <button
                  onClick={() => handleDelete(doc.id)}
                  className="
                    bg-red-600
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    hover:bg-red-700
                  "
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
