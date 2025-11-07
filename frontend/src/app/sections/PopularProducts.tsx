"use client";
import React, { useEffect } from 'react'
import ProductBar from '../component/ProductBar'
import { useProductStore,Product } from '../store/productStore';
import ProductCard from '../component/ProductCard';

// const ProductCardTyped = ProductCard as React.ComponentType<{ product: Product }>;
interface Props {
  product: Product;
}
function PopularProducts() {
    const {products,fetchProducts,loading,error}=useProductStore();
    useEffect(()=>{
         fetchProducts();
    },[fetchProducts])
  return (
    <div className='px-25 mt-10'>
         <ProductBar/>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    <div className='grid grid-cols-5 gap-3 mt-10'>
        {products.map((p:Product) =>
        p.bestSell === false && p.dayDeal === false ? (
            <ProductCard key={p.id} product={p}/>
        ) : null
        )}
    </div>

    </div>
  )
}

export default PopularProducts
