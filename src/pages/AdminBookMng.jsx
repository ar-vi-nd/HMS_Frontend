import React,{useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { AdminHotelSearch, BookingList } from '../components';
import { getAllBookings, toggleBookingStatus } from '../services/booking.service';



const AdminBookMng = () => {
  const [bookings,setBookings] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("")

  const handlePageChange = (newPage) => {
    setParams(search,newPage, limit, sort);
    fetchBookings(search,newPage, limit, sort);
};

const setParams = (newSearch,newPage, newLimit,newSort) => {
  setPage(newPage);
  setLimit(newLimit);
  setSort(newSort);
  setSearch(newSearch);
  history.pushState(
      {},
      "",
      `?${new URLSearchParams({
          _page: newPage.toString(),
          _limit: newLimit.toString(),
          sort: newSort?.toString(),
          search: newSearch?.toString(),
      })}`
  );
};

const fetchBookings = async (search, page,limit,sort) => {
  setParams(
    search,
      page,
      limit,
      sort
  );
  console.log(search,page,limit,sort)
  const response = await getAllBookings(search,page,limit,sort);
  console.log(response)
  if (!response) {
      return toast.error("Error Fetching Hotels");
  }
  setBookings(response?.data?.bookings);
  setPage(page)
  setTotalPages(Math.ceil(response?.data?.totalBookings / limit) || 1);
};

useEffect(() => {
  const page =
      Number(new URLSearchParams(window.location.search).get("_page")) || 1;
  const limit =
      Number(new URLSearchParams(window.location.search).get("_limit")) || 10;

  const sort = new URLSearchParams(window.location.search).get("sort") || "asc"
  const search = new URLSearchParams(window.location.search).get("search")|| ""

  setParams(
    search,
      page,
      limit,
      sort
  );


  fetchBookings(search,page,limit,sort)

}, [window.location.href]);

const toggleStatus= async function(bookingId){

  const response = await toggleBookingStatus(bookingId);
  if(!response){
    return toast.error("Error Updating User Status");
  }
  fetchBookings(search,page, limit, sort);


 }
  return (
    <div>
        Admin Booking Management
      <AdminHotelSearch location={search} setLocation={setSearch} searchLabel={"Hotel Name"} action={() => { fetchBookings(search,1, limit, sort) }} sort={sort} setSort={setSort} limit={limit} setLimit={setLimit} />
        <BookingList bookings={bookings} toggleStatus={toggleStatus}/>
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
  )
}

export default AdminBookMng
