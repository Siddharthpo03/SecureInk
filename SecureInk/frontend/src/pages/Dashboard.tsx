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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Welcome {user?.fullName}</h1>

      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="bg-zinc-900 p-4 rounded-xl">
          <h2>Total Documents</h2>
          <p className="text-3xl font-bold">{documents.length}</p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <h2>Pending</h2>
          <p className="text-3xl font-bold">
            {documents.filter((doc) => doc.status === "PENDING").length}
          </p>
        </div>

        <div className="bg-zinc-900 p-4 rounded-xl">
          <h2>Completed</h2>
          <p className="text-3xl font-bold">
            {documents.filter((doc) => doc.status === "COMPLETED").length}
          </p>
        </div>
      </div>
    </div>
  );
}
