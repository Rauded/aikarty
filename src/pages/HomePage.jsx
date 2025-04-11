import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import upload_img from '../assets/upload_ghib.png';
import ai_img from '../assets/ai_ghib.png';
import book_img from '../assets/book_ghib.png';
import background_img from '../assets/background1.png';
import heroImage from '../assets/hero_image.png';
import TiltImg from '../components/TiltImg';
import alternateImage from '../assets/hero_image_back.png';

import notes_img from '../assets/notes_ghib.png';
import pencil_img from '../assets/pencil_ghib_1.png';
import clock_img from '../assets/clock_ghib_1.png';


const HomePage = () => {
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

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

  const steps = [
    {
      number: '1',
      title: 'Upload Content',
      description: 'Paste in your text or upload PDF study materials',
      icon: upload_img,
    },
    {
      number: '2',
      title: 'AI Processing',
      description: 'Our AI breaks down content into atomic flashcards',
      icon: ai_img,
    },
    {
      number: '3',
      title: 'Save & Organize',
      description: 'Review, customize, and save your generated flashcard decks',
      icon: book_img,
    },
    {
      number: '4',
      title: 'Study & Improve',
      description: 'Study using our smart review system to maximize retention',
      icon: clock_img,
    },
  ];

  return (
  <div className="min-w-screen min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background_img})` }}>
      <div className="container mx-auto px-4">
        <section className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto pt-12">
          {/* Left column - Text content */}
          <div className="w-full p-8">
            <h1 className="text-5xl font-bold mb-6 text-center md:text-left text-white text-shadow-2xs">
              Master Any Subject with AI-Powered Flashcards
            </h1>
            <p className="text-lg mb-8 text-center md:text-left text-white text-shadow-2xs">
              Upload your study materials and let our AI break them down into perfect atomic flashcards for more effective learning.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-8">
              <button
                className="bg-black hover:bg-gray-900 text-white font-medium py-3 px-6 rounded-lg"
                onClick={() => navigate('/generate')}
              >
                ⚡ Začni se učit
              </button>
              <button
                className="bg-blue-700 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg"
                onClick={() => {
                  const section = document.getElementById('how-it-works');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Ako to funguje
              </button>
            </div>
          </div>
          
          {/* Right column - Image */}
          <div className="p-4 ml-6 mt-8">
            <div
              className="flex justify-center"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <TiltImg
                src={isHovering ? alternateImage : heroImage}
                alt={isHovering ? "AI Flashcard Demo (alternate)" : "AI Flashcard Demo"}
              />
            </div>
          </div>
        </section>

        <h1 className='flex mx-auto justify-center text-white text-shadow-2xs text-4xl p-6 mt-30'>Vitaj u AI generátoru kariet</h1>
        <p className='flex justify-center mx-auto text-white text-shadow-2xs text-2xl'>
          Beznámahy promeň svoje poznámky, články alebo studíjni materiály na interaktivní karty.
        </p>

        <section className="py-12" id="how-it-works">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-white text-shadow-2xs">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-white text-shadow-2xs text-2xl">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6"
                >
                  <div className="mb-4">
                    <img src={step.icon} alt={step.title} className="h-80 w-auto" />
                  </div>
                  <div className="w-10 h-10 flex items-center justify-center text-white mb-4 text-2xl">
                    {step.number}
                  </div>
                  <h3 className="text-3xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-white">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
        <section className="py-12 ">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Kľúčové funkcie</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-6"
                >
                  <div className="mb-6">
                    <img
                      src={feature.img}
                      alt={feature.alt}
                      className="w-auto h-80"
                    />
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-3xl font-semibold text-white">{feature.title}</h3>
                    <p className="text-white text-2xl">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Adding space with a direct spacer element */}
        <div></div>
        
        <div>
          <h3 className='items-center mx-auto flex justify-center p-12'>
            <Link to="/generate">
              <Button
                className="bg-black hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg"
              >
                Start Learning Now
              </Button>
            </Link>
          </h3>
        </div>
        
        {/* Adding space with a direct spacer element */}
        <div></div>
        
      </div >
    </div>
  );
};
<script type="text/javascript" src="vanilla-tilt.js"></script>
export default HomePage;