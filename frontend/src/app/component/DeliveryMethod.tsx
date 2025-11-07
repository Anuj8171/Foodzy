import React from "react";
import { DeliveryMethodProps } from "../types/checkout";

export default function DeliveryMethod({ shipping, setShipping }: DeliveryMethodProps) {
  return (
    <div className="bg-white border p-3 border-[rgba(233,233,233,1)] rounded-sm font-segoe">
      <h3 className="text-sm font-medium mb-1">Delivery Method</h3>
      <p className="text-[10px] text-[rgba(122,122,122,1)] mt-2 mb-2">Please select your preferred shipping method to use on this order.</p>

      <div className="flex gap-4 text-xs font-segoe">
        <label className="flex items-center gap-1  p-2  cursor-pointer">
         <div className="flex flex-col gap-2 leading-tight">
              <span>Free Shipping</span>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="shipping"
                  checked={shipping === "free"}
                  onChange={() => setShipping("free")}
                  className="accent-[#F53E32]"
                />
                <span className="text-gray-500">Rate – $0.00</span>
              </div>
            </div>
        </label>

        <label className="flex items-center gap-1  p-2  cursor-pointer">
          
          <div className="flex flex-col gap-2">
            <span> Flat Rate</span>
            <div className="flex gap-2 ">
             <input
            type="radio"
            name="shipping"
            checked={shipping === "flat"}
            onChange={() => setShipping("flat")}
            className="accent-[#F53E32]"
          />
            <span className="ml-1 text-gray-500">Rate – $5.00</span>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
