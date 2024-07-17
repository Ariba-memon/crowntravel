"use client";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

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
    if (name.length < 3) newErrors.name = "* too short";
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
      axios
        .post("https://api.crownumrah.co.uk/api/contact-us/", {
          name,
          email,
          message: description,
          phone,
        })
        .then((response) => {
          setName("");
          setEmail("");
          setPhone("");
          setDescription("");
          setLoading(false);
          Swal.fire({
            title: "Message Sent Successfully",
            text: "We will contact you within 48 hours",
            icon: "success",
          }).then(() => {
            setRequestOpen(false);
          });
        })
        .catch((error) => {
          setLoading(false);
          console.log("Error: ", error);
        });
    }
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-opacity duration-300 z-50 ${
        requestOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-black rounded-lg border-[1px] shadow-2xl border-gray-300 p-5 flex flex-col gap-4 w-full md:w-2/3 xl:w-1/3 relative transform transition-transform duration-300 ${
          requestOpen ? "black" : "-translate-y-full"
        }`}
      >
        <div
          onClick={() => {
            setRequestOpen(false);
          }}
          className="absolute right-2 top-2 text-sm font-semibold text-gray-300 cursor-pointer"
        >
          X
        </div>
        <p className="text-xl text-white">Contact Message</p>
        <div className="flex flex-col w-full gap-2 pt-2">
          <div className="grid grid-cols-2 gap-2 w-full text-sm">
            <div className="flex flex-col gap-1 w-full">
              <div className="flex gap-2 items-end">
                <p className="leading-4 text-white">Name</p>
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
                  if (e.target.value.length === 0) {
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
                <p className="leading-4 text-white">Phone</p>
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

                  if (e.target.value.length === 0) {
                    setPhone(e.target.value);
                    return;
                  }
                  if (regex.test(e.target.value) && e.target.value.length < 16) {
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
                <p className="leading-4 text-white">Email</p>
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
                <p className="leading-4 text-white">Description</p>
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
              className="w-full p-2  bg-black hover:text-stone-900 hover:bg-white border transition-all duration-300 border-stone-500 font-bold rounded-lg text-white"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactForm;
