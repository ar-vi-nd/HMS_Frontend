import React from 'react'
import { useParams } from 'react-router'
import { UpdateHotelForm } from '../components'

const HotelUpdateFormPage = () => {

    const {hotelId} = useParams()

  return (
    <UpdateHotelForm hotelId={hotelId}/>
  )
}

export default HotelUpdateFormPage
