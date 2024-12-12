import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);

import Button from './Button.jsx'

const navItems = [
  {title: 'About', href: '#about'},
  {title: 'Presale', href: '#presale'},
  {title: 'Tokenomics', href: '#tokenomics'},
  {title: 'Roadmap', href: '#roadmap'},
  {title: 'How to buy', href: '#howtobuy'},
  {title: 'FAQ', href: '#faq'},
];

const Footer = () => {
  const btnSetContainerRef = useRef(null);
  const imageRef = useRef(null);


  useEffect(() => {
    const navItems = btnSetContainerRef.current.querySelectorAll('.btn_set');
    const image = imageRef.current;

    gsap.fromTo(
      navItems,
      { opacity: 0, y: 50 }, // Start with invisible and slightly translated down
      {
        opacity: 1,
        y: 0, // Animate to fully visible and in-place
        stagger: 0.4, // 0.2s delay between animations
        duration: 1.3, // Animation duration for each image
        ease: 'power2.out',
        scrollTrigger: {
          trigger: btnSetContainerRef.current, // Trigger when this container is in view
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

    // Animate image Robocat logo
    gsap.fromTo(
      image,
      {
        opacity: 0, // Start fully transparent
        width: "0%", // Start with 0 width
        height: "0%", // Start with 0 height
      },
      {
        opacity: 1, // Fully visible
        width: "100%", // Grow to full width
        height: "100%", // Grow to full height
        duration: 2, // Animation duration
        ease: "power2.out", // Easing function
        scrollTrigger: {
          trigger: image, // Element to trigger animation
          start: "top 80%", // Trigger when the top of the image reaches 80% of the viewport height
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <footer id='footer' className='footer relative -mt-12 lg:mt-12 h-[1240px] lg:h-[998px]'>
      <img 
        src="/img/footer/footer-bg.webp" 
        alt="footer bg" 
        className='absolute top-0 left-0 w-full h-full object-cover hidden lg:block'
      />
      <img 
        src="/img/footer/footer-bg-mob.webp" 
        alt="footer bg" 
        className='absolute top-0 left-0 w-full h-full object-cover lg:hidden'
      />
      <img 
        src="/img/footer/footer-distortion-lines-top.svg" 
        alt="footer distortion lines" 
        className='distortion_lines absolute -top-20 left-0 w-full lg:w-auto hidden lg:block'
      />
      <img 
        src="/img/footer/footer-distortion-lines-mob.svg" 
        alt="footer distortion lines" 
        className='distortion_lines absolute -top-4 lg:-top-20 left-0 w-full lg:w-auto lg:hidden'
      />

      <div className="container text-center pt-32">
        {/* <h2 className='white-heading text-[3.375rem] md:text-[5.375rem] mb-8'>Ready to join the Club?</h2> */}

        <AnimatedTitle 
          title="Ready to join the Club?"
          containerClass="center_title white-heading text-[3.375rem] md:text-[5.375rem] mb-8"
        />

        <p className='regular-text lg:px-72'>Be a top-500 holder during presale to get invited to RoboCat’s insanely cool Launch Party! The first 1,000 holders spending $250+ during presale are guaranteed a free (!) membership in RoboCat Club! What are you waiting for?</p>

        <div className='button-group m-auto mt-10' ref={btnSetContainerRef}>
          <Button containerClass='btn_set'>
            Buy Now
          </Button>

          <div className='flex flex-row items-center justify-center gap-4 mt-8'>
            <Button title='Join Discord' href={'#'} containerClass='btn_set'>
              <img src="/img/footer/twitter-icon.svg" alt="twitter" />
            </Button>
            <Button title='Join Telegram' href={'#'} containerClass='btn_set'>
            <img src="/img/footer/telegram-icon.svg" alt="twitter" />
            </Button>
          </div>
        </div>

        <a className='inline-block' href="/">
          <img 
            ref={imageRef}
            src="/img/footer/Robocat-logo-footer.webp" 
            alt="Robocat logo" 
            className='m-auto max-w-[246px] lg:max-w-full h-auto'
          />
        </a>

        <div className='footer-navbar flex flex-col lg:flex-row items-center justify-center m-auto'>
          {navItems.map((item, index) => (
            <a
              key={index}
              href={item.href}
              className='nav-hover-btn'
            >
              {item.title}
            </a>
          ))}
        </div>

        <p className='copyright mt-12'>Please note that $ROBOCAT does not constitute an investment. It is a meme coin created forentertainment purposes only.The value of $ROBOCAT can be highly volatile, and there is a riskof losing your entire investment. Always do your own research and consider consulting with afinancial advisor before engaging in any cryptocurrency transactions. Participate at your ownrisk</p>
      </div>
    </footer>
  )
}

export default Footer