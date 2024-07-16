"use client";

import Star from "@/components/shop/Icons/Start";
import { Button } from "@/components/ui/button"



export default function ProductDetails() {
    return (
        <div className="font-sans pt-10 h-screen bg-white text-black">
            <div className="p-4 lg:max-w-7xl max-w-2xl max-lg:mx-auto">
                <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
                    <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
                        <div className="bg-gray-800 px-4 py-12 rounded-xl">
                            <img src="https://readymadeui.com/images/coffee2.webp" alt="Product" className="w-9/12 rounded object-cover mx-auto" />
                        </div>

                        {/* <div className="mt-4 flex flex-wrap justify-center gap-4 mx-auto">
                            <div className="w-[90px] h-20 flex items-cemter justify-center bg-gray-800 rounded-xl p-4 cursor-pointer">
                                <img src="https://readymadeui.com/images/coffee3.webp" alt="Product2" className="w-full object-contain" />
                            </div>
                            <div className="w-[90px] h-20 flex items-cemter justify-center bg-gray-800 rounded-xl p-4 cursor-pointer">
                                <img src="https://readymadeui.com/images/coffee4.webp" alt="Product2" className="w-full object-contain" />
                            </div>
                            <div className="w-[90px] h-20 flex items-cemter justify-center bg-gray-800 rounded-xl p-4 cursor-pointer">
                                <img src="https://readymadeui.com/images/coffee5.webp" alt="Product2" className="w-full object-contain" />
                            </div>
                            <div className="w-[90px] h-20 flex items-cemter justify-center bg-gray-800 rounded-xl p-4 cursor-pointer">
                                <img src="https://readymadeui.com/images/coffee6.webp" alt="Product2" className="w-full object-contain" />
                            </div>
                        </div> */}
                    </div>

                    <div className="lg:col-span-2 text-black">
                        <h2 className="text-3xl font-semibold ">Espresso Elegante | Coffee</h2>

                        <div className="flex space-x-2 mt-4">
                            <Star className={"fill-yellow-300"} />
                            <Star className={"fill-yellow-300"} />
                            <Star className={"fill-yellow-300"} />
                            <Star className={"fill-yellow-300"} />
                            <Star className={"fill-[#CED5D8]"} />
                            <h4 className=" text-base">500 Reviews</h4>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
                            <p className="text-4xl font-semibold">$12</p>
                            <p className=" text-base"> <span className="text-sm ml-1">Tax included</span></p>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-8">
            
                            <Button variant="default"  className="min-w-[200px]">Buy Now</Button>
                            <Button variant="secondary"  className="min-w-[200px]">Add To card-text</Button>

                        </div>

                        <div className="mt-8">
                            <h3 className="text-xl font-semibold ">About the coffee</h3>
                            <ul className="space-y-3 list-disc mt-4 pl-4 text-sm ">
                                <li>A cup of coffee is a beverage essential because of its timeless appeal</li>
                                <li>Easy to prepare. It can be brewed using various methods, from drip machines to manual pour-overs.</li>
                                <li>Available in various sizes, from a standard espresso shot to a large Americano, catering to different preferences.</li>
                                <li>You can customize your coffee by adding cream, sugar, or flavorings to suit your taste preferences.</li>
                            </ul>
                        </div>

                     
                    </div>
                </div>
            </div>
        </div>
    )
}