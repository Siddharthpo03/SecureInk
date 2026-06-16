import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import { apiFetch, inviteSigner, getSigners } from "../services/api";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

interface SignatureField {
  id: string;
  page: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface Signer {
  id: string;
  email: string;
  status: string;
}

export default function PDFViewer() {
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");

  const [signatureFields, setSignatureFields] = useState<SignatureField[]>([]);

  const [signers, setSigners] = useState<Signer[]>([]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfData = await apiFetch(`/documents/${id}/view`);

        setPdfUrl(pdfData.url);

        const fields = await apiFetch(`/signatures/${id}`);

        setSignatureFields(fields);

        const signerData = await getSigners(id!);

        setSigners(signerData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [id]);

  const handleInviteSigner = async () => {
    if (!email.trim()) return;

    try {
      const signer = await inviteSigner(email, id!);

      setSigners((prev) => [...prev, signer]);

      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading PDF...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">PDF Viewer</h1>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Invite Signer</h2>

        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="signer@email.com"
            className="
              flex-1
              border
              rounded-lg
              px-3
              py-2
            "
          />

          <button
            onClick={handleInviteSigner}
            className="
              bg-blue-600
              text-white
              px-4
              py-2
              rounded-lg
              hover:bg-blue-700
            "
          >
            Invite
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">Invited Signers</h2>

        {signers.length === 0 ? (
          <p className="text-gray-500">No signers invited yet</p>
        ) : (
          <div className="space-y-2">
            {signers.map((signer) => (
              <div
                key={signer.id}
                className="
                    flex
                    justify-between
                    border-b
                    pb-2
                  "
              >
                <span>{signer.email}</span>

                <span className="text-orange-500 font-medium">
                  {signer.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {pdfUrl && (
        <div className="relative">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from(
              {
                length: numPages,
              },
              (_, index) => (
                <div key={index} className="relative mb-6">
                  <Page pageNumber={index + 1} width={900} />

                  {signatureFields
                    .filter((field) => field.page === index + 1)
                    .map((field) => (
                      <div
                        key={field.id}
                        className="
                            absolute
                            border-2
                            border-blue-500
                            bg-blue-100
                            text-blue-700
                            text-sm
                            flex
                            items-center
                            justify-center
                            rounded
                            font-semibold
                          "
                        style={{
                          left: field.x,
                          top: field.y,
                          width: field.width,
                          height: field.height,
                        }}
                      >
                        Sign Here
                      </div>
                    ))}
                </div>
              ),
            )}
          </Document>
        </div>
      )}
    </div>
  );
}
