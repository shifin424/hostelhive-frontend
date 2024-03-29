import React from 'react';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RoomData } from '../../../Redux/Features/student/RoomSlice';
import { useNavigate } from 'react-router-dom';

function RoomListing() {
  const hostelRoomData = useSelector(state => state?.hostelView?.hostelData);
  const dispatch = useDispatch();
  const navigate = useNavigate()

 
  const handleViewDetails = async(hostelId, roomType) => {
    try{
      await dispatch(RoomData({ hostelId, roomType }));
      navigate('/room-booking')
    }catch(err){
      console.log(err);
    }
  };



  return (
    <>
      <div className=" w-full h-32 pt-4">
        <h1 className="ml-10 text-4xl text-[#002D7A] font-bold font-popins">
          Our Rooms
        </h1>
      </div>

      <div className="w-full px-16 pb-6 flex flex-wrap">
        {hostelRoomData.rooms.map((room, index) => (
          <div
            key={index}
            className="card w-[19rem] h-[23rem] bg-base-100 rounded-lg shadow-2xl m-5 transform hover:scale-105 transition duration-300"
          >
            <figure>
              <img src={room?.room_image} alt="Card" className="w-full h-60 object-cover" />
            </figure>
            <div className="card-body bg-white rounded-b-lg p-3 flex flex-col justify-between">
              <div>
                <h2 className="card-title text-xl font-popins text-[#002D7A]">
                  {room?.room_type}
                </h2>
                <div className="flex items-center">
                  <p className="rounded-lg text-green-500 font-semibold">
                    Rooms Available: {room?.count}
                  </p>
                </div>
              </div>
              <div className="card-actions justify-center flex items-center">
                <Link
                  className="mr-1 font-bold text-[#002D7A]"
                  onClick={() => handleViewDetails(hostelRoomData?._id, room?.room_type)}
                >
                  View Details
                </Link>
                <MdOutlineDoubleArrow className="text-[#002D7A]" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default RoomListing;
