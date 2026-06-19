import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import documentRoutes from "./routes/document.routes";
import signatureRoutes from "./routes/signature.routes";
import signerRoutes from "./routes/signer.routes";
import signRoutes from "./routes/sign.routes";
import verifyRoutes from "./routes/verify.routes";
import auditRoutes from "./routes/audit.routes";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://secure-ink-ivory.vercel.app/"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (_, res) => {
  res.send("SecureInk API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/signatures", signatureRoutes);
app.use("/api/signers", signerRoutes);
app.use("/api/sign", signRoutes);
app.use("/api/verify", verifyRoutes);
app.use("/api/audit", auditRoutes);

export default app;
