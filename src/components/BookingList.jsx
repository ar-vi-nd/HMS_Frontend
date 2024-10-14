import React from 'react'
import BookingItem from './BookingItem';

const BookingList = ({bookings,toggleStatus}) => {
    return (
        <div className="overflow-x-auto">
          {bookings?.length > 0 ? (
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="py-2 px-4 border border-gray-300 text-center">Hotel Name</th>
                  <th className="py-2 px-4 border border-gray-300 text-center">No. of Rooms</th>
                  <th className="py-2 px-4 border border-gray-300 text-center">Address</th>
                  <th className="py-2 px-4 border border-gray-300 text-center">Customer</th>
                  <th className="py-2 px-4 border border-gray-300 text-center">Booking Status</th>
                  <th className="py-2 px-4 border border-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings?.length && bookings.map(booking => (
                  <BookingItem 
                    key={booking._id} 
                    booking={booking} 
                    toggleStatus={toggleStatus} 
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-500">No bookings available</div>
          )}
        </div>
      );
}

export default BookingList
