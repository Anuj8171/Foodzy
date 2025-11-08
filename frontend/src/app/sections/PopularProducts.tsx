"use client";
import React, { useEffect } from 'react';
import ProductBar from '../component/ProductBar';
import { useProductStore, Product } from '../store/productStore';
import ProductCard from '../component/ProductCard';

function PopularProducts() {
  const { products, fetchProducts, loading, error } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="max-w-[1160px] mx-auto mt-12 ">
     
      <ProductBar />

     
      {loading && <p className="mt-6 text-sm text-gray-500">Loading...</p>}
      {error && <p className="mt-6 text-sm text-red-500">Error: {error}</p>}

      
      <div className="grid grid-cols-5 gap-6 mt-8">
        {products.map((p: Product) =>
          !p.bestSell && !p.dayDeal ? (
            <ProductCard key={p.id} product={p} />
          ) : null
        )}
      </div>
    </div>
  );
}

export default PopularProducts;
