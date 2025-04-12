import React from 'react';
import aboutBackground from '../assets/about_background.png';

const AboutPage = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${aboutBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      className="w-full min-h-screen overflow-x-hidden"
    >
      <div className="w-full max-w-screen-md mx-auto flex flex-col items-center justify-center px-4 md:px-8 py-4 md:py-8">
        <h1 className="text-xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-shadow-2xs">O platformě</h1>
        <p className="text-base md:text-lg text-center bg-amber-100/80 rounded-lg p-4 md:p-8 mb-4 md:mb-8 shadow">
          Zažijte nový způsob učení s pomocí umělé inteligence. Pro studenty, učitele i profesionály.<br /><br />
          <span className="font-semibold">Vytvářejte studijní materiály:</span> Zrychlete své studium nebo profesní rozvoj díky rychlému generování přizpůsobených kartiček, kvízů a shrnutí pomocí našich AI nástrojů. Snadno přeměňte své poznámky na interaktivní materiály během několika kliknutí.<br /><br />
          <span className="font-semibold">Procvičujte a zdokonalujte se:</span> Prohlubte své znalosti díky detailním vysvětlením a přizpůsobenému obsahu. Ať už objevujete nové koncepty nebo si upevňujete stávající vědomosti, naše platforma se přizpůsobí vašim potřebám a podpoří váš neustálý růst.<br /><br />
          <span className="font-semibold">Studujte a spolupracujte:</span> Jednoduše sdílejte své vytvořené materiály s kolegy nebo učiteli. Posílejte kvízy, poznámky a kartičky, abyste obohatili skupinové studium nebo sdíleli své poznatky s ostatními během pár okamžiků.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;