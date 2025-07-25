import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {}
      <Header />

      {}
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <Outlet /> {}
      </main>

      {}
      <Footer />
    </div>
  );
}