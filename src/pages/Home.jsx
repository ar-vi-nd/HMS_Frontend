import React,{useState} from 'react';
import { Search, RecentSearches, TrendingDestinations } from '../components';
import useHotelSearch from '../hooks/useHotelSearch';
import {Input, Button} from '../components';


function Home(){

    const [limit, setLimit] = useState(10);
    const [sort, setSort] = useState("asc");

    const {location, setLocation,navigateToHotel} = useHotelSearch()
 
    return (
        <div className="home-page">
        <div 
  className="w-full h-96 bg-cover bg-center flex items-center" 
  style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1629465133452-bbbbbbdf50cb?q=80&w=2793&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
>
  <div className="md:w-1/2 pl-8 text-white">
    <h1 className="text-6xl font-bold mb-2">Make your group trip dreams come true</h1>
    <p className="text-lg">Break free from your routine and play a little</p>
  </div>
</div>



        <div className='md:mx-32'>
        {/* <Search location={location} setLocation={setLocation} action={navigateToHotel} sort={sort} setSort={setSort} limit={limit} setLimit={setLimit}>Search For Your Dream Hotel</Search> */}
    <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-2 p-6 bg-blue-100 rounded-lg shadow-md">

        <Input type={"text"} label="Search" value={location} setValue={setLocation} placeholder={"Enter city or hotel name"} className={"w-40 h-14 p-6"}/>
      <Button action={navigateToHotel} className={"w-40 h-14 p-6"}>Search Hotel</Button>

      </div>

        <TrendingDestinations/>
        <RecentSearches/>
        </div>

      </div>
    )
}

export default Home;