import React from 'react';

const HotelItem = ({ hotel, onDelete, onUpdate, onView }) => {
  return (
    <tr className="hover:bg-gray-100">
      <td className="py-2 px-4 border border-gray-300 text-center">{hotel.name}</td>
      <td className="py-2 px-4 border border-gray-300 text-center">{hotel?.address?.city}</td>
      <td className="py-2 px-4 border border-gray-300 text-center">{hotel.owner}</td>
      <td className="py-2 px-4 border border-gray-300 text-center">{hotel?.roomCounts?.single?.count+hotel?.roomCounts?.premium?.count+hotel?.roomCounts?.deluxe?.count}</td>
      <td className="py-2 px-4 border border-gray-300 text-center flex justify-center space-x-2">
        <button 
          onClick={() => onView(hotel._id)} 
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          View
        </button>
        <button 
          onClick={() => onUpdate(hotel._id)} 
          className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-300"
        >
          Update
        </button>
        <button 
          onClick={() => onDelete(hotel._id)} 
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default HotelItem;
