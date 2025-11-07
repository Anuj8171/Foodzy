
import React from "react";
import { PaymentMethodProps } from "../types/checkout";

export default function PaymentMethod({ payment, setPayment }: PaymentMethodProps) {
  const methods = [
    { id: "cod", label: "Cash On Delivery" },
    { id: "upi", label: "UPI" },
    { id: "bank", label: "Bank Transfer" },
  ] as const;

  return (
    <div className="bg-white border p-3 border-[rgba(233,233,233,1)] rounded-sm font-segoe">
      <h3 className="text-sm font-medium mb-1">Payment Method</h3>
      <p className="text-[10px] text-[rgba(122,122,122,1)] mt-2 mb-2">Please select the preferred payment method to use on this order.</p>

      <div className="flex flex-col gap-2 text-[rgba(122,122,122,1)] text-[11px]">
        {methods.map((m) => (
          <label key={m.id} className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="payment"
              checked={payment === m.id}
              onChange={() => setPayment(m.id)}
              className="accent-[#F53E32]"
            />
            {m.label}
          </label>
        ))}
      </div>
    </div>
  );
}
