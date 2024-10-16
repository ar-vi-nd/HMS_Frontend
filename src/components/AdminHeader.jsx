import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { userLogout } from "../services/auth.service";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import booking from "../assets/booking.png";

const AdminHeader = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      const response = await userLogout();
      if (response?.success) {
        toast.success("Logged out successfully!");
        logout();
        localStorage.removeItem("userContext");
        navigate("/adminsignin");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <nav className="bg-blue-800 border-b border-amber-300">
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        {/* Admin Panel Heading */}
        <div className="text-2xl font-bold">
          <Link to="/">
            <img src={booking} alt="Logo" className="h-4 w-auto" />
          </Link>
        </div>
        <div className="text-white text-2xl font-bold flex-1 text-center">
          Admin Panel
        </div>

        {/* Logout Button */}
        {isLoggedIn && (
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {/* <ToastContainer /> */}
    </nav>
  );
};

export default AdminHeader;
