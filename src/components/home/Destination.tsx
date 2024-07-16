'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import HajjImage from "@/assets/hajj.jpg";
import UmrahImage from "@/assets/umrah.jpg";

interface UmrahPackage {
  days_in_madina: number;
  days_in_makka: number;
  description: string;
  duration: string;
  id: number;
  price: string;
  star_rating: number;
  thumbnail: string;
  title: string;
  ziarat_included: boolean;
}

function Destination() {
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://api.crownumrah.co.uk/api/packages/")
      .then((res) => {
        console.log("API Response:", res.data); // Debugging statement
        setLoading(false);
        setPackages(res.data);
      })
      .catch((error) => {
        console.error("Error fetching packages:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-6 justify-center items-center pt-72 md:pt-48 lg:pt-36 px-5">
      <p className="text-center text-lg text-white bg-stone-500 rounded-full py-1 px-2 ">
        Destination
      </p>
      <p className="text-center text-4xl font-bold ">Hajj / Umrah Packages</p>
      <p className="text-center text-gray-700 max-w-screen-lg">
        When it comes to Best Hajj and Umrah Packages Crown Travels stands out
        of the crowd because of the quality of our services, delivered through
        dedicated team of experts who take care of every aspect of your holy
        journey.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 tracking-normal leading-4">
        {!loading &&
          packages.length > 0 &&
          packages.slice(0, 4).map((item, index) => {
            return (
              <div
                key={index}
                className="flex flex-col gap-2 border-[1px] border-gray-300 sm:max-w-80 w-full"
              >
                <div className="max-h-72 h-full w-full overflow-hidden relative">
                  <div className="absolute top-0 left-0 z-10 bg-stone-500 p-1 text-white text-base tracking-wide">
                    {item.title}
                  </div>
                  <Image
                    src={index % 2 === 0 ? HajjImage : UmrahImage}
                    alt={item.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 transform"
                  />
                </div>
                <div className="flex flex-col p-2 gap-1">
                  <p className="text-stone-500 text-sm font-medium">
                    Total Days: {item.duration}
                  </p>
                  <p className="text-xl font-semibold">{item.title}</p>
                  <p className="text-sm font-semibold">{item.description}</p>
                  <p className="text-sm font-medium text-gray-600">
                    Days In Makkah: {item.days_in_makka}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Days In Madina: {item.days_in_madina}
                  </p>
                  <p className="text-sm font-medium text-gray-600">
                    Ziarat: {item.ziarat_included ? "Yes" : "No"}
                  </p>
                  <p className="text-sm text-gray-600 font-medium">
                    Stars Rating: {item.star_rating}
                  </p>
                  <div className="flex items-center">
                    {[...Array(item.star_rating)].map((_, starIndex) => (
                      <svg
                        key={starIndex}
                        className="w-4 h-4 fill-current text-yellow-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-base text-gray-600 font-medium">
                    Price: <span className="font-bold">&#163;{item.price}</span>
                  </p>
                </div>
                <div className="w-full text-center p-2 bg-stone-500 text-white hover:text-stone-500 hover:bg-white border cursor-pointer transition-all duration-300 border-stone-500 font-semibold">
                  Select Now
                </div>
                
              </div>
            
              
            );
          })}
      </div>
    </div>
  );
}

export default Destination;





// import React from 'react'
// import Image from 'next/image'
// const Destination = () => {
//   return (
//     <div>
//         <div className="flex flex-col gap-6 justify-center items-center pt-72 md:pt-48 lg:pt-36 px-5">
//        <p className="text-center text-lg text-white bg-stone-500 rounded-full py-1 px-2 ">
//        Destination
//        </p>
//       <p className="text-center text-4xl font-bold ">Hajj / Umrah Packages</p>
//        <p className="text-center text-gray-700 max-w-screen-lg">
//          When it comes to Best Hajj and Umrah Packages Crown Travels stands out
//         of the crowd because of the quality of our services, delivered through
//         dedicated team of experts who take care of every aspect of your holy
//         journey.
//      </p>
//      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 tracking-normal leading-4">
//      <div
               
//                  className="flex flex-col gap-2 border-[1px] border-gray-300 sm:max-w-80 w-full"
//                >
//                  <div className="max-h-72 h-full w-full overflow-hidden relative">
//                    <div className="absolute top-0 left-0 z-10 bg-stone-500 p-1 text-white text-base tracking-wide">
//                      Umrah
//                    </div>
//                    <Image
//                     src={'https://cdn.pixabay.com/photo/2018/11/07/16/12/makkah-3800665_640.jpg'}
//                      alt={'Package'}
//                      width={100} height={100}
//                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 transform"
//                   />
//                  </div>
//                  <div className="flex flex-col p-2 gap-1">
//                   <p className="text-stone-500 text-sm font-medium">
//                      Total Days: 20
//                   </p>
//                    <p className="text-xl font-semibold">Umrah Package</p>
//                   <p className="text-sm font-semibold">Umrah Package</p>
//                    <p className="text-sm font-medium text-gray-600">
//                     Days In Makkah: 15
//                   </p>
//                   <p className="text-sm font-medium text-gray-600">
//                      Days In Madina: 10
//                   </p>
//                    <p className="text-sm font-medium text-gray-600">
//                     Ziarat: Yes
//                    </p>
//                    <p className="text-sm text-gray-600 font-medium">
//                     Stars Rating:5
//                   </p>
//                    <div className="flex items-center">
                   
//                        <svg
                       
//                          className="w-4 h-4 fill-current text-yellow-600"
//                          xmlns="http://www.w3.org/2000/svg"
//                          viewBox="0 0 20 20"
//                        >
//                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
//                        </svg>
                  
//                    </div>
//                    <p className="text-base text-gray-600 font-medium">
//                      Price: <span className="font-bold">2 lac</span>
//                    </p>
//                  </div>
//                  <div className="w-full text-center p-2 bg-stone-500 text-white hover:text-stone-500 hover:bg-white border cursor-pointer transition-all duration-300 border-stone-500 font-semibold">
//                    Select Now
//                  </div>
                
//                 </div>
//     </div>
//     </div>
//     </div>
//   )
// }

// export default Destination









// 'use client'
// import React, { use, useEffect, useState } from "react";
// import Title from "@/lib/Title";
// import Paragraph from "@/lib/Paragraph";
// import Heading from "@/lib/Heading";
// import HajjImage from "@/assets/hajj.jpg";
// import UmrahImage from "@/assets/umrah.jpg";
// import Image from "next/image";
// import axios from "axios";
// interface UmrahPackage {
//   days_in_madina: number;
//   days_in_makka: number;
//   description: string;
//   duration: string;
//   id: number;
//   price: string;
//   star_rating: number;
//   thumbnail: string;
//   title: string;
//   ziarat_included: boolean;
// }

// const Packages = [
//   {
//     title: "Umrah Package",
//     days: "8 DAYS TOUR",
//     madinaDays: "4 Days Madina",
//     makhaDays: "4 Days Madina",
//     stars: "4 Stars",
//     ziarat: "Ziarat Included",
//     price: "1800",
//     heading: "December Umrah 8 Days",
//     image: UmrahImage,
//   },
//   {
//     title: "Hajj Package",
//     days: "14 DAYS TOUR",
//     madinaDays: "7 Days Madina",
//     makhaDays: "7 Days Madina",
//     stars: "4 Stars",
//     ziarat: "Ziarat Included",
//     price: "2500",
//     heading: "December Hajj 14 Days",
//     image: HajjImage,
//   },
  
// ];

// function Destination() {
//     const [packages, setPackages] = useState<UmrahPackage[]>([])
//     const [loading, setLoading] = useState(true)
  
//   useEffect(()=>{
//     axios.get("https://api.crownumrah.co.uk/api/packages/").then((res)=>{setLoading(false); setPackages(res.data)})
//   },[])
//   return (
//     <div className="flex flex-col gap-6 justify-center items-center pt-72 md:pt-48 lg:pt-36 px-5">
//       <p className="text-center text-lg text-white bg-stone-500 rounded-full py-1 px-2 ">
//         Destination
//       </p>
//       <p className="text-center text-4xl font-bold ">Hajj / Umrah Packages</p>
//       <p className="text-center text-gray-700 max-w-screen-lg">
//         When it comes to Best Hajj and Umrah Packages Crown Travels stands out
//         of the crowd because of the quality of our services, delivered through
//         dedicated team of experts who take care of every expect of your holy
//         journey.
//       </p>
//       <div className=" flex justify-center gap-10 max-sm:flex-wrap tracking-normal leading-4">
//         {!loading && packages.length>0 && packages.map((item, index) => {
//           return (
//             <div
//               key={index}
//               className="flex flex-col gap-2 border-[1px] border-gray-300  sm:max-w-80 w-full"
//             >
//               <div className=" max-h-72 h-full w-full overflow-hidden relative">
//                 <div className="absolute top-0 left-0 z-10 bg-stone-500  p-1 text-white text-base tracking-wide">
//                   {item.title}
//                 </div>
//                 <Image
//                   src={index==0?HajjImage:UmrahImage}
//                   alt={item.title}
//                   className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 transform"
//                 />
//               </div>
//               <div className="flex flex-col p-2 gap-1">
//                 <p className="text-stone-500 text-sm font-medium ">Total Days : {item.duration}</p>
//                 <p className=" text-xl font-semibold">{item.title}</p>
//                 <p className=" text-sm font-semibold">{item.description}</p>
//                 <p className="text-sm font-medium text-gray-600">Days In Makkha : {item.days_in_makka}</p>
//                 <p className="text-sm font-medium text-gray-600">Days In Maddina : {item.days_in_madina}</p>
//                 <p className="text-sm font-medium text-gray-600">Ziarat :  {item.ziarat_included?"Yes":"No"}</p>
//                 <p className="text-sm text-gray-600 font-medium">Stars Rating : {item.star_rating}   </p>
//                 <div className="flex items-center">
//       <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
//       <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
//       <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
//       <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
//       <svg className="w-4 h-4 fill-current text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
//     </div>
//                 <p className="text-base text-gray-600 font-medium">Price : <span className="font-bold">&#163;{item.price}</span> </p>
              
//               </div>
//               <div className="w-full text-center p-2 bg-stone-500 text-white hover:text-stone-500 hover:bg-white border cursor-pointer transition-all duration-300 border-stone-500 font-semibold">Select Now</div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default Destination;
