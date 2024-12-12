import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import PresaleCard from './PresaleCard'
import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const imageDesktopRef = useRef(null);
  const imageMobRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      imageDesktopRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 3,
        ease: "power2.out",
      }
    );

    gsap.fromTo(
      imageMobRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        duration: 3,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <section className='hero relative'>
      <img 
        src="/img/Noise.webp" 
        alt="" 
        className='absolute top-0 left-0 w-full h-full object-cover'  
      />
      <div className='relative inner-wrapper hero-has-shades overflow-hidden'>
        <img 
          src="/img/hero/cyber-punk-city-1.webp" 
          alt="" 
          className='absolute top-0 left-0 w-full h-full object-cover z-[-1]'
        />
        <div className='container pt-20 pb-6 lg:pt-36 lg:pb-[4.5rem]'>
          <div className='flex flex-col lg:flex-row gap-4 items-center justify-center'>
            <div className='w-full lg:w-7/12'>
              <img 
                ref={imageDesktopRef}
                src="/img/hero/Meme_Coin_Robocat_characters.webp" 
                alt="Robocat characters" 
                className='absolute hidden lg:block lg:w-[75%] lg:max-w-[100%] lg:top-[3rem] lg:-left-[5rem] z-[1]'
              />
              {/* <h1 className='yp-heading text-[4rem] md:text-[4.5rem] relative lg:absolute lg:bottom-10 lg:left-28 z-[3]'>One cat to protect <br /> and connect them all</h1> */}

              <AnimatedTitle 
                title="One cat to protect <br /> and connect them all"
                containerClass="yp-heading text-[4rem] md:text-[4.5rem] relative lg:absolute lg:bottom-10 lg:left-28 z-[3]"
              />

              <img 
                ref={imageMobRef}
                src="/img/hero/Meme_Coin_Robocat_characters.webp" 
                alt="Robocat characters" 
                className='relative w-[150%] max-w-[150%] -left-[5rem] sm:w-[100%] sm:left-auto bottom-8 sm:-bottom-8 sm:bottom-0 lg:bottom-0 sm:max-w-[120%] lg:hidden z-[1]'
              />
            </div>
            <div className='relative w-[100vw] lg:w-5/12  lg:mt-0'>
              <PresaleCard 
                classContainer='hidden lg:block'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='relative -mt-24 block lg:hidden'>
        <PresaleCard />
      </div>
    </section>
  )
}

export default Hero