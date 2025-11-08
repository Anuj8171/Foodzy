import React from 'react'

const Banner: React.FC = () => {
  return (
    <div className="flex pt-10 w-full gap-5 justify-center">
      {/* Banner 1 */}
      <div className="relative w-[380px] h-[225px]">
        <img
          src="banner-1.png"
          alt=""
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute left-7 top-14 font-bold text-lg font-quicksand">
          <p>Everyday Fresh &</p>
          <p>Clean with Our</p>
          <p>Products</p>

          <button
            title="Shop Now"
            className="mt-5 px-4 py-1 bg-[rgba(245,62,50,1)] text-white text-[10px] font-medium font-quicksand rounded-sm"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Banner 2 */}
      <div className="relative w-[380px] h-[225px]">
        <img
          src="banner-2.png"
          alt=""
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute left-7 top-14 font-bold text-lg font-quicksand">
          <p>The best Organic</p>
          <p>Products Online</p>
          <button
            title="Shop Now"
            className="mt-8 px-4 py-1 bg-[rgba(245,62,50,1)] text-white text-[10px] font-medium font-quicksand rounded-sm"
          >
            Shop Now
          </button>
        </div>
      </div>

      {/* Banner 3 */}
      <div className="relative w-[380px] h-[225px]">
        <img
          src="banner-3.png"
          alt=""
          className="w-full h-full rounded-md"
        />
        <div className="absolute left-7 top-14 font-bold text-lg font-quicksand">
          <p>Make your Breakfast</p>
          <p>Healthy and Easy</p>
          <button
            title="Shop Now"
            className="mt-8 px-4 py-1 bg-[rgba(245,62,50,1)] text-white text-[10px] font-medium font-quicksand rounded-sm"
          >
            Shop Now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Banner
