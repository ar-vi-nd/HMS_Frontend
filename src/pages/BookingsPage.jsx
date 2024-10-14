import React, { useState, useEffect } from 'react'
import { getUserBookings } from '../services/booking.service'
import { BookingCard } from '../components'
import { useParams } from 'react-router'
import { cancelBooking } from '../services/booking.service'
import { ToastContainer, toast } from 'react-toastify'


const BookingsPage = () => {

    const [bookings,setBookings] = useState([])


    const {userId} = useParams()

    async function fetchBookings(userId){
        try {
            const bookings = await getUserBookings(userId)
            console.log(bookings)
            setBookings(bookings?.data?.bookings)
            
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{
        fetchBookings(userId)

    },[])

    const handleCancelBooking = async (bookingId)=>{

        const response = await cancelBooking(bookingId)
        if(!response?.success){
            toast.error(response?.error?.message)
        }
        if(response?.success){
            toast.success("Booking cancelled successfully!")
            fetchBookings(userId)  // Refresh the bookings list after cancelling a booking
        }
    }
  return (
    <div>

    {bookings.length!==0 && bookings?.map(booking => (
        <BookingCard key={booking._id} booking={booking} handleCancelBooking={()=>{handleCancelBooking(booking._id)}} />
    ))}

    <ToastContainer/>
      
    </div>
  )
}

export default BookingsPage
