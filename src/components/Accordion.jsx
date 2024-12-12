import React, { useState } from 'react';

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="accordion-item roadmap-card !p-3 mb-6">
      <div className="accordion-header flex flex-row items-center justify-between p-1  cursor-pointer" onClick={toggleAccordion}>
        <div className='w-auto'>
          <h3 className="h3-heading">{title}</h3>
        </div>
        <div className='accordion-plusMinus w-[28px] h-[28px] flex items-center justify-center'>
          <span className='text-white text-[22px]'>{isOpen ? '-' : '+'}</span>
        </div>
      </div>
      {isOpen && (
        <div className={`accordion-content ${ isOpen ? 'mt-8' : '' }`}>
          <p className="regular-text !text-[0.813rem] !m-0">{content}</p>
        </div>
      )}
    </div>
  );
};

export default Accordion;