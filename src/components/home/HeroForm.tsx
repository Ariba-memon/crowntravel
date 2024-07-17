"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import InfoForm from "./InfoForm";
import { useLoadScript, Autocomplete, Libraries } from "@react-google-maps/api";
import CalenderImage from "@/assets/calenderImage.svg";
import { Calendar } from "@/components/ui/calendar";

import axios from "axios";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { addDays, subDays } from "date-fns";
import { Axis3DIcon } from "lucide-react";

const handleDepartureSelect = (date: string) => {
  const minReturnDate = addDays(date, 7);
};

const handleReturnSelect = (date: string) => {
  const maxDepartureDate = subDays(date, 7);
};

interface Place {
  formatted_address: string;
  geometry: {
    location: {
      lat: () => number;
      lng: () => number;
    };
  };
}
const libraries: Libraries = ["places"];
interface DropDwonProps {
  open: string;
  openValue: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<SelectedListObject | undefined>>;
  list: {
    name: string;
    rating?: number;
    id:number
  }[];
  loading: boolean;
}

interface TransportDropDwonProps {
  open: string;
  openValue: string;
  setOpen: React.Dispatch<React.SetStateAction<string>>;
  setValue: React.Dispatch<React.SetStateAction<SelectedListObject[]>>; 
  list: { name: string, id:number }[];
  value: SelectedListObject[];
  loading:boolean
}

interface SelectedListObject{
  name:string;
  id:number;
  rating?:number
}


const dates = [
  {
    id:1,
    name:'3 Days'
  },
  {
    id:2,
    name:'5 Days'
  },
  {
    id:3,
    name:'7 Days'
  },
]


