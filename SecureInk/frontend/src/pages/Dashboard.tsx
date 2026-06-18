import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData = await apiFetch("/auth/me");
        const docsData = await apiFetch("/documents");

        setUser(userData);
        setDocuments(docsData);
      } catch (error) {
        console.error(error);

        localStorage.removeItem("token");

        navigate("/login", {
          replace: true,
        });
      }
    };

    loadData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login", {
      replace: true,
    });
  };

  const recentDocuments = documents.slice(0, 5);

  const pendingCount = documents.filter(
    (doc) => doc.status === "PENDING",
  ).length;

  const completedCount = documents.filter(
    (doc) => doc.status === "COMPLETED" || doc.status === "SIGNED",
  ).length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "PENDING":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
            Pending
          </span>
        );

      case "COMPLETED":
      case "SIGNED":
        return (
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
            Completed
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
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-bold">Welcome {user?.fullName}</h1>

            <p className="text-slate-500 mt-2">
              Manage, sign and verify documents with SecureInk.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="
              bg-red-600
              text-white
              px-5
              py-3
              rounded-xl
              font-semibold
              hover:bg-red-700
              transition
            "
          >
            Logout
          </button>
        </div>

        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <button
            onClick={() => navigate("/documents")}
            className="
              bg-blue-600
              text-white
              rounded-2xl
              p-6
              text-left
              shadow-lg
              hover:scale-105
              transition
            "
          >
            <p className="text-sm opacity-80">Total Documents</p>

            <h2 className="text-4xl font-bold mt-2">{documents.length}</h2>

            <p className="mt-3 text-sm">View Documents →</p>
          </button>

          <button
            onClick={() => navigate("/documents")}
            className="
              bg-yellow-500
              text-white
              rounded-2xl
              p-6
              text-left
              shadow-lg
              hover:scale-105
              transition
            "
          >
            <p className="text-sm opacity-80">Pending</p>

            <h2 className="text-4xl font-bold mt-2">{pendingCount}</h2>

            <p className="mt-3 text-sm">Needs Action →</p>
          </button>

          <button
            onClick={() => navigate("/documents")}
            className="
              bg-green-600
              text-white
              rounded-2xl
              p-6
              text-left
              shadow-lg
              hover:scale-105
              transition
            "
          >
            <p className="text-sm opacity-80">Completed</p>

            <h2 className="text-4xl font-bold mt-2">{completedCount}</h2>

            <p className="mt-3 text-sm">View Signed →</p>
          </button>
        </div>

        {/* Quick Actions */}

        <div className="bg-white rounded-2xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

          <div className="grid md:grid-cols-4 gap-4">
            <button
              onClick={() => navigate("/documents")}
              className="
                bg-blue-600
                text-white
                py-4
                rounded-xl
                font-semibold
              "
            >
              Documents
            </button>

            <button
              onClick={() => navigate("/audit")}
              className="
                bg-orange-600
                text-white
                py-4
                rounded-xl
                font-semibold
              "
            >
              Audit Logs
            </button>

            <button
              onClick={() => navigate("/settings")}
              className="
                bg-slate-700
                text-white
                py-4
                rounded-xl
                font-semibold
              "
            >
              Settings
            </button>

            <button
              onClick={handleLogout}
              className="
                bg-red-600
                text-white
                py-4
                rounded-xl
                font-semibold
              "
            >
              Logout
            </button>
          </div>
        </div>

        {/* Recent Documents */}

        <div className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-5">Recent Documents</h2>

          {recentDocuments.length === 0 ? (
            <p className="text-slate-500">No documents uploaded yet.</p>
          ) : (
            <div className="space-y-4">
              {recentDocuments.map((doc) => (
                <div
                  key={doc.id}
                  className="
                    flex
                    justify-between
                    items-center
                    border-b
                    pb-4
                  "
                >
                  <div>
                    <h3 className="font-semibold">{doc.title}</h3>

                    <div className="mt-2">{getStatusBadge(doc.status)}</div>
                  </div>

                  <button
                    onClick={() => navigate(`/viewer/${doc.id}`)}
                    className="
                      bg-blue-600
                      text-white
                      px-4
                      py-2
                      rounded-lg
                    "
                  >
                    Open Workspace
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
