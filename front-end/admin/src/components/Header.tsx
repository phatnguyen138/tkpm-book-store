import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 mr-2" />
        <span className="text-lg font-bold">Your Logo</span>
      </Link>

      {/* Avatar */}
      <div className="flex items-center space-x-2">
        <CgProfile size={24} />
        <span>Admin</span>
      </div>
    </header>
  );
};

export default Header;
