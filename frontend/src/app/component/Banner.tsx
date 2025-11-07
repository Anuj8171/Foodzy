import React from 'react'

const Banner:React.FC= ()=> {
  return (
    <div className='flex pt-10 gap-5 justify-center'>
      <div className="relative w-80 h-45">
        <img
            src="banner-1.png"
            alt=""
            className="w-full h-full object-cover rounded-md"
        />

        <div className="absolute left-7 top-10 font-bold text-sm font-quicksand">
            <p>Everyday Fresh &</p>
            <p>Clean with Our</p>
            <p>Products</p>

             <button
            title="Shop Now"
            className="mt-5 w-22 h-7 bg-[rgba(245,62,50,1)] text-white text-[10px] font-medium font-quicksand border-0 rounded-sm pr-4"
            >
            Shop Now
            </button>
        </div>
        </div>
      <div className='relative  w-80 h-45'>
        <img src="banner-2.png" alt="" className='w-full h-full object-cover rounded-md'/>
          <div className='absolute left-7 top-10 font-bold text-sm font-quicksand'>
             <p>The best Organic</p>
            <p>Products Online</p>
            
          <button
            title="Shop Now"
            className="mt-8 w-22 h-7 bg-[rgba(245,62,50,1)] text-white text-[10px] font-medium font-quicksand border-0 rounded-sm pr-4"
            >
            Shop Now
            </button>
          </div>
          
      </div>
      <div  className='relative  w-80 h-45'>
        <img src="banner-3.png" alt="" className='w-full h-full object-cover rounded-md' />
         <div className='absolute left-7 top-10 font-bold text-sm font-quicksand'>
           <p>Make your Breakfast</p>
            <p>Healthy and Easy</p>
           <button
            title="Shop Now"
            className="mt-8 w-22 h-7 bg-[rgba(245,62,50,1)] text-white text-[10px] font-medium font-quicksand border-0 rounded-sm pr-4"
            >
            Shop Now
            </button>
   
         </div>
      </div>
    </div>
  )
}

export default Banner
