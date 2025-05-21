import React from 'react';
import logo from '../../assets/logo.png'; // adjust path if needed

const Header = ({ isDarkMode }) => {
  return (
    <header className={`z-10 relative ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-blue-700 text-white'}`}>
      <div className="flex items-center justify-center py-4 px-6">
        <img
          src={logo}
          alt="SoberBook Logo"
          className="w-44 h-40 object-contain"
        />
        <h1 className="text-4xl font-bold font-[Protest_Revolution] text-center ml-4">
          SOBERBOOK
        </h1>
      </div>
    </header>
  );
};

export default Header;
