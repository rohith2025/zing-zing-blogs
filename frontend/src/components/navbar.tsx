import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 text-white shadow-md sticky top-0 z-50 border-b-1">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center h-10 w-2xs px-4">
  <NavLink to="/">
    <img
      src="https://i.ibb.co/Wv6yV4qs/Chat-GPT-Image-Apr-9-2025-08-36-53-PM.png"
      alt="ZingZing Logo"
      className="h-14 w-auto object-contain rounded-md shadow-sm"
    />
  </NavLink>
</div>

        <div className="hidden md:flex space-x-8 text-lg">
          <NavLink to="/" className="hover:underline underline-offset-4">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:underline underline-offset-4">
            About
          </NavLink>
          <NavLink to="/signup" className="hover:underline underline-offset-4">
            Signup
          </NavLink>
          <NavLink to="/login" className="hover:underline underline-offset-4">
            Login
          </NavLink>
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none text-3xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-lg animate-slide-down">
          <NavLink to="/" className="block hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="block hover:underline">
            About
          </NavLink>
          <NavLink to="/signup" className="block hover:underline">
            Signup
          </NavLink>
          <NavLink to="/login" className="block hover:underline">
            Login
          </NavLink>
        </div>
      )}
    </nav>
  );
}
