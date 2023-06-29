import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-500 text-white w-64">
      <ul className="py-4">
        <li>
          <div
            className={`block px-4 py-3 hover:bg-blue-600 ${
              location.pathname.includes('product') ? 'bg-blue-600' : ''
            }`}
          >
            Product
          </div>
          <ul className="pl-4">
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
          </ul>
        </li>
        <li>
          <div
            className={`block px-4 py-3 hover:bg-blue-600 ${
              location.pathname.includes('genre') ? 'bg-blue-600' : ''
            }`}
          >
            Genre
          </div>
          <ul className="pl-4">
            <li>
              <Link
                to="/add-genre"
                className={`block px-4 py-3 hover:bg-blue-600 ${
                  location.pathname === '/add-genre' ? 'bg-blue-600' : ''
                }`}
              >
                Add Genre
              </Link>
            </li>
            <li>
              <Link
                to="/edit-genre"
                className={`block px-4 py-3 hover:bg-blue-600 ${
                  location.pathname === '/edit-genre' ? 'bg-blue-600' : ''
                }`}
              >
                Edit Genre
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div
            className={`block px-4 py-3 hover:bg-blue-600 ${
              location.pathname.includes('author') ? 'bg-blue-600' : ''
            }`}
          >
            Author
          </div>
          <ul className="pl-4">
            <li>
              <Link
                to="/add-author"
                className={`block px-4 py-3 hover:bg-blue-600 ${
                  location.pathname === '/add-author' ? 'bg-blue-600' : ''
                }`}
              >
                Add Author
              </Link>
            </li>
            <li>
              <Link
                to="/edit-author"
                className={`block px-4 py-3 hover:bg-blue-600 ${
                  location.pathname === '/edit-author' ? 'bg-blue-600' : ''
                }`}
              >
                Edit Author
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <div
            className={`block px-4 py-3 hover:bg-blue-600 ${
              location.pathname.includes('order') ? 'bg-blue-600' : ''
            }`}
          >
            Order
          </div>
          <ul className="pl-4">
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
          </ul>
        </li>
        <li>
          <div
            className={`block px-4 py-3 hover:bg-blue-600 ${
              location.pathname.includes('users') ? 'bg-blue-600' : ''
            }`}
          >
            Users
          </div>
          <ul className="pl-4">
            <li>
              <Link
                to="/view-users"
                className={`block px-4 py-3 hover:bg-blue-600 ${
                  location.pathname === '/view-users' ? 'bg-blue-600' : ''
                }`}
              >
                View Users
              </Link>
            </li>
          </ul>
        </li>
        {/* Add more sidebar links as needed */}
      </ul>
    </nav>
  );
};

export default Sidebar;