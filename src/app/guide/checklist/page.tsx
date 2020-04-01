// pages/checklist.js
import React from 'react';

const Checklist = () => {
  const duas = [
    'Entering toilet dua',
    'Exit toilet dua',
    'Leaving home dua (FIND)',
    'Starting journey dua',
    'Journey break dua (FIND)',
    'Dua after adhan',
    'Dua for intention for Umrah before 2 Nafal (FIND)',
    'Thalbia (labayallah huma labayk....)',
    'Dua when entering new city',
    'Dua when entering mosque',
    'Dua when start each tawaf at black stone (bismillahe allah hu akbar)',
    'Dua between Yemani corner and black stone',
    'Dua after tawaaf when going to Makame Ibrahim (watakithu makame Ibrahima musuala)',
    'Dua when drinking Zam Zam water',
    'Dua when exiting mosque',
    'Dua at Safa Marwa'
  ];

  return (
      <div className="container mx-auto px-4 py-28">
        <h1 className="text-4xl font-bold text-stone-700 mb-8">Checklist</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <ul className="list-disc pl-5 space-y-2">
            {duas.map((dua, index) => (
              <li key={index} className="text-lg text-stone-700">
                {dua}
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
};

export default Checklist;
