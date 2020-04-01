import Link from 'next/link';
import React from 'react';
import DuaImage from "@/assets/dua.jpg"
import MapImage from "@/assets/map.jpg"
import ZiaratImage from "@/assets/makkha4.webp"
import Image from 'next/image';
const cardsData = [
  {
    title: 'Dua',
    description: 'Essential Duas for guidance, protection, and blessings during Umrah and Hajj.',
    explore: 'Explore Dua',
    link: '/guide/dua',
    image: DuaImage
  },
  {
    title: 'Ziyarat',
    description: 'Important Ziyarat locations in Madina and Mecca for spiritual fulfillment and historical insights.',
    explore: 'Explore Ziyarat',
    link: '/guide/ziyarat',
    image: ZiaratImage
  },
  {
    title: 'Checklist',
    description: 'Essential Duas for guidance, protection, and blessings during Umrah and Hajj.',
    explore: 'Explore Checklist',
    link: '/guide/checklist',
    image: DuaImage
  },
  {
    title: 'Maps',
    description: 'Detailed maps to navigate pilgrimage routes and landmarks in Mecca and Madina.',
    explore: 'Explore Maps',
    link: '/guide/map',
    image: MapImage
  }
];


const faqs = [
    {
      question: 'What is Umrah?',
      answer: 'Umrah is an Islamic pilgrimage to Mecca that can be undertaken at any time of the year, unlike the Hajj which has specific dates according to the Islamic lunar calendar.'
    },
    {
      question: 'What should I pack for the pilgrimage?',
      answer: 'Essential items include comfortable walking shoes, Ihram clothing, personal hygiene items, and any necessary medications.'
    },
    {
      question: 'How long does the Umrah pilgrimage take?',
      answer: 'The Umrah pilgrimage can typically be completed in a few hours, but many pilgrims spend additional time in Mecca and Medina for worship and reflection.'
    },
    {
      question: 'Are there any age restrictions for Umrah?',
      answer: 'There are no specific age restrictions for Umrah, but pilgrims should be in good health and capable of performing the required rituals.'
    },
    {
      question: 'What are the key rituals of Umrah?',
      answer: 'The key rituals of Umrah include entering the state of Ihram, performing Tawaf around the Kaaba, and walking between the hills of Safa and Marwah.'
    }
  ];

function Page() {
  return (
    <div className='flex flex-col items-center justify-center pt-36 pb-24  p-6 max-w-screen-xl mx-auto'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold mb-4 text-stone-500'>Pilgrimage Guide</h1>
        <p className='text-lg text-gray-700 max-w-screen-md'>
          Explore our comprehensive guide for your Umrah and Hajj journey. Select a category below to find essential Dua, important Ziyarat locations, and detailed Maps to help you every step of the way.
        </p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24'>
        {cardsData.map((card, index) => (
          <div key={index} className='bg-stone-500 shadow-md rounded-lg p-3 md:p-6 text-center relative overflow-hidden flex flex-col justify-between gap-1 md:gap-2'>
            <Image src={card.image} alt={card.title} className='absolute w-full object-cover h-full opacity-40 z-0 top-0 left-0'/>
            <h2 className='text-2xl font-semibold  text-white z-10 relative'>{card.title}</h2>
            <p className='text-white font-semibold max-md:text-sm z-10 relative'>{card.description}</p>
            <Link href={card.link} className='bg-white z-10 relative text-stone-500 px-4 py-2 rounded-lg hover:bg-gray-100'>
              {card.explore}
            </Link>
          </div>
        ))}
      </div>
     
      <div className='mb-12 text-center'>
        <h2 className='text-3xl font-bold mb-6 text-stone-500'>Frequently Asked Questions</h2>
        <div className='space-y-4'>
          {faqs.map((faq, index) => (
            <div key={index} className='bg-gray-100 p-6 rounded-lg shadow-md'>
              <h3 className='text-xl font-semibold mb-2'>{faq.question}</h3>
              <p className='text-gray-700'>{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
}

export default Page;
