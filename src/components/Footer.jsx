import React from 'react';
import logo from '../assets/ai_karty_logo6.svg';

const Footer = () => {
  return (
    <footer className='bg-orange-50 w-screen p-2 shadow-md'>
      <div className='flex items-center mx-auto justify-center'>
        <img src={logo} alt="AI Karty Logo" className="" />
        <h1 className=''>AI Karty</h1>
      </div>
    <h2 className='flex mx-auto justify-center m-2'>© AI Karty. All rights reserved.
    </h2>
    </footer>
  );
};

export default Footer;