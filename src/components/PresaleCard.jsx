import React, { useRef, useState, useEffect } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

import { MdInfoOutline } from "react-icons/md";
import CoinCards from './CoinCards'

const cardData = [
  { imgSrc: '/img/hero/solana-sol-logo.svg', altText: 'solana', label: 'SOL' },
  { imgSrc: '/img/hero/ion_card.svg', altText: 'card', label: 'CARD' },
  { imgSrc: '/img/hero/tether-usdt-logo.svg', altText: 'usdt', label: 'USDT' },
  { imgSrc: '/img/hero/usd-coin-usdc-logo.svg', altText: 'usdc', label: 'USDC' },
];

const PresaleCardTilt = ({ children, className = '' }) => {
  const [transformStyle, setTransformStyle] = useState('')
  const itemRef = useRef();

  const handleMouseMove = (e) => {
    if(!itemRef.current) return;

    const { left, top, width, height } = itemRef.current.getBoundingClientRect();

    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 10;
    const tiltY = (relativeX - 0.5) * -10;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.95, 0.95, 0.95)`;

    setTransformStyle(newTransform);
  }

  const handleMouseLeave = (e) => {
    setTransformStyle('');
  }

  return (
    <div 
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
      >
      {children}
    </div>
  )
}

const PresaleCard = ({ classContainer }) => {
  const presaleCardRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      presaleCardRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 3,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div className={`bg-blue-100 pb-16 lg:bg-transparent lg:pb-0 overflow-hidden lg:overflow-visible z-10 ${classContainer}`}>
      <PresaleCardTilt className='robocat-tilt_1 relative pt-5 pb-14 px-4 mx-4 lg:px-12 lg:mx-14  text-center'>
        <div ref={presaleCardRef}>
          <h4 className='h4-heading'>$ROBOCAT presale <br />Phase 1</h4>
          <p className='yp-heading text-[3.5rem] leading-[100%]'>$2,000,000</p>
          <p className='text-[0.9rem] text-white/70 mt-4'>Raised</p>

          <div className='flex items-center justify-center text-white gap-4 mt-4'>
            <p className=''>Your purchased $ROBOCAT = 0</p>
            <div className="tooltip">
              <MdInfoOutline style={{ width: '14px', height: '14px', position: 'relative', top: '-1px' }} />
              <span className="tooltiptext">Tooltip information</span>
            </div>
          </div>

          <p className='centralized-text flex items-center text-center relative text-[0.75rem] text-white my-4'>1 $ROBOCAT = $0.12345</p>

          <div className='grid grid-cols-2 grid-rows-2 gap-3 lg:max-w-[90%] mx-auto'>
            {cardData.map((card, index) => (
              <CoinCards key={index} imgSrc={card.imgSrc} altText={card.altText} label={card.label} />
            ))}
          </div>

          <div className='mt-10 grid grid-cols-2 grid-rows-2 gap-3 lg:max-w-[90%] mx-auto'>
            <div className='row-span-2'>
              <div className='flex items-center justify-between mb-2'>
                <p className='text-[0.87rem] text-white/50'>Pay with SOL</p>
                <p className='text-[0.87rem] text-white/50'>Max</p>
              </div>

              <div className='bg-white/5 border-white/10 border-[1px] py-[10px] px-5'>
                <div className='flex items-center justify-between gap-1'>
                  <p className=' text-white uppercase relative top-[1px]'>0</p>
                  <img src="/img/hero/solana-sol-logo.svg" alt="solana" />
                </div>
              </div>
            </div>

            <div className='row-span-2'>
              <p className='text-[0.87rem] text-white/50 mb-2'>Receive ROBOCAT</p>
              <div className='bg-white/5 border-white/10 border-[1px] py-[10px] px-5'>
                <div className='flex items-center justify-between gap-1'>
                  <p className=' text-white uppercase relative top-[1px]'>0</p>
                  <img src="/img/hero/Robocat_Coin_NoCircle.svg" alt="robocat-icon" />
                </div>
              </div>
            </div>
          </div>

          <button className='absolute -bottom-5 left-[15%] z-[2] w-[69.5%] cursor-pointer overflow-hidden bg-yellowPink-linear hover:bg-yellowPink-linear-rev transition-all ease-in-out duration-1000 px-7 py-3 text-white uppercase font-mont-bold text-[0.87rem]'>Connect Wallet</button>
        </div>
      </PresaleCardTilt>

      <div className='robocat-tilt_2 relative w-[94%] h-[90%] lg:w-[418px] lg:h-[564px]' />
    </div>
  )
}

export default PresaleCard