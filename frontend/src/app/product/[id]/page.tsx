"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useProductStore } from "@/app/store/productStore";

import Footer from "@/app/component/Footer";
import { useCartStore } from "@/app/store/cartStore";
import { Star } from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const { product, getProductById } = useProductStore();
  const { addToCart } = useCartStore(); 

  const [count, setCount] = useState(1);

  useEffect(() => {
    getProductById(String(id));
  }, [id, getProductById]);

  const categories = [
    { name: "Juice & Drinks", count: 20 },
    { name: "Dairy & Milk", count: 54 },
    { name: "Snack & Spice", count: 64 },
  ];

  const tags = ["Vegetables", "Juice", "Food", "Dry Fruits", "Vegetables", "Juice"];

  // Add to cart handler (uses local count)
  const handleAddToCart = () => {
    if (!product) return;
    // add product multiple times based on count
    for (let i = 0; i < count; i++) {
      addToCart(product);
    }
  };

  return (
    <>
      <div className="bg-[rgba(245,62,50,1)] flex justify-between w-full px-8 py-4">
        <p className="font-monrope text-white text-[13px] font-medium">Product</p>
        <p className="font-poppins text-white text-[10px] font-medium">Home - Product</p>
      </div>

      <div className="flex flex-col scrollbar-hide items-center box-sizing py-12 px-4 w-full ">
        <div className="flex gap-6 max-w-[1200px] w-full px-30">
         
          <div className="bg-[rgba(247,247,248,1)] p-4 font-poppins border border-[rgba(233,233,233,1)] w-52 h-100">
            <p className="font-medium text-[11px] mb-3">Product Category</p>
            <hr className="border-[#d4d4d4] w-45 mx-auto" />

            <div className="mt-4 space-y-2">
              {categories.map((cat, i) => (
                <label
                  key={i}
                  className="flex items-center justify-between text-[10px] text-[rgba(122,122,122,1)]"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-3.5 h-3.5 appearance-none bg-white border border-[rgba(221,221,221,1)] rounded checked:bg-red-500 checked:border-red-500"
                    />
                    <span>{cat.name}</span>
                  </div>
                  <span className="text-gray-400 text-[10px]">[{cat.count}]</span>
                </label>
              ))}
            </div>

            <p className="font-medium text-[11px] mt-5 mb-1">Filter By Price</p>
            <hr className="border-[#d4d4d4] w-45 mx-auto" />

            <div className="mt-1">
              <input
                type="range"
                min="20"
                max="250"
                className="w-full h-0.5 border-none accent-red-500 bg-[rgba(206,206,206,1)] rounded"
              />
              <p className="text-[11px] font-semibold text-[rgba(122,122,122,1)] mt-2">
                <span className="text-black font-semibold mr-1">Price :</span> $20 - $250
              </p>
            </div>

            <button className="bg-red-500 text-white px-5 py-1.5 rounded-sm mt-3 text-[11px] hover:bg-red-600">
              Filter
            </button>

       
            <p className="font-medium text-[12px] mt-3 mb-2">Products Tags</p>
            <hr className="border-[#d4d4d4] w-45 mx-auto" />

            <div className="mt-3 flex flex-wrap gap-2">
              {tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 text-[10px] text-[rgba(122,122,122,1)] bg-white border border-[rgba(233,233,233,1)] rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8 flex-1">
            <div className="flex gap-4 ">
             
              <div className="bg-[rgba(233,233,233,1)] h-96 rounded-sm w-80 flex items-center justify-center">
                <img
                  src={product?.image}
                  alt={product?.name}
                  className="w-auto h-auto max-w-full max-h-full object-contain"
                />
              </div>

        
              <div className="border-0 border-[rgba(233,233,233,1)] flex-1 font-poppins flex flex-col justify-between">
       
                <div>
                  <h1 className="text-[16px] font-segoe mb-1 leading-tight">
                    {product?.name || "Seeds Of Change Organic Quinoa, Brown"}
                  </h1>

                  <p className="text-[11px] text-gray-500 mb-2 leading-snug ">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. In iure<br/> minus error
                    doloribus eos expedita natus.
                  </p>

                  <hr className="border-[#d4d4d4] w-90 my-3" />

                
                  <div className="flex items-center gap-2 mb-3 mt-2">
                    <div className="flex text-orange-500 gap-1 text-sm">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className={
                            i < (product?.rating || 0)
                              ? "fill-[rgba(244,162,99,1)] text-[rgba(244,162,99,1)]"
                              : "text-orange-500"
                          }
                        />
                      ))}
                    </div>
                    <span className="text-[11px] text-gray-500">( 75 Review )</span>
                  </div>

                 
                  <div className="space-y-2 text-[13px] font-segoe">
                    <div className="flex">
                      <span className="w-24 text-gray-600 font-medium">Brand</span>
                      <span className="mr-2">:</span>
                      <span className="text-gray-500">{product?.brand || "ESTA BETTERU CO"}</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-gray-600 font-medium">Flavour</span>
                      <span className="mr-2">:</span>
                      <span className="text-gray-500">Super Saver Pack</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-gray-600 font-medium">Diet Type</span>
                      <span className="mr-2">:</span>
                      <span className="text-gray-500">{product?.type || "Vegetarian"}</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-gray-600 font-medium">Weight</span>
                      <span className="mr-2">:</span>
                      <span className="text-gray-500">200 Grams</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-gray-600 font-medium">Speciality</span>
                      <span className="mr-2">:</span>
                      <span className="text-gray-500">Gluten Free, Sugar Free</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-gray-600 font-medium">Info</span>
                      <span className="mr-2">:</span>
                      <span className="text-gray-500">Egg Free, Allergen-Free</span>
                    </div>
                    <div className="flex">
                      <span className="w-24 text-gray-600 font-medium">Items</span>
                      <span className="mr-2">:</span>
                      <span className="text-gray-500">1</span>
                    </div>
                  </div>
                </div>

                <div>
                
                  <div className="mb-3">
                    <span className="text-xl font-semibold text-red-500">
                      ${product?.price || "120.25"}
                    </span>
                    <span className="text-sm text-gray-400 line-through ml-2">
                      {(product?.price || 120.25) + 1}
                    </span>
                  </div>

          
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                   
                      <div className="flex justify-center items-center w-8 h-8 border border-[rgba(233,233,233,1)] rounded-sm text-xs">
                        {count}
                      </div>

                     
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => setCount(count + 1)}
                          className="w-3 h-3 border border-[rgba(233,233,233,1)] rounded-sm flex justify-center items-center text-[10px] hover:bg-gray-100"
                        >
                          +
                        </button>
                        <button
                          onClick={() => setCount(count > 1 ? count - 1 : 1)}
                          className="w-3 h-3 border border-[rgba(233,233,233,1)] rounded-sm flex justify-center items-center text-[10px] hover:bg-gray-100"
                        >
                          −
                        </button>
                      </div>
                    </div>

                    
                    <button
                      onClick={handleAddToCart}
                      className="bg-red-500 text-white px-4 py-2 rounded text-[10px] hover:bg-red-600"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>

         
            <div>
              <img src="/description.png" alt="" className="w-[700px] " />
            </div>
          </div>
        </div>

      
        <div className="max-w-[1200px] w-[1000] mt-20">
          <img src="/Popular.png" alt="" className="w-full " />
        </div>
      </div>

    
      <Footer />
    </>
  );
}