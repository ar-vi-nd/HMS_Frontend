import React from "react";

const RoomCard = ({ type, availableRooms=0, price, services, days=0 , bookHotel}) => {
  const totalPrice = price * days;

  return (
    <div
      className="mx-auto my-4 p-4 bg-white border border-gray-200 shadow-lg rounded-lg flex flex-col justify-between w-full max-w-4xl h-auto transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      name="RoomTypeCard"
    >
      {/* Top Section: Room Type and Price */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <div className="font-bold text-xl text-gray-800">{type}</div>
          <div className="text-sm text-gray-600 mt-1">
            Available Rooms: <span className="font-semibold">{availableRooms}</span>
          </div>
        </div>
        <div className="text-green-600 font-bold text-2xl">${price}/night</div>
      </div>

      {/* Services Section - Inline */}
      <div className="text-sm text-gray-700 mb-3">
        <div className="font-semibold mb-1">Services Included:</div>
        <div className="flex flex-wrap gap-2">
          {services.map((service, index) => (
            <span
              key={index}
              className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Booking Details Section */}
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center">
          <label htmlFor="days" className="font-semibold text-gray-800 text-sm mr-2">
            Days:
          </label>
          <input
            type="number"
            id="days"
            min="1"
            value={days}
            className="border rounded p-1 w-16 text-center text-sm mr-2"
            disabled
          />
          <label htmlFor="rooms" className="font-semibold text-gray-800 text-sm mr-2">Rooms:</label>
          <input
            type="number"
            id="rooms"
            min="1"
            max={availableRooms}
            value={1}
            onChange={(e)=>(updateRooms(e.target.value))}
            className="border rounded p-1 w-16 text-center text-sm"
            disabled={true}
            />
        </div>
        <div className="text-right">
          <div className="text-gray-600 text-sm">Free Cancellation</div>
          <div className="text-green-600 font-bold text-xl">
            Total: ${totalPrice}
          </div>
        </div>
      </div>

      {/* Book Now Button */}
      <div className="mt-4 flex justify-center">
        <button onClick={()=>(bookHotel(type.toLowerCase()))} disabled={days===0||availableRooms===0} className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition duration-200 disabled:bg-gray-400">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default RoomCard;
