import { Router } from "express";
import prisma from "../config/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const { email, documentId } = req.body;

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

    const signer = await prisma.signer.create({
      data: {
        email,
        documentId,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "DOCUMENT_UPLOADED",
        documentId: document.id,
      },
    });

    return res.status(201).json(signer);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:documentId", authenticate, async (req: AuthRequest, res) => {
  try {
    const signers = await prisma.signer.findMany({
      where: {
        documentId: req.params.documentId as string,
      },
    });

    return res.json(signers);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
