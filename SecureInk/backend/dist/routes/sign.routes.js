"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const router = (0, express_1.Router)();
router.post("/", async (req, res) => {
    try {
        const { documentId, signerEmail, imageUrl } = req.body;
        const signature = await prisma_1.default.signature.create({
            data: {
                documentId,
                signerEmail,
                imageUrl,
            },
        });
        await prisma_1.default.auditLog.create({
            data: {
                action: "DOCUMENT_SIGNED",
                documentId,
            },
        });
        await prisma_1.default.signer.updateMany({
            where: {
                documentId,
                email: signerEmail,
            },
            data: {
                status: "SIGNED",
            },
        });
        await prisma_1.default.document.update({
            where: {
                id: documentId,
            },
            data: {
                status: "COMPLETED",
            },
        });
        return res.status(201).json(signature);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/:documentId", async (req, res) => {
    try {
        const signatures = await prisma_1.default.signature.findMany({
            where: {
                documentId: req.params.documentId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(signatures);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.default = router;
//# sourceMappingURL=sign.routes.js.map