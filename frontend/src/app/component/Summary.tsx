import React from "react";
import { SummaryProps } from "../types/cart";
import { Star, X } from "lucide-react";
import { useCartStore } from "../store/cartStore";

export default function Summary({ cart, total, deliveryCharge, grandTotal }: SummaryProps) {
   const {removeFromCart}= useCartStore()
  return (
    <div className="bg-white border p-2 border-[rgba(233,233,233,1)] font-segoe  ">
      <h2 className="text-md font-semibold font-segoe mb-2">Summary</h2>

      <div className="flex justify-between  ">
        <span className=" text-[rgba(122,122,122,1)] text-xs">Sub-Total</span>
        <span className=" text-[rgba(0,0,0,1)] text-xs">${total.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mt-3 text-xs text-[rgba(122,122,122,1)]">
        <span>Delivery Charges</span>
        <span className=" text-[rgba(0,0,0,1)]">${deliveryCharge.toFixed(2)}</span>
      </div>

      <hr className="mt-2 w- mx-auto border-[rgba(233,233,233,1)]" />

      <div className="flex mt-3 justify-between text-[14px] font-manrope font-medium">
        <span>Total Amount</span>
        <span>${grandTotal.toFixed(2)}</span>
      </div>

      <div className="mt-3 space-y-3">
        {cart.length > 0 ? (
          cart.map((item: any) => (
            <div key={item.id} className="flex items-center gap-3  p-2 relative">
              <img src={item.image} alt={item.name} className="w-18 h-18 object-contain bg-gray-100 rounded" />
              <X className="absolute w-3 h-3 top-1 left-1 " onClick={()=>{removeFromCart(item.id)}}/>
              <div className="flex-1">
                <p className="text-[12px] font-normal">{item.name}</p>
             <p className="text-xs flex mt-2 items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={8}
                          className={
                            i < (item?.rating || 0)
                              ? "fill-[rgba(244,162,99,1)] text-[rgba(244,162,99,1)]"
                              : "text-orange-500  "
                          }
                        />
                      ))}
                </p>
                <div className="flex items-center mt-2 gap-2 font-poppins">
                  <p className="text-[12px] font-semibold text-[rgba(100,180,150,1)]">${item.price.toFixed(2)}</p>
                  <p className="text-[9px] pt-0.5 font-semibold text-[rgba(122,122,122,1)] line-through">${item.price.toFixed(2)+1}</p>
                  <p className="text-[10px] text-gray-400 mt-0.1">x{item.quantity}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center">Your cart is empty</p>
        )}
      </div>
    </div>
  );
}
