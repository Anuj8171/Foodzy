
import React from 'react'

function IconCard() {
     

  const icons = Array.from({ length: 5 })

  return (
    <div className='grid grid-cols-5 px-25 gap-1'>
      {icons.map((_, i) => (
      <img key={i} src={`/icon/f${i+1}.png`} alt="" />
      ))}
      
    </div>
  )
}

export default IconCard
