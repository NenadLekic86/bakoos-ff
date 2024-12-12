import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);

const Tokenomics = () => {
    const tokenContainerRef = useRef(null);
    const rotateRef  = useRef();
    const rotateTween = useRef(null);
    const resetTween = useRef(null);

    useEffect(() => {
      const tokens = tokenContainerRef.current.querySelectorAll('.tokenomic_card');
      const element = rotateRef.current;
  
      gsap.fromTo(
        tokens,
        { opacity: 0, y: 50 }, // Start with invisible and slightly translated down
        {
          opacity: 1,
          y: 0, // Animate to fully visible and in-place
          stagger: 0.4, // 0.2s delay between animations
          duration: 1.3, // Animation duration for each image
          ease: 'power2.out',
          scrollTrigger: {
            trigger: tokenContainerRef.current, // Trigger when this container is in view
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


      // Set up the rotation animation but keep it paused initially
      rotateTween.current = gsap.to(element, {
        rotation: 360,
        repeat: -1,
        repeatDelay: 1,
        yoyo: true,
        duration: 2,
        paused: true,
      });

      const handleMouseMove = (event) => {
        const rect = element.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;

        // Calculate the distance between the cursor and the element center
        const distance = Math.sqrt(
          Math.pow(event.clientX - elementCenterX, 2) +
          Math.pow(event.clientY - elementCenterY, 2)
        );

        // Start animation if distance is less than 300px
        if (distance < 300) {
          rotateTween.current.play();
          resetTween.current && resetTween.current.kill(); // Stop any ongoing reset animation
        } else {
          rotateTween.current.pause();
        }
      };

      const handleMouseLeave = () => {
        // Smoothly reset rotation to 0
        rotateTween.current.pause(); // Pause the ongoing rotation
        resetTween.current = gsap.to(element, {
          rotation: 0,
          duration: 1,
          ease: "power2.out",
        });
      };

      // Add mousemove and mouseleave listeners
      document.addEventListener("mousemove", handleMouseMove);
      element.addEventListener("mouseleave", handleMouseLeave);
  
      return () => {
        // Clean up listeners and GSAP instances
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        document.removeEventListener("mousemove", handleMouseMove);
        element.removeEventListener("mouseleave", handleMouseLeave);
        rotateTween.current && rotateTween.current.kill();
        resetTween.current && resetTween.current.kill();
      };
    }, []);
  
  return (
    <section id='tokenomics' className='tokenomics relative -mt-12 lg:-mt-44 h-[1313px] lg:h-[1059px] z-[1]'>
      <img 
        src="/img/tokenomics/tokenomics-bg-v2.webp" 
        alt="tokenomics bg desktop" 
        className='absolute top-0 left-0 w-full h-full object-cover hidden lg:block'
      />
      <img 
        src="/img/tokenomics/tokenomics-bg-mob.webp" 
        alt="tokenomics bg mobile" 
        className='absolute top-0 left-0 w-full h-full object-cover lg:hidden'
      />
      <img 
        src="/img/tokenomics/tokenomics-distortion-lines-bottom.svg" 
        alt="" 
        className='distortion_lines absolute -bottom-12 left-0 z-[4] hidden lg:block'  
      />

      <div className="container pt-20 z-10">
        <div className='flex flex-col lg:flex-row items-center justify-center'>
          <div className='lg:w-7/12' >
            <img
              ref={rotateRef}
              src="/img/tokenomics/tokenomics-pie.webp" 
              alt="" 
              className='absolute -bottom-[17rem] left-16 md:-bottom-[20rem] md:left-[15rem] lg:-bottom-40 lg:left-12 2xl:left-0 w-[250px] h-[250px] md:w-[330px] md:h-[330px]'
              data-animate='rotate'
            />
          </div>
          <div className='lg:w-5/12'>
            {/* <h2 className='white-heading text-[3.5rem] md:text-[5.25rem]'>Tokenomics</h2> */}

            <AnimatedTitle 
              title="Tokenomics"
              containerClass="white-heading text-[3.5rem] md:text-[5.25rem]"
            />

            {/* <p className='white-heading text-[2rem] pl-20 mb-10'>9 billion $ROBOCAT</p> */}

            <AnimatedTitle 
              title="9 billion $ROBOCAT"
              containerClass="white-heading text-[2rem] pl-20 mb-10"
            />

            <div className='tokenomics-cards-container' ref={tokenContainerRef}>
              <div className='tokenomic_card card_one relative mb-6 md:mb-12 lg:-left-12'>
                <h3 className='h3-heading !text-[1.3rem] mb-5'>70% Presale (6.3 billion tokens)</h3>
                <p className='regular-text !text-[0.53rem] md:!text-[0.813rem] !m-0'>RoboCat’s presale strategy is simple. Use presale funds (and not RoboCat tokens) to build the strongest awareness and community in the meme coin universe. Reward early investors big time and never introduce token purchase bonuses to create unnecessary dilution.</p>
              </div>
              <div className='tokenomic_card card_two relative mb-6 lg:-left-20'>
                <h3 className='h3-heading !text-[1.3rem] mb-5'>20% Liquidity (1.8 billion tokens)</h3>
                <p className='regular-text !text-[0.53rem] md:!text-[0.813rem] !m-0'>RoboCat is setting aside big meme-dollars to get what it takes with the big CEX players.</p>
              </div>
              <div className='tokenomic_card card_three relative'>
                <h3 className='h3-heading !text-[1.3rem] mb-5'>10% Team (0.9 billion tokens)</h3>
                <p className='regular-text !text-[0.53rem] md:!text-[0.813rem] !m-0'>RoboCat’s way of making some dime.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Tokenomics