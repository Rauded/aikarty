/**
 * This file defines a React component called HomePage.
 * The HomePage is the landing page of the app. A landing page is the first thing users see when they visit your site.
 * It introduces the app, explains its features, and guides users to get started.
 *
 * Usage: This component is usually shown when the user navigates to the "/" route.
 */

/*
 * Importing React and useState from the 'react' library.
 * React is the main library for building user interfaces.
 * useState is a special function (called a "hook") that lets us add state (data that can change) to our component.
 */
import React, { useState } from 'react';

/*
 * Importing Link and useNavigate from 'react-router-dom'.
 * - Link is used to create links to other pages in our app without reloading the page.
 * - useNavigate is a hook that lets us change the page programmatically (for example, after a button click).
 */
import { Link, useNavigate } from 'react-router-dom';

/*
 * Importing a custom Button component from our components folder.
 * This is a reusable button that we can style and use throughout our app.
 */
import Button from '../components/Button';

/*
 * Importing images that we will use on the page.
 * These are imported as variables so we can use them in our JSX code.
 */
import upload_img from '../assets/upload_ghib.png';
import ai_img from '../assets/ai_ghib.png';
import book_img from '../assets/book_ghib.png';
import background_img from '../assets/background1.png';
import heroImage from '../assets/hero_image.png';
import TiltImg from '../components/TiltImg'; // This is a custom image component with a tilt effect
import alternateImage from '../assets/hero_image_back.png';

import notes_img from '../assets/notes_ghib.png';
import pencil_img from '../assets/pencil_ghib_1.png';
import clock_img from '../assets/clock_ghib_1.png';

/**
 * The HomePage component doesn't take any props (inputs).
 * It uses state for image hover effects and arrays for features and steps.
 */
