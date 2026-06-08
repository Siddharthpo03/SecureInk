import express, { Request, Response } from "express";

import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("SecureInk API Running");
});

export default app;
