import { Send } from 'lucide-react'
import React from 'react'

const Static: React.FC  =()=> {
  return (
    <div className='bg-[rgba(240,240,240,1)] w-full h-150 flex items-center pl-20 relative overflow-hidden scrollbar-hide'>

        <img src="b1.svg" alt="" className='h-90 absolute right-[-45] bottom-0 object-contain '/>
        <img src="img2.svg" alt="" className='h-15 absolute left-120 top-0'/>
        <img src="ing3.png" alt="" className='h-15 absolute left-140 bottom-10'/>
        <img src="img4.png" alt="" className='h-7 absolute left-0 top-0'/>
        <img src="img5.png" alt="" className=' h-15 absolute left-0 bottom-0'/>
      <div className='flex flex-col gap-3'>
        <p className='font-bold '><span className='text-red-500 underline'>100%</span> Organic Vegetable </p>
        <div>
        <p className='font-extrabold text-4xl font-arial'>The best way to</p>
        <p className='font-extrabold text-4xl font-arial'>stuff your wallet.</p>
        </div>
        <div className='pt-1'>
        <p className='text-[rgba(122,122,122,1)] text-[10px]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet</p>
        <p className='text-[rgba(122,122,122,1)] text-[10px]'>reiciendis beatae consequuntur.</p>
        </div>

        <div className='w-80 h-12 flex justify-between items-center pl-1 mt-5   bg-white border-0 rounded-full'>
            <div className='flex gap-2'>
                <Send size='15' color='rgba(131, 131, 131, 1)'/>
            <p className='text-[rgba(131,131,131,1)] text-xs '>Your emaill address</p>
            </div>
            <button type='button' title='Subscribe' aria-label='Subscribe' className='bg-[rgba(59,183,126,1)] w-30 h-12 font-quicksand text-sm border-0 rounded-full text-white' >Subscribe</button>
        </div>
      </div>
    </div>
  )
}

export default Static
