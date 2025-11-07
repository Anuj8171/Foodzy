'use client'
import React, { useEffect } from 'react'
import { Product, useProductStore } from '../store/productStore';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link';

function DealsOfTheDay() {
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  const dealProducts = products.filter(p => p.dayDeal === true);

  return (
    <div className="px-25 mt-10 mb-30">
      <h1 className="font-quicksand font-bold text-[23px]">Deals Of The Day</h1>

      <div className="grid grid-cols-4 gap-4 mt-6">
        {dealProducts.map((product: Product, index) => (
            <Link key={product.id} href={`/product/${product.id}`}>
            
            <div key={index} className="relative ">

            {/* PRODUCT IMAGE */}
            <img
              src={`/deal/i${index + 1}.png`}
              alt={product.name}
              className="w-140 h-50 rounded-md"
            />

            {/* OVERLAY CARD FIXED */}
            <div className="absolute bottom-[-60] left-3 w-53 h-33 shadow-sm bg-white p-4 hover:shadow-md transition-shadow duration-200  rounded-md border-0">
              <h3 className="font-medium text-[11px] font-poppins mt-1 leading-tight">
                {product.name}
              </h3>

              <p className="text-[9px] text-[rgba(182,182,182,1)] mt-1 font-lato flex items-center gap-1">
                <Star size={9} color="#FFD700" fill="#FFD700" />
                ({product.rating.toFixed(1)})
              </p>

              <p className="text-[9px] text-[rgba(59,183,126,1)] mt-1">
                <span className="text-[rgba(182,182,182,1)]">By </span>
                {product.brand}
              </p>

              <div className="flex justify-between items-center mt-3">
                <p className="font-quicksand font-bold text-xs text-[rgba(59,183,126,1)]">
                  ${product.price.toFixed(2)}
                  <span className="text-[rgba(173,173,173,1)] line-through text-[9px] ml-2">
                    ${(product.price + 1).toFixed(2)}
                  </span>
                </p>

                <button
                  title="Add to cart"
                  className="inline-flex items-center gap-1 border-0 text-white bg-[rgba(245,62,50,1)] text-[9px] px-2 py-1 rounded-xs hover:bg-[rgba(230,50,40,1)] transition"
                >
                  <ShoppingCart size={9} />
                  <span className="text-[8px]">Add</span>
                </button>
              </div>
            </div>

          </div>
            
            </Link>
         
        ))}
      </div>

    </div>
  );
}

export default DealsOfTheDay;
