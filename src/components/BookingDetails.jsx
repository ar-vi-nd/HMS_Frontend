import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { getBookingById } from '../services/booking.service'

const BookingDetails = () => {
  const [bookingDetails, setBookingDetails] = useState(null) // Initialize booking details state to null
  const [loading, setLoading] = useState(true)  // Loading state
  const [error, setError] = useState(null)  // Error state

  const { bookingId } = useParams()

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setLoading(true)
        const booking = await getBookingById(bookingId)
        setBookingDetails(booking?.data?.booking)  // Set booking details in state
        console.log(booking?.data?.booking)  // Log fetched booking details for debugging purposes
      } catch (err) {
        setError('Error fetching booking details')  // Handle errors
      } finally {
        setLoading(false)
      }
    }

    fetchBookingDetails()
  }, [bookingId])  // Add bookingId as a dependency to run effect only when bookingId changes

  if (loading) return <div className="text-center text-gray-500">Loading booking details...</div>
  if (error) return <div className="text-center text-red-500">{error}</div>

  if (!bookingDetails) return <div className="text-center text-gray-500">No booking details available.</div>

  const { hotelName, roomNo, roomType, address, contact, checkIn, checkOut, days, totalPrice, status } = bookingDetails

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-center text-2xl font-bold mb-6">Booking Receipt</h2>
      <table className="w-full table-auto border-collapse">
        <tbody>
          <tr>
            <td className="border px-4 py-2 font-semibold">Hotel Name</td>
            <td className="border px-4 py-2">{bookingDetails?.roomId?.hotelId?.name}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Room No</td>
            <td className="border px-4 py-2">{bookingDetails?.roomId?.roomNumber}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Room Type</td>
            <td className="border px-4 py-2">{bookingDetails?.roomId?.type}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Address</td>
            <td className="border px-4 py-2">{bookingDetails?.roomId?.hotelId?.address?.city}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Contact</td>
            <td className="border px-4 py-2">{bookingDetails?.roomId?.hotelId?.contact?.phone}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Check-in</td>
            <td className="border px-4 py-2">{new Date(bookingDetails?.checkInDate).toLocaleDateString()
            }</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Check-out</td>
            <td className="border px-4 py-2">{new Date(bookingDetails?.checkOutDate).toLocaleDateString()
            }</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Days</td>
            <td className="border px-4 py-2">{((new Date(bookingDetails?.checkOutDate) - new Date(bookingDetails?.checkInDate))/(1000 * 60 * 60 * 24)).toLocaleString()}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Total Price</td>
            <td className="border px-4 py-2">${bookingDetails.totalCost}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2 font-semibold">Status</td>
            <td className="border px-4 py-2">{status}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default BookingDetails
