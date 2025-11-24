import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/60 pointer-events-none z-0"></div>
      <Navbar />
      <main className="flex-grow pt-16 relative z-10">
        <Outlet />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
