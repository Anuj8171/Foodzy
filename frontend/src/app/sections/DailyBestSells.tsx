'use client'
import { ArrowRight } from 'lucide-react'
import React, { useEffect } from 'react'
import { Product, useProductStore } from '../store/productStore';
import ProductCard from '../component/ProductCard';
import BestSellsCard from '../component/BestSellsCard';

function DailyBestSells() {
    const {products,fetchProducts,loading,error}=useProductStore();
        useEffect(()=>{
             fetchProducts();
        },[fetchProducts])
  return (
    <div className='px-25 mt-10'>
      <h1 className='font-quicksand font-bold text-[23px]'>Daily Best Sells</h1>
      <div className='mt-10 flex gap-4  '>
        <div className='relative'>
            <img src="BestSell.png" alt=""  className='rounded-xl w-55 h-80'/>
            <div className='flex flex-col absolute top-10 font-quicksand font-bold text-xl '>
                <p className='text-white px-10'>
                    Bring nature
                    into your
                    home
                </p>
                <div className='pl-10 mt-3 '>
                    <button
                    title="Shop Now"
                    className="mt-8 w-18 h-6 bg-[rgba(245,62,50,1)] text-white text-[8px] font-medium font-quicksand border-0 inline-flex rounded-sm text-center gap-1 items-center justify-center"
                    >
                    Shop Now <ArrowRight size={8} />
                    </button>
                </div>
            </div>
        </div>
          <div className='grid grid-cols-4 gap-6 '>
            {products.map((p:Product) =>
            p.bestSell === true ? (
                <BestSellsCard key={p.id} product={p}/>
            ) : null
            )}
       </div>
      </div>
      
    </div>
  )
}

export default DailyBestSells
