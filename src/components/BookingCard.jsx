import React from 'react'

const BookingCard = ({booking, handleCancelBooking}) => {
    return (
        <div
          className="container mx-auto my-6 p-6 bg-white shadow-lg rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between w-full max-w-4xl"
          name="BookingCard"
        >
          <div
            className="w-full sm:w-2/5 h-50 bg-gray-300 rounded-lg overflow-hidden"
            name="ImageContainer"
          >
            <img src={booking?.hotelId?.pictures[0]} alt="Hotel Main Image" />
          </div>
    
          <div
            className="w-full sm:w-3/5 mt-6 sm:mt-0 sm:ml-6 flex flex-col justify-between"
            name="RightSection"
          >
            <div className="flex justify-between items-center mb-4" name="NameAndStatus">
              <div name="HotelNameAndCity">
                <div className="font-bold text-2xl text-gray-800" name="HotelName">
                  {booking?.hotelId?.name}
                </div>
                <div name="HotelCity">
                  {booking?.hotelId?.address?.city}
                </div>
              </div>
              <div className={`font-semibold px-3 py-2 rounded-lg text-base ${booking?.status === 'BOOKED' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`} name="BookingStatus">
                {booking?.status === 'BOOKED' ? 'Confirmed' : 'Cancelled'}
              </div>
            </div>
    
            <div className="text-sm mb-4" name="Deals">
              <span className="bg-green-500 text-white m-1 rounded-sm px-2 inline-block">Free Breakfast</span>
              <span className="bg-green-500 text-white m-1 rounded-sm px-2 inline-block">Airport Pickup</span>
            </div>
    
            <div className="flex justify-between items-center" name="BookingDetails">
              <div className="text-gray-700 font-normal" name="RoomDetails">
                {/* <div>Room Type: {booking?.rooms?.[0]?.room}</div> */}
                <div>Check-in: {(new Date(booking?.rooms[0]?.checkInDate)).toLocaleDateString()}</div>
                <div>Check-out: {(new Date(booking?.rooms[0]?.checkOutDate)).toLocaleDateString()}</div>
                <div>Number of Rooms: {booking?.rooms?.length}</div>
              </div>
              <div className="text-green-600 font-bold text-2xl" name="TotalPrice">
                <div className='font-bold text-sm'>
                  Total Price
                </div>
                ${booking?.totalCost}
                <div className='font-bold text-sm'>
                  inclusive of all taxes
                </div>
              </div>
            </div>
    
            <div className="mt-4 flex justify-end" name="CancelBookingButton">
              <button
                className="bg-red-500 text-white font-semibold px-6 py-2 rounded-lg hover:bg-red-600 disabled:bg-gray-500"
                onClick={handleCancelBooking}
                disabled={booking?.status ==="CANCELLED"}
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )
}

export default BookingCard
