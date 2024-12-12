import React, { useEffect, useRef } from 'react';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const astronautRef = useRef(null);
  const containerRef = useRef(null);
  const floatingAnimation = useRef(null);
  const resetTimeout = useRef(null);

  useEffect(() => {
    // Idle floating animation
    floatingAnimation.current = gsap.to(astronautRef.current, {
      x: '+=10',
      y: '+=10',
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

    // Mouse movement effect
    const handleMouseMove = (e) => {
      // Clear reset timeout to avoid returning immediately
      clearTimeout(resetTimeout.current);

      const bounds = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const moveX = (mouseX / bounds.width - 0.5) * 100; // Scale movement
      const moveY = (mouseY / bounds.height - 0.5) * 100;

      gsap.to(astronautRef.current, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Return astronaut to center position after a short delay
      resetTimeout.current = setTimeout(() => {
        gsap.to(astronautRef.current, {
          x: 0,
          y: 0,
          duration: 1,
          ease: 'power2.out',
        });
      }, 200); // Delay before resetting (adjust if needed)
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);


    // Flicker animation for distortion lines
    const distortionLines = document.querySelectorAll('.distortion_lines');

    distortionLines.forEach((line) => {
      // const flickerAnimation = gsap.fromTo(
      //   line,
      //   { opacity: 0.3 }, // Start opacity
      //   { 
      //     opacity: 1, 
      //     duration: 0.9, 
      //     repeat: -1, 
      //     yoyo: true, 
      //     ease: 'power2.inOut', 
      //     paused: true // Initially paused
      //   }
      // );

       // Create a flicker timeline for each line
       const flickerAnimation = gsap.timeline({ repeat: -1, paused: true });
       flickerAnimation
         .to(line, { opacity: 1, duration: 0.6, ease: 'power2.inOut' })
         .to(line, { opacity: 0.4, duration: 0.8, ease: 'power2.inOut' })
         .to(line, { opacity: 1, duration: 1.2, ease: 'power2.inOut' });

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
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      floatingAnimation.current?.kill(); // Clean up floating animation
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearTimeout(resetTimeout.current); // Clear timeout
    };
  }, []);

  return (
    <section 
      ref={containerRef}
      id='about' 
      className='about relative bg-blue-100 md:bg-transparent'
    >
      <img 
        src="/img/about/about-distortion-lines-top.svg" 
        alt="distortion lines" 
        className='distortion_lines absolute top-0 left-0'
      />
      <img 
        src="/img/about/about-bg-img.webp" 
        alt="about bg image" 
        className='absolute top-0 left-0 w-full h-full object-cover z-[-1] hidden md:block'
      />
      <img 
        src="/img/about/about-bg-img.png" 
        alt="about bg image" 
        className='absolute bottom-0 left-0 object-contain w-full z-0 md:hidden'
      />

      <div className='container pt-40 pb-12 md:py-44'>
        <div className='flex flex-col md:flex-row items-start justify-center gap-32 md:gap-10 relative -top-20'>
          <div className='md:w-7/12 z-10 md:pr-16'>
            <p className='regular-text'>Inspired by legendary tokens like Doge, Pepe, Shubi Inu and DogWifHat, RoboCat steps in as the defender and unifier of the meme coin universe. Combining the agility of a cat with the unstoppable power of a machine, RoboCat's mission is simple yet powerful: <span className='yp-color'>to protect and connect them all.</span></p>

            <p className='regular-text'>RoboCat is not just another meme coin riding the wave of internet culture. Fast, fearless and armed with razor-sharp claws of steel and a heart of gold, RoboCat is here to build an empire where innovation, fun, fellowship and protection reign supreme.</p>

            <p className='regular-text'>Get ready for the future of meme coins!</p>
          </div>

          <div className='md:w-5/12'>
            <img 
              ref={astronautRef}
              src="/img/about/RCAstronaut-v2.webp" 
              alt="RC Astronaut" 
              className='w-full h-auto relative top-0 md:-top-4'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About