import React, { useEffect, useState } from 'react';
import {HotelList} from '../components';
// import { getHotels, deleteHotel } from '../services/hotel.service';  // Assuming you have a service for hotel operations
import { getAllHotels, deleteHotelById } from '../services/hotel.service';

const AdminHotMng= () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      const hotelList = await getAllHotels(1,10);
      console.log(hotelList)
      setHotels(hotelList?.data?.hotels);
    };

    fetchHotels();
  }, []);

  const handleDeleteHotel = async (hotelId) => {
    const response = await deleteHotelById(hotelId);
    console.log(response)
    setHotels(hotels.filter(hotel => hotel._id !== response?.data?.hotel?._id));  
  };

  const handleUpdateHotel = (hotelId) => {
    // Navigate to an update form or handle hotel update logic
    console.log(`Update hotel: ${hotelId}`);
  };

  return (
    <div className="hotel-management">
      <HotelList hotels={hotels} onDelete={handleDeleteHotel} onUpdate={handleUpdateHotel} />
    </div>
  );
};

export default AdminHotMng;
