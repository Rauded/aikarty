import aiKartyLogo from '../assets/ai_karty_logo6.svg';
// import headerBackground from '../assets/header_background.png'; // Uncomment if you decide to use it
import { Link, useNavigate } from 'react-router-dom';
import { useUser, SignOutButton } from '@clerk/clerk-react';
// Responsive, mobile-first header with hamburger menu and accessible touch targets
import React, { useState } from 'react';
// import headerBackground from '../assets/header_background.png'; // Uncomment if you decide to use it


const Header = () => {
  const { isSignedIn, isLoaded } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      style={{
        // backgroundImage: `url(${headerBackground})`, // Uncomment if needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black'
      }}
      className="w-full overflow-x-hidden sticky top-0 z-50 bg-orange-50 shadow-md"
    >
      <div className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-screen-lg mx-auto px-4 md:px-8 py-2 md:py-3 gap-2 md:gap-8">
        {/* Logo and Title */}
        <Link to="/" className="flex items-center gap-2 min-h-[44px]">
          <img src={aiKartyLogo} alt="AI Karty Logo" className="h-8 w-auto md:h-10" />
          <h1 className="text-base md:text-xl font-semibold">AI Karty</h1>
        </Link>

        {/* Hamburger menu button (mobile only) */}
        <button
          className="md:hidden flex items-center justify-center min-h-[44px] px-3 rounded focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label={menuOpen ? "Zavrieť menu" : "Otvoriť menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            className="h-7 w-7 text-orange-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>

        {/* Navigation and Auth (desktop or mobile menu open) */}
        {/* Mobile menu (dropdown) */}
        <div>
          {/* Desktop menu */}
          <div className="hidden md:flex flex-row items-center gap-8 w-auto">
            {/* Navigation */}
            <nav className="flex flex-row items-center gap-4 w-auto" aria-label="Hlavná navigácia">
              <Link className="text-base md:text-xl min-h-[44px] px-2 py-1 rounded hover:bg-orange-100 transition" to="/" onClick={() => setMenuOpen(false)}>Domov</Link>
              <Link className="text-base md:text-xl min-h-[44px] px-2 py-1 rounded hover:bg-orange-100 transition" to="/generate" onClick={() => setMenuOpen(false)}>AI Generator Kariet</Link>
              <Link className="text-base md:text-xl min-h-[44px] px-2 py-1 rounded hover:bg-orange-100 transition" to="/about" onClick={() => setMenuOpen(false)}>O projekte</Link>
              <Link className="text-base md:text-xl min-h-[44px] px-2 py-1 rounded hover:bg-orange-100 transition" to="/print" onClick={() => setMenuOpen(false)}>Tlač a doručenie</Link>
            </nav>
            {/* Auth Buttons */}
            <div className="flex flex-row items-center gap-4 w-auto">
              {isLoaded && isSignedIn ? (
                <>
                  <Link
                    className="text-base md:text-xl min-h-[44px] px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition w-auto text-center"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link
                    className="text-base md:text-xl min-h-[44px] px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition w-auto text-center"
                    to="/flashcards-editor"
                    state={{ flashcards: [] }}
                  >
                    Flashcard Editor
                  </Link>
                  <SignOutButton>
                    <button className="text-base md:text-xl min-h-[44px] px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition w-auto text-center">
                      Log out
                    </button>
                  </SignOutButton>
                </>
              ) : (
                <>
                  <Link
                    className="text-base md:text-xl min-h-[44px] px-4 py-2 rounded hover:bg-orange-100 transition w-auto text-center"
                    to="/login"
                  >
                    Prihlasenie
                  </Link>
                  <Link
                    className="text-base md:text-xl min-h-[44px] px-4 py-2 rounded hover:bg-orange-100 transition w-auto text-center"
                    to="/register"
                  >
                    Registracia
                  </Link>
                </>
              )}
            </div>
          </div>
          {/* Mobile menu (dropdown) */}
          {menuOpen && (
            <div className="absolute left-0 right-0 top-full z-[999] bg-orange-50 shadow-lg flex flex-col items-center gap-4 px-4 py-4 md:hidden animate-fade-in w-full border-b border-orange-200">
              {/* Navigation */}
              <nav className="flex flex-col items-center gap-2 w-full" aria-label="Hlavná navigácia">
                <Link className="text-base min-h-[44px] px-2 py-1 rounded hover:bg-orange-100 transition w-full text-center" to="/" onClick={() => setMenuOpen(false)}>Domov</Link>
                <Link className="text-base min-h-[44px] px-2 py-1 rounded hover:bg-orange-100 transition w-full text-center" to="/generate" onClick={() => setMenuOpen(false)}>AI Generator Kariet</Link>
                <Link className="text-base min-h-[44px] px-2 py-1 rounded hover:bg-orange-100 transition w-full text-center" to="/about" onClick={() => setMenuOpen(false)}>O projekte</Link>
                <Link className="text-base min-h-[44px] px-2 py-1 rounded hover:bg-orange-100 transition w-full text-center" to="/print" onClick={() => setMenuOpen(false)}>Tlač a doručenie</Link>
              </nav>
              {/* Auth Buttons */}
              <div className="flex flex-col items-center gap-2 w-full">
                {isLoaded && isSignedIn ? (
                  <>
                    <Link
                      className="text-base min-h-[44px] px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition w-full text-center"
                      to="/dashboard"
                      onClick={() => setMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      className="text-base min-h-[44px] px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition w-full text-center"
                      to="/flashcards-editor"
                      state={{ flashcards: [] }}
                      onClick={() => setMenuOpen(false)}
                    >
                      Flashcard Editor
                    </Link>
                    <SignOutButton>
                      <button className="text-base min-h-[44px] px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition w-full text-center">
                        Log out
                      </button>
                    </SignOutButton>
                  </>
                ) : (
                  <>
                    <Link
                      className="text-base min-h-[44px] px-4 py-2 rounded hover:bg-orange-100 transition w-full text-center"
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                    >
                      Prihlasenie
                    </Link>
                    <Link
                      className="text-base min-h-[44px] px-4 py-2 rounded hover:bg-orange-100 transition w-full text-center"
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                    >
                      Registracia
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;