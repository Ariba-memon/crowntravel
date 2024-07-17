"use client";
import SmsImage from "@/assets/sms.svg";
import CallinImage from "@/assets/callin.svg";
import CallgoImage from "@/assets/callgoing.svg";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import ContactForm from "./ContactForm";

export default function Contact() {
  const [messageOpen, setMessageOpen] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const contactRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      document.body.style.overflow = messageOpen ? "hidden" : "auto";
      const div = document.getElementById("header");
      if (div) {
        div.style.pointerEvents = messageOpen ? "none" : "auto";
      }
    }, 500);
  }, [messageOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  function handleOnSubmit() {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setMessageOpen(true);
    }
  }

  return (
    <div
      id="contact"
      ref={contactRef}
      className={`relative w-full py-5 scroll-smooth scroll-mt-20 ${isInView ? 'animate-slide-in' : 'opacity-0'}`}
    >
      <ContactForm requestOpen={messageOpen} setRequestOpen={setMessageOpen} />
      <div className="flex justify-center items-center py-12 px-3 sm:px-5 lg:px-28 pb-24 relative w-full">
        <div className="grid sm:grid-cols-3 gap-5 w-full">
          <div
            onClick={handleOnSubmit}
            className="rounded-lg w-full bg-white border-[4px] gap-5 border-stone-500 p-3 flex items-center cursor-pointer hover:shadow-2xl"
          >
            <Image src={SmsImage} alt="sms image" className="w-10" />
            <p className="text-xl font-bold text-stone-500">Send Message</p>
          </div>
          <div
          
            className="rounded-lg bg-white w-full border-[4px] border-stone-500 p-3 flex items-center gap-5 cursor-pointer hover:shadow-2xl"
          >
            <Image src={CallgoImage} alt="call us image" className="w-10" />
            <p className="text-xl font-bold text-stone-500">Call Us</p>
          </div>
          <div
            onClick={handleOnSubmit}
            className="rounded-lg bg-white w-full border-[4px] border-stone-500 p-3 flex items-center gap-5 cursor-pointer hover:shadow-2xl"
          >
            <Image src={CallinImage} alt="call request image" className="w-10" />
            <p className="text-xl font-bold text-stone-500">Send Call Request</p>
          </div>
        </div>
      </div>
    </div>
  );
}
