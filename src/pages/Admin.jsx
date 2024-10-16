import React, { useEffect } from 'react';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { AdminHeader } from '../components';

const Admin = () => {
  const { user, isLoggedIn, login, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('userContext');
    if (storedUser) {
      login(JSON.parse(storedUser));
    } else {
      logout();
    }
  }, []);

  // Check if user is logged in
  if (!isLoggedIn || !user?.isAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-lg font-semibold">
          You are not authorized to view this page.
        </div>
      </div>
    );
  }

  // Helper function to check if the route is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
    <AdminHeader/>
    <div className="flex min-h-screen bg-gray-50">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <nav className="flex-grow p-4">
          <button
            onClick={() => navigate('/admin')}
            className={`w-full text-left px-4 py-2 mb-2 rounded ${
              isActive('/admin')
                ? 'bg-blue-600 text-white'
                : 'bg-blue-400 text-white hover:bg-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
          >
            Dashboard
          </button>
          <button
            onClick={() => navigate('/admin/hotel')}
            className={`w-full text-left px-4 py-2 mb-2 rounded ${
                isActive('/admin/hotel')
                  ? 'bg-blue-600 text-white'
                  : 'bg-blue-400 text-white hover:bg-blue-600'
              } focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
          >
            Hotel Management
          </button>
          <button
            onClick={() => navigate('/admin/user')}
            className={`w-full text-left px-4 py-2 mb-2 rounded ${
                isActive('/admin/user')
                ? 'bg-blue-600 text-white'
                : 'bg-blue-400 text-white hover:bg-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
          >
            User Management
          </button>
          <button
            onClick={() => navigate('/admin/booking')}
            className={`w-full text-left px-4 py-2 mb-2 rounded ${
              isActive('/admin/booking')
              ? 'bg-blue-600 text-white'
                : 'bg-blue-400 text-white hover:bg-blue-600'
            } focus:outline-none focus:ring-2 focus:ring-blue-300 transition-colors`}
          >
            Booking Management
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 overflow-auto">
        {/* Header with Add New Hotel Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700">
            {(() => {
              switch (location.pathname) {
                case '/admin':
                  return 'Dashboard';
                case '/admin/hotel':
                  return 'Hotel Management';
                case '/admin/user':
                  return 'User Management';
                case '/admin/booking':
                  return 'Booking Management';
                default:
                  return '';
              }
            })()}
          </h2>
          {/* Conditionally render Add New Hotel button */}
          {isActive('/admin/hotel') && (
            <button
              onClick={() => navigate('/admin/addhotel')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-500 transition-colors"
            >
              Add New Hotel
            </button>
          )}
        </div>

        {/* Child routes rendered here */}
        <div className="bg-white p-6 rounded-lg shadow-lg min-h-[400px]">
          <Outlet />
        </div>
      </main>
    </div>
    </>

  );
};

export default Admin;
