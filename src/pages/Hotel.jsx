import React from 'react'

import { Hotel as HotelComponent } from '../components'



const Hotel = ({className}) => {
 
    return (
        <div className={`${className?className:"md:mx-32"} md:my-1`}>
            <HotelComponent className={className}/>
            
        </div>
    )
}

export default Hotel
