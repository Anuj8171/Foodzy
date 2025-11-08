"use client"

import { ChevronDown, Heart, Phone, ShoppingCart, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation";

import { useCartStore } from "../store/cartStore";

export default function NavBar() {
 const router = useRouter();
  const cart = useCartStore((state) => state.cart);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleCartClick = () => {
    if (cartCount === 0) {
      alert("Add items to cart first");
      return;
    }
    router.push("/checkout");
  };


  return (
    <div className="w-full h-[142px] bg-white mb-[-10] ">
      
     
      <div className="h-[55px] w-full flex items-center justify-between px-55 max-w-[1920px] mx-auto border-b border-[#E9E9E9] shadow-[0px_4px_8px_rgba(51,51,51,0.15)]">
        
        
        <div className="flex items-center gap-6 ">
          <svg width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x=".5" y=".5" width="34" height="34" rx="4.5" stroke="#E9E9E9"/>
            <path d="M6.25 10.17h16.5V12H6.25v-1.83ZM6.25 16.58h11v1.83h-11v-1.83ZM6.25 23h16.5v1.83H6.25V23Z" fill="#2B2B2D"/>
          </svg>
            </div>
         
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[13px] font-medium font-poppins">Home</Link>
            <span className="text-[13px] font-medium font-poppins inline-flex items-center gap-1">Category <ChevronDown className="w-4 h-4" /></span>
            <span className="text-[13px] font-medium font-poppins inline-flex items-center gap-1">Products <ChevronDown className="w-4 h-4" /></span>
            <span className="text-[13px] font-medium font-poppins inline-flex items-center gap-1">Pages <ChevronDown className="w-4 h-4" /></span>
            <span className="text-[13px] font-medium font-poppins inline-flex items-center gap-1">Blog <ChevronDown className="w-4 h-4" /></span>
            <span className="text-[13px] font-medium font-poppins inline-flex items-center gap-1">Element <ChevronDown className="w-4 h-4" /></span>
          </div>
       

        
        <div className="flex items-center gap-2 text-[13px] font-segoe  ">
          <Phone size={14} />
          +123 ( 456 ) ( 7890 )
        </div>
      </div>

 
      <div className="h-18 w-full max-w-[1920px] mx-auto flex items-center justify-between px-50  border-b-2 border-gray-100">
      
        <div className="flex items-center">
  <img src="logo2.svg" alt="Logo" className="w-[49px] h-[49px] m-0 p-0" />

  <div className="flex flex-col justify-center leading-tight ml-[-5]">
    <h2 className="font-inter font-black text-[16px] tracking-[0.48px]">
      Foodzy
    </h2>
    <p className="font-inter text-[9px] font-medium text-gray-700">
      A Treasure of Tastes
    </p>
  </div>
</div>


        
        <div className="flex items-stretch w-[440px] h-8 bg-white border border-[rgba(100,180,150,1)] rounded-sm overflow-hidden">
          
                <input
                  type="search"
                  placeholder="Search for items..."
                  className="flex-1 px-4 text-xs text-gray-700 placeholder-gray-400 outline-none"
                />

                
                <select
                  className="text-xs pl-1 text-gray-700 border-l-2 border-[rgba(100,180,150,1)] outline-none bg-transparent"
                  defaultValue="All Categories"
                >
                  <option>All Categories</option>
                  <option>Electronics</option>
                  <option>Fashion</option>
                  <option>Home & Garden</option>
                </select>

              
                <button
                  className="flex items-center justify-center w-10 bg-red-500"
                  aria-label="Search"
                >
                  <svg
                    className="w-3 h-3 text-white" 
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
           </div>


                        
                        <div className="flex items-center gap-6">
                        <span className="text-[13px] font-medium font-poppins inline-flex items-center gap-1">
                            <User size={16} /> Account
                        </span>
                        <span className="text-[13px] font-medium font-poppins inline-flex items-center gap-1">
                            <Heart size={16} /> Wishlist
                        </span>
                        <span
                            onClick={handleCartClick}
                            className="relative text-[13px] font-medium font-poppins inline-flex items-center gap-1 cursor-pointer"
                          >
                            <ShoppingCart size={16} /> Cart

                            {cartCount > 0 && (
                              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-[17px] h-[17px] flex items-center justify-center rounded-full">
                                {cartCount}
                              </span>
                            )}
                        </span>
                        </div>
                    </div>
    </div>
  )
}
