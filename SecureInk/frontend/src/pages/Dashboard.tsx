import { useEffect, useState } from "react";
import { apiFetch } from "../services/api";

interface User {
  id: string;
  fullName: string;
  email: string;
}

interface Document {
  id: string;
  title: string;
  status: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const userData = await apiFetch("/auth/me");
      const docsData = await apiFetch("/documents");

      setUser(userData);
      setDocuments(docsData);
    };

    loadData();
  }, []);

  const recentDocuments = documents.slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            Pending
          </span>
        );

      case "SIGNED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            Signed
          </span>
        );

      case "REJECTED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
            Rejected
          </span>
        );

      default:
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Welcome {user?.fullName}</h1>

      <p className="text-slate-500 mb-8">
        Manage your documents securely with SecureInk.
      </p>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h2 className="text-slate-600 font-medium">Total Documents</h2>

          <p className="text-4xl font-bold text-blue-700 mt-2">
            {documents.length}
          </p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
          <h2 className="text-slate-600 font-medium">Pending Documents</h2>

          <p className="text-4xl font-bold text-yellow-700 mt-2">
            {documents.filter((doc) => doc.status === "PENDING").length}
          </p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h2 className="text-slate-600 font-medium">Signed Documents</h2>

          <p className="text-4xl font-bold text-green-700 mt-2">
            {documents.filter((doc) => doc.status === "SIGNED").length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow mt-8 p-6">
        <h2 className="text-xl font-semibold mb-5">Recent Documents</h2>

        {recentDocuments.length === 0 ? (
          <p className="text-slate-500">No documents uploaded yet.</p>
        ) : (
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div
                key={doc.id}
                className="flex justify-between items-center border-b pb-4"
              >
                <div>
                  <h3 className="font-medium">{doc.title}</h3>
                </div>

                {getStatusBadge(doc.status)}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
