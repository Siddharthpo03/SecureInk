"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { documentId, page, x, y } = req.body;
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
        const signatureField = await prisma_1.default.signatureField.create({
            data: {
                documentId,
                page,
                x,
                y,
            },
        });
        await prisma_1.default.auditLog.create({
            data: {
                action: "SIGNATURE_FIELD_CREATED",
                documentId,
            },
        });
        return res.status(201).json(signatureField);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/:documentId", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const documentId = req.params.documentId;
        const fields = await prisma_1.default.signatureField.findMany({
            where: {
                documentId,
            },
        });
        return res.json(fields);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.put("/:id", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { x, y } = req.body;
        const field = await prisma_1.default.signatureField.update({
            where: {
                id: req.params.id,
            },
            data: {
                x,
                y,
            },
        });
        await prisma_1.default.auditLog.create({
            data: {
                action: "SIGNATURE_FIELD_UPDATED",
                documentId: field.documentId,
            },
        });
        return res.json(field);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/:documentId", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const documentId = req.params.documentId;
        console.log("DOCUMENT ID:", documentId);
        const fields = await prisma_1.default.signatureField.findMany({
            where: {
                documentId,
            },
        });
        console.log("FIELDS:", fields);
        return res.json(fields);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.default = router;
//# sourceMappingURL=signature.routes.js.map