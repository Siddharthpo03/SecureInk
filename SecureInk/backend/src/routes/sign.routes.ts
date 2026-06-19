import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { documentId, signerEmail, imageUrl } = req.body;

    const signature = await prisma.signature.create({
      data: {
        documentId,
        signerEmail,
        imageUrl,
      },
    });

    await prisma.auditLog.create({
      data: {
        action: "DOCUMENT_SIGNED",
        documentId,
      },
    });

    await prisma.signer.updateMany({
      where: {
        documentId,
        email: signerEmail,
      },
      data: {
        status: "SIGNED",
      },
    });

    await prisma.document.update({
      where: {
        id: documentId,
      },
      data: {
        status: "COMPLETED",
      },
    });

    return res.status(201).json(signature);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:documentId", async (req, res) => {
  try {
    const signatures = await prisma.signature.findMany({
      where: {
        documentId: req.params.documentId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(signatures);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
