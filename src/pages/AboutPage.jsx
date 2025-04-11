import React from 'react';
import aboutBackground from '../assets/about_background.png';

const AboutPage = () => {
  return (
    <div
      style={{ backgroundImage: `url(${aboutBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'}}
      className='h-screen w-screen'>
      <h1 className='flex mx-auto items-center justify-center text-4xl p-4 text-shadow-2xs'>O platformě</h1>
      {/*
      <p className='text-center p-12 justify-center text-2xl bg-amber-200 mt-100'>Zažijte nový způsob učení s pomocí umělé inteligence. Pro studenty, učitele i profesionály.
        Vytvářejte studijní materiály
        Zrychlete své studium nebo profesní rozvoj díky rychlému generování přizpůsobených kartiček, kvízů a shrnutí pomocí našich AI nástrojů. Snadno přeměňte své poznámky na interaktivní materiály během několika kliknutí.
        Procvičujte a zdokonalujte se
        Prohlubte své znalosti díky detailním vysvětlením a přizpůsobenému obsahu. Ať už objevujete nové koncepty nebo si upevňujete stávající vědomosti, naše platforma se přizpůsobí vašim potřebám a podpoří váš neustálý růst.
        Studujte a spolupracujte
        Jednoduše sdílejte své vytvořené materiály s kolegy nebo učiteli. Posílejte kvízy, poznámky a kartičky, abyste obohatili skupinové studium nebo sdíleli své poznatky s ostatními během pár okamžiků.
      </p>
      */}
    </div>
  );
};

export default AboutPage;