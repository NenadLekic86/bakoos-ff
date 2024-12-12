import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger)

const Party = () => {
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
         .to(line, { opacity: 1, duration: 1.2, ease: 'power2.inOut', stagger: 0.2 });

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
    <section id='party' className='party relative -mt-40 md:-mt-80 flex items-center lg:h-[980px] z-[3]'>
      <img 
        src="/img/party/party-distortion-lines-big.svg" 
        alt="distortion lines" 
        className='distortion_lines absolute top-0 right-0 md:top-14 z-[1] hidden lg:block'      
      />
      <img 
        src="/img/party/party-distortion-lines-small.svg" 
        alt="distortion lines" 
        className='distortion_lines absolute top-0 left-0 md:-top-[1.2rem] z-[1] hidden lg:block'
      />
      <img 
        src="/img/party/party-bg.webp" 
        alt="" 
        className='absolute top-0 left-0 w-full h-full object-cover hidden lg:block'
      />
      <img 
        src="/img/party/party-bg-mob.webp" 
        alt="" 
        className='absolute top-0 left-0 w-full h-full object-fill lg:hidden'
      />

      <div className='container pt-40 md:pt-64 lg:pt-32'>
        <div className='flex flex-col lg:flex-row items-center justify-center gap-0 lg:gap-10 relative'>
          <div className='lg:w-7/12 z-10'>
            {/* <h2 className='white-heading text-[3rem] md:text-[4rem] mb-10'>The Ultimate Launch Party <br /> & RoboCat’s Club</h2> */}

            <AnimatedTitle 
              title="The Ultimate Launch Party <br /> & RoboCat’s Club"
              containerClass="white-heading text-[3rem] md:text-[4rem] mb-10"
            />

            <p className='regular-text'>Enter the world of RoboCat and join the most exclusive fellowship in the meme coin universe! As a top 500 holder in our presale, you're not just investing - you're invited to the launch party of the century, where RoboCat unveils its full glory. Think epic surprises, exclusive perks, and the start of a revolution that will redefine meme coins.</p>

            <p className='regular-text'>But it doesn't stop there. Once RoboCat reaches $1 billion in market cap, RoboCat Club open doors - an ultra-exclusive fellowship of early adopters and big shots. The first 1,000 holders investing $250 or more during presale are guaranteed membership! (Further info in our Roadmap).</p>

            <p className='regular-text'>This is your chance to be at the heart of something extraordinary. Don't just HODL—become a legend with RoboCat!</p>
          </div>

          <div className='lg:w-5/12 relative' ref={imageContainerRef}>
            <img 
              src="/img/party/party-img_v3.webp" 
              alt="party" 
              className='relative w-[117%] max-w-[117%] -left-[1.8rem] md:-left-12 lg:w-full lg:h-auto bottom-0 md:top-12 lg:top-36 lg:left-0'
            />
            <img 
              src="/img/party/cat.png" 
              alt="robocat-characters" 
              className='absolute bottom-0 left-48 md:left-[15rem] lg:-bottom-32 lg:left-48 lg:max-h-[320px] z-[1]'  
            />
            <img 
              src="/img/party/snoop.png" 
              alt="snoop-characters" 
              className='absolute bottom-0 left-20 md:left-12 lg:left-20 lg:-bottom-32 lg:max-h-[320px] z-[0]'  
            />
            <img 
              src="/img/party/pepe.png" 
              alt="pepe-characters" 
              className='absolute bottom-0 left-[17.7rem] md:left-[26rem] lg:left-[17.7rem] lg:-bottom-32 lg:max-h-[300px] z-[0]'  
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Party