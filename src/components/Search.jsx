import React, { useState } from 'react';
import{Input,Button,SelectBox} from './index'

const Search = ({location,setLocation,sort,limit,setSort,setLimit,action}) => {
    console.log({location,setLocation,sort,limit,setSort,setLimit,action})
//   const [location, setLocation] = useState('');
//   const [checkInDate, setCheckInDate] = useState("");
//   const [checkOutDate, setCheckOutDate] = useState('');
//   const navigate = useNavigate();
//   const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });

// Function to get a date in YYYY-MM-DD format, adding a certain number of days to today's date
// const getDate = (daysToAdd = 0) => {
//     const date = new Date();
//     date.setDate(date.getDate() + daysToAdd); // Add the specified number of days
//     const yyyy = date.getFullYear();
//     const mm = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
//     const dd = String(date.getDate()).padStart(2, '0');
//     return `${yyyy}-${mm}-${dd}`;
//   };

const sortOptions =[
    { value: 'asc', label: 'Name Ascending' },
    { value: 'desc', label: 'Name Descending' },
    { value:"1",label:"Oldest First"},
    { value:"-1",label:"Newest First"},
    {value: "2",label:"Price High to Low"},
    {value: "-2",label:"Price Low to High"},
  ];

const limitOptions =[
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
  ];

  

  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 p-6 bg-blue-100 rounded-lg shadow-md">
      <Input type={"text"} label="" value={location} setValue={setLocation} placeholder={"Enter city or hotel name"}/>
      <SelectBox options={sortOptions} sort={sort} setSort={setSort} label={"Sort"}/>
      <SelectBox options={limitOptions} sort={limit} setSort={setLimit} label={"Limit"}/>
      <Button action={action}>Search Hotel</Button>
    </div>
  );
};

export default Search;
