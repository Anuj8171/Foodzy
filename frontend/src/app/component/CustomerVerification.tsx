
import React from "react";
import { CustomerVerificationProps } from "../types/checkout";

export default function CustomerVerification({
  formData,
  handleChange,
  otpSent,
  verified,
  emailLoading,
  handleSendOtp,
  handleVerifyOtp,
}: CustomerVerificationProps) {
  return (
    <div className="bg-white border border-gray-200 font-montserrat rounded-md p-6">
      <h2 className=" font-semibold mb-4">Customer</h2>
      <h2 className=" text-[12px] mb-4">Checkout Options</h2>
      <h2 className="font-semibold mb-3">Returning Customer</h2>

      <div className=" ">
        <div className="mb-4 text-segoe">
          <p className="text-xs font-medium mb-2">Email Address</p>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={otpSent}
            placeholder="Enter your email address"
            className="border border-gray-300 rounded-md px-3 py-2 text-xs w-full focus:outline-none focus:border-[#F53E32]"
          />
        </div>

        <div>
          <p className="text-xs font-medium mb-3">OTP</p>
          <input
            type="text"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            disabled={!otpSent || verified}
            placeholder="Enter your OTP"
            className="border border-gray-300 rounded-md px-3 py-2 mb-4 text-xs w-full focus:outline-none focus:border-[#F53E32]"
          />
        </div>
      </div>

      <div className="flex justify-center mt-4 mb-4 gap-2">
        {!otpSent ? (
          <button
            onClick={handleSendOtp}
            disabled={emailLoading}
            className="bg-[#F53E32] text-white px-6 py-2 text-xs rounded hover:bg-red-600 disabled:opacity-50"
          >
            {emailLoading ? "Sending..." : "Send OTP"}
          </button>
        ) : (
          <button
            onClick={handleVerifyOtp}
            disabled={verified || emailLoading}
            className={`px-6 py-2 text-xs rounded ${
              verified
                ? "bg-green-500 text-white"
                : "bg-[#F53E32] text-white px-6 py-2 text-xs rounded hover:bg-red-600 disabled:opacity-50"
            }`}
          >
            {verified ? "Verified" : emailLoading ? "Verifying..." : "Verify"}
          </button>
        )}
      </div>
    </div>
  );
}
