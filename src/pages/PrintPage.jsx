import React from 'react';
import logo from '../assets/ai_karty_logo6.svg';

import background from '../assets/print_background_extended_fixed.jpg';

function PrintPage() {
  return (
  <div
    className="w-full min-h-screen overflow-x-hidden"
    style={{
      backgroundImage: `url(${background})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}
  >
    <div className="w-full max-w-screen-md mx-auto flex flex-col items-center justify-center px-4 md:px-8 py-4 md:py-8">
      <h1 className="font-bold text-xl md:text-4xl text-center mb-4 md:mb-8">Objednávka tisknutých kartiček</h1>
      <p className="text-base md:text-2xl text-center mb-4 max-w-lg">
        Nabízíme možnost objednat si kartičky ve vysoké kvalitě, vytištěné na tvrdý papír a zalaminované pro delší životnost.
      </p>
      <p className="text-base md:text-xl text-center mb-4 max-w-md">
        Pro objednávku nás kontaktujte na emailu: <a className="underline text-blue-700" href="mailto:info@aikarty.cz">info@aikarty.cz</a>
      </p>
      <p className="text-base md:text-xl text-center max-w-md">
        Cena se odvíjí podle počtu kartiček a požadované úpravy.
      </p>
    </div>
  </div>
  );
}

export default PrintPage;