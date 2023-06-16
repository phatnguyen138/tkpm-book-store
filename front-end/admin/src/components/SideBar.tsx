import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-500 text-white w-64">
      <ul className="py-4">
        <li>
          <Link
            to="/add-product"
            className={`block px-4 py-3 hover:bg-blue-600 ${
              location.pathname === '/add-product' ? 'bg-blue-600' : ''
            }`}
          >
            Add Product
          </Link>
        </li>
        <li>
          <Link
            to="/edit-product"
            className={`block px-4 py-3 hover:bg-blue-600 ${
              location.pathname === '/edit-product' ? 'bg-blue-600' : ''
            }`}
          >
            Edit Product
          </Link>
        </li>
        <li>
          <Link
            to="/view-order"
            className={`block px-4 py-3 hover:bg-blue-600 ${
              location.pathname === '/view-order' ? 'bg-blue-600' : ''
            }`}
          >
            View Order
          </Link>
        </li>
        {/* Add more sidebar links as needed */}
      </ul>
    </nav>
  );
};

export default Sidebar;
