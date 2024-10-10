// TrendingDestinations.js
import React from 'react';

import {DestinationCard} from './index';
import { Link } from 'react-router-dom';

const TrendingDestinations = () => {
  const destinations = [
    {
      id: 1,
      name: 'New Delhi',
      image: 'https://plus.unsplash.com/premium_photo-1697729555861-e406b4989ee1?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    },
    {
      id: 2,
      name: 'Mysore',
      image: 'https://plus.unsplash.com/premium_photo-1697729434815-40ab4970ebc1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: 3,
      name: 'Goa',
      image: 'https://images.unsplash.com/photo-1642922835816-e2ac68db5c42?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    },
    {
      id: 4,
      name: 'Meghalaya',
      image: 'https://images.unsplash.com/photo-1552978534-9d01e1f91517?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    },
    {
      id: 5,
      name: 'Shimla',
      image: 'https://images.unsplash.com/photo-1597074866923-dc0589150358?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    },
    {
      id: 6,
      name: 'Kerala',
      image: 'https://plus.unsplash.com/premium_photo-1697729438401-fcb4ff66d9a8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',

    },
  ];

  return (
    <div className="my-8 bg-white">
      <h2 className="text-3xl font-bold mb-4">Trending Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {destinations.map((destination) => (
            <Link key={destination.id} to={`/hotels?location=${destination.name}&_page=1&_limit=10`}>
          <DestinationCard 
            key={destination.id} 
            name={destination.name} 
            image={destination.image} 
            />
            </Link>
        ))}
      </div>
    </div>
  );
};

export default TrendingDestinations;
