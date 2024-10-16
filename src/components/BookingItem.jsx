import React from 'react'
import { useNavigate } from 'react-router'

const BookingItem = ({booking, toggleStatus}) => {
    console.log(booking)
    const navigate = useNavigate()
  return (
    <tr className="hover:bg-gray-100">
    <td className="py-2 px-4 border border-gray-300 text-center">{booking?.hotelId?.name}</td>
    <td className="py-2 px-4 border border-gray-300 text-center">{booking?.rooms?.length}</td>
    <td className="py-2 px-4 border border-gray-300 text-center">{booking?.hotelId?.address?.city}</td>
    <td className="py-2 px-4 border border-gray-300 text-center">{booking?.userId?.name}</td>
    <td className="py-2 px-4 border border-gray-300 text-center">{booking?.status}</td>
    <td className="py-2 px-4 border border-gray-300 text-center flex justify-center space-x-2">
      <button 
        onClick={() => toggleStatus(booking._id)} 
        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300 disabled:bg-gray-400"
        disabled={booking?.status==="CANCELLED"}
      >
        Cancel Booking
      </button>
      <button 
        onClick={() => navigate(`/admin/booking/${booking._id}`)} 
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400"
      >
        View Details
      </button>
   
    </td>
  </tr>
  )
}

export default BookingItem
