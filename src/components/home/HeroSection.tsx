'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import KabbaImage from '@/assets/kabba.jpg';
import MadinaImage from '@/assets/madina2.jpg';
import Madina2Image from '@/assets/madina3.jpg';
import HeroForm from './HeroForm';

function HeroSection() {
  const [bgImages, setBgImages] = useState([KabbaImage, MadinaImage, Madina2Image]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); 

    return () => clearInterval(interval);
  }, [bgImages]);

  return (
    <div className="w-full max-h-[100vh] h-screen relative overflow-hidden">
      {bgImages.map((image, index) => (
        <Image
          key={index}
          src={image}
          alt={`background image ${index}`}
          quality={index === currentImageIndex ? 80 : 50}
          priority
          layout="fill"
          objectFit="cover"
          className={`absolute transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0 left-full'
          }`}
        />
      ))}
      <HeroForm />
    </div>
  );
}

export default HeroSection;
