import { FaUser, FaSearch } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DropDownCart from './DropDownCart';
import logo from '../assets/logo.png';


const HeaderBar = () => {
    const navigate = useNavigate();
    const [keyword, setKeyWord] = useState<string>("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyWord(e.target.value);
    };

    function handleSearch() {
        navigate(`/search/${keyword}`)
    }

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
      };

      function logout (){
        localStorage.clear();
        navigate("/login");
      }

    return (
        <header className="flex items-center justify-between py-4 px-6 bg-white shadow">
            <NavLink to={"/"}>
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="w-8 mr-4" />
                    <h1 className="text-lg font-medium">Book Store</h1>
                </div>

            </NavLink>
            <div className="w-1/4 mx-auto">
                <div className="relative">
                    <input
                        type="text"
                        name="search"
                        placeholder="Search"
                        value={keyword}
                        onChange={handleSearchChange}
                        className="w-full py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                    />
                    <button className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent" onClick={handleSearch}>
                        <FaSearch className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="flex items-center">
      <div className='mr-10'>
        <DropDownCart />
      </div>
      <div
        className={`relative ${isDropdownOpen ? 'z-10' : ''}`}
        onClick={toggleDropdown}
      >
        <FaUser className="w-6 h-6 cursor-pointer text-gray-600 hover:text-gray-800 focus:outline-none mr-10" />
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
            <NavLink
              to="/profile"
              className="block px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white"
            >
              Profile
            </NavLink>
            <button
              className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-blue-500 hover:text-white"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
        </header>
    );
}

export default HeaderBar;