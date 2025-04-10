import React from 'react';
import logo from '../assets/ai_karty_logo6.svg';

const Footer = () => {
  return (
    <footer style={{ color: 'black' }} className="py-8 bg-zinc-800 text-black">
      <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center text-black font-bold">
          <img src={logo} alt="AI Karty Logo" className="w-8 h-8 rounded-md" />
          </div>
          <h1 className="ml-2 text-xl font-bold text-black">AI Karty</h1>
        </div>
        <div style= {{fontSize: 20} }className="text-sm text-black">© 2025 AI Karty. All rights reserved.</div>
      </div>
    </footer>
  );
};

export default Footer;