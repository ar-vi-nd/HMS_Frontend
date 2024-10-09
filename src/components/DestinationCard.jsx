import React from 'react';
// DestinationCard.js

const DestinationCard = ({ name, image }) => {
    return (
      <div className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 cursor-pointer duration-100">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-48"
        />
        <div className="absolute top-2 left-2 bg-white bg-opacity-70 p-2 rounded">
          <h3 className="text-lg font-semibold">{name}</h3>
        </div>
      </div>
    );
  };
  

  
  
  export default DestinationCard;
  