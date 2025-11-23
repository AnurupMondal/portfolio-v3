import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-[80vh] text-center">
            <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
            <p className="text-2xl text-gray-400 mb-8">Page Not Found</p>
            <Link to="/" className="px-6 py-3 bg-primary text-black font-bold rounded-full hover:bg-primary/80 transition-colors">
                Go Home
            </Link>
        </div>
    );
};

export default NotFound;
