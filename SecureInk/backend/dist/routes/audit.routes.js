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
        const logs = await prisma_1.default.auditLog.findMany({
            where: {
                documentId: req.params.documentId,
            },
            orderBy: {
                createdAt: "desc",
            },
        });
        return res.json(logs);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
exports.default = router;
//# sourceMappingURL=audit.routes.js.map