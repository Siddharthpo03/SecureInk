import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

export default function PDFViewer() {
  const [numPages, setNumPages] = useState(0);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">PDF Viewer</h1>

      <Document
        file="/test.pdf"
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
      >
        {Array.from({ length: numPages }, (_, index) => (
          <Page key={index} pageNumber={index + 1} width={800} />
        ))}
      </Document>
    </div>
  );
}
