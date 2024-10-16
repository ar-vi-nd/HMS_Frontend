import React, { useEffect, useState } from 'react';
import { FaHotel, FaUsers, FaUserCheck, FaClipboardList } from 'react-icons/fa';
import { getDashboardDetails } from '../services/admin.service';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const [dashboardDetails,setDashboardDetails] = useState({hotelCount:0,userCount:0,activeUserCount:0,bookingCount:0,activeBookingsCount:0})

  useEffect(()=>{
    async function getDetails(){
        const response = await getDashboardDetails();
        console.log(response)
        if(!response?.success){
            toast.error(response.error.message)
        }else{
            setDashboardDetails(response?.data)
        }
    }
    getDetails()
  },[])
  return (
    <div className="container mx-auto mt-10 p-6">

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Total Hotels */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center transition-transform transform hover:scale-105">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
            <FaHotel className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Hotels</h2>
            <p className="text-3xl font-bold mt-2">{dashboardDetails?.hotelCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center transition-transform transform hover:scale-105">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
            <FaClipboardList className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Bookings</h2>
            <p className="text-3xl font-bold mt-2">{dashboardDetails?.bookingCount}</p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center transition-transform transform hover:scale-105">
          <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mr-4">
            <FaClipboardList className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Active Bookings</h2>
            <p className="text-3xl font-bold mt-2">{dashboardDetails?.activeBookingsCount}</p>
          </div>
        </div>

        {/* Total Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center transition-transform transform hover:scale-105">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
            <FaUsers className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Total Users</h2>
            <p className="text-3xl font-bold mt-2">{dashboardDetails?.userCount}</p>
          </div>
        </div>

        {/* Active Users */}
        <div className="bg-white shadow-lg rounded-lg p-6 flex items-center transition-transform transform hover:scale-105">
          <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
            <FaUserCheck className="text-white text-3xl" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">Active Users</h2>
            <p className="text-3xl font-bold mt-2">{dashboardDetails?.activeUserCount}</p>
          </div>
        </div>

        {/* Total Bookings */}
     
      </div>
    </div>
  );
}

export default AdminDashboard;
