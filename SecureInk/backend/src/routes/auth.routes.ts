import { Router } from "express";
import bcrypt from "bcrypt";

import prisma from "../config/prisma";
import { generateOTP } from "../utils/otp";
import { generateToken } from "../utils/jwt";
import { sendOTP } from "../utils/sendMail";

import { authenticate, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = generateOTP();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
      },
    });

    await sendOTP(email, otp);

    return res.status(201).json({
      message: "Account created. OTP sent to email.",
      userId: user.id,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await prisma.user.findUnique({
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

    await prisma.user.update({
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
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, user.password);

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

    const token = generateToken(user.id);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

router.get("/me", authenticate, async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
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

router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const otp = generateOTP();

    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        otp,
        otpExpiry,
      },
    });

    await sendOTP(email, otp);

    return res.json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server Error",
    });
  }
});

export default router;
