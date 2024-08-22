import React, { useContext } from 'react';
import { useAuth } from '../../AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { userName } = useAuth();
  const history = useNavigate();
  const handleClick = () => {
    signOut(auth).then((val) => {
      history('/');
    });
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Infosys Accelerate</h1>
        <ul className="flex items-center">
          {userName && (
            <li className="mr-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span className="text-gray-600">Welcome, {userName}</span>
            </li>
          )}
          <li>
            <button
              onClick={handleClick}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;