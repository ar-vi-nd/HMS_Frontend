import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getBookingById } from '../services/booking.service'
import { toast } from 'react-toastify'
import { cancelBooking } from '../services/booking.service'

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState(null) // Initialize booking details state to null
  const [loading, setLoading] = useState(true)  // Loading state
  const [error, setError] = useState(null)  // Error state

  const { bookingId } = useParams()

  const fetchBookingDetails = async () => {
    try {
      setLoading(true)
      const booking = await getBookingById(bookingId)
      if(!booking.success){
          toast.error(booking?.error?.message)
      }else{
          setBookingDetails(booking?.data?.booking)
      }
        // Set booking details in state
    // Log fetched booking details for debugging purposes
    } catch (err) {
      setError('Error fetching booking details')  // Handle errors
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    fetchBookingDetails()
  }, [bookingId])  // Add bookingId as a dependency to run effect only when bookingId changes

  const handleCancelBooking = async (bookingId)=>{
    try{
    const response = await cancelBooking(bookingId)
    if(!response?.success){
        toast.error(response?.error?.message)
    }
    if(response?.success){
        toast.success("Booking cancelled successfully!") // Refresh the bookings list after cancelling a booking
        fetchBookingDetails()  // Refresh the booking details after cancelling a booking
    }}
    catch(error){
        console.log(error)
        toast.error("Failed to cancel booking")
    }
}

  if (loading) return <div className="text-center text-gray-500">Loading booking details...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  if (!bookingDetails) return <div className="text-center text-gray-500">No booking details available.</div>

  const { rooms,status,userId , hotelId } = bookingDetails

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-center text-2xl font-bold mb-6">Booking Receipt</h2>
      <table className="w-full table-auto border-collapse">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">Hotel Name</td>
            <td className="border px-4 py-2">{hotelId?.name}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">No of Rooms</td>
            <td className="border px-4 py-2">{rooms?.length}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Room Type</td>
            <td className="border px-4 py-2">{rooms[0]?.roomId?.type}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Address</td>
            <td className="border px-4 py-2">{hotelId?.address?.city}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Contact</td>
            <td className="border px-4 py-2">{hotelId?.contact?.phone}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Check-in</td>
            <td className="border px-4 py-2">{new Date(rooms[0]?.checkInDate).toLocaleDateString()
            }</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Check-out</td>
            <td className="border px-4 py-2">{new Date(rooms[0]?.checkOutDate).toLocaleDateString()
            }</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Days</td>
            <td className="border px-4 py-2">{((new Date(rooms[0]?.checkOutDate) - new Date(rooms[0]?.checkInDate))/(1000 * 60 * 60 * 24)).toLocaleString()}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Total Price</td>
            <td className="border px-4 py-2">${bookingDetails?.totalCost}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Status</td>
            <td className="border px-4 py-2">{status}</td>
          </tr>
        </tbody>
      </table>

      <div className='flex justify-around m-2'>
      <button className='bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-gray-400'
      disabled={bookingDetails?.status==="CANCELLED"}
      onClick={()=>{handleCancelBooking(bookingDetails?._id)}}>
        Cancel Booking
      </button>
      </div>

    </div>
  )
}

export default BookingDetails
