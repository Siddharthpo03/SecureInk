import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { apiFetch } from "../services/api";

export default function VerificationPage() {
  const { documentId } = useParams();

  const [document, setDocument] = useState<any>(null);

  useEffect(() => {
    const loadData = async () => {
      const data = await apiFetch(`/verify/${documentId}`);

      setDocument(data);
    };

    loadData();
  }, [documentId]);

  if (!document) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <div className="bg-white shadow rounded-xl p-8">
        <h1 className="text-3xl font-bold text-green-600 mb-6">
          Document Verified ✅
        </h1>

        <div className="space-y-4">
          <p>
            <strong>Document:</strong> {document.title}
          </p>

          <p>
            <strong>Status:</strong> {document.status}
          </p>

          <p>
            <strong>Owner:</strong> {document.owner.fullName}
          </p>

          <p>
            <strong>Owner Email:</strong> {document.owner.email}
          </p>

          <div>
            <strong>Signers:</strong>

            <div className="mt-2">
              {document.signers.map((signer: any) => (
                <div key={signer.id} className="border-b py-2">
                  {signer.email}
                  {" - "}
                  {signer.status}
                </div>
              ))}
            </div>
          </div>

          <p>
            <strong>Created:</strong>{" "}
            {new Date(document.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
