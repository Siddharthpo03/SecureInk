import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/:documentId", async (req, res) => {
  try {
    const document = await prisma.document.findUnique({
      where: {
        id: req.params.documentId,
      },
      include: {
        owner: true,
        signers: true,
        signatures: true,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    return res.json(document);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
