import React from "react";
import makkha1 from "@/assets/makkha1.jpg";
import makkha2 from "@/assets/makkha2.jpg";
import makkha3 from "@/assets/makkha3.webp";
import makkha4 from "@/assets/makkha4.webp";
import makkha5 from "@/assets/makkha5.webp";
import makkha6 from "@/assets/makkha6.jpg";
import makkha7 from "@/assets/makkha7.jpg";
import makkha8 from "@/assets/makkha8.jpg";
import makkha9 from "@/assets/makkha9.jpg";
import madina1 from "@/assets/madina1.jpg";
import madina2 from "@/assets/madina2.jpg";
import madina3 from "@/assets/madina3.jpg";
import madina4 from "@/assets/madina4.webp";
import madina5 from "@/assets/madina5.jpg";
import madina6 from "@/assets/madina6.jpg";
import madina7 from "@/assets/madina7.jpg";
import madina8 from "@/assets/madina8.webp";
import madina9 from "@/assets/madina9.jpg";
import Image from "next/image";
const ziyaratMadina = [
  {
    title: "Al-Masjid an-Nabawi",
    description:
      "Al-Masjid an-Nabawi, often called the Prophet’s Mosque, is one of the holiest sites in Islam. Located in the city of Madina, it is the second holiest site in Islam after Masjid al-Haram in Mecca. The mosque was originally built by the Prophet Muhammad (peace be upon him) and has undergone numerous expansions over the centuries.",
    image: madina1,
    location: "Madina, Saudi Arabia",
  },
  {
    title: "Quba Mosque",
    description:
      "Quba Mosque is the first mosque built by Prophet Muhammad (peace be upon him) upon his arrival in Madina. It holds significant religious importance as the Prophet would often visit and pray here. The mosque is located a few kilometers south of Madina’s city center.",
    image: madina2,
    location: "Madina, Saudi Arabia",
  },
  {
    title: "Masjid al-Qiblatayn",
    description:
      "Masjid al-Qiblatayn is historically significant as the mosque where the direction of Muslim prayer (qibla) was changed from Jerusalem to Mecca. It is said that while leading prayers, Prophet Muhammad (peace be upon him) received revelation instructing him to change the direction of prayer.",
    image: madina3,
    location: "Madina, Saudi Arabia",
  },
  {
    title: "Uhud Mountain",
    description:
      "Uhud Mountain is located north of Madina and holds great historical importance in Islam. The Battle of Uhud took place here in 625 CE, where the Muslims faced a significant challenge from the Quraysh army. It is a place of reflection and remembrance for Muslims.",
    image: madina4,
    location: "Madina, Saudi Arabia",
  },
  {
    title: "Jannat al-Baqi",
    description:
      "Jannat al-Baqi is the historic cemetery in Madina where many companions of Prophet Muhammad (peace be upon him) and members of his family are buried. It is considered one of the most sacred graveyards in Islam, and visiting here holds great spiritual significance.",
    image: madina5,
    location: "Madina, Saudi Arabia",
  },

  {
    title: "Masjid al-Ghamama",
    description:
      "Masjid al-Ghamama, also known as the Cloud Mosque, is located near the Prophet’s Mosque in Madina. It is named for the cloud that appeared and provided shade during a prayer led by Prophet Muhammad (peace be upon him). The mosque is visited by pilgrims seeking blessings.",
    image: madina6,
    location: "Madina, Saudi Arabia",
  },
  {
    title: "Masjid Abu Bakr",
    description:
      "Masjid Abu Bakr is located in Madina and is named after Abu Bakr, the first caliph of Islam and a close companion of Prophet Muhammad (peace be upon him). The mosque holds historical significance as a place of worship and reflection for Muslims.",
    image: madina7,
    location: "Madina, Saudi Arabia",
  },
  {
    title: "Masjid Qiblatayn",
    description:
      "Masjid Qiblatayn is known as the Mosque of the Two Qiblas because it contains two mihrabs (prayer niches) indicating the change of qibla (prayer direction) from Jerusalem to Mecca. It is a historic mosque located in Madina.",
    image: madina8,
    location: "Madina, Saudi Arabia",
  },
  {
    title: "Masjid Bilal",
    description:
      "Masjid Bilal is named after Bilal ibn Rabah, a trusted companion and the first muezzin (caller to prayer) in Islam. Located in Madina, the mosque serves as a reminder of Bilal’s important role in early Islamic history and the call to prayer.",
    image: madina9,
    location: "Madina, Saudi Arabia",
  },
];

