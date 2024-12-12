import React from 'react'

const CoinCards = ({ imgSrc, altText, label }) => (
  <div className='row-span-2'>
    <div className='bg-white/5 border-white/10 border-[1px] py-[10px] px-5'>
      <div className='flex items-center justify-start gap-1'>
        <img 
          src={imgSrc} 
          alt={altText} 
        />
        <p className='text-[0.87rem] text-white/80 uppercase relative top-[1px]'>
          {label}
        </p>
      </div>
    </div>
  </div>
);

export default CoinCards