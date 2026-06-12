import { Router } from "express";
import upload from "../middleware/upload.middleware";
import supabase from "../config/supabase";
import prisma from "../config/prisma";
import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  async (req: AuthRequest, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          message: "No file uploaded",
        });
      }

      const fileName = `${Date.now()}-${req.file.originalname}`;

      const { error } = await supabase.storage
        .from("documents")
        .upload(fileName, req.file.buffer, {
          contentType: req.file.mimetype,
        });

      if (error) {
        console.error(error);

        return res.status(500).json({
          message: "Upload failed",
        });
      }

      const document = await prisma.document.create({
        data: {
          title: req.file.originalname,
          fileUrl: fileName,
          ownerId: req.userId!,
        },
      });

      return res.status(201).json({
        message: "Document uploaded successfully",
        document,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: "Server Error",
      });
    }
  },
);

router.get("/", authenticate, async (req: AuthRequest, res) => {
  try {
    const documents = await prisma.document.findMany({
      where: {
        ownerId: req.userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.json(documents);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const documentId = req.params.id as string;

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

    return res.json(document);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/:id/view", authenticate, async (req: AuthRequest, res) => {
  try {
    const documentId = req.params.id as string;

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

    const { data, error } = await supabase.storage
      .from("documents")
      .createSignedUrl(document.fileUrl, 60);

    if (error) {
      return res.status(500).json({
        message: "Failed to generate URL",
      });
    }

    return res.json({
      url: data.signedUrl,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.delete("/:id", authenticate, async (req: AuthRequest, res) => {
  try {
    const id = req.params.id;

    if (!id || Array.isArray(id)) {
      return res.status(400).json({
        message: "Invalid document id",
      });
    }

    const document = await prisma.document.findFirst({
      where: {
        id,
        ownerId: req.userId,
      },
    });

    if (!document) {
      return res.status(404).json({
        message: "Document not found",
      });
    }

    const { error } = await supabase.storage
      .from("documents")
      .remove([document.fileUrl]);

    if (error) {
      console.error(error);

      return res.status(500).json({
        message: "Failed to delete file",
      });
    }

    await prisma.document.delete({
      where: {
        id,
      },
    });

    return res.json({
      message: "Document deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});
export default router;
