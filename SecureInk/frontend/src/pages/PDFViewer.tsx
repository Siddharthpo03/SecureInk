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

  if (loading) {
    return <div className="p-6 text-white">Loading PDF...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">PDF Viewer</h1>

      {pdfUrl && (
        <div className="relative">
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          >
            {Array.from({ length: numPages }, (_, index) => (
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
            ))}
          </Document>
        </div>
      )}
    </div>
  );
}
