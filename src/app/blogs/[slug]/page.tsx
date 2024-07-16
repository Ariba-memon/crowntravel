import { blogPosts } from "@/components/Bogs/blogs"
import Image from "next/image"
import Link from "next/link"

export default function Blog({params}:{params:{slug:string}}){

return(
<div  className="flex flex-col w-full pt-24 gap-6  px-3 sm:px-5 pb-20">
<Link id="blog" href={"/blogs#"+params.slug} className="w-fit scroll-m-5  rounded-xl cursor-pointer bg-stone-700 text-white font-bold text-sm px-4 py-2">Back</Link>
   {blogPosts.filter((item)=>{if(params.slug==item.slug){return item}}).slice(0,1).map((item,index)=>{
    return(<div  key={index} className="w-full flex flex-col  gap-6">
        <Image src={item.image} alt={item.title} className="w-full border-[1px] border-gray-300 shadow-2xl max-h-96 object-cover rounded-md"/>
           <div className="text-2xl font-bold md:text-4xl">{item.title}</div>
           <div className="text-xl md:text-3xl font-semibold">{item.shortDescription}</div>
           <div className="md:text-xl ">{item.description}</div>
        </div> )
   })}
      
</div>)
}