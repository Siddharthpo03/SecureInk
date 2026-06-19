"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = __importDefault(require("../middleware/upload.middleware"));
const supabase_1 = __importDefault(require("../config/supabase"));
const prisma_1 = __importDefault(require("../config/prisma"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/upload", auth_middleware_1.authenticate, upload_middleware_1.default.single("file"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }
        const fileName = `${Date.now()}-${req.file.originalname}`;
        const { error } = await supabase_1.default.storage
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
        const document = await prisma_1.default.document.create({
            data: {
                title: req.file.originalname,
                fileUrl: fileName,
                ownerId: req.userId,
            },
        });
        await prisma_1.default.auditLog.create({
            data: {
                action: "DOCUMENT_UPLOADED",
                documentId: document.id,
            },
        });
        return res.status(201).json({
            message: "Document uploaded successfully",
            document,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const documents = await prisma_1.default.document.findMany({
            where: {
                ownerId: req.userId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(documents);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const documentId = req.params.id;
        const document = await prisma_1.default.document.findFirst({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/:id/view", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const documentId = req.params.id;
        const document = await prisma_1.default.document.findFirst({
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
        const { data, error } = await supabase_1.default.storage
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.delete("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const id = req.params.id;
        if (!id || Array.isArray(id)) {
            return res.status(400).json({
                message: "Invalid document id",
            });
        }
        const document = await prisma_1.default.document.findFirst({
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
        const { error } = await supabase_1.default.storage
            .from("documents")
            .remove([document.fileUrl]);
        if (error) {
            console.error(error);
            return res.status(500).json({
                message: "Failed to delete file",
            });
        }
        await prisma_1.default.document.delete({
            where: {
                id,
            },
        });
        return res.json({
            message: "Document deleted successfully",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.default = router;
//# sourceMappingURL=document.routes.js.map