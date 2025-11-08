import React from 'react'

function ProductBar() {
  return (
    <div className='flex justify-between  '>
      <div>
        <p className='font-quicksand font-bold text-[23px]'>Popular Products</p>
      </div>
      <div className=' flex gap-3 font-quicksand items-center font-semibold text-[10px]'>
        <p className='text-[rgba(59,183,126,1)]'>All</p>
        <p>Milks & Dairies</p>
        <p>Coffes & Teas</p>
        <p>Pet Foods</p>
        <p>Meats</p>
        <p>Vegetables</p>
        <p>Fruits</p>
      </div>
    </div>
  )
}

export default ProductBar
