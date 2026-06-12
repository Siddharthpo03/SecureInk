"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
const otp_1 = require("../utils/otp");
const jwt_1 = require("../utils/jwt");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const existingUser = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(409).json({
                message: "Email already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const otp = (0, otp_1.generateOTP)();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
        const user = await prisma_1.default.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
                otp,
                otpExpiry,
            },
        });
        return res.status(201).json({
            message: "User created successfully",
            userId: user.id,
            otp,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        if (user.otp !== otp) {
            return res.status(400).json({
                message: "Invalid OTP",
            });
        }
        if (user.otpExpiry && user.otpExpiry < new Date()) {
            return res.status(400).json({
                message: "OTP expired",
            });
        }
        await prisma_1.default.user.update({
            where: {
                email,
            },
            data: {
                isVerified: true,
                otp: null,
                otpExpiry: null,
            },
        });
        return res.json({
            message: "Account verified",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }
        const validPassword = await bcrypt_1.default.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }
        if (!user.isVerified) {
            return res.status(403).json({
                message: "Verify your account first",
            });
        }
        const token = (0, jwt_1.generateToken)(user.id);
        return res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                fullName: user.fullName,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
        });
    }
});
router.get("/me", auth_middleware_1.authenticate, async (req, res) => {
    const user = await prisma_1.default.user.findUnique({
        where: {
            id: req.userId,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            isVerified: true,
            createdAt: true,
        },
    });
    return res.json(user);
});
exports.default = router;
//# sourceMappingURL=auth.routes.js.map