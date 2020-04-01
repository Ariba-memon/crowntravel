// pages/maps.js
import React from 'react';

const maps = [
  {
    title: 'Mecca Map',
    description: 'Explore this detailed map covering the area of Mecca during Hajj.',
    url: '/maps/map1.pdf'
  },
  {
    title: 'Umrah Route Map',
    description: 'Use this geographic information system map to navigate through key points during Umrah.',
    url: '/maps/map2.pdf'
  },
  {
    title: 'Pilgrimage Routes Map',
    description: 'Detailed plan of Mecca showing pilgrimage routes and landmarks.',
    url: '/maps/map3.pdf'
  }
];

function MapsPage() {
  return (
    <div className='flex flex-col items-center justify-center pt-24 pb-24  p-6'>
      <div className='text-center mb-12'>
        <h1 className='text-4xl font-bold mb-4 text-stone-500'>Maps for Pilgrimage</h1>
        <p className='text-lg text-gray-700'>
          View and download the maps to help you navigate during your pilgrimage journey.
        </p>
      </div>
      
      {/* Map Cards Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {maps.map((map, index) => (
          <div key={index} className='bg-stone-500 shadow-md rounded-lg p-6 text-center w-full'>
            <h2 className='text-2xl font-semibold mb-2 text-white'>{map.title}</h2>
            <p className='text-gray-200 mb-4'>{map.description}</p>
            
            
            {/* Download Link */}
            <a href={map.url} download className='text-stone-500 p-2 rounded-lg text-xl font-bold bg-white '>
              Download 
            </a>
          </div>
        ))}
      </div>
      
      {/* Additional Sections (if needed) */}
      <div className='mt-24 w-full'>
        <h2 className='text-3xl font-bold mb-2 text-stone-500 text-center'>Additional Information</h2>
        <p className='text-lg text-gray-700 text-center'>
          Explore more resources related to pilgrimage planning and navigation.
        </p>
        {/* Add more relevant sections or links here */}
      </div>
      
      {/* Call to Action */}
      <div className='mt-6 w-full'>
        <p className='text-lg text-gray-700 text-center'>
        At our Umrah and Hajj travel agency, we understand the significance of your spiritual journey. To enhance your experience, we offer a wealth of resources related to pilgrimage planning and navigation. Whether your are first-time pilgrim or a seasoned traveler, our curated content will guide you through every step of your sacred voyage.<br />
          Need personalized assistance with your pilgrimage journey? <br />
          Contact our team for expert guidance and support.
        </p>
        {/* Add contact form or contact information */}
      </div>
      
    </div>
  );
}

export default MapsPage;
