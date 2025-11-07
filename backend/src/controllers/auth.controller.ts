import { Request, Response } from "express";
import prisma from "../prisma/client";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

/* ---------------------------- Helper: Generate OTP ---------------------------- */
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

/* ---------------------------- Send OTP Controller ----------------------------- */
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min expiry

    // Delete any previous OTP for same email (only one active)
    await prisma.oTP.deleteMany({
      where: { email },
    });

    // Save OTP to DB
    await prisma.oTP.create({
      data: {
        email,
        code: otp,
        expiresAt,
      },
    });

    // Setup mail transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send OTP via email
    await transporter.sendMail({
      to: email,
      subject: "Your Login OTP",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
    });

    return res.json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Server error while sending OTP" });
  }
};

/* ---------------------------- Verify OTP Controller --------------------------- */
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

    // Find OTP record
    const record = await prisma.oTP.findFirst({
      where: { email, code: otp },
    });

    if (!record)
      return res.status(400).json({ message: "Invalid or incorrect OTP" });


    if (record.expiresAt < new Date()) {
      await prisma.oTP.delete({ where: { id: record.id } });
      return res.status(400).json({ message: "OTP expired" });
    }

    
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    
    await prisma.oTP.delete({ where: { id: record.id } });

    return res.json({ message: "Login successful ✅", user });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Server error while verifying OTP" });
  }
};



