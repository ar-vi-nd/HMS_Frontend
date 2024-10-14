import React ,{useState} from "react";
import { useNavigate } from "react-router";
import { getAllHotels } from "../services/hotel.service";
const useHotelSearch = ()=>{
    const navigate = useNavigate();


    const [location, setLocation] = useState("");
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");

    const navigateToHotel = ()=>{
        navigate(`/hotels?location=${location}&_page=1&_limit=10`);
    }

    return {
        location,
        setLocation,
        checkInDate,
        setCheckInDate,
        checkOutDate,
        setCheckOutDate,
        navigateToHotel
    }

}

export default useHotelSearch