import React from 'react';
import logo from '../assets/ai_karty_logo6.svg';

const Footer = () => {
  return (
    <footer className="bg-orange-50 w-full overflow-x-hidden p-2 md:p-4 shadow-md">
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 max-w-screen-lg mx-auto">
        <img src={logo} alt="AI Karty Logo" className="h-8 w-auto md:h-10" />
        <h1 className="text-sm md:text-lg font-semibold">AI Karty</h1>
      </div>
      <h2 className="flex justify-center text-xs md:text-base mt-2 mb-1 md:mt-3 md:mb-2">© AI Karty. All rights reserved.</h2>
    </footer>
  );
};

export default Footer;