const ziyaratMecca = [
  {
    title: "Masjid al-Haram",
    description:
      "Masjid al-Haram, also known as the Sacred Mosque, is the holiest site in Islam. Located in the city of Mecca, it surrounds the Kaaba, which Muslims face during their prayers. The mosque is visited by millions of pilgrims each year for Hajj and Umrah.",
    image: makkha1,
    location: "Mecca, Saudi Arabia",
  },
  {
    title: "Mount Arafat",
    description:
      "Mount Arafat, also known as Jabal al-Rahmah (Mount of Mercy), is a granite hill east of Mecca. It is the site where Prophet Muhammad (peace be upon him) delivered his Farewell Sermon during his final pilgrimage (Hajj). Muslims spend a day here during Hajj as a key ritual.",
    image: makkha2,
    location: "Mecca, Saudi Arabia",
  },
  {
    title: "Mina",
    description:
      "Mina is a valley located east of Mecca where Hajj pilgrims stay in tents during the days of Hajj rituals. It is known for the symbolic stoning of the devil (Ramy al-Jamarat) that takes place during Hajj.",
    image: makkha3,
    location: "Mecca, Saudi Arabia",
  },
  {
    title: "Masjid Taneem",
    description:
      "Masjid Taneem, also known as Masjid Aisha, is a mosque located outside Mecca’s Haram boundary. It is where pilgrims intending to perform Umrah from Mecca (Ihram) enter into the state of Ihram before proceeding to the Kaaba.",
    image: makkha4,
    location: "Mecca, Saudi Arabia",
  },
  {
    title: "Jabal al-Noor",
    description:
      "Jabal al-Noor (Mountain of Light) is where the Cave of Hira is located, about 3 kilometers from the Holy Mosque in Mecca. It is here that Prophet Muhammad (peace be upon him) received his first revelation from Allah through the angel Gabriel.",
    image: makkha5,
    location: "Mecca, Saudi Arabia",
  },
  {
    title: "Muzdalifah",
    description:
      "Muzdalifah is an open area between Arafat and Mina where Hajj pilgrims spend the night during Hajj. They collect pebbles here for the symbolic stoning of the devil ritual in Mina.",
    image: makkha6,
    location: "Mecca, Saudi Arabia",
  },
  {
    title: "Masjid Jinn",
    description:
      "Masjid Jinn is located near Jabal Thawr in Mecca. According to Islamic tradition, it is where a group of jinn (supernatural beings) listened to Prophet Muhammad (peace be upon him) recite the Quran.",
    image: makkha7,
    location: "Mecca, Saudi Arabia",
  },
  {
    title: "Masjid Al-Khayf",
    description:
      "Masjid Al-Khayf is located in Mina and holds historical significance during Hajj rituals. It is one of the three mosques where pilgrims can perform prayers during Hajj days.",
    image: makkha8,
    location: "Mecca, Saudi Arabia",
  },
  {
    title: "Masjid Nimra",
    description:
      "Masjid Nimra is located on the plain of Arafat and is where Hajj pilgrims gather on the 9th day of Dhul-Hijjah during Hajj. It holds significance as the place where Prophet Muhammad (peace be upon him) delivered his Farewell Sermon.",
    image: makkha9,
    location: "Mecca, Saudi Arabia",
  },
  
];

function ZiyaratPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-24 pb-24 bg-white p-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-stone-500">Ziyarat Guide</h1>
        <p className="text-lg text-gray-700">
          Explore the sacred locations of Madina and Mecca during your
          pilgrimage journey.
        </p>
      </div>

      {/* Madina Ziyarat Section */}
     

      {/* Mecca Ziyarat Section */}
      <div className="mb-24">
        <h2 className="text-3xl font-bold mb-4 text-stone-500">Mecca Ziyarat</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ziyaratMecca.map((ziyarat, index) => (
             <div
             key={index}
             className="bg-stone-500 shadow-md rounded-lg p-3 sm:p-4 lg:p-6 flex flex-col gap-6 h-full w-full"
           >
             <div className="w-full  h-80 rounded-lg overflow-hidden">
               <Image
                 src={ziyarat.image}
                 alt={ziyarat.title}
                 className="w-full h-full object-cover"
               />
             </div>
             <div className="w-full flex flex-col gap-2">

             <h3 className="text-xl font-semibold mb-2 text-white">
               {ziyarat.title}
             </h3>
             <p className="text-gray-200 mb-4">{ziyarat.description}</p>
             <p className="text-gray-300 text-center">{ziyarat.location}</p>
             </div>
           </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4 text-stone-500">
          Madina Ziyarat
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ziyaratMadina.map((ziyarat, index) => (
            <div
              key={index}
              className="bg-stone-500 shadow-md rounded-lg p-3 sm:p-4 lg:p-6 flex flex-col gap-6 h-full w-full"
            >
              <div className="w-full  h-80 rounded-lg overflow-hidden">
                <Image
                  src={ziyarat.image}
                  alt={ziyarat.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex flex-col gap-2">

              <h3 className="text-xl font-semibold mb-2 text-white">
                {ziyarat.title}
              </h3>
              <p className="text-gray-200 mb-4">{ziyarat.description}</p>
              <p className="text-gray-300 text-center">{ziyarat.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
}

export default ZiyaratPage;
