"use client";
import React from 'react';
import { Product } from '../store/productStore';
import { ArrowLeft, ArrowRight, ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link'; 


interface ProductCardProps {
  product: Product;
}

const BestSellsCard: React.FC<ProductCardProps> = ({ product }) => {
    
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border border-[rgba(236,236,236,1)] rounded-xl p-4 w-53 h-85 overflow-hidden relative hover:shadow-md transition-shadow duration-200">
        
      
        <div className="absolute top-0 left-0 bg-[rgba(103,188,238,1)] rounded-br-xl w-10 h-5 text-white text-[8px] flex items-center justify-center">
          Sale
        </div>

        {product.name ==="All Natural Italian-Style Chicken Meatballs" ?
           <div className='absolute top-28 bg-[rgba(242,243,244,1)] w-6 h-6 rounded-full flex justify-start pl-0.5 items-center'>
            <ArrowLeft  className='w-3  '  color='rgba(126,126,126,1)'/>
        </div>:null
        }
         {product.name ==="Blue Diamond Almonds Lightly Salted" ?
           <div className='absolute top-28 right-4 bg-[rgba(242,243,244,1)] w-6 h-6 rounded-full flex justify-start pl-0.5 items-center'>
            <ArrowRight  className='w-3  '  color='rgba(126,126,126,1)'/>
        </div>:null
        }

        <img src={product.image} alt={product.name} className="w-full h-32 object-contain mt-3" />

    
        <p className="text-[rgba(173,173,173,1)] text-[8px] mt-2">{product.type}</p>

     
        <h3 className="font-medium text-[11px] font-poppins mt-1 leading-tight">
          {product.name}
        </h3>

        <p className="text-[9px] text-[rgba(182,182,182,1)] mt-1 font-lato flex items-center gap-1">
          <Star size={9} color="#FFD700" fill="#FFD700" />
          ({product.rating.toFixed(1)})
        </p>

      

        
        <div className="flex flex-col  mt-3">
          <p className="font-quicksand font-bold text-xs text-[rgba(59,183,126,1)]">
            ${product.price.toFixed(2)}
            <span className="text-[rgba(173,173,173,1)] line-through text-[9px] ml-2">
              ${(product.price + 1).toFixed(2)}
            </span>
          </p>

          <button
           
            title="Add to cart"
            className="inline-flex w-40  items-center justify-center gap-1 border-0 text-white bg-[rgba(245,62,50,1)] text-[9px] p-2 mx-auto mt-9 rounded-xs hover:bg-[rgba(230,50,40,1)] transition"
          >
           
            <span className="text-[10px]">Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  );
};

export default BestSellsCard;
