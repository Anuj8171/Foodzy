
import React from 'react'

function Footer() {
  return (
    <div className='bg-[#f7f7f7] h-80 mt-10 p-30 flex relative justify-center items-center '>
      <div className='w-220 pt-15'>
        <img src="/footer.png" alt="" />
      </div>
      <div className='absolute w-10 top-35 left-[-2]'><img src="/icon1.png" alt="" /></div>
      <div className='absolute w-10 right-5 top-[-15]'><img src="/icon2.png" alt="" /></div>
    </div>
  )
}

export default Footer
