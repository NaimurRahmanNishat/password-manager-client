/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import logo from "../assets/logo.png";
import avatar from "../assets/avatar.png"; // ✅ fallback image
import { useSelector, useDispatch } from "react-redux";
import { logout } from "@/redux/features/auth/authSlice";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };


  return (
    <nav className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center cursor-pointer">
          <img src={logo} alt="logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-600 font-medium"
          >
            Home
          </Link>

          {/* login button or user avatar */}
          <div className="cursor-pointer">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <img
                    src={user?.profileImage || avatar}
                    alt="User avatar"
                    className="w-9 h-9 rounded-full object-cover border bg-background cursor-pointer hover:shadow-md transition"
                  />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 mt-2 shadow-lg rounded-lg border"
                  side="bottom"
                  align="end"
                >
                  <DropdownMenuLabel className="text-sm font-semibold px-4 py-2">
                    Hello, {user?.username}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="p-0">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 cursor-pointer hover:bg-red-100"
                    >
                      Logout
                    </button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="text-gray-700 hover:text-blue-600 font-medium cursor-pointer"
              >
                login
              </button>
            )}
          </div>

          {!user && (
            <Link
              to="/register"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 pt-2 pb-4 space-y-2">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            to="/service"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-blue-600"
          >
            Service
          </Link>
          {user ? (
            <button onClick={handleLogout} className="block text-red-600">
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className="block text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className="block text-gray-700 hover:text-blue-600"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
