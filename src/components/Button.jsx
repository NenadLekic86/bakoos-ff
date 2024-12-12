import React from 'react'

const Button = ({ 
  id, 
  containerClass,
  href,
  onClick,
  children,
  hideElement,
  hideElementLg,
  offcanvasBtnBig,
  noGlow,
}) => {
  const btnClasses = 
  `btn-primary relative z-10 cursor-pointer bg-blue-100 px-3 xl:px-[2.5rem] py-3 border-yellowPink-linear border-[1px] transition-transform duration-300 ease-out inline-block 
   
  ${hideElementLg ? 'lg:hidden' : ''} 
  ${hideElement ? 'hidden lg:inline-block' : ''}
  ${offcanvasBtnBig ? 'lg:hidden w-[240px]' : ''}
  `;

  const linkClasses =
  `btn-primary relative z-10 cursor-pointer bg-blue-100 p-[0.55rem] w-[35px] h-[35px] border-yellowPink-linear border-[1px] transition-transform duration-300 ease-out inline-block 
 
  ${hideElementLg ? 'lg:hidden' : ''}
  ${hideElement ? 'hidden lg:inline-block' : ''}
  `



  const renderButton = () => (
    <div className={`
      relative inline-block 
      ${hideElementLg ? 'lg:hidden' : ''} 
      ${hideElement ? 'hidden lg:inline-block' : ''}
      ${containerClass}
    `}>
      <button 
        id={id}
        className={btnClasses}
        onClick={onClick}
      >
        <div className='yellowPinkV2'>
          {children}
        </div>
      </button>

      <div className={`
        absolute bg-blue-600 border-yellowPink-linear border-[1px]  w-full h-full top-1 left-1
        ${noGlow ? '' : 'btn-clone'}
        `} />
    </div>
  );

  const renderLink = () => (
    <div className={`
      relative inline-block 
      ${hideElementLg ? 'lg:hidden' : ''} 
      ${hideElement ? 'hidden lg:inline-block' : ''}
      ${containerClass}
    `}>
      <a 
        id={id}
        href={href}
        className={linkClasses}
      >
        <div className='yellowPinkV2'>
          {children}
        </div>
      </a>

      <div className={`
        absolute bg-blue-600 border-yellowPink-linear border-[1px] w-[35px] h-[35px] top-1 -left-1
        ${noGlow ? '' : 'btn-clone'}
      `} />
    </div>
  );

  return href ? renderLink() : renderButton();
}

export default Button