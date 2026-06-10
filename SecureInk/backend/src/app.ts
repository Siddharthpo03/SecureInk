import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import documentRoutes from "./routes/document.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("SecureInk API Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/documents", documentRoutes);

export default app;
