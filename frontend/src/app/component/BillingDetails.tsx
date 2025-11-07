
import React from "react";
import { BillingDetailsProps } from "../types/checkout";

export default function BillingDetails({ formData, handleChange, loading, handlePlaceOrder }: BillingDetailsProps) {
  const fields = [
    { name: "firstName", label: "First Name*" },
    { name: "lastName", label: "Last Name*" },
    { name: "address", label: "Address" },
    { name: "city", label: "City*" },
    { name: "postCode", label: "Post Code" },
    { name: "country", label: "Country*" },
    { name: "regionState", label: "Region State" },
  ];

  return (
    <>  
    <div className="bg-white border border-gray-200 rounded-md p-6">
      <h2 className="font-montserrat font-semibold mb-4">Billing Details</h2>
      <p className="text-[12px] font-segoe mb-4">Checkout Options</p>

      <div className="grid grid-cols-2 gap-4 font-segoe text-xs mb-3">
        {fields.map((f) => (
          <div key={f.name} className={["address"].includes(f.name) ? "col-span-2" : ""}>
            <label className="block mb-1">{f.label}</label>
            <input
              type="text"
              name={f.name}
              value={formData[f.name as keyof typeof formData]}
              onChange={handleChange}
              placeholder={`${f.label}`}
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-[#F53E32]"
            />
          </div>
        ))}
      </div>

     
    </div>
     <div className="absolute right-0 bottom-[-20]">
        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="bg-red-500 text-white px-4 py-2 text-xs rounded hover:bg-red-600 disabled:opacity-50 "
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </>
  );
}
