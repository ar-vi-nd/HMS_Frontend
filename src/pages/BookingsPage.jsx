import React, { useEffect } from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/userContext'
import { getUserBookings } from '../services/booking.service'


const BookingsPage = () => {

    const {user} = useContext(UserContext)

    async function fetchBookings(userId){
        try {

            const bookings = await getUserBookings(userId)
            console.log(bookings)
            
        } catch (error) {

            console.log(error)
        }
    }


    useEffect(()=>{

        fetchBookings(user?._id)

    })
  return (
    <div>
      
    </div>
  )
}

export default BookingsPage
