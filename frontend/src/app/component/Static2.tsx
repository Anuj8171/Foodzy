'use client'
import { Send } from 'lucide-react'
import React from 'react'

function Static2() {
  return (
    <div className='px-25 mb-10 '>
      <div className='relative'>
        <img src="static/bg.png" alt="" className='border-0 rounded-xl' />
        <div className='absolute top-12 left-10'>
            <p className='font-bold text-2xl font-quicksand '>Stay home & get your  daily <br/> needs from our shop</p>
            <p className='text-[rgba(126,126,126,1)] text-[12px] mt-2 font-lato'>Start You'r Daily Shopping with <span className='text-[rgba(59,183,126,1)]'>Nest Mart</span></p>
             <div className='w-68 h-10 flex justify-between items-center pl-2 mt-6  bg-white border-0 rounded-full'>
            <div className='flex gap-2 pl-2'>
                <div className='pt-1'><Send size='10' color='rgba(131, 131, 131, 1)'/></div>
            <p className='text-[rgba(131,131,131,1)] text-[10px] font-lato'>Your emaill address</p>
            </div>
            <button type='button' title='Subscribe' aria-label='Subscribe' className='bg-[rgba(245,62,50,1)] w-25 h-10 font-quicksand text-[10px] border-0 rounded-full mr-4 text-white' >Subscribe</button>
            </div>
        </div>
        <div className='absolute right-7 bottom-0'>
            <img src="static/man.png" className='w-100 h-54' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Static2
