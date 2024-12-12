import React, { useEffect, useRef, useState } from 'react'
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from './AnimatedTitle'

gsap.registerPlugin(ScrollTrigger);

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';

const slides = [
  {src: 'img/featuredin/logo.png', alt: 'logo 1'},
  {src: 'img/featuredin/logo-1.png', alt: 'logo 2'},
  {src: 'img/featuredin/logo-2.png', alt: 'logo 3'},
  {src: 'img/featuredin/logo-3.png', alt: 'logo 4'},
  {src: 'img/featuredin/logo-4.png', alt: 'logo 5'},
  {src: 'img/featuredin/logo-5.png', alt: 'logo 6'},
]

const FeaturedIn = () => {
  return (
    <section id='featuredin' className='featuredin relative lg:-mt-[31rem] pb-40 lg:p-0'>
      <img 
        src="img/faq/faq-bg_v5.webp" 
        alt="faq bg" 
        className='absolute top-0 left-0 w-full h-full object-cover z-[0] lg:hidden'  
      />

      <div className="container">
        {/* <h2 className='yp-heading text-[4rem] md:text-[5.25rem] mb-10 p-3'>Featured In</h2> */}

        <AnimatedTitle 
          title="Featured In"
          containerClass="yp-heading text-[4rem] md:text-[5.25rem] mb-10 p-3"
        />

        <div className='featuredin-logos lg:hidden'>
          <div className='grid grid-cols-2 gap-12'>
            {slides.map((slide, index) => (
              <div 
                key={index}
                className='flex items-center justify-center'
              >
                <img 
                  src={slide.src} 
                  alt={slide.alt} 
                  className='h-auto w-full'  
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='featuredin-swiper-slider hidden lg:block'>
      <Swiper
        spaceBetween={30}
        slidesPerView={3}
        // centeredSlides
        loop
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
        modules={[Autoplay]}
        className='flex items-center justify-center '  
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 5,
          },
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide 
            key={index}
            className='flex items-center justify-center'  
          >
            <img src={slide.src} alt={slide.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
      </div>
    </section>
  )
}

export default FeaturedIn