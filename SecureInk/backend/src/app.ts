import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("SecureInk API Running");
});

app.use("/api/auth", authRoutes);

export default app;
