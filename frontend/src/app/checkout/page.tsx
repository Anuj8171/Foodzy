"use client";
import React, { useEffect, useState } from "react";
import { useCartStore } from "@/app/store/cartStore";
import { useOrderStore } from "@/app/store/orderStore";
import { useEmailStore } from "@/app/store/emailStore";
import Summary from "../component/Summary";
import PaymentMethod from "../component/PaymentMethod";
import CustomerVerification from "../component/CustomerVerification";
import BillingDetails from "../component/BillingDetails";
import DeliveryMethod from "../component/DeliveryMethod";
import PaymentCard from "../component/PaymentCard";
import Footer from "../component/Footer";
import toast from "react-hot-toast";




export default function CheckoutPage() {
  const { cart, total } = useCartStore();
  const { createOrder, loading } = useOrderStore();
  const { sendOtp, verifyOtp, otpSent, verified, loading: emailLoading } = useEmailStore();

  const [payment, setPayment] = useState<'cod'|'upi'|'bank'>("cod");
  const [shipping, setShipping] = useState<"free" | "flat">("free");
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postCode: "",
    country: "",
    regionState: "",
    paymentMethod: "Cash On Delivery",
  });

  const deliveryCharge = shipping === "flat" ? 5 : 0;
  const grandTotal = total + deliveryCharge;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => sendOtp(formData.email);
  const handleVerifyOtp = () => verifyOtp(formData.email, formData.otp);

  const handlePlaceOrder = async () => {
    const required = ["firstName", "lastName", "address", "city", "postCode", "country", "regionState"];
    for (const key of required) {
      if (!formData[key as keyof typeof formData]) {
        alert(` Please fill ${key}`);
        return;
      }
    }

    if (!verified) {
      alert("Please verify your email before placing the order!");
      return;
    }

    await createOrder(formData);
  };
  useEffect(() => {
    toast("Checkout page", {
      style: {
        background: "green",
        color: "white",
        fontSize: "14px",
        padding: "12px 16px",
        borderRadius: "8px",
      },
    });
  }, []);


  return (
  <>
    <div className="bg-[rgba(245,62,50,1)]  flex justify-between w-full px-35 py-4">
        <p className="font-monrope text-white text-[13px] font-medium">Checkout</p>
        <p className="font-poppins text-white text-[9px] font-medium">Home - Checkout</p>
      </div>
    <div className="min-h-screen bg-white mt-5 scrollbar-hide mb-40 px-40 py-10 font-poppins flex gap-6">
      {/* LEFT SIDE */}
     
      <div className="w-1/3   box-border rounded-md flex flex-col   space-y-6">
        <Summary cart={cart} total={total} deliveryCharge={deliveryCharge} grandTotal={grandTotal} />
        <DeliveryMethod shipping={shipping} setShipping={setShipping} />
        <PaymentMethod payment={payment} setPayment={setPayment} />
        <PaymentCard/>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 space-y-6 relative">
        <CustomerVerification
          formData={formData}
          handleChange={handleChange}
          otpSent={otpSent}
          verified={verified}
          emailLoading={emailLoading}
          handleSendOtp={handleSendOtp}
          handleVerifyOtp={handleVerifyOtp}
        />

        <BillingDetails
          formData={formData}
          handleChange={handleChange}
          loading={loading}
          handlePlaceOrder={handlePlaceOrder}
        />
      </div>
    </div>
    <Footer/>
  </>
  );
}
