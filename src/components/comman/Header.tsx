"use client";
import React, { useEffect, useState } from "react";
import Logo from "@/assets/LOGO.png";
import Logo1 from "@/assets/logo1.png"
import Logo2 from "@/assets/logo2.png"
import Logo3 from "@/assets/logo3.png"
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/CartContext";

const links = [
  { title: "Home", link: "/" },
  { title: "Shop", link: "/shop" },
  { title: "Guide", link: "/guide" },
  { title: "Blog", link: "/blogs" },
];

function Header({ isWhite = true }: { isWhite?: boolean }) {
  const [headerOpen, setHeaderOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartCount, setCartCount } = useCart();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchCartCount(token);
    }
  }, []);

  const fetchCartCount = async (token: string) => {
    try {
      const response = await fetch(
        "https://api.crownumrah.co.uk/shop/api/cart/count/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();

      // Debugging log to inspect the fetched data
      console.log("Fetched cart count data: ", data);

      // Assuming data is a number or a valid React child
      localStorage.setItem("cartCount", JSON.stringify(data));
      setCartCount(data);
    } catch (error: any) {
      console.log("Error while fetching cart count", error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center absolute z-50 left-1/2 -translate-x-1/2 top-0 w-full">
    <div className="bg-white/70 w-full items-center flex justify-between gap-5 sm:gap-10 max-w-screen-2xl mx-auto px-3 sm:px-5 pt-1">
     <div className="flex gap-4 sm:gap-10">
            <Image src={Logo1} alt="logo 1 " className="w-7 sm:w-10"/>
            <Image src={Logo2} alt="logo 2 " className="w-7 sm:w-10"/>
            <Image src={Logo3} alt="logo 3 " className="w-7 sm:w-10"/>
     </div>
     <p className="text-stone-800 text-lg sm:text-2xl font-semibold flex ">
     <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-phone flex m-2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>+07366688730</p>
    </div>
      <div
        id="header"
        className={`flex justify-between bg-white/70 absolute top-0 max-w-screen-2xl mx-auto rounded-b-lg px-5 gap-5 items-center py-3 w-full  ${
          isWhite ? "text-white" : "text-stone-600 border-b "
        }  relative font-bold `}
      >
        <div className="md:w-80">

        <Image src={Logo} alt="logo" className="max-w-16 sm:max-w-28" />
          </div>

        <div className="hidden md:flex gap-5 lg:gap-10 text-white font-semibold transition-opacity duration-300">
          {links.map((item, index) => (
            <Link
              key={index}
              onClick={() => setHeaderOpen(!headerOpen)}
              href={item.link}
              className={`${
                isWhite
                  ? "text-white/70 hover:text-white"
                  : "text-stone-600/70 hover:text-stone-600"
              } cursor-pointer`}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex gap-2 lg:gap-5 items-center md:w-80 justify-end">
          <a
            className="cursor-pointer flex"
            onClick={() => router.push("/shop/cart")}
          >
            {/* Render cartCount safely */}
            {typeof cartCount === "number" ? cartCount : 0}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </a>
          <Link
            href="/#contact"
            className=" text-[12px] leading-3 flex lg:w-full items-center justify-center py-1 lg:py-2 px-2 rounded-md border-2 border-stone-600  text-center text-stone-600 hover:text-white hover:bg-stone-600 transition-all duration-300"
          >
            Contact
          </Link>
          {isLoggedIn ? (
            <div
              onClick={() => {
                setHeaderOpen(false);
                handleLogout();
              }}
              className=" text-[12px] leading-3 cursor-pointer lg:w-full flex items-center justify-center py-1 lg:py-2 px-2 rounded-md border-2 border-stone-600  text-center text-stone-600 hover:text-white hover:bg-stone-600 transition-all duration-300"
            >
              <p className="my-auto text-center">Logout</p>
            </div>
          ) : (
            <Link
              onClick={() => setHeaderOpen(false)}
              href="/auth/login"
              className=" text-[12px] leading-3 lg:w-full cursor-pointer flex items-center justify-center py-1 lg:py-2 px-2 rounded-md border-2 border-stone-600  text-center text-stone-600 hover:text-white hover:bg-stone-600 transition-all duration-300"
            >
              <p className="my-auto text-center">Login/Register</p>
            </Link>
          )}
        </div>
        <div
          onClick={() => setHeaderOpen(!headerOpen)}
          className="p-3 relative cursor-pointer md:hidden"
        >
          <div
            className={`absolute h-1 ${
              headerOpen ? "translate-y-0 -rotate-45" : "-translate-y-1"
            } inset-y-auto rounded-lg bg-stone-600 w-full left-0 transition-all duration-500`}
          ></div>
          <div
            className={`absolute h-1 ${
              headerOpen ? "translate-y-0 rotate-45" : "translate-y-1"
            } inset-y-auto rounded-lg bg-stone-600 w-full left-0 transition-all duration-500`}
          ></div>
        </div>
        <div
          className={`absolute w-[95%] left-1/2 -translate-x-1/2 top-[115%] md:hidden p-5 rounded-lg bg-white flex flex-col gap-2 z-50 shadow-2xl border-[1px] border-gray-300 transition-all duration-500 ${
            headerOpen
              ? "h-64 opacity-100 pointer-events-auto"
              : "h-0 opacity-0 pointer-events-none"
          }`}
        >
          {links.map((item, index) => (
            <Link
              key={index}
              onClick={() => setHeaderOpen(!headerOpen)}
              href={item.link}
              className="text-stone-600/70 hover:text-stone-600 cursor-pointer"
            >
              {item.title}
            </Link>
          ))}

          <Link
            onClick={() => setHeaderOpen(false)}
            href="/#contact"
            className="py-2 px-4 rounded-md border-2 border-stone-600/70 w-full text-center text-stone-600/70 hover:text-stone-600"
          >
            Contact
          </Link>
          {isLoggedIn ? (
            <div
              onClick={() => {
                setHeaderOpen(false);
                handleLogout();
              }}
              className="py-2 px-4 cursor-pointer rounded-md border-2 border-stone-600/70 w-full text-center text-stone-600/70 hover:text-stone-600"
            >
              Logout
            </div>
          ) : (
            <Link
              onClick={() => setHeaderOpen(false)}
              href="/auth/login"
              className="py-2 px-4 cursor-pointer rounded-md border-2 border-stone-600/70 w-full text-center text-stone-600/70 hover:text-stone-600"
            >
              Login/Register
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