function HeroForm() {
  const [requestOpen, setRequestOpen] = useState(false);

  const [fromPlace, setFromPlace] = useState<Place | null>(null);
  const [toPlace, setToPlace] = useState<Place | null>(null);
  const fromRef = useRef<google.maps.places.Autocomplete | null>(null);
  const toRef = useRef<google.maps.places.Autocomplete | null>(null);

  // const [departureOpen, setDepartureOpen] = useState(false);
  // const [returnOpen, setReturnOpen] = useState(false);
  // const [travellerOpen, setTravellerOpen] = useState(false);
  // const [makhaHotelOpen, setMakhaHotelOpen] = useState(false);
  // const [airlineOpen, setAirlineOpen] = useState(false);
  // const [transportOpen, setTransportOpen] = useState(false);

  const [open, setOpen] = useState("");

  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const [travellerClass, setTravellerClass] = useState("Economy");
  const [adultTraveller, setAdultTraveller] = useState(1);
  const [childTraveller, setChildTraveller] = useState(0);
  const [infantTraveller, setInfantTraveller] = useState(0);
  const [airline, setAirline] = useState<SelectedListObject >();

  const [visa, setVisa] = useState(0);
  const [makhaDays, setMakhaDays] = useState(0);
  const [madinaDays, setMadinaDays] = useState(0);

  const [makhaHotel, setMakhaHotel] = useState<SelectedListObject>();

  const [madinaHotelOpen, setMadinaHotelOpen] = useState(false);
  const [madinaHotel, setMadinaHotel] = useState<SelectedListObject>();

  const [transport, setTransport] = useState<SelectedListObject[]>([]);

  const [airlineList, setAirlineList] = useState<SelectedListObject[]>([]);
  const [airlineLoading, setAirlineLoading] = useState(true);

  const [makkahHotelList, setMakkahHotelList] = useState<SelectedListObject[]>([]);
  const [makkahHotelLoading, setMakkahHotelLoading] = useState(true);

  const [madinaHotelList, setMadinaHotelList] = useState<SelectedListObject[]>([]);
  const [madinaHotelLoading, setMadinaHotelLoading] = useState(true);

  const [transportationList, setTransportationList] = useState<SelectedListObject[]>([]);
  const [transportationLoading, setTransportationLoading] = useState(true);

  const [flexibleDate, setFlexibleDate] = useState<number>()
const [formType, setFormType] = useState('umrah')

  const [submit, setSubmit] = useState(false);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  useEffect(() => {
    axios
      .get("https://api.crownumrah.co.uk/api/airlines/")
      .then((response) => {
        console.log("response ", response);
        setAirlineList(response.data);
        setAirlineLoading(false);
      })
      .catch((error) => {
        setAirlineLoading(false);
        console.log("error ", error);
      });

    axios
      .get("https://api.crownumrah.co.uk/api/hotels/makkah/")
      .then((response) => {
        console.log("response makkah ", response);
        setMakkahHotelList(response.data);
        setMakkahHotelLoading(false);
      })
      .catch((error) => {
        setMakkahHotelLoading(false);
        console.log("error ", error);
      });
    axios
      .get("https://api.crownumrah.co.uk/api/hotels/madina/")
      .then((response) => {
        console.log("response madina ", response);
        setMadinaHotelList(response.data);
        setMadinaHotelLoading(false);
      })
      .catch((error) => {
        setMadinaHotelLoading(false);
        console.log("error ", error);
      });

    axios
      .get("https://api.crownumrah.co.uk/api/transputations/")
      .then((response) => {
        console.log("response transport ", response);
        setTransportationList(response.data);
        setTransportationLoading(false);
      })
      .catch((error) => {
        setTransportationLoading(false);
        console.log("error ", error);
      });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      document.body.style.overflow = requestOpen ? "hidden" : "auto";
      const div = document.getElementById("header");
      console.log(div);
      if (div) {
        div.style.pointerEvents = requestOpen ? "none" : "auto";
      }
    }, 500);
  }, [requestOpen]);

  const addDays = (date: string, days: number): string => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toDateString();
  };
  const disablePreviousDates = (date: any) => {
    const today = new Date();
    return date < today.setHours(0, 0, 0, 0);
  };
  const disableReturnPreviousDates = (
    date: any,
    departureDate: string
  ): boolean => {
    const comparisonDate = new Date(addDays(departureDate, 7));
    return date < comparisonDate.setHours(0, 0, 0, 0);
  };

  function formatDate(dateString: Date) {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const formattedDate = new Date(dateString).toLocaleDateString(
      undefined,
      options
    );
    return formattedDate;
  }

  function DropDwon({
    open,
    setOpen,
    setValue,
    list,
    openValue,
    loading,
  }: DropDwonProps) {
    return (
      <div
      id="heroform"
        className={`absolute scroll-mt-56 z-50 text-gray-400 w-full left-0 transition-all duration-500 max-h-72 overflow-y-auto ${
          open == openValue
            ? " top-[105%] pointer-events-auto opacity-100 "
            : " top-[90%] opacity-0 pointer-events-none "
        }  rounded-lg bg-white p-2 border-[1px] border-gray-300 shadow-xl flex flex-col `}
      >
        {loading && (
          <div className={`w-full cursor-pointer py-2 `}>Loading...</div>
        )}
        {(!loading && list.length == 0) && (
          <div className={`w-full cursor-pointer py-2 `}>Not Found</div>
        )}
        {(!loading &&
          list.length > 0) &&
          list.map((item, index) => {
            return (
              <div
              id="styleScrollbar"
                onClick={() => {
                  setValue({name:item.name, id:item.id});
                  setOpen("");
                }}
                key={index}
                className={`w-full cursor-pointer py-1 flex flex-col gap-1 styleScrollbar ${
                  list.length - 1 !== index && "border-b-[1px] border-gray-300"
                }`}
              >
                <p className="leading-4 text-sm">{item.name}</p>
                {item.rating && (
                  <p className="text-end text-[10px] leading-[10px]">
                    {item.rating} Stars
                  </p>
                )}
              </div>
            );
          })}
      </div>
    );
  }

  function TransportDropDown({
    open,
    setOpen,
    setValue,
    list,
    value,
    openValue,
    loading
  }: TransportDropDwonProps) {
    return (
      <div
        className={`absolute text-gray-400 w-full left-0 transition-all duration-500 ${
          open == openValue
            ? "top-[105%] pointer-events-auto opacity-100"
            : "top-[90%] opacity-0 pointer-events-none"
        }  rounded-lg bg-white p-2 border-[1px] border-gray-300 shadow-xl flex flex-col gap-2`}
      >
        {loading && (
          <div className={`w-full cursor-pointer py-2 `}>Loading...</div>
        )}
        {!loading && list.length == 0 && (
          <div className={`w-full cursor-pointer py-2 `}>Not Found</div>
        )}
        {list.map((item, index) => {
          return (
            <div
              onClick={() => {
                if (value!.indexOf(item) >= 0) {
                  // Remove item from array
                  setValue(value!.filter((i) => i !== item));
                } else {
                  // Add item to array
                  setValue([...value!, item]);
                }
              }}
              key={index}
              className="flex gap-1 items-center cursor-pointer"
            >
              <div
                className={`size-3 border-[1px] border-gray-300 ${
                  value!.indexOf(item) >= 0 ? "bg-stone-500" : "bg-white"
                }`}
              ></div>
              <p className="text-[12px]">{item.name}</p>
            </div>
          );
        })}
        <div
          onClick={() => {
            setOpen("");
          }}
          className="w-full cursor-pointer p-1 border-[1px] rounded-lg border-gray-400 text-gray-400 text-center "
        >
          Done
        </div>
      </div>
    );
  }

  function HandleOnSubmit() {
    setSubmit(true);
    console.log("submit ");
    // departureDate &&
    //   returnDate &&
    //   transport.length > 0 && airline && madinaHotel && makhaHotel && flexibleDate && visa>0
    
    if (
      fromPlace &&
      toPlace 
      ) {
      const element = document.getElementById("top");
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setRequestOpen(true);
    }
  }

  console.log(returnDate);
  const transportIds:number[] = [];
  transport.map((item)=>{
    transportIds.push(item.id)
  })
  const data = {
    from_city: fromPlace?.formatted_address,
  to_city: toPlace?.formatted_address,
  pickup_date: departureDate,
  return_date: returnDate,
  cabin_class: travellerClass,
  airline: airline?.name,
  visas: visa,
  transputations: transportIds,
  mekka_hotel: makhaHotel?.name,
  madina_hotel: madinaHotel?.name,
  infant: infantTraveller,
  children: childTraveller,
  adults: adultTraveller,
  flexible_dates: flexibleDate,
  days_in_makkah:makhaDays,
  days_in_madinah:madinaDays
  }

  return (
    <>
      <InfoForm data={data} requestOpen={requestOpen} setRequestOpen={setRequestOpen} />

      <div className="absolute w-full md:w-11/12 2xl:w-2/3 -translate-x-1/2 left-1/2 bottom-0  bg-stone-800/80 translate-y-1/2 ">
      <div className="w-full relative p-20">
      <div className="absolute bottom-full left-0  grid grid-cols-2 w-full">
           <p onClick={()=>{setFormType('umrah')}} className={`py-2 rounded-lg px-4 ${formType=='umrah'?"bg-stone-700 text-white":"bg-neutral-400 text-white/50"} cursor-pointer  border border-white w-full text-center`}>Umrah</p>
           <p onClick={()=>{setFormType('tour')}} className={`py-2 rounded-lg px-4 ${formType=='tour'?"bg-stone-700 text-white":"bg-neutral-400 text-white/50"} cursor-pointer  border border-white w-full text-center`}>World Tour</p>
          </div>
        <div className="w-full h-full flex flex-col gap-4 m-10">
          
          <div>
            <p className="text-white">Flexibility in Dates</p>
            <div className="flex gap-3 text-white text-sm">
              
              {dates.map((item,index)=>{
                return(
                <div key={index} className="flex gap-1">
                <input onClick={()=>{setFlexibleDate(item.id)}} type="radio" id={item.name} name="duration" />
                <label onClick={()=>{setFlexibleDate(item.id)}} htmlFor={item.name}>{item.name}</label>
              </div>)
              })}
              
              
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-center text-white text-sm">
            <div className="flex flex-col gap-1">
              <p className="">
                {!fromPlace && submit && (
                  <span className="text-red-500 font-bold">*</span>
                )}{" "}
                Flying From
              </p>
              {!isLoaded ? (
                <div className="w-full py-2 px-1 md:px-4 focus:outline-none">
                  Loading
                </div>
              ) : (
                <Autocomplete
                  onLoad={(autocomplete) => (fromRef.current = autocomplete)}
                  onPlaceChanged={() => {
                    if (fromRef.current) {
                      const place = fromRef.current.getPlace();
                      setFromPlace(place as Place);
                      // setFromError("");
                    }
                  }}
                >
                  <input
                    className={`w-full bg-white text-black focus:outline-none p-2 ${
                      !fromPlace && submit && "border-red-500 border-2 "
                    }`}
                    placeholder="Flying From"
                  />
                </Autocomplete>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Flying To</p>
              {!isLoaded ? (
                <div className="w-full py-2 px-1 md:px-4 focus:outline-none">
                  Loading
                </div>
              ) : (
                <Autocomplete
                  onLoad={(autocomplete) => (toRef.current = autocomplete)}
                  onPlaceChanged={() => {
                    if (toRef.current) {
                      const place = toRef.current.getPlace();
                      setToPlace(place as Place);
                      // setFromError("");
                    }
                  }}
                >
                  <input
                    className={`w-full bg-white text-black focus:outline-none p-2 ${
                      !toPlace && submit && "border-red-500 border-2 "
                    }`}
                    placeholder="Flying To"
                  />
                </Autocomplete>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Departure</p>
              <Popover open={open == "departure"}>
                <PopoverTrigger
                  onClick={() => {
                    if (open == "departure") {
                      setOpen("");
                    } else {
                      setOpen("departure");
                    }
                  }}
                  className={`flex p-2 items-center justify-between gap-2 sm:gap-4 bg-white ${
                    !departureDate && submit && "border-red-500 border-2 "
                  } `}
                >
                  <p className="text-gray-500">
                    {departureDate ? departureDate : "Departure"}
                  </p>{" "}
                  <Image
                    src={CalenderImage}
                    alt="Calender Image"
                    className=" w-5 cursor-pointer pointer-events-none"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    onSelect={(e) => {
                      setDepartureDate(formatDate(e!));
                      setOpen("");
                    }}
                    className="rounded-md border"
                    disabled={disablePreviousDates}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Return</p>
              <Popover open={open == "return"}>
                <PopoverTrigger
                  onClick={() => {
                    if (open == "return") {
                      setOpen("");
                    } else {
                      setOpen("return");
                    }
                  }}
                  className={`flex p-2 items-center justify-between gap-2 sm:gap-4 bg-white ${
                    !returnDate && submit && "border-red-500 border-2 "
                  }`}
                >
                  <p className="text-gray-500">
                    {returnDate ? returnDate : "Return"}
                  </p>{" "}
                  <Image
                    src={CalenderImage}
                    alt="Calender Image"
                    className=" w-5 cursor-pointer pointer-events-none"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    onSelect={(e) => {
                      setReturnDate(formatDate(e!));
                      setOpen("");
                    }}
                    className="rounded-md border"
                    disabled={(date: Date) =>
                      disableReturnPreviousDates(date, departureDate)
                    }
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Traveller(s)</p>
              <div className="relative w-full">
                <div
                  onClick={() => {
                    if (open == "travellers") {
                      setOpen("");
                    } else {
                      setOpen("travellers");
                    }
                  }}
                  className="w-full bg-white text-gray-400 focus:outline-none p-2 relative"
                >
                  <p>
                    {adultTraveller + childTraveller + infantTraveller} ,{" "}
                    {travellerClass}
                  </p>
                </div>

                <div
                  className={`absolute text-gray-400 w-full left-0 transition-all duration-500 ${
                    open == "travellers"
                      ? "top-[105%] pointer-events-auto opacity-100"
                      : "top-[90%] opacity-0 pointer-events-none"
                  }  rounded-lg z-50 bg-white p-2 border-[1px] border-gray-300 shadow-xl flex flex-col gap-2`}
                >
                  <select
                    name="cars"
                    id="cars"
                    className="w-full border-[1px] focus:outline-none"
                  >
                    <option
                      onClick={() => {
                        setTravellerClass("Economy");
                      }}
                      value="vEconomyl"
                    >
                      Economy
                    </option>
                    <option
                      onClick={() => {
                        setTravellerClass("Premium Economy");
                      }}
                      value="Premium Economy"
                    >
                      Premium Economy
                    </option>
                    <option
                      onClick={() => {
                        setTravellerClass("Business");
                      }}
                      value="Business"
                    >
                      Business
                    </option>
                    <option
                      onClick={() => {
                        setTravellerClass("First");
                      }}
                      value="First"
                    >
                      First
                    </option>
                  </select>
                  <div className="grid grid-cols-2">
                    <p>Adult</p>
                    <div className="flex">
                      <div
                        onClick={() => {
                          if (adultTraveller > 1) {
                            setAdultTraveller(adultTraveller - 1);
                          }
                        }}
                        className="size-6 border-[1px] text-center cursor-pointer"
                      >
                        -
                      </div>
                      <div className="size-6 border-[1px] text-gray-400 text-sm text-center">
                        {adultTraveller}
                      </div>
                      <div
                        onClick={() => {
                          setAdultTraveller(adultTraveller + 1);
                        }}
                        className="size-6 text-center border-[1px] cursor-pointer"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>Child</p>
                    <div className="flex">
                      <div
                        onClick={() => {
                          if (childTraveller > 0) {
                            setChildTraveller(childTraveller - 1);
                          }
                        }}
                        className="size-6 border-[1px] text-center cursor-pointer"
                      >
                        -
                      </div>
                      <div className="size-6 border-[1px] text-gray-400 text-sm text-center">
                        {childTraveller}
                      </div>
                      <div
                        onClick={() => {
                          setChildTraveller(childTraveller + 1);
                        }}
                        className="size-6 text-center border-[1px] cursor-pointer"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <p>InFant</p>
                    <div className="flex">
                      <div
                        onClick={() => {
                          if (infantTraveller > 0) {
                            setInfantTraveller(infantTraveller - 1);
                          }
                        }}
                        className="size-6 border-[1px] text-center cursor-pointer"
                      >
                        -
                      </div>
                      <div className="size-6 border-[1px] text-gray-400 text-sm text-center">
                        {infantTraveller}
                      </div>
                      <div
                        onClick={() => {
                          setInfantTraveller(infantTraveller + 1);
                        }}
                        className="size-6 text-center border-[1px] cursor-pointer"
                      >
                        +
                      </div>
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setOpen("");
                    }}
                    className="text-center text-gray-400 w-full border-[1px] border-gray-400 rounded-lg cursor-pointer"
                  >
                    Done
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Airline</p>
              <div className="w-full relative">
                <div
                  onClick={() => {
                    if (open == "airline") {
                      setOpen("");
                    } else {
                      setOpen("airline");
                    }
                  }}
                  className={`flex p-2 items-center justify-between gap-2 sm:gap-4 bg-white text-gray-400 ${
                    !airline && submit && "border-red-500 border-2 "
                  }`}
                >
                   <p>{airline ? airline.name ? airline.name : "Airline" : "Airline" }</p>
                  
                </div>
                <DropDwon
                  open={open}
                  openValue="airline"
                  setOpen={setOpen}
                  list={airlineList}
                  loading={airlineLoading}
                  setValue={setAirline}
                />
              </div>
            </div>
          </div>
         {formType=='umrah' && <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 items-center text-white text-sm">
            <div className="flex flex-col gap-1">
              <p className="">No. of Visas</p>
              <div 
              className={` ${(visa<1 && submit ) && "border-2 border-red-500"} w-full bg-white text-black focus:outline-none p-2 grid grid-cols-2`}>
                <p className="my-auto text-gray-400 ">{visa}</p>

                <div className="flex gap-1 w-full justify-end  font-bold">
                  <div
                    onClick={() => {
                      if (visa > 0) {
                        setVisa(visa - 1);
                      }
                    }}
                    className="size-6 border-[1px] text-center cursor-pointer relative"
                  >
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400"></p>
                  </div>

                  <div
                    onClick={() => {
                      if(visa<20){

                        setVisa(visa + 1);
                      }
                    }}
                    className="size-6 text-center border-[1px] cursor-pointer relative"
                  >
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400"></p>
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400 rotate-90"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Days in Makkah</p>
              <div className="w-full bg-white text-black focus:outline-none p-2 grid grid-cols-2">
                <p className="my-auto text-gray-400 ">{makhaDays}</p>

                <div className="flex gap-1 w-full justify-end  font-bold">
                  <div
                    onClick={() => {
                      if (makhaDays > 0) {
                        setMakhaDays(makhaDays - 1);
                      }
                    }}
                    className="size-6 border-[1px] text-center cursor-pointer relative"
                  >
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400"></p>
                  </div>

                  <div
                    onClick={() => {
                      setMakhaDays(makhaDays + 1);
                    }}
                    className="size-6 text-center border-[1px] cursor-pointer relative"
                  >
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400"></p>
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400 rotate-90"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Days in Madina</p>
              <div className="w-full bg-white text-black focus:outline-none p-2 grid grid-cols-2">
                <p className="my-auto text-gray-400 ">{madinaDays}</p>

                <div className="flex gap-1 w-full justify-end  font-bold">
                  <div
                    onClick={() => {
                      if (madinaDays > 0) {
                        setMadinaDays(madinaDays - 1);
                      }
                    }}
                    className="size-6 border-[1px] text-center cursor-pointer relative"
                  >
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400"></p>
                  </div>

                  <div
                    onClick={() => {
                      setMadinaDays(madinaDays + 1);
                    }}
                    className="size-6 text-center border-[1px] cursor-pointer relative"
                  >
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400"></p>
                    <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-[2px] rounded-full bg-gray-400 rotate-90"></p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Makkah Hotel</p>
              <div className="w-full relative">
                <div
                  onClick={() => {
                    if (open == "makkahHotel") {
                      setOpen("");
                    } else {
                      setOpen("makkahHotel");
                    }
                  }}
                  className={`flex p-2 items-center justify-between gap-2 sm:gap-4 bg-white text-gray-400 ${
                    !makhaHotel && submit && "border-red-500 border-2 "
                  }`}
                >
                  <p>{makhaHotel?.name.slice(0, 15)??"Makkah Hotel"}</p>
                </div>
                <DropDwon
                  open={open}
                  openValue="makkahHotel"
                  setOpen={setOpen}
                  list={makkahHotelList}
                  loading={makkahHotelLoading}
                  setValue={setMakhaHotel}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Madina Hotel</p>
              <div className="w-full relative">
                <div
                  onClick={() => {
                    if (open == "madinaHotel") {
                      setOpen("");
                    } else {
                      setOpen("madinaHotel");
                    }
                  }}
                  className={`flex p-2 items-center justify-between gap-2 sm:gap-4 bg-white text-gray-400 ${
                    !madinaHotel && submit && "border-red-500 border-2 "
                  }`}
                >
                  <p>{madinaHotel?madinaHotel.name.slice(0, 15):"Madina Hotel"}</p>
                </div>
                <DropDwon
                  open={open}
                  openValue="madinaHotel"
                  setOpen={setOpen}
                  list={madinaHotelList}
                  loading={madinaHotelLoading}
                  setValue={setMadinaHotel}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Transportation</p>
              <div className="w-full relative">
                <div
                  onClick={() => {
                    if (open == "transportation") {
                      setOpen("");
                    } else {
                      setOpen("transportation");
                    }
                  }}
                  className={`w-full bg-white  focus:outline-none p-2 text-gray-400 cursor-pointer ${
                    transport.length <= 0 &&
                    submit &&
                    " border-red-500 border-2 "
                  }`}
                >
                  <p>
                    {transport[0] ? transport[0].name : "Transport"}
                    {transport.length > 1 && " , ..."}
                  </p>
                </div>
                <TransportDropDown
                  open={open}
                  openValue="transportation"
                  setOpen={setOpen}
                  list={transportationList}
                  setValue={setTransport}
                  value={transport}
                  loading={transportationLoading}
                />
              </div>
            </div>
          </div>}
          <div className="flex w-full justify-between items-start">
            <div className="flex flex-col pr-5">
              <p className="font-semibold text-[10px] sm:text-sm text-white">10.00AM-6.00PM MONDAY TO FRIDAY</p>
              <p className="font-semibold text-[10px] sm:text-sm text-white">10:00AM – 4.00PM SATURDAY</p>
            </div>
            <div
              id="requestButton"
              onClick={() => {
                console.log("run");
                HandleOnSubmit();
              }}
              className="px-4 font-bold cursor-pointer py-2 text-sm md:text-base text-stone-500 bg-white  w-fit border border-white hover:text-white hover:bg-stone-500 transition-all duration-300 hover:shadow-xl"
            >
              Request
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

export default HeroForm;
