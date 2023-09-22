
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="flex h-screen bg-gray-100">
            <div className="m-auto text-center">
                <h1 className="text-6xl font-bold text-gray-800">404</h1>
                <p className="text-2xl text-gray-600">Page not found</p>
                <p className="text-gray-600 mt-4">
                    The page you are looking for might have been removed or is temporarily unavailable.
                </p>
                <Link
                    to="/"
                    className="mt-8 inline-block px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full transition duration-300"
                >
                    Go back to the homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
