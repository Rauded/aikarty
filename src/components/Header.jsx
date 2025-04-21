/**
 * Header component
 * Renders the main navigation bar for the application, including logo, navigation links, and authentication controls.
 * Features:
 * - Responsive design: desktop navigation and mobile hamburger menu.
 * - Shows different navigation options based on authentication state.
 * - Uses Clerk for user authentication.
 * - Handles menu open/close state for mobile navigation.
 * Usage: <Header />
 */

import aiKartyLogo from '../assets/ai_karty_logo6.svg';
import { Link, useNavigate } from 'react-router-dom';
import { useUser, SignOutButton } from '@clerk/clerk-react';
import React, { useState, useEffect } from 'react';

/**
 * Main Header functional component.
 * Uses state to manage mobile menu visibility and user authentication status.
 * Navigation links and authentication buttons are conditionally rendered for desktop and mobile.
 */
const Header = () => {
  // Clerk authentication state
  const { isSignedIn, isLoaded } = useUser();
  // State for mobile menu open/close
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black'
      }}
      className="w-full overflow-x-hidden sticky top-0 z-40 bg-orange-50 shadow-md"
    >
      <div className="relative flex flex-row items-center justify-between w-full max-w-screen-lg mx-auto px-4 md:px-8 py-2">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2 min-h-[44px]">
          <img src={aiKartyLogo} alt="AI Karty Logo" className="h-8 w-auto md:h-10" />
          <h1 className="text-base md:text-xl font-semibold">AI Karty</h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-row items-center gap-4">
          {/* Navigation */}
          <nav className="flex flex-row items-center gap-3" aria-label="Hlavná navigácia">
            <Link className="text-sm md:text-base min-h-[36px] px-2 py-1 rounded hover:bg-orange-100 transition" to="/">Home</Link>
            <Link className="text-sm md:text-base min-h-[36px] px-2 py-1 rounded hover:bg-orange-100 transition whitespace-nowrap" to="/generate">AI Flashcard Generator</Link>
            <Link className="text-sm md:text-base min-h-[36px] px-2 py-1 rounded hover:bg-orange-100 transition" to="/about">About</Link>
            <Link className="text-sm md:text-base min-h-[36px] px-2 py-1 rounded hover:bg-orange-100 transition" to="/print">Print</Link>
          </nav>
          
          {/* Auth Buttons */}
          <div className="flex flex-row items-center gap-3">
            {/* Show dashboard, editor, and logout if signed in; otherwise show login/register */}
            {isLoaded && isSignedIn ? (
              <>
                <Link
                  className="text-sm md:text-base min-h-[36px] px-3 py-1 rounded bg-orange-200 hover:bg-orange-300 transition text-center"
                  to="/dashboard"
                >
                  Dashboard
                </Link>
                <Link
                  className="text-sm md:text-base min-h-[36px] px-3 py-1 rounded bg-orange-200 hover:bg-orange-300 transition text-center"
                  to="/flashcards-editor"
                  state={{ flashcards: [] }}
                >
                  Flashcard Editor
                </Link>
                <SignOutButton>
                  <button className="text-sm md:text-base min-h-[36px] px-3 py-1 rounded bg-orange-100 hover:bg-orange-200 transition text-center">
                    Log out
                  </button>
                </SignOutButton>
              </>
            ) : (
              <>
                <Link
                  className="text-sm md:text-base min-h-[36px] px-3 py-1 rounded hover:bg-orange-100 transition text-center"
                  to="/login"
                >
                  Prihlasenie
                </Link>
                <Link
                  className="text-sm md:text-base min-h-[36px] px-3 py-1 rounded hover:bg-orange-100 transition text-center"
                  to="/register"
                >
                  Registracia
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Hamburger menu button (mobile only) - stays visible even when menu is open */}
        <button
          className="md:hidden flex items-center justify-center min-h-[44px] px-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400 z-50"
          aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="h-7 w-7 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Show X icon if menu is open, hamburger otherwise */}
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
        
        {/* Mobile menu overlay */}
        {menuOpen && (
          <>
            {/* Transparent backdrop for click handling */}
            <div
              className="fixed inset-0 z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            ></div>
            
            {/* Side menu */}
            <div className="fixed top-0 right-0 bottom-0 w-64 bg-orange-50 shadow-lg z-45 md:hidden flex flex-col overflow-y-auto transform transition-transform duration-300 ease-in-out pt-16">
              <div className="p-4 flex-1">
                {/* Navigation */}
                <nav className="flex flex-col gap-3 mb-6" aria-label="Hlavná navigácia">
                  <h2 className="text-lg font-semibold mb-2">Menu</h2>
                  <Link className="text-base min-h-[44px] px-2 py-2 rounded hover:bg-orange-100 transition" to="/" onClick={() => setMenuOpen(false)}>Domov</Link>
                  <Link className="text-base min-h-[44px] px-2 py-2 rounded hover:bg-orange-100 transition" to="/generate" onClick={() => setMenuOpen(false)}>AI Generator Kariet</Link>
                  <Link className="text-base min-h-[44px] px-2 py-2 rounded hover:bg-orange-100 transition" to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                  <Link className="text-base min-h-[44px] px-2 py-2 rounded hover:bg-orange-100 transition" to="/print" onClick={() => setMenuOpen(false)}>Tlač a doručenie</Link>
                </nav>
                
                {/* Auth Buttons */}
                <div className="flex flex-col gap-3">
                  <h2 className="text-lg font-semibold mb-2">Účet</h2>
                  {/* Show dashboard, editor, and logout if signed in; otherwise show login/register */}
                  {isLoaded && isSignedIn ? (
                    <>
                      <Link
                        className="text-base min-h-[44px] px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition text-center"
                        to="/dashboard"
                        onClick={() => setMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        className="text-base min-h-[44px] px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition text-center"
                        to="/flashcards-editor"
                        state={{ flashcards: [] }}
                        onClick={() => setMenuOpen(false)}
                      >
                        Flashcard Editor
                      </Link>
                      <SignOutButton>
                        <button
                          className="text-base min-h-[44px] px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition text-center w-full"
                          onClick={() => setMenuOpen(false)}
                        >
                          Log out
                        </button>
                      </SignOutButton>
                    </>
                  ) : (
                    <>
                      <Link
                        className="text-base min-h-[44px] px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition text-center"
                        to="/login"
                        onClick={() => setMenuOpen(false)}
                      >
                        Prihlasenie
                      </Link>
                      <Link
                        className="text-base min-h-[44px] px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition text-center"
                        to="/register"
                        onClick={() => setMenuOpen(false)}
                      >
                        Registracia
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;