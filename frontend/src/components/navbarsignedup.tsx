import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

// Define props type
interface NavbarProps {
  user: {
    id: string;
    name?: string;
    email?: string;
  };
}

export default function NavbarSignedup({ user }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    console.log("User logged out. localStorage cleared.");
    navigate("/login");
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md sticky top-0 z-50 border-b-1">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-3xl font-extrabold tracking-wide">logo</div>

        <div className="hidden md:flex space-x-8 text-lg items-center">
          <NavLink to="/blogs" className="hover:underline underline-offset-4">
            Home
          </NavLink>

          <button
            onClick={() => navigate("/publish")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
          >
            Publish
          </button>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center justify-center bg-white h-10 w-10 rounded-full text-purple-600 font-bold text-xl focus:outline-none"
            >
              {localStorage.getItem("userName")?.charAt(0).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white text-black rounded-lg shadow-lg z-10">
                <NavLink
                  to={`/myblog/${user}`}
                  className="block px-4 py-2 hover:bg-indigo-500 hover:text-white"
                >
                  My Blogs
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-indigo-500 hover:text-white"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="md:hidden">
          <button
            className="text-white focus:outline-none text-3xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 text-lg animate-slide-down">
          <NavLink to="/" className="block hover:underline">
            Home
          </NavLink>
          <NavLink to="/about" className="block hover:underline">
            About
          </NavLink>
          <NavLink to="/publish" className="block hover:underline">
            Publish
          </NavLink>
          <NavLink to="/myblogs" className="block hover:underline">
            My Blogs
          </NavLink>
          <button
            onClick={handleLogout}
            className="block hover:underline text-left w-full"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
