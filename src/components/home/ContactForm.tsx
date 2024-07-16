"use client";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2"
interface InfoProps {
  requestOpen: boolean;
  setRequestOpen: React.Dispatch<React.SetStateAction<boolean>>;
  
}

function ContactForm({ requestOpen, setRequestOpen }: InfoProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  function validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function FormSubmit() {
    const newErrors: { [key: string]: string } = {};
    if (name.length < 3) newErrors.name = "* to short";
    if (phone.length < 7 || phone.length > 17) newErrors.phone = "* not valid";
    if (!name) newErrors.name = "* required";
    if (!phone) newErrors.phone = "* required";
    if (!email) {
      newErrors.email = "* required";
    } else if (!validateEmail(email)) {
      newErrors.email = "* not valid";
    }
    if (!description) newErrors.description = "* required";

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        setLoading(true);
      console.log("Form submitted", { name, phone, email, description });
      console.log({
         
        name,
        email,
        phone, 
        note:description
      })
      axios.post('https://api.crownumrah.co.uk/api/contact-us/',{ name, email, message:description, phone}).then((response)=>{
        setName("");
        setEmail("");
        setPhone("");
        setDescription("");
        setLoading(false);
        console.log("main response : ", response)
        Swal.fire({
          title: "Message Send Successfuly",
          text: "We will contact with you within 48 hours",
          icon: "success"
        }).then(()=>{

          setRequestOpen(false);
        })
      }).catch((error)=>{
        console.log("main error : ",error)
      })
    //   setRequestOpen(false)
    }
  }

  return (
    <div
      className={`transition-all delay-500 duration-1000 w-full pt-10 ${
        requestOpen
          ? "h-[110%] absolute px-3 opacity-100 z-50 left-0 top-0  flex justify-center "
          : "opacity-0 bg-black/0 h-0 top-full"
      }`}
    >
      <div className="bg-white rounded-lg border-[1px] shadow-2xl border-gray-300 p-5 flex flex-col gap-4 w-full md:w-2/3 h-fit xl:w-1/3 relative">
        <div className="flex flex-col gap-1">
               <div onClick={()=>{setRequestOpen(false)}} className="absolute right-2 top-2 text-sm font-semibold text-gray-300">X</div>
          <p className="text-xl">Contact Message</p>
          {/* <p className="text-[10px] text-gray-500">LINES OPEN FROM</p>
          <p className="text-[10px] text-gray-500">
            10.00AM-6.00PM MONDAY TO FRIDAY
          </p>
          <p className="text-[10px] text-gray-500">10:00AM – 4.00PM SATURDAY</p> */}
          <div className="flex flex-col w-full gap-2 pt-2">
            <div className="grid grid-cols-2 gap-2 w-full text-sm">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-2 items-end">
                  <p className="leading-4">Name</p>{" "}
                  {errors.name && (
                    <span className="text-red-600 text-xs">{errors.name}</span>
                  )}
                </div>

                <input
                  value={name}
                  onChange={(e) => {
                    const pattern = "^[ a-zA-Z ]+$";
                    const regex = new RegExp(pattern);
                    errors.name = "";
                    setErrors(errors);
                    if (e.target.value.length == 0) {
                      setName(e.target.value);
                      return;
                    }
                    if (regex.test(e.target.value)) {
                      setName(e.target.value);
                    }
                  }}
                  className="focus:outline-none border-[2px] border-gray-400 rounded-lg p-1 w-full"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-2 items-end">
                  <p className="leading-4">Phone</p>{" "}
                  {errors.phone && (
                    <span className="text-red-600 text-xs">{errors.phone}</span>
                  )}
                </div>

                <input
                  value={phone}
                  onChange={(e) => {
                    const pattern = "^[0-9]+$";
                    const regex = new RegExp(pattern);
                    errors.phone = "";
                    setErrors(errors);

                    if (e.target.value.length == 0) {
                      setPhone(e.target.value);
                      return;
                    }
                    if (
                      regex.test(e.target.value) &&
                      e.target.value.length < 16
                    ) {
                      setPhone(e.target.value);
                    }
                  }}
                  className="focus:outline-none border-[2px] border-gray-400 rounded-lg p-1 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-2 w-full">
              <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-2 items-end">
                  <p className="leading-4">Email</p>
                  {errors.email && (
                    <span className="text-red-600 text-xs">{errors.email}</span>
                  )}
                </div>

                <input
                  value={email}
                  onChange={(e) => {
                    errors.email = "";
                    setErrors(errors);
                    setEmail(e.target.value);
                  }}
                  className="focus:outline-none border-[2px] border-gray-400 rounded-lg p-1 w-full"
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex gap-2 items-end">
                  <p className="leading-4">Description</p>{" "}
                  {errors.description && (
                    <span className="text-red-600 text-xs">
                      {errors.description}
                    </span>
                  )}
                </div>
                <textarea
                  value={description}
                  onChange={(e) => {
                    errors.description = "";
                    setErrors(errors);
                    setDescription(e.target.value);
                  }}
                  rows={3}
                  draggable={false}
                  className="focus:outline-none border-[2px] border-gray-400 rounded-lg p-1 w-full"
                />
              </div>
              <button
                onClick={FormSubmit}
                className="w-full p-2 bg-stone-500 hover:text-stone-500 hover:bg-white border transition-all duration-300 border-stone-500 font-bold rounded-lg text-white"
              >
                {loading?"Sending...":"Send"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
