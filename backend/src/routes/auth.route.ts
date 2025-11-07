import { Router } from "express";
import {  sendOtp, verifyOtp } from "../controllers/auth.controller";

const authRouter = Router();

// Send OTP
authRouter.post("/send-otp", sendOtp);

// Verify OTP & login (JWT)
authRouter.post("/verify-otp", verifyOtp);

export default authRouter;
