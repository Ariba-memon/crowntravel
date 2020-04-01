"use client";
import React, { useState } from "react";
import Image from "next/image";
import StarsImage from "@/assets/5stars.png";
import BackArrowImage from "@/assets/backArrow.svg";
import ForwardArrowImage from "@/assets/forwardArroa.svg";

const testimonials = [
  {
    description:
      "The Umrah experience organized by this agent was seamless and spiritually fulfilling. Every detail was meticulously planned, allowing us to focus solely on our prayers and rituals.",
    authorName: "Ahmed Khan",
    authorPost: "Software Engineer",
  },
  {
    description:
      "From visa processing to accommodations, everything was handled efficiently and professionally. The guided tours added a lot to our spiritual journey. Highly recommended!",
    authorName: "Fatima Ali",
    authorPost: "Teacher",
  },
  {
    description:
      "I was apprehensive about my first Hajj, but this agency's exceptional service and support made the journey incredibly smooth and enriching. Their attention to detail is commendable.",
    authorName: "Mohammed Yasin",
    authorPost: "Business Owner",
  },
  {
    description:
      "The arrangements made by this agency for our Umrah trip were outstanding. The hotels were comfortable, and the transportation was always punctual. A truly hassle-free experience.",
    authorName: "Ayesha Begum",
    authorPost: "Doctor",
  },
  {
    description:
      "Their dedication to providing a memorable spiritual journey is evident in every aspect of their service. The staff's knowledge and guidance were invaluable during our Hajj.",
    authorName: "Omar Siddiqui",
    authorPost: "Civil Engineer",
  },
  {
    description:
      "Excellent service! They took care of everything from start to finish. The level of care and attention to detail was beyond our expectations. We will definitely travel with them again.",
    authorName: "Layla Hussain",
    authorPost: "Graphic Designer",
  },
  {
    description:
      "Highly professional and deeply caring, this agency ensured our Umrah was a peaceful and spiritually uplifting experience. Their team was always available to assist with any needs.",
    authorName: "Ali Rahman",
    authorPost: "Accountant",
  },
  {
    description:
      "Our Hajj journey was made effortless thanks to the exceptional service provided. From the initial consultation to the final return, everything was perfectly organized. Truly grateful for their support.",
    authorName: "Nadia Shah",
    authorPost: "Pharmacist",
  },
];

interface TestimonialProps {
  description: string;
  authorName: string;
  authorPost: string;
}

