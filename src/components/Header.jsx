// src/components/.jsx
import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import booking from "../assets/booking.png";
import { userLogout } from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";

const Header = () => {
  const [isOpen,setIsOpen] = useState(false)
  const { isLoggedIn, login, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "About", slug: "/about", active: true },
    { name: "Services", slug: "/services", active: true },
    { name: "Contact", slug: "/contact", active: true },
  ];

  function toggelProfile(){
    setIsOpen(!isOpen)
  }

  async function handleLogout(){

    try {

     const response =  await userLogout()
      if(response?.success){
        toast.success("Logged out successfully!")
        logout()
        localStorage.removeItem("userContext")
        setIsOpen(false)
        navigate("/")
      }
      
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <nav className="bg-blue-800 border-b border-amber-300">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={booking} alt="Logo" className="h-4 w-auto" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {/* <Link to="/" className="text-gray-800 hover:text-blue-600">Home</Link>
          <Link to="/about" className="text-gray-800 hover:text-blue-600">About</Link>
          <Link to="/services" className="text-gray-800 hover:text-blue-600">Services</Link>
          <Link to="/contact" className="text-gray-800 hover:text-blue-600">Contact</Link> */}

          {navItems.map((item) =>
            item.active ? (
              <NavLink
                to={item.slug}
                className={({ isActive }) =>
                  `${isActive ? "font-bold text-black" : "text-white"}`
                }
                key={item.name}
              >
                <button
                  className={`text-white rounded-lg p-2 hover:outline-none hover:backdrop-brightness-90`}
                  onClick={() => {
                    navigate(item.slug);
                  }}
                >
                  {item.name}
                </button>
              </NavLink>
            ) : null
          )}
        </div>

        {/* Button or Menu on the Right */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* User avatar as menu button */}
            <button className="focus:outline-none" onClick={toggelProfile}> 
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-person-circle"
                viewBox="0 0 16 16"
                color="white"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                />
              </svg>
            </button>
            {/* Dropdown menu (shows on hover/click) */}
           {isOpen&& <div className="absolute right-0 mt-2 w-32 bg-white border rounded-md shadow-lg py-2 cursor-pointer">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-500"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to='/login'>
                  <button
                    className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    Login
                  </button>
                </Link>
              )}
            </div>}
          </div>
        </div>

        {/* Mobile Menu (Hamburger Icon) */}
        <div className="md:hidden flex items-center">
          <button className="focus:outline-none">
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
      <ToastContainer />
    </nav>
  );
};

export default Header;
