import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);

const faqData = [
  {
    title: 'What is RoboCat?',
    content: 'RoboCat is a pure fun and fully transparent crypto meme coin project uniquely developed and rolled out as a fair try to establish a fellowship of meme coin lovers and get into the cryptocurrency top list by market cap.',
  },
  { title: 'How can I participate in the RoboCat token presale?', content: 'Lorem ipsum' },
  { title: 'When will the RoboCat token be launched on exchanges?', content: 'Lorem ipsum' },
  { title: 'How do I contact the team?', content: 'Lorem ipsum' },
];

const Faq = () => {
  const robocatRef = useRef(null);
  const containerRef = useRef(null);
  const floatingAnimation = useRef(null);
  const resetTimeout = useRef(null);

  const [openStates, setOpenStates] = useState(Array(faqData.length).fill(false));

  const toggleFaqAccordion = (index) => {
    setOpenStates(openStates.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
  };

  useEffect(() => {
    // Idle floating animation
    floatingAnimation.current = gsap.to(robocatRef.current, {
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

      gsap.to(robocatRef.current, {
        x: moveX,
        y: moveY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      // Return robocatRef to center position after a short delay
      resetTimeout.current = setTimeout(() => {
        gsap.to(robocatRef.current, {
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
      id='faq' 
      className='faq relative h-[1440px] lg:h-[1384px] -mt-12 lg:-mt-[9.5rem]'
    >
      <img 
        src="/img/faq/faq-bg-street-v6.png" 
        alt="" 
        className='absolute top-0 left-0 w-full h-full object-cover hidden lg:block z-[-1]'  
      />
      <img 
        src="/img/faq/faq-bg-mob.webp" 
        alt="" 
        className='absolute top-0 left-0 w-full h-full object-cover z-[-2] lg:hidden'  
      />
      <img 
        src="/img/faq/faq-distortion-lines.svg" 
        alt="roadmap distortion lines bottom" 
        className='distortion_lines absolute bottom-[33rem] left-0 w-full lg:w-auto hidden lg:block'  
      />

      <div className="container pt-20 lg:pt-[14rem] z-10">
        <div className='flex flex-col lg:flex-row gap-0 items-start justify-between'>
          <div className='basis-full lg:basis-5/12 relative'>
            <div className='text-center'>
              {/* <h2 className='yp-heading text-[4rem] md:text-[5.25rem] mb-10 p-3'>FAQ</h2> */}

              <AnimatedTitle 
                title="FAQ"
                containerClass="center_title yp-heading text-[4rem] md:text-[5.25rem] mb-10 p-3"
              />
            </div>
            <img 
              ref={robocatRef}
              src="/img/faq/faq-robocat.webp" 
              alt="" 
              className='absolute lg:-bottom-[24rem] lg:left-0 2xl:-left-16 max-w-[157px] hidden lg:block'  
            />
          </div>
          <div className='basis-full lg:basis-7/12 w-full lg:w-auto'>
            {faqData.map((item, index) => (
              <div key={index} className={`accordion-faq-item mb-8 ${index === 0 ? 'first' : ''} ${openStates[index] ? 'active' : ''}`}>
                <div className='accordion-faq-header relative cursor-pointer' onClick={() => toggleFaqAccordion(index)}>
                  <div>
                    <h3 className='h3-heading pr-20'>{item.title}</h3>
                  </div>
                  <div className={`accordion-faq-plusX w-[99px] h-[52px] flex items-center justify-center absolute -top-[45px] right-0 ${openStates[index] ? '-rotate-12' : ''}`}>
                    <span className={`text-white text-[22px] ${openStates[index] ? 'rotate-[50deg] transition-all duration-500' : 'transition-all duration-300'}`}>{openStates[index] ? '+' : '+'}</span>
                  </div>
                </div>
                {openStates[index] && (
                  <div className={`accordion-faq-content pr-16 ${ openStates[index] ? 'mt-8' : '' }`}>
                    <p className="regular-text !text-[0.813rem] !m-0">{item.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq