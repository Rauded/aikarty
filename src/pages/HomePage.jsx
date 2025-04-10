import { Link } from 'react-router-dom';
import Button from '../components/Button';
import KeyFeatures from '../components/KeyFeatures';
import CallToAction from '../components/CallToAction';
import Hero from '../components/Hero';
import upload_img from '../assets/upload_ghib.png';
import ai_img from '../assets/ai_ghib.png';
import book_img from '../assets/book_ghib.png';
import background_img from '../assets/background1.png';



const HomePage = () => {
  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-shadow"
      style={{ backgroundImage: `url(${background_img})` }}
    >
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <Hero />
        <h1 style={{ fontSize: 50 }} className="text-5xl font-bold mb-4 text-white text-shadow">Vitaj u AI generátoru kariet</h1>
        <p style={{ fontSize: 25 }} className="mb-4 text-2xl text-white text-shadow">
          Beznámahy promeň svoje poznámky, články alebo studíjni materiály na interaktivní karty.
        </p>

        <section className="py-8 bg-zinc-800/50 mb-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 style={{ fontSize: 35 }} className="text-3xl font-bold text-center mb-6 text-white text-shadow">Ako to funguje</h2>
            <div className="flex flex-wrap justify-evenly gap-4">
              <div className="p-4 rounded-md bg-zinc-700/70 shadow-md flex flex-col items-center max-w-[220px]">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                  <img src={upload_img} alt="placeholder" className="h-10 w-10 rounded-full" />
                </div>
                <div className="mt-2 p-2 rounded-md">
                  <h3 style={{ fontSize: 40 }} className="text-xl font-semibold mb-2 text-center text-white text-shadow">Vložte</h3>
                  <p style={{ fontSize: 30 }} className="text-base text-white text-center">Vlož text alebo dokumenty</p>
                </div>
              </div>
              <div className="p-4 rounded-md bg-zinc-700/70 shadow-md flex flex-col items-center max-w-[220px]">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                  <img src={ai_img} alt="placeholder" className="h-10 w-10 rounded-full" />
                </div>
                <div className="mt-2 p-2 rounded-md">
                  <h3 style={{ fontSize: 40 }} className="text-xl font-semibold mb-2 text-center text-white text-shadow">Generujte</h3>
                  <p style={{ fontSize: 30 }} className="text-base text-white text-center">Náš nástroj generuje karty za teba</p>
                </div>
              </div>
              <div className="p-4 rounded-md bg-zinc-700/70 shadow-md flex flex-col items-center max-w-[220px]">
                <div className="h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center mb-4">
                  <img src={book_img} alt="placeholder" className="h-10 w-10 rounded-full" />
                </div>
                <div className="mt-2 p-2 rounded-md">
                  <h3 style={{ fontSize: 40 }} className="text-xl font-semibold mb-2 text-center text-white text-shadow">Přehlídnete</h3>
                  <p style={{ fontSize: 30 }} className="text-xs text-zinc-300 text-center">Editujte, exportujte a studujte svoje karty</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <KeyFeatures />
        
        {/* Adding space with a direct spacer element */}
        <div style={{ height: "160px" }}></div>
        
        <div>
          <h3>
            <Link to="/generate">
              <Button
                style={{ fontSize: 50}}
                className=""
              >
                Start Learning Now
              </Button>
            </Link>
          </h3>
        </div>
        
        {/* Adding space with a direct spacer element */}
        <div style={{ height: "160px" }}></div>
        
      </div >
    </div>
  );
};

export default HomePage;