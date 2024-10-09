import React from 'react';
import {Card} from './index'
const recentSearchesData = [
  { location: 'New Delhi', date: '12 Oct - 19 Oct', guests: '2 adults' },
  { location: 'India', date: '12 Oct - 19 Oct', guests: '2 adults' },
];

const RecentSearches = () => {
  return (
    <div className=" bg-white p-2">
      <h2 className="text-xl font-semibold mb-4">Your recent searches</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recentSearchesData.map((search, index) => (
          <Card
            key={index}
            location={search.location}
            date={search.date}
            guests={search.guests}
          />
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
