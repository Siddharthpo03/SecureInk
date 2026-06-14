import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
import { apiFetch } from "../services/api";

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

export default function PDFViewer() {
  const { id } = useParams();

  const [pdfUrl, setPdfUrl] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [signatureFields, setSignatureFields] = useState<SignatureField[]>([]);

  useEffect(() => {
    const loadPdf = async () => {
      try {
        const pdfData = await apiFetch(`/documents/${id}/view`);

        setPdfUrl(pdfData.url);

        const fields = await apiFetch(`/signatures/${id}`);

        setSignatureFields(fields);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPdf();
  }, [id]);

  const handlePdfClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    try {
      const field = await apiFetch("/signatures", {
        method: "POST",
        body: JSON.stringify({
          documentId: id,
          page: 1,
          x,
          y,
        }),
      });

      setSignatureFields((prev) => [...prev, field]);
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

      {pdfUrl && (
        <div className="relative inline-block" onClick={handlePdfClick}>
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from({ length: numPages }, (_, index) => (
              <Page key={index} pageNumber={index + 1} width={900} />
            ))}
          </Document>

          {signatureFields.map((field) => (
            <div
              key={field.id}
              className="
                absolute
                border-2
                border-blue-500
                bg-blue-100
                text-blue-700
                text-xs
                font-semibold
                rounded
                flex
                items-center
                justify-center
                cursor-pointer
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
      )}
    </div>
  );
}
