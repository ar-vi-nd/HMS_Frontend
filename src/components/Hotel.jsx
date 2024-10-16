import React, { useEffect, useState, useRef, useContext } from 'react';
import Scrollbar from './Scrollbar';
import { DatePicker, RoomCard } from './index';
import useHotelSearch from '../hooks/useHotelSearch';
import { checkAvailability, getHotelById, deleteHotelById } from '../services/hotel.service';
import { useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { bookHotelService } from '../services/booking.service';
import { useNavigate } from 'react-router';
import { UserContext } from '../context/userContext';

const Hotel = () => {
    const { hotelId } = useParams();
    const [hotelDetails, setHotelDetails] = useState(null);
    const [availableRooms, setAvailableRooms] = useState({});
    const [days, setDays] = useState(0);
    const [mainImage, setMainImage] = useState("");

    const [singlerooms, setSingleRooms] = useState(0);
    const [premiumrooms, setPremiumRooms] = useState(0);
    const [deluxerooms, setDeluxeRooms] = useState(0);
    const navigate = useNavigate()

    const {user} = useContext(UserContext)

    // Ref for the date picker section
    const datePickerRef = useRef(null);
    const checkAvailabilityRef = useRef(null);

    const updateSingleRooms = (room) => {
        setSingleRooms(room);
    };
    const updatePremiumRooms = (room) => {
        setPremiumRooms(room);
    };
    const updateDeluxeRooms = (room) => {
        setDeluxeRooms(room);
    };


    const bookHotel = async (roomType,roomCount)=>{
        //bookhotel api call

        console.log(hotelId,checkInDate,checkOutDate,roomType,roomCount);
        if(roomCount === 0){
            toast.error("Please select a room");
            return;
        }
        const response = await bookHotelService({hotelId, checkInDate, checkOutDate, roomType,roomCount});

        if(!response.success){
            toast.error(response?.error?.message)
            navigate(`/login?redirectTo=/hotels/${hotelId}`)
        }else{
            toast.success("Hotel booked successfully!")
        navigate(`/booking/${response?.data?.bookingId}`)

        }


        
    }

    const checkAvailabilityOnClick = async (checkInDate, checkOutDate) => {
        let checkinDate = new Date(checkInDate);
        let checkoutDate = new Date(checkOutDate);
        if (checkInDate >= checkOutDate){
            setDays(0);
            toast.error("Check-out date should be after check-in date");
        }
        else if( checkinDate < (new Date()).setHours(0,0,0,0)){
            setDays(0);
            toast.error("Check-in date should be today or later");
        }
        else {
            const response = await checkAvailability(hotelId, checkInDate, checkOutDate);
            console.log(response)
            setAvailableRooms(response?.data?.availableRooms?.availableRoomsByType);
            setDays((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
            if (checkAvailabilityRef.current) {
                checkAvailabilityRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const { checkInDate, setCheckInDate, checkOutDate, setCheckOutDate } = useHotelSearch();

    const handleImageClick = (image) => {
        setMainImage(image);
    };

    useEffect(() => {
        if (hotelId) {
            (async () => {
                const details = await getHotelById(hotelId);
                setHotelDetails(details?.data?.hotelDetails);
                setMainImage(details?.data?.hotelDetails?.pictures[0]);
            })();
        }
    }, [hotelId]);

    const amenities = ["Wi-Fi", "Breakfast Included", "Mini Bar", "Private Pool", "Gym & Spa"];

    // Scroll to the DatePicker section
    const handleBookNowClick = () => {
        datePickerRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCheckAvailableClick = () => {
        checkAvailabilityRef.current.scrollIntoView({ behavior:'smooth' });
    }

    const handleDeleteHotel = async () => {
        const response = await deleteHotelById(hotelId);
        console.log(response)
    
        if (!response.success) {
            toast.error(response?.error?.message);
        }else{
            navigate("/admin/hotel")
        };
    }

    const handleUpdateHotel =  ()=>{
        navigate(`/admin/updatehotel/${hotelId}`, { replace: true });  
    }

    return (
        <div className={`container mx-auto px-4 py-8`}>
            <div className='flex flex-col md:flex-row'>
                <div className='md:w-1/2'>
                    <div className='h-96 bg-gray-100 flex items-center justify-center'>
                        <img src={mainImage} alt="Main" className='h-full object-cover' />
                    </div>

                    <div className='mt-4 w-full overflow-x-auto flex'>
                       { <Scrollbar images={hotelDetails?.pictures} handleImageClick={handleImageClick} />}
                    </div>
                </div>

              

                <div className='md:w-1/2 px-4 mt-4 md:mt-0 md:ml-8'>

                {user.isAdmin && <div className='flex justify-start space-x-2 my-2 p-2'><button
                        onClick={handleUpdateHotel}
                        className='bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700'
                    >
                       Update Hotel
                    </button>
                    <button
                        onClick={handleDeleteHotel}
                        className='bg-red-600 text-white py-2 px-6 rounded hover:bg-red-700'
                    >
                       Delete Hotel
                    </button></div>}
               
                    <div className='text-3xl font-bold mb-2'>{hotelDetails?.name}</div>
                    <div className='text-lg text-gray-500 mb-2'>
                        {hotelDetails?.address?.street || "Somewhere"}, {hotelDetails?.address?.city}, {hotelDetails?.address?.country || "India"}
                    </div>
                    <div className='text-sm text-gray-500 mb-4'>
                        {hotelDetails?.description || 'No description available for this hotel.'}
                    </div>

                    {/* Amenities with background colors, padding, and responsive alignment */}
                    <div className='mb-4'>
                        <div className='font-semibold'>Amenities:</div>
                        <ul className='flex flex-wrap gap-2 mt-2'>
                            {amenities.map((amenity, index) => (
                                <li key={index} className='bg-blue-100 text-blue-700 py-1 px-3 rounded-lg'>
                                    {amenity}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Room pricing, ratings, and total rooms */}
                    <div className='mb-4'>
                        <span className='font-semibold'>Total Rooms:</span> {hotelDetails?.roomCounts?.single?.count + hotelDetails?.roomCounts?.premium?.count + hotelDetails?.roomCounts?.deluxe?.count || 'N/A'}
                    </div>

                    <div className='flex items-center mb-4'>
                        <span className='m-2'>Starting from</span>
                        <span className='text-xl font-bold mr-2'>${hotelDetails?.roomCounts?.single?.price}/night</span>
                            <span className='bg-green-500 text-white text-sm px-2 py-1 rounded'>
                                {4.5} / 5 ({35} reviews)
                            </span>
                        
                    </div>

                    {/* Book Now Button */}
                    <button 
                        onClick={handleBookNowClick}
                        className='bg-blue-600 text-white py-2 px-6  rounded hover:bg-blue-700'
                    >
                       Check Availability
                    </button>
                    
                </div>
            </div>

            {/* Date Picker Section */}
            <div className='mt-8' ref={datePickerRef}>
                <h1 className='text-2xl font-semibold mb-4 text-center md:text-left text-blue-700'>
                    Choose Checkin and Checkout Dates
                </h1>
                <DatePicker checkInDate={checkInDate} setCheckInDate={setCheckInDate} checkOutDate={checkOutDate} setCheckOutDate={setCheckOutDate}  action={() => checkAvailabilityOnClick(checkInDate, checkOutDate)} />
            </div>

            {/* Room Cards */}
            <div className='mt-8' ref={checkAvailabilityRef}>
                <RoomCard key={"Single"} rooms={singlerooms} updateRooms={updateSingleRooms} type={"Single"} totalRooms={hotelDetails?.roomCounts?.count} price={hotelDetails?.roomCounts?.single?.price} services={["Wi-Fi", "Free Breakfast"]} availableRooms={availableRooms?.single?.length} days={days}  bookHotel={bookHotel}/>
                <RoomCard key={"Premium"} rooms={premiumrooms} updateRooms={updatePremiumRooms} type={"Premium"} totalRooms={hotelDetails?.roomCounts?.count} price={hotelDetails?.roomCounts?.premium?.price} services={["Wi-Fi", "Mini Bar", "Gym & Spa"]} availableRooms={availableRooms?.premium?.length} days={days}  bookHotel={bookHotel}/>
                <RoomCard key={"Deluxe"} rooms={deluxerooms} updateRooms={updateDeluxeRooms} type={"Deluxe"} totalRooms={hotelDetails?.roomCounts?.count} price={hotelDetails?.roomCounts?.deluxe?.price} services={["Free Cab", "Air Conditioning", "Mini-Bar", "Private Pool", "Gym & Spa"]} availableRooms={availableRooms?.deluxe?.length} days={days} bookHotel={bookHotel}/>
            </div>

            {/* <ToastContainer /> */}
        </div>
    );
};

export default Hotel;
