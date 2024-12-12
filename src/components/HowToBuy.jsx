import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);

const HowToBuy = () => {
  const stepsContainerRef = useRef(null);

  useEffect(() => {
    const steps = stepsContainerRef.current.querySelectorAll('.step-card');

    gsap.fromTo(
      steps,
      { opacity: 0, y: 50 }, // Start with invisible and slightly translated down
      {
        opacity: 1,
        y: 0, // Animate to fully visible and in-place
        stagger: 0.4, // 0.2s delay between animations
        duration: 1.3, // Animation duration for each image
        ease: 'power2.out',
        scrollTrigger: {
          trigger: stepsContainerRef.current, // Trigger when this container is in view
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
    <section id='howtobuy' className='howtobuy relative -mt-16 lg:-mt-40 h-[1572px] md:h-[1074px] flex items-center z-[0]'>
      <img 
        src="/img/howtobuy/howtobuy-bg.webp" 
        alt="how to buy bg" 
        className='absolute top-0 left-0 w-full h-full object-cover hidden lg:block'
      />
      <img 
        src="/img/howtobuy/howtobuy-bg-mob.webp" 
        alt="how to buy bg" 
        className='absolute top-0 left-0 w-full h-full object-cover lg:hidden'
      />
      <img 
        src="/img/howtobuy/howtobuy-distortion-lines-bottom.svg" 
        alt="howtobuy distortion lines bottom" 
        className='distortion_lines absolute -bottom-8 left-0 z-[4] hidden lg:block'  
      />
      <img 
        src="/img/howtobuy/howtobuy-distortion-lines-bottom-mob.svg" 
        alt="howtobuy distortion lines bottom mob" 
        className='distortion_lines absolute -bottom-[7.5rem] left-0 z-[4] lg:hidden'  
      />

      <div className='container -mt-80 md:mt-0'>
        {/* <h2 className='yp-heading text-[4rem] md:text-[5.25rem] mb-10 lg:mb-5'>How to Buy $ROBOCAT?</h2> */}

        <AnimatedTitle 
          title="How to Buy $ROBOCAT?"
          containerClass="yp-heading text-[4rem] md:text-[5.25rem] mb-10 lg:mb-5"
        />

        <div className='steps-container lg:max-w-[62%] m-auto' ref={stepsContainerRef}>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-4 mb-7 relative lg:-left-24'>
            <div className='basis-full lg:basis-1/2 step-card'>
              <h3 className='h3-heading mb-5'>1. Connect Wallet</h3>
              <p className='regular-text !text-[0.813rem] !m-0'>To purchase $ROBOCAT you need to connect your wallet, which involves approving the contract on your wallet.</p>
              <p className='white-linear-text absolute bottom-0 right-4'>01</p>
            </div>
            <div className='basis-full lg:basis-1/2 step-card'>
              <h3 className='h3-heading mb-5'>2. Participate in Presale</h3>
              <p className='regular-text !text-[0.813rem] !m-0'>Tap the BUY NOW buttons on this site or use the checkout gadget at the top of the page. Never tap on any buy links outside of robocat.me to buy $ROBOCAT.</p>
              <p className='white-linear-text absolute bottom-0 right-4'>02</p>
            </div>
          </div>
          <div className='flex flex-col lg:flex-row items-center justify-center gap-4 relative lg:left-24'>
            <div className='basis-full lg:basis-1/2 step-card'>
              <h3 className='h3-heading mb-5'>3. Buy your $ROBOCAT</h3>
              <p className='regular-text !text-[0.813rem] !m-0'>Enter the amount of your favorite crypto to buy your $ROBOCAT. SOL, USDT, USDC and card payment are accepted.</p>
              <p className='white-linear-text absolute bottom-0 right-4'>03</p>
            </div>
            <div className='basis-full lg:basis-1/2 step-card'>
              <h3 className='h3-heading mb-5'>4. Claim your $ROBOCAT</h3>
              <p className='regular-text !text-[0.813rem] !m-0'>Once the presale is complete, we will announce a date when you will be able to claim your $ROBOCAT into your wallet address.</p>
              <p className='white-linear-text absolute bottom-0 right-4'>04</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowToBuy