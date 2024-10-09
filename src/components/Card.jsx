import React from 'react';

const Card = ({ location, date, guests }) => {
  return (
    <div className="relative flex border rounded-lg overflow-hidden">
  <div className="w-1/3">
    <img
      src="https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      alt="Location"
      className="object-cover w-full h-full"
    />
  </div>
  <div className="w-2/3 p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
    <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
      &times; {/* This is the cross icon */}
    </button>
    <h2 className="text-2xl font-semibold mb-2">Your perfect trip</h2>
    <h3 className="text-lg font-semibold">{location}</h3>
    <p className="text-gray-500">{date}</p>
    <p className="text-gray-500">{guests}</p>
  </div>
</div>

  
  );
};

export default Card;