function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);

  const showPrevious = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const showNext = () => {
    if (startIndex + 2 < testimonials.length) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="py-10 bg-gray-100">
      <div className="max-w-5xl mx-auto p-5">
        <h2 className="text-5xl font-bold text-center mb-6">Testimonials</h2>
        <div className="flex justify-between gap-8 items-center overflow-hidden relative">
          <button
            className={`size-16 rounded-xl bg-stone-500 relative cursor-pointer ${
              startIndex === 0 ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={showPrevious}
            disabled={startIndex === 0}
          >
            <Image src={BackArrowImage} alt="back arrow" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-8 w-full" />
          </button>
          <div className="flex gap-4 overflow-hidden w-full">
            {testimonials.slice(startIndex, startIndex + 2).map((testimonial, index) => (
              <div
                key={index}
                className="flex-1 bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center gap-4"
              >
                <Image src={StarsImage} alt="stars image" className="w-1/2 object-contain" />
                <p className="text-lg text-center">{testimonial.description}</p>
                <div className="flex flex-col items-center">
                  <p className="text-xl font-bold text-stone-500">{testimonial.authorName}</p>
                  <p className="text-md">{testimonial.authorPost}</p>
                </div>
              </div>
            ))}
          </div>
          <button
            className={`size-16 rounded-xl bg-stone-500 relative cursor-pointer ${
              startIndex + 2 >= testimonials.length ? "opacity-50 pointer-events-none" : ""
            }`}
            onClick={showNext}
            disabled={startIndex + 2 >= testimonials.length}
          >
            <Image src={ForwardArrowImage} alt="forward arrow" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-8 w-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;


















// "use client";
// import React, { useEffect, useState } from "react";
// import MadinaImage from "@/assets/umrah.jpg";
// import Image from "next/image";
// import StarsImage from "@/assets/5stars.png"
// import BackArrowImage from "@/assets/backArrow.svg"
// import ForwarArrowImage from "@/assets/forwardArroa.svg"
// import axios from "axios";

// const testimonials = [
//   {
//     description:
//       "The Umrah experience organized by this agent was seamless and spiritually fulfilling. Every detail was meticulously planned, allowing us to focus solely on our prayers and rituals.",
//     authorName: "Ahmed Khan",
//     authorPost: "Software Engineer",
//   },
//   {
//     description:
//       "From visa processing to accommodations, everything was handled efficiently and professionally. The guided tours added a lot to our spiritual journey. Highly recommended!",
//     authorName: "Fatima Ali",
//     authorPost: "Teacher",
//   },
//   {
//     description:
//       "I was apprehensive about my first Hajj, but this agency's exceptional service and support made the journey incredibly smooth and enriching. Their attention to detail is commendable.",
//     authorName: "Mohammed Yasin",
//     authorPost: "Business Owner",
//   },
//   {
//     description:
//       "The arrangements made by this agency for our Umrah trip were outstanding. The hotels were comfortable, and the transportation was always punctual. A truly hassle-free experience.",
//     authorName: "Ayesha Begum",
//     authorPost: "Doctor",
//   },
//   {
//     description:
//       "Their dedication to providing a memorable spiritual journey is evident in every aspect of their service. The staff's knowledge and guidance were invaluable during our Hajj.",
//     authorName: "Omar Siddiqui",
//     authorPost: "Civil Engineer",
//   },
//   {
//     description:
//       "Excellent service! They took care of everything from start to finish. The level of care and attention to detail was beyond our expectations. We will definitely travel with them again.",
//     authorName: "Layla Hussain",
//     authorPost: "Graphic Designer",
//   },
//   {
//     description:
//       "Highly professional and deeply caring, this agency ensured our Umrah was a peaceful and spiritually uplifting experience. Their team was always available to assist with any needs.",
//     authorName: "Ali Rahman",
//     authorPost: "Accountant",
//   },
//   {
//     description:
//       "Our Hajj journey was made effortless thanks to the exceptional service provided. From the initial consultation to the final return, everything was perfectly organized. Truly grateful for their support.",
//     authorName: "Nadia Shah",
//     authorPost: "Pharmacist",
//   },
// ];

// interface reviewsProps{
// user_designation:string;
// user_name:string
// }

// function Testimonials() {
//   const [index, setIndex] = useState(2);
//   const [reviews, setReviews] = useState<reviewsProps[]>([])
//        useEffect(()=>{axios.get("https://api.crownumrah.co.uk/api/reviews/").then((res)=>{if(res.data.length > 3){
//         setIndex(2)
//        }else{
//         setIndex(0)
//        } setReviews(res.data)})},[])
//   return (
//     <div className="w-full relative bg-green-600 py-10 flex justify-center items-center flex-col gap-6 overflow-hidden">
//       <Image
//         src={MadinaImage}
//         alt="madina image"
//         className="w-full h-full object-cover absolute opacity-60"
//       />
//       <div className="w-full relative px-5 py-10 flex justify-center items-center flex-col gap-12">
//       <div className="w-full relative px-5  flex justify-center items-center flex-col gap-1">
    
//         <p className="text-center text-4xl font-bold text-white ">
//           Reviews
//         </p>
//         </div>
//         <div className="flex flex-col gap-12 items-center justify-center w-full ">
//           <div className="w-full  sm:w-80  h-80 relative rounded-lg transition-all duration-500 ">
//             {reviews.length>0 && reviews.map((item, i) => {
//                 const position = (i - index ) * 110;
//                 console.log("position ",position)
//                 const left = `left-[${position}%]`;
//               return (
//                 <div
//                   key={i}
//                   onClick={() => {
//                     setIndex(i);
//                   }}
//                   style={{ left: `${position}%` }}
//                   className={`absolute ${i==index&&"shadow-2xl scale-110"}  bg-white border-[1px] border-gray-300 rounded-lg w-full h-full transition-all flex flex-col p-3 justify-center gap-2 duration-500  top-0`}
//                 >
//                     <Image src={StarsImage} alt="stars image" className="w-1/2  object-contain"/>
//                   <p className="text-md">{item.user_designation}</p>
//                   <div>

//                   <p className="text-xl text-stone-500">{item.user_name}</p>
//                   {/* <p className="text-sm">{item.authorPost}</p> */}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           <div className="flex justify-center gap-10">
//             <div onClick={()=>{if(index>0){ setIndex(index-1)}}} className="size-16 rounded-full bg-stone-500 relative cursor-pointer">
//               <Image src={BackArrowImage} alt="back arrow" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-8 w-full"/>
//             </div>
//             <div onClick={()=>{if(index<reviews.length-1){ setIndex(index+1)}}} className="size-16 rounded-full bg-stone-500 relative cursor-pointer">
//             <Image src={ForwarArrowImage} alt="back arrow" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-8 w-full"/>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Testimonials;
