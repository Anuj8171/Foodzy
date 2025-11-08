import React from "react";
import { Product } from "../store/productStore";
import { ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} className="block">
      <div className="relative w-[215px] bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        
        <div className="absolute top-2 left-2 bg-[rgba(103,188,238,1)] text-white text-[10px] px-2 py-0.5 rounded-md">
          Sale
        </div>

       
        <div className="w-full h-[150px] flex items-center justify-center bg-white p-3">
          <img
            src={product.image}
            alt={product.name}
            className="object-contain max-h-full rounded-md"
          />
        </div>

     
        <div className="px-4 pb-4">
          <p className="text-[10px] text-gray-400 mt-2">{product.type}</p>

          <h3 className="font-semibold text-[13px] text-gray-800 leading-snug mt-1">
            {product.name}
          </h3>

          <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-500">
            <Star size={12} color="#FFD700" fill="#FFD700" />
            <span>({product.rating.toFixed(1)})</span>
          </div>

          <p className="text-[10px] text-[rgba(59,183,126,1)] mt-1">
            <span className="text-gray-400">By </span>
            {product.brand}
          </p>

          <div className="flex items-center justify-between mt-3">
            <p className="font-quicksand font-bold text-[14px] text-[rgba(59,183,126,1)]">
              ${product.price.toFixed(2)}
              <span className="text-gray-400 line-through text-[11px] ml-2">
                ${(product.price + 1).toFixed(2)}
              </span>
            </p>

            <button
              title="Add to cart"
              className="inline-flex items-center gap-1 bg-[rgba(245,62,50,1)] text-white text-[10px] px-3 py-1.5 rounded-md hover:bg-[rgba(230,50,40,1)] transition"
            >
              <ShoppingCart size={12} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
