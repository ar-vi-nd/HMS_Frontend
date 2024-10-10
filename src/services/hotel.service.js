async function getAllHotels(page,limit,city){
    try{

        const response = await fetch(`http://localhost:1111/api/hotels?page=${page}&limit=${limit}&city=${city}`)
        const data = await response.json()
        return data
    }
    catch(error){
        console.log(error)
    }
}

async function checkAvailability(hotelId, checkInDate, checkOutDate){
    try {
        console.log(checkInDate,checkOutDate)
        const response = await fetch(`http://localhost:1111/api/checkAvailability?hotelId=${hotelId}&checkInDate=${checkInDate}&checkOutDate=${checkOutDate}`)
        const data = await response.json()
        return data
        
    } catch (error) {
        console.log(error)
    }
}

async function getHotelById(hotelId){
    try {
        const response = await fetch(`http://localhost:1111/api/hotels/${hotelId}`)
        const data = await response.json()
        return data
        
    } catch (error) {
        console.log(error)
    }
}

async function deleteHotelById(hotelId){
    try {
        const response = await fetch(`http://localhost:1111/api/hotels/${hotelId}`, {
            method: "DELETE",
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()
        return data
        
    } catch (error) {
        console.log(error)
    }
}

export {getAllHotels,getHotelById,checkAvailability,deleteHotelById}