import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Chat from '../common/Chat';

const Layout: React.FC = () => {
  const [, setIsSideMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLDivElement>(null);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  const toggleSideMenu = () => setIsSideMenuOpen(v => !v);

  return (
    <div className="flex flex-col min-h-screen bg-dark-900 relative">
      {/* Site-wide Background Glows (from Banner) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[10%] w-[1000px] h-[1000px] bg-slate-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-[60%] right-[10%] w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[30%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Header toggleSideMenu={toggleSideMenu} />

      {/* responsive spacer for fixed header */}
      <div className="h-[60px] sm:h-[100px] lg:h-[150px] w-full flex-shrink-0" />

      <main ref={mainRef} className="flex-grow">
        <Outlet />
      </main>

        <Footer />
        <Chat />
      </div>
    </div>
  );
};

export default Layout;
