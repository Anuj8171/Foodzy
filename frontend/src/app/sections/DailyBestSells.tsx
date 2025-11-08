'use client'
import { ArrowRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { Product, useProductStore } from '../store/productStore'
import BestSellsCard from '../component/BestSellsCard'

function DailyBestSells() {
  const { products, fetchProducts, loading, error } = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return (
    <div className="max-w-[1200px] mx-auto mt-10 px-6">

      <h1 className="font-quicksand font-bold text-[23px] text-gray-800">
        Daily Best Sells
      </h1>

      <div className="mt-8 flex gap-6 items-start">
       
        <div className="relative w-60 h-85 shrink-0">
          <img
            src="BestSell.png"
            alt="Best Sell Banner"
            className="w-full h-full object-cover rounded-xl"
          />

          <div className="absolute top-10 left-6 text-white font-quicksand font-bold text-lg leading-snug">
            <p>Bring nature</p>
            <p>into your</p>
            <p>home</p>

            <button
              title="Shop Now"
              className="mt-6 bg-[rgba(245,62,50,1)] text-white text-[10px] font-medium font-quicksand border-0 inline-flex items-center justify-center gap-1 px-3 py-1 rounded-md hover:bg-[rgba(230,50,40,1)] transition"
            >
              Shop Now <ArrowRight size={10} />
            </button>
          </div>
        </div>

        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5 w-full">
          {loading && <p className="text-sm text-gray-500">Loading...</p>}
          {error && <p className="text-sm text-red-500">Error: {error}</p>}

          {products.map((p: Product) =>
            p.bestSell === true ? (
              <BestSellsCard key={p.id} product={p} />
            ) : null
          )}
        </div>
      </div>
    </div>
  )
}

export default DailyBestSells
