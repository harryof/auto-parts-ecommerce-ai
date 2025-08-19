import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SideMenu from './SideMenu';
import Chat from '../common/Chat';

const Layout: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header toggleSideMenu={toggleSideMenu} />
      
      <div className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className={`md:w-64 ${isSideMenuOpen ? 'block' : 'hidden md:block'}`}>
              <SideMenu />
            </div>
            <div className="flex-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
      <Chat />
    </div>
  );
};

export default Layout;