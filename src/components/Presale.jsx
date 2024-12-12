import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);


const Presale = () => {
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const images = imageContainerRef.current.querySelectorAll('img');

    gsap.fromTo(
      images,
      { opacity: 0, y: 50 }, // Start with invisible and slightly translated down
      {
        opacity: 1,
        y: 0, // Animate to fully visible and in-place
        stagger: 0.4, // 0.2s delay between animations
        duration: 1.3, // Animation duration for each image
        ease: 'power2.out',
        scrollTrigger: {
          trigger: imageContainerRef.current, // Trigger when this container is in view
          start: 'top 65%', // Animation starts when the top of the container is 75% from the top of the viewport
        },
      }
    );

    // Flicker animation for distortion lines
    const distortionLines = document.querySelectorAll('.distortion_lines');

    distortionLines.forEach((line) => {
       // Create a flicker timeline for each line
       const flickerAnimation = gsap.timeline({ repeat: -1, paused: true });
       flickerAnimation
         .to(line, { opacity: 1, duration: 0.6, ease: 'power2.inOut', stagger: 0.2 })
         .to(line, { opacity: 0.4, duration: 0.8, ease: 'power2.inOut', stagger: 0.2 })
         .to(line, { opacity: 1, duration: 1.2, ease: 'power2.inOut', stagger: 0.2 })
         .to(line, { opacity: 0.3, duration: 1, ease: 'power2.inOut', stagger: 0.2 });

      // ScrollTrigger to start/stop animation
      ScrollTrigger.create({
        trigger: line,
        start: "top bottom", // Start when line enters viewport
        end: "bottom top", // End when line leaves viewport
        onEnter: () => flickerAnimation.play(),
        onLeave: () => flickerAnimation.pause(),
        onEnterBack: () => flickerAnimation.play(),
        onLeaveBack: () => flickerAnimation.pause(),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id='presale' className='presale relative -mt-8 md:-mt-16 lg:-mt-32 lg:h-[980px] z-[3]'>
      <img 
        src="/img/presale/presale-distortion-lines-top.svg" 
        alt="distortion lines" 
        className='distortion_lines absolute top-0 right-0 lg:-top-20 z-[1] hidden lg:block'      
      />
      <img 
        src="/img/presale/presale-distortion-lines-mob.svg" 
        alt="distortion lines top" 
        className='distortion_lines absolute -top-24 right-0 md:-top-56 z-[4] w-full lg:hidden'
      />
      <img 
        src="/img/presale/presale-distortion-lines-bottom.svg" 
        alt="distortion lines" 
        className='distortion_lines absolute bottom-0 right-0 lg:-bottom-32 z-[4] hidden lg:block'
      />
      <img 
        src="/img/presale/presale-distortion-lines-mob.svg" 
        alt="distortion lines bottom" 
        className='distortion_lines absolute -bottom-32 md:-bottom-64 right-0 z-[12] w-full lg:hidden'
      />
      <img 
        src="/img/presale/presale-purple-bg_v3.webp" 
        alt="presale bg" 
        className='absolute top-0 left-0 w-full h-full object-cover hidden lg:block'  
      />
      <img 
        src="/img/presale/presale-purple-bg-mob.webp" 
        alt="presale bg mob" 
        className='absolute top-0 left-0 w-full h-full object-fill lg:hidden'
      />
      <img 
        src="/img/presale/Noise-presale.webp" 
        alt="noise bg mob"
        className='absolute top-0 left-0 w-full h-full object-cover lg:hidden'  
      />

      <div className="container pt-28 lg:pt-0">
        <div className='flex flex-col-reverse lg:flex-row items-center justify-center gap-52 lg:gap-10 relative' ref={imageContainerRef}>
          <div className='lg:w-7/12' >
            <img 
              src="/img/presale/Miami_Robocat_v2.webp" 
              alt="party" 
              className='relative top-12 sm:20 -left-28 md:-left-52 lg:-left-[17rem] w-[135%] max-w-[135%] h-auto z-[11]'
            />
          </div>
          <div className='lg:w-5/12 relative'>
            <img 
              src="/img/presale/fr.webp" 
              alt="palm tree to the right" 
              className='absolute max-w-[60%] -bottom-[45rem] -right-32 md:-bottom-[77rem] lg:max-w-full lg:-bottom-[12.8rem] lg:-right-36'  
            />
            <img 
              src="/img/presale/sftr.svg" 
              alt="palm tree second to the right" 
              className='absolute -bottom-[43rem] -right-16 md:-bottom-[73rem] lg:-bottom-[12.8rem] lg:-right-8'  
            />
            <img 
              src="/img/presale/fl.svg" 
              alt="palm tree to the left" 
              className='absolute -bottom-[24rem] md:-bottom-[30rem] -left-12 lg:-bottom-[15.3rem] lg:-left-48'  
            />
            <img 
              src="/img/presale/sftl.svg" 
              alt="palm tree second to the left" 
              className='absolute -bottom-[24rem] md:-bottom-[30rem] left-16 lg:-bottom-[15.3rem] lg:-left-20'  
            />
            <div className='relative z-10'>
              {/* <h2 className='yp-heading text-[3rem] md:text-[4rem] mb-10'>RoboCat’s <br /> Unique Presale</h2> */}

              <AnimatedTitle 
                title="RoboCat’s <br /> Unique Presale"
                containerClass="yp-heading text-[3rem] md:text-[4rem] mb-10"
              />

              <p className='regular-text'>Tired of meme coin presales that promise new innovative platforms and inventions, then crash and burn after launch? RoboCat is here to change the game! No bullsh*t, no presale bonuses or stupid dilutions. Built for long-term success and happiness, with one straight-forward goal: To establish an exclusive, global fellowship through RoboCat Club and ultra-high returns for early holders. Join now and HODL hard for BIG WINS in the future!</p>

              <p className='regular-text'>RoboCat is serious about fame and growth, which is why <span className='yp-color'>most of the presale funds get reinvested into marketing during the presale</span> to make sure the world knows about RoboCat.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Presale