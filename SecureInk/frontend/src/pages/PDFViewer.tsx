import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import {
  apiFetch,
  inviteSigner,
  getSigners,
  getSignatures,
} from "../services/api";

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

interface Signature {
  id: string;
  signerEmail: string;
  imageUrl: string;
}

export default function PDFViewer() {
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(0);

  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState("");

  const [signatureFields, setSignatureFields] = useState<SignatureField[]>([]);

  const [signers, setSigners] = useState<Signer[]>([]);

  const [signatures, setSignatures] = useState<Signature[]>([]);

  const [addingField, setAddingField] = useState(false);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfData = await apiFetch(`/documents/${id}/view`);

        setPdfUrl(pdfData.url);

        const fields = await apiFetch(`/signatures/${id}`);

        setSignatureFields(fields);

        const signerData = await getSigners(id!);

        setSigners(signerData);

        const signatureData = await getSignatures(id!);

        setSignatures(signatureData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [id]);

  const handleInviteSigner = async () => {
    if (!email.trim()) {
      alert("Please enter signer email");
      return;
    }

    try {
      const signer = await inviteSigner(email, id!);

      setSigners((prev) => [...prev, signer]);

      alert(`Invitation sent to ${email}`);

      setEmail("");
    } catch (error) {
      console.error(error);

      alert("Failed to send invitation");
    }
  };

  const handleAddField = async (
    page: number,
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    if (!addingField) return;

    const rect = event.currentTarget.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    try {
      const field = await apiFetch("/signatures", {
        method: "POST",
        body: JSON.stringify({
          documentId: id,
          page,
          x,
          y,
        }),
      });

      setSignatureFields((prev) => [...prev, field]);

      setAddingField(false);

      alert("Signature field added");
    } catch (error) {
      console.error(error);

      alert("Failed to add field");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
        Loading PDF...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="flex">
        <div className="w-80 min-h-screen border-r border-zinc-800 bg-zinc-900 p-5">
          <h1 className="text-2xl font-bold mb-6">Document Workspace</h1>

          <div className="bg-zinc-800 rounded-xl p-4 mb-5">
            <h2 className="font-semibold mb-2">Status</h2>

            <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
              Active
            </span>
          </div>

          <div className="bg-zinc-800 rounded-xl p-4 mb-5">
            <h2 className="font-semibold mb-3">Signature Fields</h2>

            <button
              onClick={() => setAddingField(true)}
              className="w-full bg-purple-600 py-2 rounded-lg hover:bg-purple-700"
            >
              Add Signature Field
            </button>

            {addingField && (
              <p className="text-xs text-zinc-400 mt-2">
                Click anywhere on the PDF
              </p>
            )}
          </div>

          <div className="bg-zinc-800 rounded-xl p-4 mb-5">
            <h2 className="font-semibold mb-3">Invite Signer</h2>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="signer@email.com"
              className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2 mb-3"
            />

            <button
              onClick={handleInviteSigner}
              className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700"
            >
              Invite Signer
            </button>
          </div>

          <div className="bg-zinc-800 rounded-xl p-4 mb-5">
            <h2 className="font-semibold mb-3">Signers</h2>

            {signers.length === 0 ? (
              <p className="text-zinc-400 text-sm">No signers yet</p>
            ) : (
              <div className="space-y-2">
                {signers.map((signer) => (
                  <div key={signer.id} className="bg-zinc-900 p-3 rounded-lg">
                    <div className="text-sm break-all">{signer.email}</div>

                    <div
                      className={
                        signer.status === "SIGNED"
                          ? "text-green-400 text-xs font-semibold mt-1"
                          : "text-yellow-400 text-xs font-semibold mt-1"
                      }
                    >
                      {signer.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-zinc-800 rounded-xl p-4 mb-5">
            <h2 className="font-semibold mb-3">Signing Link</h2>

            <div className="bg-zinc-900 p-3 rounded-lg text-xs break-all text-zinc-300">
              {window.location.origin}/sign/
              {id}
            </div>
          </div>

          <div className="bg-zinc-800 rounded-xl p-4">
            <h2 className="font-semibold mb-3">Verification</h2>

            <a
              href={`/verify/${id}`}
              target="_blank"
              rel="noreferrer"
              className="block text-center bg-green-600 py-2 rounded-lg hover:bg-green-700"
            >
              Verify Document
            </a>
          </div>
        </div>

        <div className="flex-1 overflow-auto p-6">
          <h1 className="text-3xl font-bold mb-6">PDF Viewer</h1>

          {pdfUrl && (
            <Document
              file={pdfUrl}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
            >
              {Array.from({ length: numPages }, (_, index) => (
                <div key={index} className="relative mb-8 flex justify-center">
                  <div
                    className="relative"
                    onClick={(e) => handleAddField(index + 1, e)}
                  >
                    <Page pageNumber={index + 1} width={900} />

                    {signatureFields
                      .filter((field) => field.page === index + 1)
                      .map((field) => (
                        <div
                          key={field.id}
                          className="absolute border-2 border-blue-500 bg-blue-500/20 rounded overflow-hidden"
                          style={{
                            left: field.x,
                            top: field.y,
                            width: field.width,
                            height: field.height,
                          }}
                        >
                          {signatures.length > 0 ? (
                            <img
                              src={signatures[0].imageUrl}
                              alt="signature"
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-blue-300 text-sm font-semibold">
                              Sign Here
                            </div>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </Document>
          )}
        </div>
      </div>
    </div>
  );
}
