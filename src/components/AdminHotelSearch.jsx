import React from 'react'
import {Input,Button, SelectBox} from './index'

const AdminHotelSearch = ({searchLabel,action,setLocation,sort,setSort,limit,setLimit}) => {

    // console.log(sort,setSort)

    const sortOptions =[
        { value: 'asc', label: 'Name Ascending' },
        { value: 'desc', label: 'Name Descending' },
        { value:"1",label:"Oldest First"},
        { value:"-1",label:"Newest First"},
      ];
    
    const limitOptions =[
        { value: 10, label: '10' },
        { value: 20, label: '20' },
        { value: 30, label: '30' },
        { value: 40, label: '40' },
      ];
    


  return (
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 p-6 bg-blue-100 rounded-lg shadow-md">
      <Input type={"text"} label={searchLabel} setValue={setLocation} placeholder={searchLabel?`Enter ${searchLabel}`:"Enter city"}/>
      <SelectBox options={sortOptions} sort={sort} setSort={setSort} label={"Sort"}/>
      <SelectBox options={limitOptions} sort={limit} setSort={setLimit} label={"Limit"}/>
      <Button action={action}>Search</Button>
    </div>
  )
}

export default AdminHotelSearch
