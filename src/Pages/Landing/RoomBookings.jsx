import React from 'react'
import RoomBooking from '../../Components/Landing/Section1/RoomBooking'
import Navbar from '../../Components/Landing/NavBar/Navbar'

function RoomBookings() {
  return (
    <div className='bg-white w-full h-screen pb-36'>
        <Navbar/>
      <RoomBooking/>
    </div>
  )
}

export default RoomBookings
