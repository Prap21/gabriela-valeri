import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from '../Components/Navbar/Navbar';
import Sidebar from '../Components/Sidebar/Sidebar';
import Footer from '../Components/Footer/Footer';

const StoreLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const toggleSidebar = () => setSidebarOpen((open) => !open);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <main className="page-transition" key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default StoreLayout;
