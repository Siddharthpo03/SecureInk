import { Router } from "express";
import prisma from "../config/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const { documentId, page, x, y } = req.body;

    const document = await prisma.document.findFirst({
      where: {
        id: documentId,
        ownerId: req.userId,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const signatureField = await prisma.signatureField.create({
      data: {
        documentId,
        page,
        x,
        y,
      },
    });

    return res.status(201).json(signatureField);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:documentId", authenticate, async (req: AuthRequest, res) => {
  try {
    const documentId = req.params.documentId as string;

    const fields = await prisma.signatureField.findMany({
      where: {
        documentId,
      },
    });

    return res.json(fields);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
