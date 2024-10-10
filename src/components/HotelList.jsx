import React from 'react';
import HotelItem from './HotelItem';

const HotelList = ({ hotels, onDelete, onUpdate }) => {
  return (
    <div className="overflow-x-auto">
      {hotels.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300 text-center">Hotel Name</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Address</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Owner</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Total Rooms</th>
              <th className="py-2 px-4 border border-gray-300 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.map(hotel => (
              <HotelItem 
                key={hotel._id} 
                hotel={hotel} 
                onDelete={onDelete} 
                onUpdate={onUpdate} 
              />
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center py-4 text-gray-500">No hotels available</div>
      )}
    </div>
  );
};

export default HotelList;
