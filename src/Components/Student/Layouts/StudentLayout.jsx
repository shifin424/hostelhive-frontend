import React from 'react'
import Navbar from './Navbar'
import StudentSidebar from './StudentSideBar'
import { Outlet } from 'react-router-dom'

function StudentLayout() {
  return (
    <>
      <Navbar/>
      <section className="flex">
        <div className='grid grid-cols-[auto_1fr] h-full w-full'>
          <div className='col-start-1 col-end-2'>
            <StudentSidebar />
          </div>

          <div className="bg-white p-4 sm:p-8 col-start-2 w-full col-end-3">
            <Outlet />
          </div>
        </div>


      </section>

    </>
  )
}

export default StudentLayout
