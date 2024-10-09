import React, { useState, useEffect } from "react";
import {
    Search,
    HotelCard,
} from "../components";
import { getAllHotels } from "../services/hotel.service";
import { toast, ToastContainer } from "react-toastify";
import useHotelSearch from "../hooks/useHotelSearch";
import { Link } from "react-router-dom";

const Hotels = () => {
    const {location, setLocation, checkInDate, setCheckInDate, checkOutDate, setCheckOutDate, navigateToHotel} = useHotelSearch()
    const [hotels, setHotels] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const handlePageChange = (newPage) => {
        setParams(newPage, limit, location);
        fetchHotels(newPage,limit, location);
    };

    const handleLimitChange = (newLimit) => {
        setParams(page, newLimit);
        console.log("before changing limit");
        console.log("after changing limit");
    };

    const setParams = (newPage, newLimit,location) => {
        setPage(newPage);
        setLimit(newLimit);
        setLocation(location);
        history.pushState(
            {},
            "",
            `?${new URLSearchParams({
                location: location?.toString(),
                _page: newPage.toString(),
                _limit: newLimit.toString(),
            })}`
        );
    };

    const fetchHotels = async (page,limit,location) => {
        setParams(
            page,
            limit,
            location
        );
        const response = await getAllHotels(page, limit,location);
        console.log(response)
        if (!response) {
            return toast.error("Error Fetching Hotels");
        }
        setHotels(response?.data?.hotels);
        setTotalPages(Math.ceil(response?.data?.totalHotels/limit)||1);
        setPage(page)
    };

    useEffect(() => {
        const page =
            Number(new URLSearchParams(window.location.search).get("_page")) || 1;
        const limit =
            Number(new URLSearchParams(window.location.search).get("_limit")) || 10;
        const location = new URLSearchParams(window.location.search).get("location")||"";

        setParams(
            page,
            limit,
            location
        );

        console.log(page, limit, location)

        fetchHotels(page,limit,location)
      
    }, [window.location.href]);
    return (
        <div>
            <div className="md:mx-32">
                <Search location={location} setLocation={setLocation} checkInDate={checkInDate} setCheckInDate={setCheckInDate} checkOutDate={checkOutDate} setCheckOutDate={setCheckOutDate} action={()=>{fetchHotels(1,limit,location)}} ></Search>

                {hotels?.length&&hotels.map((hotel) => (
                    <Link to={`/hotels/${hotel._id}`}  key={hotel._id}>
                    <HotelCard
                        name={hotel.name}
                        image={hotel.pictures}
                        price={hotel?.roomCounts?.single?.price}
                        location={hotel?.address?.city}
                    />
                    </Link>

                ))}
            </div>


            <div className="flex justify-center items-center space-x-4 my-8">
  <button
    onClick={() => handlePageChange(Math.max(page - 1, 1))}
    disabled={page === 1}
    className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed`}
  >
    Previous
  </button>
  <span className="text-lg text-gray-700">
    Page {page} of {totalPages}
  </span>
  <button
    onClick={() => handlePageChange(Math.min(page + 1, totalPages))}
    disabled={page === totalPages}
    className={`px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed`}
  >
    Next
  </button>
</div>




            <ToastContainer />
        </div>
    );
};

export default Hotels;
