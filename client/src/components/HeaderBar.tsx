import { FaUser, FaSearch } from 'react-icons/fa';
// import { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import {CartItem} from "../types/Products";
import DropDownCart from './DropDownCart';
import logo from '../assets/logo.png';

// type cartProps = {
//     cartItems: CartItem[]
//     closeCart: () => void
// }

const HeaderBar = () => {
    // const [isCartOpen, setCartOpen] = useState(false);
    // const [cartItems, setCartItems] = useState<CartItem[]>([]);

    // const handleCartClick = () => {
    //     setCartOpen(!isCartOpen);
    // }

    // const addToCart = (item: CartItem) => {
    //     setCartItems((prevItems) => [...prevItems, item]);
    // };

    const handleProfileClick = () => {
        // const newItems: CartItem = {
        //     id: 1,
        //     name: 'Chocolate',
        //     price: 10
        // }

        // addToCart(newItems)
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
                        placeholder="Search"
                        className="w-full py-2 px-4 rounded-lg border border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                    />
                    <button className="absolute inset-y-0 right-0 px-4 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent">
                        <FaSearch className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="relative">

                <DropDownCart />
                {/* <button className="relative mr-6 text-gray-600 hover:text-gray-800 focus:outline-none" onClick={handleCartClick}>
                    <FaShoppingCart className="w-6 h-6" />
                    {cartItems.length > 0 ? (
                        <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                            {cartItems.length}
                        </div>) :
                        <div></div>
                    }
                </button>
                {isCartOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50">
                        <ul>
                            {cartItems.map((item) => (
                                <li key={item.id} className="px-4 py-2">
                                    <span>{item.name}</span>
                                    <span className="ml-2">${item.price}</span>
                                </li>
                            ))}
                            {cartItems.length === 0 && (
                                <li className="px-4 py-2">Your cart is empty.</li>
                            )}
                        </ul>
                        <NavLink to={'/cart'}>
                            <div className="block w-full px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-100">
                                Access the cart
                            </div>
                        </NavLink>
                    </div>
                )} */}
                <button className="text-gray-600 hover:text-gray-800 focus:outline-none" onClick={handleProfileClick}>
                    <FaUser className="w-6 h-6" />
                </button>
            </div>
        </header>
    );
}

export default HeaderBar;