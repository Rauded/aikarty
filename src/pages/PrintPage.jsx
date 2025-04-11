import React from 'react';
import logo from '../assets/ai_karty_logo6.svg';

import background from '../assets/print_background_extended_fixed.jpg';

function PrintPage() {
  return (
  <div className='w-screen h-screen' style={{ backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat' }}>
    <div
      className="col-auto"
    >
      <h1 className='flex font-bold text-4xl mx-auto p-8'>Objednávka tisknutých kartiček</h1>
        <p className='flex text-3xl px-8 max-w-1/2'>Nabízíme možnost objednat si kartičky ve vysoké kvalitě,
          vytištěné na tvrdý papír a zalaminované pro delší životnost.</p>
        <p className='flex text-2xl max-w-1/3 p-8'>Pro objednávku nás kontaktujte na emailu: <a className= 'mr-10'href="mailto:info@aikarty.cz">info@aikarty.cz</a> </p>
        <p className='flex text-2xl max-w-1/3 px-8'>Cena se odvíjí podle počtu kartiček a požadované úpravy.</p>
    </div>
  </div>
  );
}

export default PrintPage;