import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/comman/Header";
import Footer from "@/components/comman/Footer";
import React from "react";
import { CartProvider } from "./CartContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crown Umrah",
  description: "Experience a seamless and spiritually enriching Umrah journey with Crown Umrah's tailored packages.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <CartProvider>
      <html lang="en" className="scroll-smooth">
        <body id="top" className='bg-stone-100 '>
          <Header isWhite={false}/>
          <div className='max-w-screen-2xl mx-auto '>
             {children}
            
            <Footer/>
          </div>
        </body>
      </html>
    </CartProvider>
  );
}
