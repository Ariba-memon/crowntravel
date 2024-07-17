"use client";

import ProductCard from "@/components/shop/ProductCard";
import { setDate } from "date-fns";
import { StaticImageData } from "next/image";
import { useEffect, useState } from "react";


interface Product{
    id: number,
    name: string,
    short_description: string,
    description: string,
    price: string,
    image_url: string,
    available: boolean,
}
export default function Shop() {
    const [loading, setLoading] = useState(false);
    const [product, SetProduct] = useState<Product[]>([])

    useEffect( ()=>{
        const fetchProducts = async()=>{
        try {
            setLoading(true);
            const response = await fetch("https://api.crownumrah.co.uk/shop/api/products", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            console.log(data);
            SetProduct(data)
            
        } catch (error:any) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }
    fetchProducts();
    }, [])

    return (
        
    <div className="w-full my-32">
        <div className="grid grid-cols-1 w-auto md:m-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 items-center">
        {product.map(item => 
        <ProductCard 
                key={item.id}
                productId = {item.id}
                title={item.name}
                price={item.price}
              
                image={item.image_url}
            />
        )}
       
            
        </div>
    </div>
        
    )
}