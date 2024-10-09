const bookHotelService = async function({hotelId,checkInDate,checkOutDate,roomType, roomCount}){
    // Implement your booking logic here
    // For example, you can make a POST request to a booking API
    console.log(`Booking hotel with ID: ${hotelId}, Check-in: ${checkInDate}, Check-out: ${checkOutDate}, Rooms: ${roomType} ${roomCount}`);

    try{


    const response = await fetch('http://localhost:1111/api/booking',
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({hotelId, checkInDate, checkOutDate, roomType, roomCount}),
        }
    )
    const data = await response.json()
    console.log(data)
}catch(error){
    console.log('Error booking hotel:', error)
    // Handle the error appropriately
    // For example, you can display an error message to the user or redirect to an error page
}

}

const getBookingById = async function(id){
    try{
        const response = await fetch(`http://localhost:1111/api/booking/${id}`, {credentials: 'include'})
        const data = await response.json()
        console.log(data)
    }catch(error){
        console.log('Error getting booking:', error)
    }
}

export {bookHotelService, getBookingById}