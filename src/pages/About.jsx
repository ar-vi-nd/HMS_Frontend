import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto mt-10 p-6">
      <h1 className="text-4xl font-bold mb-6">About YOYO</h1>
      <p className="text-lg mb-4">
        Welcome to YOYO, your go-to platform for seamless hotel bookings. Our mission is to make your travel experience enjoyable and hassle-free by connecting you with the best hotels worldwide.
      </p>
      <p className="text-lg mb-4">
        Established in [Year], YOYO has transformed the way travelers find and book accommodations. Our dedicated team is passionate about providing personalized services to ensure you find the perfect stay that meets your needs and preferences.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Values</h2>
      <ul className="list-disc list-inside mb-4">
        <li>Customer-Centric Service</li>
        <li>Integrity and Transparency</li>
        <li>Quality Assurance</li>
        <li>Innovation in Travel</li>
        <li>Community and Sustainability</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-6 mb-2">Meet Our Team</h2>
      <p className="text-lg">
        At YOYO, we pride ourselves on having a team of industry experts who work tirelessly to ensure you have an unforgettable experience. From hotel selection to booking assistance, we’re here to help you every step of the way.
      </p>
    </div>
  );
};

export default About;
