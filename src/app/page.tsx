import Image from "next/image";
import HeroSection from "@/components/home/HeroSection";
import Destination from "@/components/home/Destination";
import Testimonials from "@/components/home/Testimonials";
import Blogs from "@/components/home/Blogs";
import Contact from "@/components/home/Contact";
export default function Home() {
  return (
    <div className="flex flex-col w-full gap-16">
      <HeroSection />
      <Destination />
      <Testimonials/>
      <Blogs/>
      <Contact/>
    </div>
  );
}
