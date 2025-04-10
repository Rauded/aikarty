import React from 'react';
import notes_img from '../assets/notes_ghib.png';
import pencil_img from '../assets/pencil_ghib_1.png';
import clock_img from '../assets/clock_ghib_1.png';

const features = [
  {
    img: notes_img,
    alt: 'Easy to Use',
    title: 'Ľahké použitie',
    description: 'Jednoduché a intuitívne rozhranie pre vytváranie flash kartičiek rýchlo',
  },
  {
    img: clock_img,
    alt: 'Efficient Learning',
    title: 'Efektívne učenie',
    description: 'Dizajnovaný pomôcť vám zapamätávať si rýchlejšie',
  },
  {
    img: pencil_img,
    alt: 'Customizable',
    title: 'Přizpůsobitelné',
    description: 'Přizpůsobte si kartičky tak, aby vyhovovaly vašemu stylu učení.',
  },
];

const KeyFeatures = () => {
  return (
    <section className="py-8 bg-zinc-800/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 style={{ fontSize: 35 }} className="text-4xl font-bold text-center mb-6 text-white">Kľúčové funkcie</h2>
        <div className="flex px-50  justify-evenly gap-30">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-4 rounded-md bg-zinc-700/70 shadow-md flex flex-col items-center max-w-[220px]"
            >
              <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4 overflow-hidden">
                <img 
                  src={feature.img} 
                  alt={feature.alt} 
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div className="mt-2">
                <h3 style={{ fontSize: 35 }} className="text-2xl font-semibold mb-2 text-center text-white">{feature.title}</h3>
                <p style={{ fontSize: 25 }} className="text-lg text-white text-center">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;