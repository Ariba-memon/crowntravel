import React from "react";
import FooterImage from "@/assets/footerImage.jpg"
import Image from "next/image";
import Link from "next/link";
const information = [
  {
    link:'terms-conditions',
    lable:'Terms & Conditions'
  },
  {
    link:'privacy-policy',
    lable:'Privacy and Policy'
  },
  {
    link:'refund-policy',
    lable:'Refund Policy'
  }
 
];

const experience = [
  "Adventure",
  "Hotel and Restaurant",
  "Beach",
  "Nature",
  "Camping",
  "Party",
];
const contact = [
  "Address : 71-75 Shelton Street, Covent garden, London, United Kingdom, WC2H 9JQ",
  "Phone : +07366688730",
  "Whatsapp : +07366688730",
  "Email : contact@crownumrah.co.uk",
];
function Footer() {
  return (
    <div className="flex flex-col w-full gap-10 py-10 px-5 overflow-hidden  relative">
        <Image src={FooterImage} alt="kabba image" className="w-full h-full absolute object-cover opacity-30 top-0 left-0"/>
 <div className=" grid sm:grid-cols-2 lg:grid-cols-4 w-full gap-10 relative z-20">
      <div className="flex flex-col w-full gap-4 sm:col-span-2">
        <p className="text-xl font-bold">About</p>
        <p className="text-gray-500 sm:max-w-[80%]">
        Embark on a sacred journey with our esteemed Hajj and Umrah travel agency. We offer tailored packages designed to ensure a spiritually enriching pilgrimage. From visa processing to guided tours, experience the holy cities of Makkah and Madinah with comfort and peace of mind
        </p>
        <div className="flex gap-3">
          <div className="size-8 rounded-full cursor-pointer border-2 border-stone-500 group  hover:text-white hover:bg-stone-500 transition-all duration-300 relative ">
            <p className="absolute text-xl font-bold text-stone-500 group-hover:text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300">f</p>
          </div>
          <div className="size-8 rounded-full border-2 cursor-pointer group border-stone-500 hover:text-white  hover:bg-stone-500 transition-all duration-300 relative ">
            <p className="absolute font-bold text-xl text-stone-500 group-hover:text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300">t</p>
          </div>
          <div className="size-8 rounded-full border-2 cursor-pointer group hover:text-white border-stone-500  hover:bg-stone-500 transition-all duration-300 relative ">
            <p className="absolute font-bold text-xl text-stone-500  group-hover:text-white top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-300">in</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        <p className="text-xl font-bold">Information</p>
        <div className="flex flex-col gap-2">
          {information.map((item, index) => {
            return (
              <Link href={item.link} key={index} className="text-gray-500">
                {item.lable}
              </Link>
            );
          })}
        </div>
      </div>
      
      <div className="flex flex-col w-full gap-4">
        <p className="text-xl font-bold">Contact</p>
        <div className="flex flex-col gap-2">
          {contact.map((item, index) => {
            return (
              <div key={index} className="text-gray-500">
                {item}
              </div>
            );
          })}
        </div>
      </div>
    </div>
    <div className="w-9/12 rounded-full h-[2px] bg-stone-500 mx-auto"></div>
    <p className="text-center">Copyright © 2024 All rights reserved |  Crown Umrah LTD</p>
    </div>
   
  );
}

export default Footer;
