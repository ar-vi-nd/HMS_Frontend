import React,{useState} from 'react';
import { Search, RecentSearches, TrendingDestinations } from '../components';
import useHotelSearch from '../hooks/useHotelSearch';


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
        <Search location={location} setLocation={setLocation} action={navigateToHotel} sort={sort} setSort={setSort} limit={limit} setLimit={setLimit}>Search</Search>
        <RecentSearches/>
        <TrendingDestinations/>
        </div>

      </div>
    )
}

export default Home;