"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const prisma_1 = __importDefault(require("../config/prisma"));
const router = (0, express_1.Router)();
router.get("/:documentId", async (req, res) => {
    try {
        const document = await prisma_1.default.document.findUnique({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.default = router;
//# sourceMappingURL=verify.routes.js.map