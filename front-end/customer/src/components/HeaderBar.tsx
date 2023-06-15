import { FaUser, FaSearch } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import DropDownCart from './DropDownCart';
import logo from '../assets/logo.png';


import {addCartItemToDB} from "../redux/slices/cart"
import {useAppDispatch} from "../hooks/hook"
import {products} from "../mockData/Products"


const HeaderBar = () => {
    const dispatch = useAppDispatch();

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
                        placeholder="Search"
                        className="w-full py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                    />
                    <button className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent">
                        <FaSearch className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="flex items-center">
                <div className='mr-10'>
                    <DropDownCart /></div>
                    <NavLink to={"/profile"}>
                <div className="text-gray-600 hover:text-gray-800 focus:outline-none mr-10">
                    <FaUser className="w-6 h-6" />
                </div></NavLink>
            </div>
        </header>
    );
}

export default HeaderBar;