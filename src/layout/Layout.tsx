import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col bg-background text-white transition-colors duration-300">
            <Navbar />
            <main className="flex-grow pt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
