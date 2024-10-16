import React from 'react'
import{Input,Button} from './index'

const DatePicker =  ({checkInDate,setCheckInDate,checkOutDate,setCheckOutDate,action}) => {

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
        <Input type={"date"} label="Check-in" value={checkInDate} setValue={setCheckInDate} placeholder={"Check-in Date"} predefined={getDate()}/>
        <Input type={"date"} label="Check-out" value={checkOutDate} setValue={setCheckOutDate} placeholder={"Check-out Date"} predefined = {getDate(1)}/>
      <Button action={action} >Check Availability</Button>  {/* Call the parent component's action function */}
    </div>
  )
}

export default DatePicker


