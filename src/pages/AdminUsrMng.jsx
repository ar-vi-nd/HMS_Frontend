import React, { useState, useEffect } from 'react'
import { UserList, AdminHotelSearch } from '../components';
import { getAllUsers, toggleUserStatus } from '../services/user.service';
import { ToastContainer, toast } from 'react-toastify';


const AdminUsrMng = () => {
  const [users,setUsers] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("asc");
  const [search, setSearch] = useState("")

  const handlePageChange = (newPage) => {
    setParams(search,newPage, limit, sort);
    fetchUsers(search,newPage, limit, sort);
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

const fetchUsers = async (search, page,limit,sort) => {
  setParams(
    search,
      page,
      limit,
      sort
  );
  console.log(search,page,limit,sort)
  const response = await getAllUsers(search,page,limit,sort);
  console.log(response)
  if (!response.success) {
      return toast.error(response?.error?.message);
  }
  setUsers(response?.data?.users);
  setPage(page)
  console.log(Math.ceil(response?.data?.totalUsers / limit))
  setTotalPages(Math.ceil(response?.data?.totalUsers / limit) || 1);
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


  fetchUsers(search,page,limit,sort)

}, [window.location.href]);

 const toggleStatus = async function(userId){

  const response = await toggleUserStatus(userId);
  if(!response){
    return toast.error("Error Updating User Status");
  }
  fetchUsers(search,page, limit, sort);


 }

  return (
    <div name='user-management'>
      Admin User Management

      <AdminHotelSearch location={search} setLocation={setSearch} searchLabel={"User"} action={() => { fetchUsers(search,1, limit, sort) }} sort={sort} setSort={setSort} limit={limit} setLimit={setLimit} />
            {/* <HotelList hotels={hotels} onDelete={handleDeleteHotel} onUpdate={handleUpdateHotel} /> */}
            <UserList users={users} toggleStatus={toggleStatus}/>

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

export default AdminUsrMng
