import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
// import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin';

import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);

const roadmapData = [
  {
    title: 'Chapter 1: Presale',
    content: 'RoboCat introduces himself to the whole wide world and the cornerstone of our community gets established. Top 500 holders get invited to RoboCat’s insanely cool Launch Party (chapter 3) and the first 1,000 holders spending over $250 are guaranteed free membership in RoboCat Club (chapter 6) through a rare early-bird token.',
  },
  { title: 'Chapter 2: DEX Launch', content: '' },
  { title: 'Chapter 3: Launch party', content: '' },
  { title: 'Chapter 4: CEX Launch', content: '' },
  { title: 'Chapter 5: Partnerships', content: '' },
  { title: 'Chapter 6: RoboCat Club', content: '' },
  { title: 'Chapter 7: what happens next?', content: '' },
];

const Roadmap = () => {
  const chartsContainerRef = useRef(null);
  // const roadmapLineRef = useRef(null);

  const [openStates, setOpenStates] = useState(Array(roadmapData.length).fill(false));

  const toggleAccordion = (index) => {
    setOpenStates(openStates.map((isOpen, i) => (i === index ? !isOpen : isOpen)));
  };


  useEffect(() => {
    const charts = chartsContainerRef.current.querySelectorAll('.roadmapCharts');

    gsap.fromTo(
      charts,
      { opacity: 0, y: 50 }, // Start with invisible and slightly translated down
      {
        opacity: 1,
        y: 0, // Animate to fully visible and in-place
        stagger: 0.4, // 0.2s delay between animations
        duration: 1.3, // Animation duration for each image
        ease: 'power2.out',
        scrollTrigger: {
          trigger: chartsContainerRef.current, // Trigger when this container is in view
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

    // Animate the SVG line to draw itself
    // gsap.fromTo(
    //   roadmapLineRef.current, 
    //   { drawSVG: '0%' },  // Start with the path invisible
    //   {
    //     drawSVG: '100%',  // Animate to full visibility
    //     duration: 2, // Animation duration
    //     ease: 'power2.out',
    //     scrollTrigger: {
    //       trigger: roadmapLineRef.current,
    //       start: 'top 75%',  // When the SVG is 75% in viewport
    //       end: 'bottom 25%',  // Ends as it leaves the viewport
    //       scrub: true, // Smooth animation on scroll
    //     },
    //   }
    // );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id='roadmap' className='roadmap relative lg:-mt-16 h-[1775px] md:h-[967px] z-[2]'>
      <img 
        src="/img/roadmap/roadmap-bg-with-robocat.webp" 
        alt="roadmap bg" 
        className='absolute top-0 left-0 w-full h-full object-cover hidden lg:block'  
      />
      <img 
        src="/img/roadmap/roadmap-bg-with-robocat-mob.webp" 
        alt="roadmap bg mob" 
        className='absolute top-0 left-0 w-full h-full object-cover lg:hidden'
      />
      <img 
        src="/img/roadmap/roadmap-distortion-lines-bottom-right.svg" 
        alt="roadmap distortion lines bottom right" 
        className='distortion_lines absolute bottom-20 right-0 z-[4] hidden lg:block'  
      />
      <img 
        src="/img/roadmap/roadmap-distortion-lines-bottom-left.svg" 
        alt="roadmap distortion lines bottom left" 
        className='distortion_lines absolute bottom-8 left-0 z-[4] hidden lg:block'  
      />
       <img 
        src="/img/roadmap/roadmap-distortion-lines-bottom-mob.svg" 
        alt="roadmap distortion lines bottom" 
        className='distortion_lines absolute -bottom-[6.5rem] left-0 w-full lg:hidden'  
      />

      <div className='container z-[3] pt-24'>
        {/* <h2 className='yp-heading text-[4rem] md:text-[5.25rem] mb-10 lg:mb-5'>Roadmap</h2> */}

        <AnimatedTitle 
          title="Roadmap"
          containerClass="yp-heading text-[4rem] md:text-[5.25rem] mb-10 lg:mb-5"
        />

        <div className='roadmap-charts-container-desktop relative hidden lg:block'>
          <div className='absolute -top-20 left-0'>
            <img 
              src="/img/roadmap/roadmap-line-dots.svg" 
              alt="" 
              className='roadmap-line-dots'
            />
            {/* <svg width="860" height="645" viewBox="0 0 860 645" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M97.4374 280.702C97.4374 280.702 348.228 198.156 361.437 300.702C371.918 382.067 202.084 355.33 217 436C230.718 510.191 311.679 512.289 386.5 522C510.315 538.07 583.525 479.967 643.937 370.702C676.346 312.087 688.937 205.202 688.937 205.202C694.292 164.302 701.5 105.5 731 87.5" stroke="url(#paint0_linear_289_1759)" stroke-width="10"/>
              <g filter="url(#filter0_bd_289_1759)">
              <circle cx="87.5" cy="278.5" r="17.5" fill="white" fill-opacity="0.06" shape-rendering="crispEdges"/>
              <circle cx="87.5" cy="278.5" r="16" stroke="url(#paint1_linear_289_1759)" stroke-width="3" shape-rendering="crispEdges"/>
              </g>
              <g filter="url(#filter1_d_289_1759)">
              <circle cx="87.4999" cy="278.5" r="6.84784" fill="url(#paint2_linear_289_1759)"/>
              </g>
              <g filter="url(#filter2_bd_289_1759)">
              <circle cx="218.5" cy="439.5" r="17.5" fill="white" fill-opacity="0.06" shape-rendering="crispEdges"/>
              <circle cx="218.5" cy="439.5" r="16" stroke="url(#paint3_linear_289_1759)" stroke-width="3" shape-rendering="crispEdges"/>
              </g>
              <g filter="url(#filter3_d_289_1759)">
              <circle cx="218.5" cy="439.5" r="6.84784" fill="url(#paint4_linear_289_1759)"/>
              </g>
              <g filter="url(#filter4_bd_289_1759)">
              <circle cx="357.5" cy="317.5" r="17.5" fill="white" fill-opacity="0.06" shape-rendering="crispEdges"/>
              <circle cx="357.5" cy="317.5" r="16" stroke="url(#paint5_linear_289_1759)" stroke-width="3" shape-rendering="crispEdges"/>
              </g>
              <g filter="url(#filter5_d_289_1759)">
              <circle cx="357.5" cy="317.5" r="6.84784" fill="url(#paint6_linear_289_1759)"/>
              </g>
              <g filter="url(#filter6_bd_289_1759)">
              <circle cx="381.5" cy="517.5" r="17.5" fill="white" fill-opacity="0.06" shape-rendering="crispEdges"/>
              <circle cx="381.5" cy="517.5" r="16" stroke="url(#paint7_linear_289_1759)" stroke-width="3" shape-rendering="crispEdges"/>
              </g>
              <g filter="url(#filter7_d_289_1759)">
              <circle cx="381.5" cy="517.5" r="6.84784" fill="url(#paint8_linear_289_1759)"/>
              </g>
              <g filter="url(#filter8_bd_289_1759)">
              <circle cx="638.5" cy="378.5" r="17.5" fill="white" fill-opacity="0.06" shape-rendering="crispEdges"/>
              <circle cx="638.5" cy="378.5" r="16" stroke="url(#paint9_linear_289_1759)" stroke-width="3" shape-rendering="crispEdges"/>
              </g>
              <g filter="url(#filter9_d_289_1759)">
              <circle cx="638.5" cy="378.5" r="6.84784" fill="url(#paint10_linear_289_1759)"/>
              </g>
              <g filter="url(#filter10_bd_289_1759)">
              <circle cx="690.5" cy="203.5" r="17.5" fill="white" fill-opacity="0.06" shape-rendering="crispEdges"/>
              <circle cx="690.5" cy="203.5" r="16" stroke="url(#paint11_linear_289_1759)" stroke-width="3" shape-rendering="crispEdges"/>
              </g>
              <g filter="url(#filter11_d_289_1759)">
              <circle cx="690.5" cy="203.5" r="6.84784" fill="url(#paint12_linear_289_1759)"/>
              </g>
              <g filter="url(#filter12_bd_289_1759)">
              <circle cx="732.5" cy="87.5" r="17.5" fill="white" fill-opacity="0.06" shape-rendering="crispEdges"/>
              <circle cx="732.5" cy="87.5" r="16" stroke="url(#paint13_linear_289_1759)" stroke-width="3" shape-rendering="crispEdges"/>
              </g>
              <g filter="url(#filter13_d_289_1759)">
              <circle cx="732.5" cy="87.5001" r="6.84784" fill="url(#paint14_linear_289_1759)"/>
              </g>
              <defs>
              <filter id="filter0_bd_289_1759" x="-130" y="61" width="435" height="435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="100"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_289_1759"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="20" dy="20"/>
              <feGaussianBlur stdDeviation="45"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.00719447 0 0 0 0 0.0274671 0 0 0 0 0.116667 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect1_backgroundBlur_289_1759" result="effect2_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter1_d_289_1759" x="35.6521" y="226.652" width="113.696" height="113.696" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5" dy="5"/>
              <feGaussianBlur stdDeviation="25"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.282353 0 0 0 0 0.494118 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter2_bd_289_1759" x="1" y="222" width="435" height="435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="100"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_289_1759"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="20" dy="20"/>
              <feGaussianBlur stdDeviation="45"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.00719447 0 0 0 0 0.0274671 0 0 0 0 0.116667 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect1_backgroundBlur_289_1759" result="effect2_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter3_d_289_1759" x="166.652" y="387.652" width="113.696" height="113.696" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5" dy="5"/>
              <feGaussianBlur stdDeviation="25"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.282353 0 0 0 0 0.494118 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter4_bd_289_1759" x="140" y="100" width="435" height="435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="100"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_289_1759"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="20" dy="20"/>
              <feGaussianBlur stdDeviation="45"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.00719447 0 0 0 0 0.0274671 0 0 0 0 0.116667 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect1_backgroundBlur_289_1759" result="effect2_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter5_d_289_1759" x="305.652" y="265.652" width="113.696" height="113.696" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5" dy="5"/>
              <feGaussianBlur stdDeviation="25"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.282353 0 0 0 0 0.494118 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter6_bd_289_1759" x="164" y="300" width="435" height="435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="100"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_289_1759"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="20" dy="20"/>
              <feGaussianBlur stdDeviation="45"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.00719447 0 0 0 0 0.0274671 0 0 0 0 0.116667 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect1_backgroundBlur_289_1759" result="effect2_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter7_d_289_1759" x="329.652" y="465.652" width="113.696" height="113.696" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5" dy="5"/>
              <feGaussianBlur stdDeviation="25"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.282353 0 0 0 0 0.494118 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter8_bd_289_1759" x="421" y="161" width="435" height="435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="100"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_289_1759"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="20" dy="20"/>
              <feGaussianBlur stdDeviation="45"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.00719447 0 0 0 0 0.0274671 0 0 0 0 0.116667 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect1_backgroundBlur_289_1759" result="effect2_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter9_d_289_1759" x="586.652" y="326.652" width="113.696" height="113.696" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5" dy="5"/>
              <feGaussianBlur stdDeviation="25"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.282353 0 0 0 0 0.494118 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter10_bd_289_1759" x="473" y="-14" width="435" height="435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="100"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_289_1759"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="20" dy="20"/>
              <feGaussianBlur stdDeviation="45"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.00719447 0 0 0 0 0.0274671 0 0 0 0 0.116667 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect1_backgroundBlur_289_1759" result="effect2_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter11_d_289_1759" x="638.652" y="151.652" width="113.696" height="113.696" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5" dy="5"/>
              <feGaussianBlur stdDeviation="25"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.282353 0 0 0 0 0.494118 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter12_bd_289_1759" x="515" y="-130" width="435" height="435" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="100"/>
              <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_289_1759"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="20" dy="20"/>
              <feGaussianBlur stdDeviation="45"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0.00719447 0 0 0 0 0.0274671 0 0 0 0 0.116667 0 0 0 1 0"/>
              <feBlend mode="normal" in2="effect1_backgroundBlur_289_1759" result="effect2_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow_289_1759" result="shape"/>
              </filter>
              <filter id="filter13_d_289_1759" x="680.652" y="35.6522" width="113.696" height="113.696" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dx="5" dy="5"/>
              <feGaussianBlur stdDeviation="25"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.282353 0 0 0 0 0.494118 0 0 0 1 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_289_1759"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_289_1759" result="shape"/>
              </filter>
              <linearGradient id="paint0_linear_289_1759" x1="95.8571" y1="237.282" x2="264.467" y2="616.973" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7DF11"/>
              <stop offset="1" stop-color="#FF009D"/>
              </linearGradient>
              <linearGradient id="paint1_linear_289_1759" x1="70.4572" y1="260.687" x2="82.8736" y2="297.558" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7DF11"/>
              <stop offset="1" stop-color="#FF009D"/>
              </linearGradient>
              <linearGradient id="paint2_linear_289_1759" x1="81.7193" y1="271.652" x2="94.425" y2="273.224" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFEA18"/>
              <stop offset="0.265" stop-color="#FF984B"/>
              <stop offset="0.75" stop-color="#FF6969"/>
              <stop offset="1" stop-color="#FF00AA"/>
              </linearGradient>
              <linearGradient id="paint3_linear_289_1759" x1="201.457" y1="421.687" x2="213.874" y2="458.558" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7DF11"/>
              <stop offset="1" stop-color="#FF009D"/>
              </linearGradient>
              <linearGradient id="paint4_linear_289_1759" x1="212.719" y1="432.652" x2="225.425" y2="434.224" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFEA18"/>
              <stop offset="0.265" stop-color="#FF984B"/>
              <stop offset="0.75" stop-color="#FF6969"/>
              <stop offset="1" stop-color="#FF00AA"/>
              </linearGradient>
              <linearGradient id="paint5_linear_289_1759" x1="340.457" y1="299.687" x2="352.874" y2="336.558" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7DF11"/>
              <stop offset="1" stop-color="#FF009D"/>
              </linearGradient>
              <linearGradient id="paint6_linear_289_1759" x1="351.719" y1="310.652" x2="364.425" y2="312.224" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFEA18"/>
              <stop offset="0.265" stop-color="#FF984B"/>
              <stop offset="0.75" stop-color="#FF6969"/>
              <stop offset="1" stop-color="#FF00AA"/>
              </linearGradient>
              <linearGradient id="paint7_linear_289_1759" x1="364.457" y1="499.687" x2="376.874" y2="536.558" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7DF11"/>
              <stop offset="1" stop-color="#FF009D"/>
              </linearGradient>
              <linearGradient id="paint8_linear_289_1759" x1="375.719" y1="510.652" x2="388.425" y2="512.224" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFEA18"/>
              <stop offset="0.265" stop-color="#FF984B"/>
              <stop offset="0.75" stop-color="#FF6969"/>
              <stop offset="1" stop-color="#FF00AA"/>
              </linearGradient>
              <linearGradient id="paint9_linear_289_1759" x1="621.457" y1="360.687" x2="633.874" y2="397.558" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7DF11"/>
              <stop offset="1" stop-color="#FF009D"/>
              </linearGradient>
              <linearGradient id="paint10_linear_289_1759" x1="632.719" y1="371.652" x2="645.425" y2="373.224" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFEA18"/>
              <stop offset="0.265" stop-color="#FF984B"/>
              <stop offset="0.75" stop-color="#FF6969"/>
              <stop offset="1" stop-color="#FF00AA"/>
              </linearGradient>
              <linearGradient id="paint11_linear_289_1759" x1="673.457" y1="185.687" x2="685.874" y2="222.558" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7DF11"/>
              <stop offset="1" stop-color="#FF009D"/>
              </linearGradient>
              <linearGradient id="paint12_linear_289_1759" x1="684.719" y1="196.652" x2="697.425" y2="198.224" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFEA18"/>
              <stop offset="0.265" stop-color="#FF984B"/>
              <stop offset="0.75" stop-color="#FF6969"/>
              <stop offset="1" stop-color="#FF00AA"/>
              </linearGradient>
              <linearGradient id="paint13_linear_289_1759" x1="715.457" y1="69.6875" x2="727.874" y2="106.558" gradientUnits="userSpaceOnUse">
              <stop stop-color="#F7DF11"/>
              <stop offset="1" stop-color="#FF009D"/>
              </linearGradient>
              <linearGradient id="paint14_linear_289_1759" x1="726.719" y1="80.6522" x2="739.425" y2="82.2244" gradientUnits="userSpaceOnUse">
              <stop stop-color="#FFEA18"/>
              <stop offset="0.265" stop-color="#FF984B"/>
              <stop offset="0.75" stop-color="#FF6969"/>
              <stop offset="1" stop-color="#FF00AA"/>
              </linearGradient>
              </defs>
            </svg> */}

          </div>
          <div className='charts-inner-container' ref={chartsContainerRef}>
            <div className='roadmap-chart_one roadmapCharts absolute top-0 left-0'>
              <div className='roadmap-card flex flex-row items-center justify-between gap-5 max-w-[562px]'>
                <div className='w-3/12'>
                  <h3 className='h3-heading'>Chapter 1: Presale</h3>
                </div>
                <div className='w-9/12'>
                <p className='regular-text !text-[0.813rem] !m-0'>RoboCat introduces himself to the whole wide world and the cornerstone of our community gets established. Top 500 holders get invited to RoboCat’s insanely cool Launch Party (chapter 3) and the first 1,000 holders spending over $250 are guaranteed free membership in RoboCat Club (chapter 6) through a rare early-bird token.</p>
                </div>
              </div>
            </div>
            <div className='roadmap-chart_two roadmapCharts absolute top-[16rem] left-[24rem]'>
              <div className='roadmap-card'>
                <h3 className='h3-heading'>Chapter 2: <br />DEX Launch</h3>
              </div>
            </div>
            <div className='roadmap-chart_three roadmapCharts absolute top-[24rem] left-[6rem]'>
              <div className='roadmap-card'>
                <h3 className='h3-heading'>Chapter 3: <br />Launch party</h3>
              </div>
            </div>
            <div className='roadmap-chart_four roadmapCharts absolute top-[31rem] left-[24rem]'>
              <div className='roadmap-card'>
                <h3 className='h3-heading'>Chapter 4: <br />CEX Launch</h3>
              </div>
            </div>
            <div className='roadmap-chart_five roadmapCharts absolute top-[20rem] left-[41rem]'>
              <div className='roadmap-card'>
                <h3 className='h3-heading'>Chapter 5: <br />Partnerships</h3>
              </div>
            </div>
            <div className='roadmap-chart_six roadmapCharts absolute top-[9rem] left-[45rem]'>
              <div className='roadmap-card'>
                <h3 className='h3-heading'>Chapter 6: <br />RoboCat Club</h3>
              </div>
            </div>
            <div className='roadmap-chart_seven roadmapCharts absolute -top-12 left-[47.5rem]'>
              <div className='roadmap-card'>
                <h3 className='h3-heading'>Chapter 7: <br />what happens next?</h3>
              </div>
            </div>
          </div>
        </div>

        <div className='roadmap-charts-container-mobile relative block lg:hidden'>
          <div className='max-w-[90%] ml-auto'>
          {roadmapData.map((item, index) => (
            <div key={index} className={`accordion-item ${index === 0 ? 'first' : ''} ${openStates[index] ? 'active' : ''}`}>
              <div className='accordion-header' onClick={() => toggleAccordion(index)}>
                <div>
                  <h3 className='h3-heading'>{item.title}</h3>
                </div>
                <div className='accordion-plusMinus w-[28px] h-[28px] flex items-center justify-center'>
                  <span className='text-white text-[22px]'>{openStates[index] ? '-' : '+'}</span>
                </div>
              </div>
              {openStates[index] && (
                <div className={`accordion-content ${ openStates[index] ? 'mt-8' : '' }`}>
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

export default Roadmap