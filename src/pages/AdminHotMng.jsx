import React, { useEffect, useState } from 'react';
import { HotelList, AdminHotelSearch } from '../components';
// import { getHotels, deleteHotel } from '../services/hotel.service';  // Assuming you have a service for hotel operations
import { getAllAdminHotels, deleteHotelById } from '../services/hotel.service';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const AdminHotMng = () => {

    const navigate = useNavigate();
    
    const [hotels, setHotels] = useState([]);
    const [totalPages, setTotalPages] = useState(0)
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [location, setLocation] = useState("")
    const [sort, setSort] = useState("asc");

    const handlePageChange = (newPage) => {
        setParams(newPage, limit, location, sort);
        fetchHotels(newPage, limit, location, sort);
    };

    const setParams = (newPage, newLimit, newLocation, newSort) => {
        setPage(newPage);
        setLimit(newLimit);
        setLocation(newLocation);
        setSort(newSort);
        history.pushState(
            {},
            "",
            `?${new URLSearchParams({
                location: newLocation?.toString(),
                _page: newPage.toString(),
                _limit: newLimit.toString(),
                sort: newSort?.toString(),
            })}`
        );
    };

    const fetchHotels = async (page, limit, location, sort) => {

        console.log(page, limit, location, sort)

        setParams(
            page,
            limit,
            location,
            sort
        );
        const response = await getAllAdminHotels(page, limit, location, sort);
        console.log(response)
        if (!response?.success) {
            return toast.error(response?.error?.message);
        }
        setHotels(response?.data?.hotels);
        setTotalPages(Math.ceil(response?.data?.totalHotels / limit) || 1);
        setPage(page)
    };



    useEffect(() => {
        const page =
            Number(new URLSearchParams(window.location.search).get("_page")) || 1;
        const limit =
            Number(new URLSearchParams(window.location.search).get("_limit")) || 10;
        const location = new URLSearchParams(window.location.search).get("location") || "";

        const sort = new URLSearchParams(window.location.search).get("sort") || "asc"

        setParams(
            page,
            limit,
            location,
            sort
        );

        console.log(page, limit, location)

        fetchHotels(page, limit, location, sort)

    }, [window.location.href]);

    const handleDeleteHotel = async (hotelId) => {
        
        try {
            const response = await deleteHotelById(hotelId);
            console.log(response)
            if (!response.success) {
                toast.error(response?.error?.message);
            } else {
                toast.success("Hotel deleted successfully!");
            setHotels(hotels.filter(hotel => hotel._id !== response?.data?.hotel?._id));

            }
        } catch (error) {

            console.log("Error deleting hotel", error);
            
        }
    };

    const handleUpdateHotel = (hotelId) => {
        // Navigate to an update form or handle hotel update logic
        console.log(`Update hotel: ${hotelId}`);
        navigate(`/admin/updatehotel/${hotelId}`, { replace: true });
        
    };

    const handleViewHotel = (hotelId) => {
        // Navigate to a view form or handle hotel view logic
        console.log(`View hotel: ${hotelId}`);
        navigate(`/admin/viewhotel/${hotelId}`, { replace: true });
    };

    return (
        <div className="hotel-management">
            <AdminHotelSearch searchLabel={"City or Hotel Name"} action={() => { fetchHotels(1, limit, location, sort) }} setLocation={setLocation} sort={sort} setSort={setSort} limit={limit} setLimit={setLimit} />
            <HotelList hotels={hotels} onDelete={handleDeleteHotel} onUpdate={handleUpdateHotel} onView={handleViewHotel}/>

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

        </div>
    );
};

export default AdminHotMng;
