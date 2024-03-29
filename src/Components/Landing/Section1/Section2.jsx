import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { hostelInfoApi } from '../../../Services/LandingService';
import { MdOutlineDoubleArrow } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { hostelView } from '../../../Redux/Features/student/hostelSlice';
import { Pagination } from 'antd';

function Section2() {
  const [details, setDetails] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationEntered, setLocationEntered] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const hostelsPerPage = 4;

  console.log(locationEntered);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchHostelInfo = async () => {
      try {
        const response = await hostelInfoApi();
        if (response && response.data && Array.isArray(response.data)) {
          setDetails(response.data);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHostelInfo();
  }, []);

  const viewHostelData = async (id) => {
    try {
      await dispatch(hostelView(id));
      navigate('/over-view');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setLocationEntered(true);
  };

  const filteredHostels = details.filter((hostel) =>
    hostel.location.toLowerCase().includes(searchQuery.toLowerCase())
  );


  const indexOfLastHostel = currentPage * hostelsPerPage;
  const indexOfFirstHostel = indexOfLastHostel - hostelsPerPage;
  const currentHostels = filteredHostels.slice(indexOfFirstHostel, indexOfLastHostel);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className=" w-full min-h-screen">
      <div className=" text-[#002D7A] p-8 font-bold text-3xl">Hostels with Rooms Available</div>
      <div className=" flex justify-center w-full mt-5 px-10">
        <input
          type="text"
          placeholder="    Search by location ..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-96 p-2 border bg-transparent  text-black h-14 border-[#002D7A] rounded-full"
        />
      </div>
      <div className="w-full mt-5 px-4 flex flex-wrap justify-center">
        {currentHostels.length > 0 ? (
          currentHostels.map((hostel) => (
            <div
              key={hostel._id}
              className="card w-full md:w-1/2 lg:w-1/3 xl:w-1/4 bg-base-100 rounded-lg shadow-2xl m-5 transform hover:scale-105 transition duration-300"
            >
              <figure>
                <img src={hostel.hostelImage.url} alt="Card" className="w-full h-60 object-cover rounded-t-lg" />
              </figure>
              <div className="card-body bg-white rounded-b-lg p-3 flex flex-col justify-between h-40">
                <div>
                  <h2 className="card-title text-xl font-popins text-[#002D7A]">{hostel.hostelName}</h2>
                  <div className="flex items-center">
                    <AiFillStar className="text-yellow-500" />
                    <p className="rounded-lg px-2 py-1 text-gray-600 font-sans">4.5 rating</p>
                  </div>
                  <div className="flex items-center">
                    <p className="rounded-lg text-green-500">Rooms Available: 24</p>
                  </div>
                </div>
                <div className="card-actions justify-center flex items-center">
                  <Link onClick={() => viewHostelData(hostel._id)} className="mr-1 font-bold text-[#002D7A]">
                    Book Rooms
                  </Link>
                  <MdOutlineDoubleArrow className="text-[#002D7A]" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-[#002D7A]  flex items-center mt-10">
            <h1 className="font-semibold">No hostels available for your entered location</h1>
          </div>
        )}
      </div>

      <div className="flex justify-center mt-5">
        <Pagination
          defaultCurrent={currentPage}
          total={filteredHostels.length}
          pageSize={hostelsPerPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default Section2;
