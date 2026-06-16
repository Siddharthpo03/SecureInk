import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/:documentId", async (req, res) => {
  try {
    const logs = await prisma.auditLog.findMany({
      where: {
        documentId: req.params.documentId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(logs);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
