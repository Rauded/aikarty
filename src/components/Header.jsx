import aiKartyLogo from '../assets/ai_karty_logo6.svg';
// import headerBackground from '../assets/header_background.png'; // Uncomment if you decide to use it
import { Link, useNavigate } from 'react-router-dom';
import { useUser, SignOutButton } from '@clerk/clerk-react';

const Header = () => {
  const { isSignedIn, isLoaded } = useUser();
  const homeTarget = isSignedIn ? "/dashboard" : "/";

  return (
    <header
      style={{
        // backgroundImage: `url(${headerBackground})`, // Uncomment if needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black'
      }}
      className="flex items-center mx-auto gap-8 w-screen sticky top-0 z-50 bg-orange-50 p-1 shadow-md"
    >
      {/* Left Section: Logo, Title, Navigation */}
      {/* Logo and Title Group */}
      <Link to={homeTarget} className="flex items-center m-auto">
        <img src={aiKartyLogo} alt="AI Karty Logo" className="" />
        <h1 className="text-xl">AI Karty</h1>
      </Link>

      {/* Navigation */}
      <nav className="m-auto space-x-4">
        <Link className="text-xl" to={homeTarget}>Domov</Link>
        <Link className="text-xl" to="/generate">AI Generator Kariet</Link>
        <Link className="text-xl" to="/about">O projekte</Link>
        <Link className="text-xl" to="/print">Tlač a doručenie</Link>
      </nav>

      {/* Right Section: Auth Buttons */}
      <div className="m-auto space-x-4 flex items-center">
        {isLoaded && isSignedIn ? (
          <>
            <Link
              className="text-xl px-4 py-2 rounded bg-orange-200 hover:bg-orange-300 transition"
              to="/flashcards-editor"
              state={{ flashcards: [] }}
            >
              Flashcard Editor
            </Link>
            <SignOutButton>
              <button className="text-xl px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition">Log out</button>
            </SignOutButton>
          </>
        ) : (
          <>
            <Link
              className="text-xl"
              to="/login"
            >
              Prihlasenie
            </Link>
            <Link
              className="text-xl"
              to="/register"
            >
              Registracia
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;