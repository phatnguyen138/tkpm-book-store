import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';
import logo from '../assets/logo.png';

const Header: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <header className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 mr-2" />
        <span className="text-lg font-bold">Your Logo</span>
      </Link>

      {/* Admin Dropdown */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center space-x-2 focus:outline-none"
        >
          <CgProfile size={24} />
          <span>Admin</span>
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
            <button
              onClick={handleLogout}
              className="block w-full px-4 py-2 text-red-500 text-left hover:bg-red-100 focus:outline-none"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;