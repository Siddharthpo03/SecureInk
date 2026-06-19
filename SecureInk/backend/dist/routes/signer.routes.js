"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const sendSignatureRequest_1 = require("../utils/sendSignatureRequest");
const router = (0, express_1.Router)();
router.post("/", auth_middleware_1.authenticate, async (req, res) => {
    try {
        const { email, documentId } = req.body;
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
        const existingSigner = await prisma_1.default.signer.findFirst({
            where: {
                email,
                documentId,
            },
        });
        if (existingSigner) {
            return res.status(409).json({
                message: "Signer already invited",
            });
        }
        const signer = await prisma_1.default.signer.create({
            data: {
                email,
                documentId,
            },
        });
        await (0, sendSignatureRequest_1.sendSignatureRequest)(email, documentId);
        await prisma_1.default.auditLog.create({
            data: {
                action: "SIGNER_INVITED",
                documentId,
            },
        });
        return res.status(201).json(signer);
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
        const signers = await prisma_1.default.signer.findMany({
            where: {
                documentId: req.params.documentId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(signers);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.default = router;
//# sourceMappingURL=signer.routes.js.map