const HomePage = () => {
  // State to track if the user is hovering over the hero image (for animation)
  // isHovering will be true if the mouse is over the image, false otherwise
  // setIsHovering is a function we use to change the value of isHovering
  const [isHovering, setIsHovering] = useState(false);

  // useNavigate lets us programmatically change the page (route) in our app
  const navigate = useNavigate();

  // List of key features to display on the page
  // This is an array of objects, where each object represents a feature
  // We will use this array to show the features in the "Key Features" section
  const features = [
    {
      img: notes_img, // The image to show for this feature
      alt: 'Easy to Use', // Alternative text for the image (for accessibility)
      title: 'Ľahké použitie', // The title of the feature (in Slovak)
      description: 'Jednoduché a intuitívne rozhranie pre vytváranie flash kartičiek rýchlo', // Description of the feature
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

  // List of steps to show how the app works
  // This is another array of objects, each representing a step in the process
  const steps = [
    {
      number: '1', // The step number
      title: 'Upload Content', // The title of the step
      description: 'Paste in your text or upload PDF study materials', // What the user does in this step
      icon: upload_img, // The icon to show for this step
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

  // The return statement defines what will be shown on the screen
  // This is written in JSX, which looks like HTML but lets us use JavaScript too
  return (
    // This <div> is the main container for the home page, with a background image.
    // className sets the CSS classes for styling (using Tailwind CSS here)
    <div
      className="w-full min-h-screen bg-auto bg-no-repeat overflow-x-hidden"
      style={{ backgroundImage: `url(${background_img})` }} // This sets the background image
    >
      {/* This <div> centers the content and adds padding */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-16 py-4 md:py-8 lg:py-12">
        {/* Hero section: main headline, description, and call-to-action buttons */}
        <section className="hero flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 lg:gap-16 pt-6 md:pt-12 lg:pt-16">
          {/* Left column - Text content */}
          <div className="w-full md:w-1/2 px-2 py-4 md:p-8 lg:p-12">
            {/* Main headline for the page */}
            <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold mb-4 md:mb-6 lg:mb-8 text-center md:text-left text-white text-shadow-2xs">
              Master Any Subject with AI-Powered Flashcards
            </h1>
            {/* Short description under the headline */}
            <p className="text-base md:text-lg lg:text-xl mb-4 md:mb-8 text-center md:text-left text-white text-shadow-2xs">
              Upload your study materials and let our AI break them down into perfect atomic flashcards for more effective learning.
            </p>
            {/* Buttons for user actions */}
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 md:gap-8">
              {/* Button to go to the flashcard generator page */}
              <button
                className="bg-black hover:bg-gray-900 text-white font-medium min-h-[44px] py-2 md:py-3 px-4 md:px-6 lg:px-8 rounded-lg text-base md:text-lg lg:text-xl"
                // When this button is clicked, navigate to the "/generate" page
                onClick={() => navigate('/generate')}
              >
                {/* The text on the button (in Slovak) */}
                ⚡ Začni se učit
              </button>
              {/* Button to scroll to the "How It Works" section */}
              <button
                className="bg-blue-700 hover:bg-blue-600 text-white font-medium min-h-[44px] py-2 md:py-3 px-4 md:px-6 lg:px-8 rounded-lg text-base md:text-lg lg:text-xl"
                // When this button is clicked, scroll smoothly to the section with id "how-it-works"
                onClick={() => {
                  const section = document.getElementById('how-it-works');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {/* The text on the button (in Slovak) */}
                Ako to funguje
              </button>
            </div>
          </div>
          
          {/* Right column - Interactive hero image */}
          <div className="p-2 md:p-4 lg:p-8 mt-6 md:mt-0 w-full md:w-1/2 flex justify-center">
            <div
              className="flex justify-center"
              // When the mouse enters the image area, set isHovering to true
              onMouseEnter={() => setIsHovering(true)}
              // When the mouse leaves the image area, set isHovering to false
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* TiltImg is a custom component that adds a 3D tilt effect to the image */}
              {/* The image changes when you hover over it */}
              <TiltImg
                src={isHovering ? alternateImage : heroImage} // Show alternate image if hovering
                alt={isHovering ? "AI Flashcard Demo (alternate)" : "AI Flashcard Demo"} // Change alt text too
                className="object-contain max-h-40 md:max-h-64 lg:max-h-96 w-full"
              />
            </div>
          </div>
        </section>

        {/* Welcome section */}
        <div className="py-8 md:py-12 lg:py-16 max-w-8xl mx-auto">
          {/* Welcome headline (in Slovak) */}
          <h1 className='text-white text-shadow-2xs text-xl md:text-3xl lg:text-5xl font-bold text-center mb-4 lg:mb-6'>
            Vitaj u AI generátoru kariet
          </h1>
          {/* Welcome description (in Slovak) */}
          <p className='text-white text-shadow-2xs text-base md:text-xl lg:text-2xl text-center mb-4 md:mb-8'>
            Beznámahy promeň svoje poznámky, články alebo studíjni materiály na interaktivní karty.
          </p>
        </div>

        {/* How It Works section */}
        <section className="py-6 md:py-12 lg:py-16" id="how-it-works">
          <div className="px-0">
            {/* Section headline */}
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 lg:mb-12 text-white text-shadow-2xs">
              How It Works
            </h2>
            {/* Grid to show each step */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-10 text-white text-shadow-2xs">
              {/* Show each step in the process */}
              {steps.map((step, index) => (
                // For each step, create a card with the icon, number, title, and description
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 md:p-6 lg:p-8 bg-orange-100/10 rounded-lg hover:bg-orange-100/20 transition-all duration-300"
                >
                  <div className="mb-2 md:mb-4 lg:mb-6">
                    {/* Show the icon for this step */}
                    <img src={step.icon} alt={step.title} className="object-contain h-24 md:h-32 lg:h-40 w-full" />
                  </div>
                  <div className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center text-white mb-2 md:mb-4 text-lg md:text-2xl">
                    {/* Show the step number */}
                    {step.number}
                  </div>
                  {/* Show the step title */}
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold mb-2 md:mb-3">{step.title}</h3>
                  {/* Show the step description */}
                  <p className="text-white text-sm md:text-base lg:text-lg">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Key Features section */}
        <section className="py-6 md:py-12 lg:py-16">
          <div className="px-0">
            {/* Section headline (in Slovak) */}
            <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-10 lg:mb-12 text-white">
              Kľúčové funkcie
            </h2>
            {/* Grid to show each feature */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
              {/* Show each feature */}
              {features.map((feature, index) => (
                // For each feature, create a card with the image, title, and description
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 md:p-6 lg:p-8 bg-orange-100/10 rounded-lg hover:bg-orange-100/20 transition-all duration-300"
                >
                  <div className="mb-4 md:mb-6 lg:mb-8">
                    {/* Show the image for this feature */}
                    <img
                      src={feature.img}
                      alt={feature.alt}
                      className="object-contain h-24 md:h-32 lg:h-40 w-full"
                    />
                  </div>
                  <div className="space-y-2 md:space-y-3">
                    {/* Show the feature title */}
                    <h3 className="text-lg md:text-2xl lg:text-3xl font-semibold text-white">{feature.title}</h3>
                    {/* Show the feature description */}
                    <p className="text-white text-sm md:text-base lg:text-lg">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to action: button to start learning */}
        <div className="py-6 md:py-12 lg:py-16">
          <div className="flex justify-center">
            {/* Link to the flashcard generator page */}
            <Link to="/generate">
              {/* Custom Button component */}
              <Button
                className="bg-black hover:bg-blue-700 text-white font-medium min-h-[44px] py-3 md:py-4 px-6 md:px-8 lg:px-10 rounded-lg text-base md:text-lg lg:text-xl transition-colors duration-300"
              >
                Start Learning Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/*
 * This line makes the HomePage component available for use in other files.
 * When you import HomePage elsewhere, you get this component.
 */
export default HomePage;