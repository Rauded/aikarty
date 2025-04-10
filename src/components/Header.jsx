import aiKartyLogo from '../assets/ai_karty_logo6.svg';
// import headerBackground from '../assets/header_background.png'; // Uncomment if you decide to use it
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header
      style={{
        // backgroundImage: `url(${headerBackground})`, // Uncomment if needed
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'black'
      }}
      // Changes:
      // - Increased horizontal padding from px-8 to px-16 for more space at the ends.
      // - Kept justify-between to push main sections apart.
      className="flex justify-evenly items-center text-black" // Increased px-8 to px-16
    >
      {/* Left Section: Logo, Title, Navigation */}
      <div className="flex items-center justify-evenly w-1/2">
        {/* Logo and Title Group */}
        <Link to="/" className="flex items-center flex-shrink-0">
          <img src={aiKartyLogo} alt="AI Karty Logo" className="w-8 h-8 rounded-md" />
          <h1 style={{ fontSize: 20 }} className="ml-2 text-xl font-bold text-shadow">AI Karty</h1>
        </Link>

        {/* Navigation */}
        {/* Changes:
            - Increased spacing between nav links from space-x-8 to space-x-12.
            - Kept ml-10 for space between title and nav start (adjust if needed).
         */}
        <nav className="flex items-center justify-evenly w-1 m-20px gap-20px mx-20  "> {/* Increased space-x-12 to space-x-20, ml-10 to ml-16 */}
          <Link style={{ fontSize: 20 }} className="transition hover:text-zinc-300 text-sm whitespace-nowrap gap-50px" to="/">Domov</Link> {/* Added whitespace-nowrap */}
          <Link style={{ fontSize: 20 }} className="transition hover:text-zinc-300 text-sm whitespace-nowrap" to="/generate">AI Generator Kariet</Link> {/* Added whitespace-nowrap */}
          <Link style={{ fontSize: 20 }} className="transition hover:text-zinc-300 text-sm whitespace-nowrap" to="/about">O projekte</Link> {/* Added whitespace-nowrap */}
          <Link style={{ fontSize: 20 }} className="transition hover:text-zinc-300 text-sm whitespace-nowrap" to="/print">Tlač a doručenie</Link> {/* Added whitespace-nowrap */}
        </nav>
      </div>

      {/* Right Section: Auth Buttons */}
      {/* Spacing between buttons remains controlled by space-x-4 */}
      <div className="flex items-center space-x-40 gap-20px m-20px">
        <Link
          style={{ fontSize: 20 }} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition whitespace-nowrap" // Added whitespace-nowrap
          to="/login"
        >
          Prihlasenie
        </Link>
        <Link
          style={{ fontSize: 20 }} className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-100 rounded-md text-sm font-medium transition whitespace-nowrap" // Added whitespace-nowrap
          to="/register"
        >
          Registracia
        </Link>
      </div>
    </header>
  );
};

export default Header;