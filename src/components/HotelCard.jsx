import React from 'react'
const HotelCard = ({image,name,price,location}) => {

    return (
      <div
        className="container mx-auto my-6 p-6 bg-white shadow-lg rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between w-full max-w-4xl"
        name="HotelCard"
      >
        <div
          className="w-full sm:w-2/5 h-50 bg-gray-300 rounded-lg overflow-hidden"
          name="ImageContainer"
        >
          <img src="https://plus.unsplash.com/premium_photo-1697729555861-e406b4989ee1?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
        </div>
  
        <div
          className="w-full sm:w-3/5 mt-6 sm:mt-0 sm:ml-6 flex flex-col justify-between"
          name="RightSection"
        >
          <div className="flex justify-between items-center mb-4" name="NameAndRating">
            <div className="" name="HotelNameAndCity">
              <div className="font-bold text-2xl text-gray-800" name="HotelName">
                {name}
              </div>
              <div name="HotelCity">
                {location}
              </div>
            </div>
            <div
              className="bg-yellow-400 text-white font-semibold px-3 py-2 rounded-lg text-base"
              name="HotelRating"
            >
              4.5 (35 reviews)
            </div>
          </div>
  
          <div className="text-sm mb-4" name="Deals">
  <span className="bg-green-500 text-white m-1 rounded-sm px-2  inline-block">25% off on first booking</span>
  <span className="bg-green-500 text-white m-1 rounded-sm px-2  inline-block">Free Cab Service</span>
  <span className="bg-green-500 text-white m-1 rounded-sm px-2  inline-block">Complimentary Breakfast</span>
</div>


  
          <div className="flex justify-between items-center" name="TypeAndPrice">
            <div className="text-gray-700 font-normal" name="Type">
              Single, Premium, Deluxe
              <div>free cancelation</div>
            </div>
            <div className="text-green-600 font-bold text-2xl" name="Price">
            <div className='font-bold text-sm'>
                Starting from
              </div>
              ${price}/night
              <div className='font-bold text-sm'>
                inclusive of all taxes
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default HotelCard;
  
  
