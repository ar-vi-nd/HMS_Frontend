async function getAllHotels(page,limit,city="",sort){
    try{

        const response = await fetch(`http://localhost:1111/api/hotels?page=${page}&limit=${limit}&city=${city}&sort=${sort}`)
        const data = await response.json()
        return data
    }
    catch(error){
        console.log(error)
    }
}

async function getAllAdminHotels(page,limit,city="",sort){
    try{

        const response = await fetch(`http://localhost:1111/api/hotels?page=${page}&limit=${limit}&city=${city}&sort=${sort}`,{
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        })
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

async function addHotel({name,owner,address,contact,pictures,roomCounts}){
    try {
        console.log({name,owner,address,contact,pictures,roomCounts})

        const formData = new FormData();

        // Append the other form data
        formData.append("name", name);
        formData.append("owner",owner);
        formData.append("address", JSON.stringify(address)); // Convert address to string
        formData.append("contact", JSON.stringify(contact)); // Convert contact to string
        formData.append("roomCounts", JSON.stringify(roomCounts)); // Convert room
      
        // Append pictures (files)
        pictures.forEach((file) => {
          formData.append("pictures", file[0]); // Append each file
        });
      
        const response = await fetch(`http://localhost:1111/api/hotels`, {
            method: "POST",
            credentials: 'include',
            body: formData
        })
        const data = await response.json()
        return data
        
    } catch (error) {
        console.log(error)
    }

}

async function updateHotel(hotelId, data){
    try {

        console.log(data)
        const response = await fetch(`http://localhost:1111/api/hotels/${hotelId}`, {
            method: "PATCH",
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        const something = await response.json()

        console.log(something)

        return something  

        
    } catch (error) {

        console.log(error)
        
    }
}

export {getAllHotels,getHotelById,checkAvailability,deleteHotelById,addHotel, updateHotel, getAllAdminHotels}