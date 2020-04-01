// pages/dua.js
'use client'
import React from 'react';
import ReactPlayer from 'react-player';

const duaVideos = [
    {
      title: 'Hajj and Umrah Ihram Demonstration',
      url: 'https://www.youtube.com/watch?v=omWDHIHNetY',
      text: 'حَجّ وَعُمرَة إحرَام لِلدَّليل',
      translation: 'حَجّ وَعُمرَة إحرَام لِلدَّليل'
    },
    {
      title: 'Dua at Mount Safa and Mount Marwah',
      url: 'https://www.youtube.com/watch?v=3AjVhjm4C4o',
      text: 'دُعَاء عَندَ جَبَل الصَّفَا وَالمَروَة',
      translation: 'دُعَاء عَندَ جَبَل الصَّفَا وَالمَروَة'
    },
    {
      title: 'Dua before drinking Zam Zam',
      url: 'https://www.youtube.com/watch?v=Ku7JqJo4UdM',
      text: 'دُعَاء قَبلَ شُرب زَمزَم',
      translation: 'دُعَاء قَبلَ شُرب زَمزَم'
    },
    {
      title: 'DUA FOR TRAVELS JOURNEY',
      url: 'https://www.youtube.com/watch?v=PR1QVpMsD1c',
      text: 'دُعَاء لِرَحلة السَّفَر',
      translation: 'دُعَاء لِرَحلة السَّفَر'
    },
    {
      title: 'Dua on leaving the toilet',
      url: 'https://www.youtube.com/watch?v=HazjTtm8JS0',
      text: 'دُعَاء عَندَ خُرُوج مِنَ الحَمَّام',
      translation: 'دُعَاء عَندَ خُرُوج مِنَ الحَمَّام'
    },
    {
      title: 'Dua Said Between The Yemeni Corner and The Black Stone',
      url: 'https://www.youtube.com/watch?v=oniQsyY5QyU',
      text: 'دُعَاء بَينَ الرُّكن اليَمَانِي وَالحَجَر الأَسوَد',
      translation: 'دُعَاء بَينَ الرُّكن اليَمَانِي وَالحَجَر الأَسوَد'
    },
    {
      title: 'Dua Upon Entering A Town',
      url: 'https://www.youtube.com/watch?v=ZqMHZB4dpR4',
      text: 'دُعَاء عِندَ دُخُول البَلَد',
      translation: 'دُعَاء عِندَ دُخُول البَلَد'
    },
    {
      title: 'Dua when entering the Masjid',
      url: 'https://www.youtube.com/watch?v=SQcYoGhwUd8',
      text: 'دُعَاء عِندَ دُخُول الـمَسجِد',
      translation: 'دُعَاء عِندَ دُخُول الـمَسجِد'
    },
  ];
  

function DuaPage() {
  return (
    <div className='flex flex-col items-center justify-center pt-36 pb-24  p-6'>
      <div className='text-center mb-10'>
        <h1 className='text-4xl font-bold mb-4 text-stone-500'>Essential Duas</h1>
        <p className='text-lg text-gray-700'>
          Explore essential Duas for your pilgrimage journey. Watch the videos below to learn more, and read the text for deeper understanding.
        </p>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24'>
        {duaVideos.map((video, index) => (
          <div key={index} className='bg-stone-500 shadow-md rounded-lg p-6 text-center w-full overflow-hidden'>
            <h2 className='text-2xl font-semibold mb-1 text-white'>{video.title}</h2>
            <p className='text-white mb-4'>{video.text}</p>
            <div className='w-full overflow-hidden rounded-lg '>
              <ReactPlayer url={video.url} className='mx-auto max-w-full' />
            </div>
            
          </div>
        ))}
      </div>
      <div className=' text-center w-full '>
        <h2 className='text-3xl font-bold text-stone-500 mb-4'>Why Duas are Important</h2>
        <p className='text-lg text-gray-700  mx-auto mb-10 text-center max-w-screen-lg'>
          Duas are an essential part of the pilgrimage, offering spiritual support and connection to Allah. Each Dua has its own significance and helps you seek protection, guidance, and blessings during your journey. Here are some reasons why Duas are important:
        </p>
        <div className='text-left  mx-auto'>
          <h3 className='text-2xl font-semibold text-stone-500 mb-2'>Connection with Allah</h3>
          <p className='text-lg text-gray-700 mb-4 max-w-screen-md'>
            Duas are a means to communicate directly with Allah, expressing your needs, gratitude, and repentance. They strengthen your faith and deepen your spiritual connection.
          </p>
          <h3 className='text-2xl font-semibold text-stone-500 mb-2'>Spiritual and Mental Peace</h3>
          <p className='text-lg text-gray-700 mb-4 max-w-screen-md'>
            Engaging in Dua brings about a sense of peace and comfort, knowing that you are placing your trust in Allah. It helps in alleviating anxiety and provides mental clarity.
          </p>
          <h3 className='text-2xl font-semibold text-stone-500 mb-2'>Seeking Guidance and Support</h3>
          <p className='text-lg text-gray-700 mb-4 max-w-screen-md'>
            Through Duas, you can seek guidance and support for various aspects of life, including health, protection, and decision-making, ensuring that you are aligned with the divine will.
          </p>
          <h3 className='text-2xl font-semibold text-stone-500 mb-2'>Blessings and Rewards</h3>
          <p className='text-lg text-gray-700 mb-4 max-w-screen-md'>
            Making Duas regularly brings numerous blessings and rewards from Allah. It is a form of worship that is highly valued and encouraged in Islam.
          </p>
          <h3 className='text-2xl font-semibold text-stone-500 mb-2'>Tips for Making Effective Duas</h3>
          <ul className='list-disc list-inside text-lg text-gray-700 mb-4'>
            <li>Be sincere and humble in your supplications.</li>
            <li>Begin your Dua with praise for Allah and send blessings upon the Prophet Muhammad (peace be upon him).</li>
            <li>Have full conviction that Allah will respond to your prayers.</li>
            <li>Repeat your Duas regularly and be persistent.</li>
            <li>Make Duas not only for yourself but also for others.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DuaPage;
