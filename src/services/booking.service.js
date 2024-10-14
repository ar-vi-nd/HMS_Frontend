const bookHotelService = async function ({
    hotelId,
    checkInDate,
    checkOutDate,
    roomType,
    roomCount,
}) {
    // Implement your booking logic here
    // For example, you can make a POST request to a booking API
    console.log(
        `Booking hotel with ID: ${hotelId}, Check-in: ${checkInDate}, Check-out: ${checkOutDate}, Rooms: ${roomType} ${roomCount}`
    );

    try {
        const response = await fetch("http://localhost:1111/api/booking", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                hotelId,
                checkInDate,
                checkOutDate,
                roomType,
                roomCount,
            }),
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error booking hotel:", error);
        // Handle the error appropriately
        // For example, you can display an error message to the user or redirect to an error page
    }
};

const getBookingById = async function (id) {
    try {
        const response = await fetch(`http://localhost:1111/api/booking/${id}`, {
            credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error getting booking:", error);
    }
};

const getAllBookings = async function (search="", page=1, limit=10, sort="asc") {
    try {
        const response = await fetch(
            `http://localhost:1111/admin/bookings?search=${search}&page=${page}&limit=${limit}&sort=${sort}`,
            {
                credentials: "include",
                method: "GET",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error getting bookings:", error);
    }
};

const toggleBookingStatus = async function(bookingId){
    try {
        const response = await fetch(`http://localhost:1111/admin/bookings/${bookingId}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.log("Error toggling booking status:", error);
    }
}

const getUserBookings = async function(userId){
    try {

        const response = await fetch(`http://localhost:1111/api/bookings/${userId}`, {
            credentials: "include",
        });
        const data = await response.json();
        console.log(data);
        return data
        
    } catch (error) {
        
    }
}

export { bookHotelService, getBookingById, getAllBookings, toggleBookingStatus, getUserBookings };
