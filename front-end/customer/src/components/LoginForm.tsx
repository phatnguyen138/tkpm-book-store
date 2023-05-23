import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from '../lib/axios/user';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

// interface ErrorResponse {
//   message: string;
// }

function LoginForm() : JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const response = await loginUser(email, password);
    console.log((response as LoginResponse).accessToken);
    if ((response as LoginResponse).accessToken) {
      localStorage.setItem("access_token", (response as LoginResponse).accessToken);
      localStorage.setItem("refresh_token", (response as LoginResponse).refreshToken);
      window.location.href = '/';
      console.log("Login");
    } else {
      console.log("invalid login");
      setErrorMessage("Invalid login");
    }
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-8">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
              type="submit"
            >
              Login
            </button>
            <Link
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              to="/register"
            >
              Register
            </Link>
          </div>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-2"
            href="#"
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
