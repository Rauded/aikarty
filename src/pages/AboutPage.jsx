import React from 'react';
import aboutBackground from '../assets/about_background.png';

const AboutPage = () => {
  return (
    <div
      className="max-w-4xl mx-auto px-4 py-8 items-center text-center shadow-md text-shadow min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${aboutBackground})` }}
    >
      <h1 className="text-5xl font-bold mb-6 text-center drop-shadow" style={{ fontSize: 20 }}>O platformě</h1>

      <p className="text-xl mb-8 text-center drop-shadow" style={{ fontSize: 20 }}>
        Zažijte nový způsob učení s pomocí umělé inteligence. Pro studenty, učitele i profesionály.
      </p>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 drop-shadow" style={{ fontSize: 20 }}>Vytvářejte studijní materiály</h2>
        <p className="text-xl" style={{ fontSize: 20 }}>
          Zrychlete své studium nebo profesní rozvoj díky rychlému generování přizpůsobených kartiček, kvízů a shrnutí pomocí našich AI nástrojů. Snadno přeměňte své poznámky na interaktivní materiály během několika kliknutí.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-3xl font-semibold mb-4 drop-shadow" style={{ fontSize: 20 }}>Procvičujte a zdokonalujte se</h2>
        <p className="text-xl" style={{ fontSize: 20 }}>
          Prohlubte své znalosti díky detailním vysvětlením a přizpůsobenému obsahu. Ať už objevujete nové koncepty nebo si upevňujete stávající vědomosti, naše platforma se přizpůsobí vašim potřebám a podpoří váš neustálý růst.
        </p>
      </section>

      <section>
        <h2 className="text-3xl font-semibold mb-4 drop-shadow">Studujte a spolupracujte</h2>
        <p className="text-xl" style={{height: 400}}>
          Jednoduše sdílejte své vytvořené materiály s kolegy nebo učiteli. Posílejte kvízy, poznámky a kartičky, abyste obohatili skupinové studium nebo sdíleli své poznatky s ostatními během pár okamžiků.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;