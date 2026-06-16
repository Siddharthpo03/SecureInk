import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import SignatureCanvas from "react-signature-canvas";

import { apiFetch } from "../services/api";

export default function SignerPage() {
  const { documentId } = useParams();

  const sigCanvas = useRef<any>(null);

  const [email, setEmail] = useState("");

  const handleSave = async () => {
    if (!sigCanvas.current) return;

    const imageUrl = sigCanvas.current.toDataURL();

    await apiFetch("/sign", {
      method: "POST",
      body: JSON.stringify({
        documentId,
        signerEmail: email,
        imageUrl,
      }),
    });

    alert("Document Signed Successfully");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Sign Document</h1>

      <input
        type="email"
        placeholder="Your Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="
          border
          px-3
          py-2
          rounded-lg
          mb-4
          w-full
        "
      />

      <div
        className="
          border-2
          border-black
          inline-block
          bg-white
        "
      >
        <SignatureCanvas
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 600,
            height: 200,
            className: "signatureCanvas",
          }}
        />
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => sigCanvas.current.clear()}
          className="
            bg-gray-500
            text-white
            px-4
            py-2
            rounded
          "
        >
          Clear
        </button>

        <button
          onClick={handleSave}
          className="
            bg-green-600
            text-white
            px-4
            py-2
            rounded
          "
        >
          Sign Document
        </button>
      </div>
    </div>
  );
}
