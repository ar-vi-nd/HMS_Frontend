import React, { useState } from 'react';
import{Input,Button} from './index'

const Search = ({location,setLocation,checkInDate,setCheckInDate,checkOutDate,setCheckOutDate,action}) => {
    console.log({location,setLocation,checkInDate,setCheckInDate,checkOutDate,setCheckOutDate,action})
//   const [location, setLocation] = useState('');
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState('');
//   const navigate = useNavigate();
//   const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

// Function to get a date in YYYY-MM-DD format, adding a certain number of days to today's date
const getDate = (daysToAdd = 0) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd); // Add the specified number of days
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };
  

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 p-6 bg-blue-100 rounded-lg shadow-md">
      <Input type={"text"} label="City" value={location} setValue={setLocation} placeholder={"Enter city"}/>
      <Input type={"date"} label="Check-in" value={checkInDate} setValue={setCheckInDate} placeholder={"Checkin Date"} predefined={getDate()}/>
      <Input type={"date"} label="Check-out" value={checkOutDate} setValue={setCheckOutDate} placeholder={"Checkout Date"} predefined = {getDate(1)}/>
      <Button action={action}>Search</Button>
    </div>
  );
};

export default Search;
