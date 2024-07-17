import React from "react";
import Title from "@/lib/Title";
import Paragraph from "@/lib/Paragraph";
import Heading from "@/lib/Heading";
import HajjImage from "@/assets/hajj.jpg";
import UmrahImage from "@/assets/umrah.jpg";
import MadinaImage1 from "@/assets/madina1.jpg"
import MadinaImage2 from "@/assets/madina2.jpg"
import Image from "next/image";
const blogsList = [
    {
      image: UmrahImage,
      heading: "A Comprehensive Guide to Our 8 Days Umrah Package",
      description: "Embarking on an Umrah pilgrimage is a deeply spiritual and rewarding experience. Our 8 Days Umrah Package is designed to offer a fulfilling journey to the holy cities of Madina and Makkah. This package includes 4 days in Madina, where pilgrims can visit the Prophet’s Mosque, the Quba Mosque, and other significant Islamic sites. The next 4 days are spent in Makkah, allowing pilgrims to perform Umrah rituals and visit historical landmarks. With 4-star accommodations, daily meals, and transportation provided, we ensure a comfortable and hassle-free experience. Additionally, Ziarat is included in the package, offering guided tours to various religious sites. Our knowledgeable guides are dedicated to making your journey as smooth and enriching as possible. Priced at $1800, this package combines affordability with quality, making it an excellent choice for those looking to fulfill their spiritual duties without compromising on comfort. Whether you are a first-time pilgrim or have performed Umrah before, our December Umrah 8 Days tour promises to be a memorable and spiritually uplifting experience."
    },
    {
      image: HajjImage,
      heading: "Discover the Spiritual Journey of a Lifetime with Our 14 Days Hajj Package",
      description: "Hajj is one of the most significant religious duties for Muslims, and our 14 Days Hajj Package is meticulously planned to provide a fulfilling and memorable pilgrimage. This package includes 7 days in Madina, allowing pilgrims to visit important religious sites such as Al-Masjid an-Nabawi and Mount Uhud. The following 7 days are spent in Makkah, where pilgrims will perform the essential Hajj rituals including Tawaf, Sa’i, and the symbolic stoning of the devil at Mina. Our package offers 4-star accommodations, ensuring a comfortable stay with all necessary amenities. Ziarat is included, offering guided visits to various historical and religious sites. Priced at $2500, this comprehensive package is designed to provide an enriching spiritual experience while maintaining high standards of comfort and convenience. Our experienced guides and support staff are committed to assisting you throughout your journey, ensuring that every aspect of your pilgrimage is taken care of. Join us for our December Hajj 14 Days tour and embark on a spiritual journey that will leave a lasting impact on your faith and soul."
    },
    {
      image: MadinaImage1,
      heading: "Why Choose Our December Umrah 8 Days Package?",
      description: "Choosing the right Umrah package is crucial for a fulfilling pilgrimage experience, and our December Umrah 8 Days Package stands out for several reasons. First, it offers a perfect balance between spiritual fulfillment and comfort. With 4 days each in Madina and Makkah, pilgrims have ample time to perform Umrah rituals and explore significant Islamic sites. The package includes 4-star accommodations, ensuring a pleasant and comfortable stay. Daily meals and transportation are also provided, allowing pilgrims to focus on their spiritual journey without worrying about logistics. One of the unique features of our package is the inclusion of Ziarat, which offers guided tours to various religious and historical sites, enhancing the overall pilgrimage experience. Priced at $1800, this package offers exceptional value for money, combining affordability with quality. Our team of experienced guides and support staff are dedicated to providing exceptional service, ensuring that every aspect of your journey is taken care of. Whether you are traveling alone or with family, our December Umrah 8 Days Package promises a spiritually enriching and hassle-free experience, making it the perfect choice for your pilgrimage."
    },
    {
      image: MadinaImage2,
      heading: "Experience the Serenity of the Holy Cities with Our 14 Days Hajj Package",
      description: "Our 14 Days Hajj Package is carefully designed to provide pilgrims with a comprehensive and serene spiritual experience. This package includes 7 days in the peaceful city of Madina, allowing pilgrims to visit the Prophet's Mosque and other significant religious sites, fostering a deep connection with the Islamic heritage. The remaining 7 days are spent in Makkah, where the heart of Hajj rituals takes place. Pilgrims will perform essential rites such as Tawaf, Sa’i, and the symbolic stoning at Mina. Accommodations are in 4-star hotels, offering comfort and convenience throughout the stay. Included Ziarat tours provide guided visits to historical sites, enriching the spiritual journey. Priced at $2500, this package ensures a balance of quality and affordability. Our dedicated guides and support staff are committed to making your pilgrimage as smooth and meaningful as possible. From accommodations to transportation and guided tours, every detail is handled with care to ensure you can focus on your spiritual journey. Join us for our December Hajj 14 Days tour and experience the tranquility and fulfillment of a well-planned pilgrimage."
    }
  ];
  
  

function Blogs() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center p-5">
      <p className="text-center text-lg text-white bg-stone-500 rounded-full py-1 px-2">
      Our Blog
      </p>
      <p className="text-center text-5xl font-bold ">Recent Posts</p>
    
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogsList.map((item, index) => {
          return (
            <div
              key={index}
              className="flex flex-col gap-2 p-3 border-[1px] border-gray-300 rounded-lg shadow-md hover:shadow-2xl w-full"
            >
              <div className="rounded-lg max-h-48 h-full w-full overflow-hidden relative">
              
                <Image
                  src={item.image}
                  alt={item.heading}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-1">
                
                <p className=" text-xl font-semibold">{item.heading.slice(0,50)}...</p>
                <p className=" text-sm font-semibold">{item.description.slice(0,150)}...</p>
              <div className="w-full flex justify-end pt-5">

              <div className=" w-fit text-center rounded-md p-2 bg-stone-500 text-white hover:text-stone-500 hover:bg-white border cursor-pointer transition-all duration-300 border-stone-500 justify-end flex">Read More</div>
              </div>
              </div>
              
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Blogs;
