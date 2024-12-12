import React, { useRef, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import { useWindowScroll } from "react-use";
import gsap from "gsap";

import Button from './Button';
import { HamburgerMenu } from './design/Offcanvas';
import MenuSvg from '../assets/svg/MenuSvg';
import Logo from '/img/Robocat-logo.png';

const navItems = [
  {title: 'About', href: '#about', id: 0},
  {title: 'Presale', href: '#presale', id: 1},
  {title: 'Tokenomics', href: '#tokenomics', id: 2},
  {title: 'Roadmap', href: '#roadmap', id: 3},
  {title: 'How to buy', href: '#howtobuy', id: 4},
  {title: 'FAQ', href: '#faq', id: 5},
];

const Header = () => {
  const pathName = useLocation();
  const [openNavigation, setOpenNavigation] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isNavVisible, setIsNavVisible] = useState(true)

  const navContainerRef = useRef(null)
  const navRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll()
  
  useEffect(() => {
    if(currentScrollY === 0) {
      setIsNavVisible(true)
      navContainerRef.current.classList.remove('floating-nav')
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false)
      navContainerRef.current.classList.add('floating-nav')
    } else if(currentScrollY < lastScrollY) {
      setIsNavVisible(true)
      navContainerRef.current.classList.add('floating-nav')
    }

    setLastScrollY(currentScrollY)
  }, [currentScrollY, lastScrollY])

  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opcity: isNavVisible ? 1 : 0,
      duration: 0.2,
    })
  }, [isNavVisible])

  const toggleNavigation = () => {
    const isSmallScreen = window.innerWidth < 1280;

    if (openNavigation) {
      gsap.to(navRef.current, {
        x: isSmallScreen ? '100%' : '0%', // Move off-screen
        duration: 0.3,
        ease: 'power3.out',
      });
      setTimeout(() => {
        setOpenNavigation(false);
        enablePageScroll();
      }, 300); // Allow animation to complete before hiding
    } else {
      setOpenNavigation(true);
      disablePageScroll();
      gsap.fromTo(
        navRef.current,
        { x: isSmallScreen ? '100%' : '0%' },
        {
          x: '3%',
          duration: 0.3,
          ease: 'power3.out',
        }
      );
    }
  };

  const handleClick = () => {
    if (openNavigation) toggleNavigation();
  };

  return (
    <div
      ref={navContainerRef}
      className={`header fixed inset-x-0 md:inset-x-5 top-4 z-50 h-16 border-none transition-all duration-700 flex items-center`}
    >
      <div className='container'>
        <div className="flex items-center">
          <a className="block w-[12rem] xl:mr-8" href="/">
            <img src={Logo} alt="robocat" />
          </a>

          <nav
            ref={navRef}
            className={` ${ openNavigation ? "flex" : "hidden" } fixed top-0 left-0 right-0 bottom-0 h-screen lg:h-auto lg:static lg:flex lg:ms-auto lg:bg-transparent`}
          >
            <div className={`nav-items-container relative z-[2] flex flex-col items-center justify-center m-auto lg:flex-row ${ openNavigation ? "-top-4" : "" }`}>
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleClick}
                  className={`nav-item nav-hover-btn`}
                >
                  {item.title}
                </a>
              ))}
            </div>
            
            <HamburgerMenu />
          </nav>

          <div className='button-group ml-auto xl:ml-8'>
            <div className='flex flex-row items-center justify-center gap-4'>
              <Button 
                title='Join Discord' 
                href={'#'} 
                containerClass="top-[2px]" 
                hideElement
              >
                <img src="/img/footer/twitter-icon.svg" alt="twitter" />
              </Button>

              <Button 
                title='Join Telegram' 
                href={'#'} 
                containerClass="top-[2px]" 
                hideElement
              >
                <img src="/img/footer/telegram-icon.svg" alt="twitter" />
              </Button>

              <Button hideElement>
                Buy Now
              </Button>

              <Button 
                containerClass="ml-auto"
                hideElementLg 
                onClick={toggleNavigation}>
                <MenuSvg openNavigation={openNavigation}/>
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Header