import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

import { apiFetch } from "../services/api";

export default function SignerPage() {
  const { documentId } = useParams();

  const navigate = useNavigate();

  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    try {
      if (!email.trim()) {
        alert("Please enter your email");
        return;
      }

      if (!sigCanvas.current || sigCanvas.current.isEmpty()) {
        alert("Please draw your signature");
        return;
      }

      setLoading(true);

      const imageUrl = sigCanvas.current.toDataURL();

      await apiFetch("/sign", {
        method: "POST",
        body: JSON.stringify({
          documentId,
          signerEmail: email,
          imageUrl,
        }),
      });

      alert("Document signed successfully");

      navigate("/");
    } catch (error) {
      console.error(error);

      alert("Failed to sign document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-2">Sign Document</h1>

        <p className="text-slate-500 mb-6">Please review and sign below.</p>

        <div className="bg-slate-50 rounded-xl p-4 mb-6">
          <h2 className="font-semibold">Document ID</h2>

          <p className="text-slate-500 break-all">{documentId}</p>
        </div>

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-6
          "
        />

        <div className="border rounded-xl overflow-hidden bg-white">
          <SignatureCanvas
            ref={sigCanvas}
            penColor="black"
            canvasProps={{
              width: 900,
              height: 250,
              className: "bg-white",
            }}
          />
        </div>

        <div className="flex gap-4 mt-6">
          <button
            onClick={() => sigCanvas.current?.clear()}
            className="
              flex-1
              bg-gray-500
              text-white
              py-3
              rounded-xl
            "
          >
            Clear
          </button>

          <button
            onClick={handleSave}
            disabled={loading}
            className="
              flex-1
              bg-green-600
              text-white
              py-3
              rounded-xl
              disabled:opacity-50
            "
          >
            {loading ? "Signing..." : "Sign Document"}
          </button>
        </div>
      </div>
    </div>
  );
}
