import React from 'react'
import { UserContext } from '../context/userContext'
import { useContext } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'

const Admin = () => {
  const { user,isLoggedIn } = useContext(UserContext)
  const navigate = useNavigate()
  const location = useLocation()


  // Check if user is an admin
  if (!isLoggedIn) {
    console.log(user)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">
          You are not authorized to view this page.
        </div>
      </div>
    )
  }

  // Helper function to check if the route is active
  const isActive = (path) => location.pathname === path

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>

      {/* Admin Panel Navigation Bar */}
      <div 
        name="adminpanelnavigationbuttons" 
        className="flex space-x-4 mb-8 justify-center bg-gray-100 rounded-lg shadow-md p-4 w-full"
      >
        <button 
          onClick={() => navigate('/admin')}
          className={`px-4 py-2 rounded ${
            isActive('/admin') ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white hover:bg-blue-600'
          } focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          Dashboard
        </button>
        <button 
          onClick={() => navigate('/admin/hotel')}
          className={`px-4 py-2 rounded ${
            isActive('/admin/hotel') ? 'bg-green-600 text-white' : 'bg-green-500 text-white hover:bg-green-600'
          } focus:outline-none focus:ring-2 focus:ring-green-300`}
        >
          Hotel Management
        </button>
        <button 
          onClick={() => navigate('/admin/user')}
          className={`px-4 py-2 rounded ${
            isActive('/admin/user') ? 'bg-yellow-600 text-white' : 'bg-yellow-500 text-white hover:bg-yellow-600'
          } focus:outline-none focus:ring-2 focus:ring-yellow-300`}
        >
          User Management
        </button>
        <button 
          onClick={() => navigate('/admin/booking')}
          className={`px-4 py-2 rounded ${
            isActive('/admin/booking') ? 'bg-red-600 text-white' : 'bg-red-500 text-white hover:bg-red-600'
          } focus:outline-none focus:ring-2 focus:ring-red-300`}
        >
          Booking Management
        </button>
      </div>

      {/* This is where child routes will be rendered */}
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default Admin
