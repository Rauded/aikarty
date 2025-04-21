/**
 * This file defines a React component called AboutPage.
 * In React, a "page" component is used to show the content for a specific page in your app (like "About", "Home", or "Contact").
 * This AboutPage shows information about the platform, including what it does and how it helps users.
 *
 * Usage: This component is usually shown when the user navigates to the "/about" route.
 */

import React from 'react';
import aboutBackground from '../assets/about_background.png';

/**
 * The AboutPage component doesn't take any props.
 * It displays a background image and some text explaining the platform.
 */
const AboutPage = () => {
  return (
    // This <div> is the main container for the page.
    // The style prop sets a background image and makes it cover the whole screen.
    <div
      style={{
        backgroundImage: `url(${aboutBackground})`, // Sets the background image
        backgroundSize: 'cover', // Makes the image cover the whole area
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat' // Prevents the image from repeating
      }}
      className="w-full min-h-screen overflow-x-hidden"
    >
      {/* This <div> centers the content and adds padding. */}
      <div className="w-full max-w-screen-md mx-auto flex flex-col items-center justify-center px-4 md:px-8 py-4 md:py-8">
        {/* This is the main heading for the About page. */}
        <h1 className="text-xl md:text-4xl font-bold text-center mb-4 md:mb-8 text-shadow-2xs text-white">O platformě</h1>
        {/* This <p> contains the main description of the platform.
            It uses <span> tags to highlight certain parts in bold. */}
        <p className="text-base md:text-lg text-center bg-amber-100/80 rounded-lg p-4 md:p-8 mb-4 md:mb-8 shadow text-gray-800 text-shadow-2xs">
          Zažijte nový způsob učení s pomocí umělé inteligence. Pro studenty, učitele i profesionály.<br /><br />
          <span className="font-semibold">Vytvářejte studijní materiály:</span> Zrychlete své studium nebo profesní rozvoj díky rychlému generování přizpůsobených kartiček, kvízů a shrnutí pomocí našich AI nástrojů. Snadno přeměňte své poznámky na interaktivní materiály během několika kliknutí.<br /><br />
          <span className="font-semibold">Procvičujte a zdokonalujte se:</span> Prohlubte své znalosti díky detailním vysvětlením a přizpůsobenému obsahu. Ať už objevujete nové koncepty nebo si upevňujete stávající vědomosti, naše platforma se přizpůsobí vašim potřebám a podpoří váš neustálý růst.<br /><br />
          <span className="font-semibold">Studujte a spolupracujte:</span> Jednoduše sdílejte své vytvořené materiály s kolegy nebo učiteli. Posílejte kvízy, poznámky a kartičky, abyste obohatili skupinové studium nebo sdíleli své poznatky s ostatními během pár okamžiků.
        </p>
      </div>
    </div>
  );
};

// This line makes the AboutPage component available for use in other files.
export default AboutPage;