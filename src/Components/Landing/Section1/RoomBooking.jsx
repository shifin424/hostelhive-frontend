import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUser } from 'react-icons/fa';
import { IoBedOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { BookingData } from '../../../Redux/Features/student/RoomBooking';
import swal from 'sweetalert';

function RoomBooking() {

  const token = JSON.parse(localStorage?.getItem('StudentToken'))?.token;
  const student = JSON.parse(localStorage?.getItem('StudentToken'))
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        const headers = {
          headers: {
            Authorization: token,
          },
        };
        try {
          await dispatch(BookingData({ headers }));
        } catch (error) {
          console.error('Dispatch error:', error);
        }
      } else {
        navigate('/login');
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);
  const roomDetails = useSelector(state => state?.roomsDetils?.roomDetails);
  const bookingStatus = useSelector(state => state?.roomBookingData?.bookingDetails?.bookingStatus);
  const Requested = bookingStatus?.isRequested
  const verified = bookingStatus?.isVerified
 

  const handleBookNow = (id) => {
    if (bookingStatus && Requested === false && student.role === 'guest') {
      swal({
        title: 'Verification Required',
        text: 'Need to verify your data',
        icon: 'warning',
        buttons: {
          cancel: {
            text: 'Cancel',
            className: 'swal-button swal-button--cancel',
            value: 'cancel',
          },
          ok: {
            text: 'OK',
            className: 'swal-button swal-button--confirm',
            value: 'ok',
          },
        },
      }).then((value) => {
        if (value === 'ok') {
          if (!Requested) {
            navigate(`/room-booking/request/${id}`);
          } else {
            message.info('Request is still processing');
          }
        }
      });
    } else if (bookingStatus && verified && student.role === 'guest') {
      navigate(`/room-booking/rent-payment/${id}`);
    }else if(student.role === 'resident'){
      message.info("The payment is already done!")
      navigate('/student/profile')
    }
     else {
      message.info("Request is still processing")
    }
  };

  const filteredRooms = roomDetails?.roomData?.filter(room => room?.occupants < room?.capacity);

  return (
    <>
      <div className="bg-white w-full h-44 pt-14">
        <h1 className="ml-10 text-3xl text-[#002D7A] font-bold font-popins">
          Room Details
        </h1>
      </div>
      <div className="bg-white pb-10">
        {filteredRooms.length === 0 ? (
          <p className="text-red-500 text-center mt-5 text-2xl font-bold">Every Room is Full No Any Rooms available </p>
        ) : (
          filteredRooms.map((room, index) => (
            <li
              key={index}
              className="flex flex-col px-2 rounded-md shadow-2xl md:mx-16 lg:flex-row lg:mx-20 xl:mx-32 mt-5 mb-20"
            >
              <div className="overflow-hidden rounded-md lg:w-2/6">
                <img className="w-full h-full" src={room?.url} alt="room"></img>
              </div>
              <div className="p-5 grid lg:grid-cols-2 w-full">
                <div className="grid gap-4">
                  <div className="text-2xl font-bold text-[#002D7A]">
                    {room?.title}
                  </div>
                  <div className="flex-wrap  text-gray-600 text-xl">
                    {room?.description}
                  </div>
                  <div className="flex flex-wrap items-center text-gray-900 text-xl gap-6 sm:gap-6">
                    <div className="flex gap-2 items-center">
                      <div>
                        <FaRegUser />
                      </div>
                      <div>{room?.occupants} Sleep</div>
                    </div>
                    <div className="flex gap-2 items-center">
                      <div>
                        <IoBedOutline size={25} />
                      </div>
                      <div>{room?.capacity}</div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-6 py-5 lg:py-0 lg:flex lg:flex-col lg:items-end lg:justify-between">
                  <div className="">
                    <div className="text-3xl font-bold inline-block lg:text-4xl text-gray-800 lg:font-extrabold">
                      ₹{room?.rent}
                    </div>
                    <span className="px-1 text-gray-600 text-lg">/month</span>
                  </div>
                  <button
                    className="text-white bg-blue-800 py-3 px-5 rounded-lg text-xl font-bold w-full sm:w-40 transform hover:scale-110 transition duration-300"
                    onClick={() => handleBookNow(room?._id)}
                  >
                    Book Now
                  </button>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-green-500 font-bold">Available</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        )}
      </div>
    </>
  );
}

export default RoomBooking;
