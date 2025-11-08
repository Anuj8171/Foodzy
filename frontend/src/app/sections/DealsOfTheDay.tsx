'use client'
import React, { useEffect } from 'react'
import { Product, useProductStore } from '../store/productStore'
import { ShoppingCart, Star } from 'lucide-react'
import Link from 'next/link'

function DealsOfTheDay() {
  const { products, fetchProducts } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const dealProducts = products.filter((p) => p.dayDeal === true)

  return (
    <div className="max-w-[1200px] mx-auto mt-10 mb-15 px-6">
      <h1 className="font-quicksand font-bold text-[23px] text-gray-800 mb-7">
        Deals Of The Day
      </h1>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-20">
        {dealProducts.map((product: Product, index) => (
          <Link key={product.id} href={`/product/${product.id}`}>
            <div className="relative group cursor-pointer">
              
             
              <div className="w-full h-[245px] overflow-hidden rounded-xl">
                <img
                  src={`/deal/i${index + 1}.png`}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="absolute left-1/2 bottom-[-70] transform -translate-x-1/2 bg-white rounded-xl shadow-md w-[85%] h-35 p-4 transition-all duration-300 group-hover:-translate-y-1">
                <h3 className="font-medium text-[13px] font-poppins leading-snug text-gray-800">
                  {product.name}
                </h3>

                <p className="text-[10px] text-gray-500 mt-1 flex items-center gap-1">
                  <Star size={11} color="#FFD700" fill="#FFD700" />
                  ({product.rating.toFixed(1)})
                </p>

                <p className="text-[10px] text-[rgba(59,183,126,1)] mt-1">
                  <span className="text-gray-400">By </span>
                  {product.brand}
                </p>

                <div className="flex justify-between items-center mt-3">
                  <p className="font-quicksand font-bold text-[13px] text-[rgba(59,183,126,1)]">
                    ${product.price.toFixed(2)}
                    <span className="text-gray-400 line-through text-[10px] ml-1">
                      ${(product.price + 1).toFixed(2)}
                    </span>
                  </p>

                  <button
                    title="Add to cart"
                    className="inline-flex items-center gap-1 border-0 text-white bg-[rgba(245,62,50,1)] text-[9px] px-3.5 py-1.5 rounded-xs hover:bg-[rgba(230,50,40,1)] transition"
                  >
                    <ShoppingCart size={11} />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default DealsOfTheDay
