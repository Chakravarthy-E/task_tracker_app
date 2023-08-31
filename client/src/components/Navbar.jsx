import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white text-2xl font-semibold">
            Task Tracker Manager
          </div>

          <ul className="flex space-x-4">
            <li>
              <Link
                to="#"
                className="text-white hover:text-gray-300 transition duration-300 ease-in-out"
              >
                Home
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
