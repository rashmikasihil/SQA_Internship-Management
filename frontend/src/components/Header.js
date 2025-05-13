import React from 'react';
import { FaHome, FaUserCircle } from 'react-icons/fa';

const Header = () => {
    return (
        <header className="header bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md">
            <div className="header-container flex justify-between items-center p-4 max-w-7xl mx-auto">
                {/* Home Icon */}
                <a href="/" className="flex items-center">
                    <FaHome className="text-3xl" />
                    
                </a>

                {/* Profile Icon */}
                <a href="/profile" className="flex items-center">
                   
                    <FaUserCircle className="text-3xl" />
                </a>
            </div>
        </header>
    );
};

export default Header;
