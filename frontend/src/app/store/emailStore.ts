import { create } from "zustand";
import { axiosInstance } from "../lib/axiosinstance";
import toast from "react-hot-toast";


interface EmailStore {
  email: string;
  otp: string;
  otpSent: boolean;
  verified: boolean;
  loading: boolean;
  error: string | null;
  sendOtp: (email: string) => Promise<void>;
  verifyOtp: (email: string, otp: string) => Promise<void>;
}

export const useEmailStore = create<EmailStore>((set) => ({
  email: "",
  otp: "",
  otpSent: false,
  verified: false,
  loading: false,
  error: null,

  sendOtp: async (email) => {
    if (!email) {
      set({ error: "Please enter a valid email address" });
      return;
    }

    set({ loading: true, error: null });

    try {
      await axiosInstance.post("/auth/send-otp", { email }); 
      set({ email, otpSent: true, loading: false });
      toast.success(" OTP sent successfully to your email");
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to send OTP",
      });
    }
  },

  verifyOtp: async (email, otp) => {
    if (!otp) {
      set({ error: "Please enter OTP" });
      return;
    }

    set({ loading: true, error: null });

    try {
      await axiosInstance.post("/auth/verify-otp", { email, otp }); 
      set({email, verified: true, loading: false });
      toast.success(" Email verified successfully!");
    } catch (error: any) {
      set({
        loading: false,
        error: error.response?.data?.message || "Invalid OTP",
      });
    }
  },
}));
