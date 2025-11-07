import { Request, Response } from "express";
import prisma from "../prisma/client";
import sgMail from "@sendgrid/mail";
import "dotenv/config";

/* Require Env Var  */
function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`${key} is not set in environment variables`);
  }
  return value;
}

/*Generate OTP */
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
}

/*Send OTP Controller  */
export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const otp = generateOtp();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Delete previous OTP
    await prisma.oTP.deleteMany({ where: { email } });

    await prisma.oTP.create({
      data: { email, code: otp, expiresAt },
    });

    const sendgridKey = requireEnv("SENDGRID_API_KEY");
    const senderEmail = requireEnv("SENDGRID_SENDER");

    sgMail.setApiKey(sendgridKey);

    const msg = {
      to: email,
      from: {
        email: senderEmail,
        name: "Your App Name" // Change this to your app name
      },
      subject: "Your Login OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 5 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Your Login Verification Code</h2>
          <p>Please use the following OTP to complete your login:</p>
          <div style="background-color: #f4f4f4; padding: 15px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <h1 style="color: #4CAF50; letter-spacing: 8px; margin: 0;">${otp}</h1>
          </div>
          <p style="color: #666;">This code will expire in <strong>5 minutes</strong>.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px;">If you didn't request this code, please ignore this email.</p>
        </div>
      `,
    };

    try {
      const [response] = await sgMail.send(msg);
      console.log("✅ OTP Email Sent:", {
        to: email,
        statusCode: response.statusCode,
        messageId: response.headers['x-message-id']
      });
      
      return res.json({ 
        message: "OTP sent successfully! Please check your email (including spam folder)." 
      });
    } catch (err: any) {
      console.error("❌ SendGrid Error:", err.response?.body || err.message);
      return res.status(500).json({ 
        message: "Failed to send OTP email. Please try again." 
      });
    }
  } catch (error) {
    console.error("❌ Server Error:", error);
    return res.status(500).json({ message: "Server error while sending OTP" });
  }
};
/*Verify OTP Controller*/
export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP required" });

  
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
