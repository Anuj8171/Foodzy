import React from 'react';
import { Product } from '../store/productStore';
import { ShoppingCart, Star } from 'lucide-react';
import Link from 'next/link'; // ✅ use Next.js Link properly


interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    
  return (
    <Link href={`/product/${product.id}`}>
      <div className="border border-[rgba(236,236,236,1)] rounded-xl p-4 w-48 h-75 overflow-hidden relative hover:shadow-md transition-shadow duration-200">
        
      
        <div className="absolute top-0 left-0 bg-[rgba(103,188,238,1)] rounded-br-xl w-10 h-5 text-white text-[8px] flex items-center justify-center">
          Sale
        </div>

    
        <img src={product.image} alt={product.name} className="w-full h-32 object-contain mt-3" />

    
        <p className="text-[rgba(173,173,173,1)] text-[8px] mt-2">{product.type}</p>

     
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
    </Link>
  );
};

export default ProductCard;
