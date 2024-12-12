import React, { useRef, useState, useEffect } from 'react'
import Button from '../Button';
import Logo from '/img/Robocat-logo.png';

export const HamburgerMenu = () => {
  return (
    <>
      <div 
        className="absolute inset-0 pointer-events-none lg:hidden bg-blue-1000 z-[-1] w-[80%] max-w-[80%] ml-auto -top-4"
      >
      </div>
      <div className='offcanvas-logo-container lg:hidden'>
        <a className="block w-[12rem] xl:mr-8" href="/">
          <img src={Logo} alt="robocat" />
        </a>
      </div>
      <div className='offcanvas-btn-group absolute bottom-12 z-[1] text-center m-auto'>
        <div className='flex flex-row items-center justify-center gap-6 mb-4'>
          <Button 
            title='Join Discord' 
            href={'#'} 
            hideElementLg
            noGlow
          >
            <img src="/img/footer/twitter-icon.svg" alt="twitter" />
          </Button>

          <Button 
            title='Join Telegram' 
            href={'#'} 
            hideElementLg
            noGlow
          >
            <img src="/img/footer/telegram-icon.svg" alt="twitter" />
          </Button>
        </div>

        <Button 
          hideElementLg
          offcanvasBtnBig
          noGlow
        >
          Buy Now
        </Button>
      </div>
    </>
  );
};
