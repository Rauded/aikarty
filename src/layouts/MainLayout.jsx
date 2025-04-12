import { Outlet } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full overflow-x-hidden bg-orange-50">
      <Header />

      <main className="flex-1 w-full max-w-screen-lg mx-auto px-4 md:px-8 py-4">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;