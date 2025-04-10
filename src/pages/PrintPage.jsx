import React from 'react';
import logo from '../assets/ai_karty_logo6.svg';

import background from '../assets/print_background_extended_fixed.jpg';

function PrintPage() {
  return (
  <div className='max-w-full min-h-screen' style={{ backgroundImage: `url(${background})` }}>
    <div
      className="p-6 max-w-3xl mx-auto items-center text-center bg-cover bg-center shadow-md text-shadow"
    >
      <img src={logo} alt="AI Karty Logo" className="mx-auto mb-4 w-32 h-auto" />
      <h1 className="text-2xl font-bold mb-4 drop-shadow" style={{ fontSize: 20 }}>Objednávka tisknutých kartiček</h1>
      <p className="mb-2" style={{ fontSize: 20 }}>
        Nabízíme možnost objednat si kartičky ve vysoké kvalitě, vytištěné na tvrdý papír a zalaminované pro delší životnost.
      </p>
      <p className="mb-2" style={{ fontSize: 20 }}>
        Pro objednávku nás kontaktujte na emailu: <a href="mailto:info@aikarty.cz" className="text-blue-600 underline">info@aikarty.cz</a>
      </p>
      <p style={{height: 600}}>
        Cena se odvíjí podle počtu kartiček a požadované úpravy.
      </p>
    </div>
  </div>
  );
}

export default PrintPage;