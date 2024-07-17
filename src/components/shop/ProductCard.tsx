import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useCart } from "@/app/CartContext";

interface CartItem {
  product_id: number;
}

interface ProductCardProps {
  productId: number;
  title: string;
  price: string;
  image: string;
  
}

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  title = "",
  price = "",
  image = "",

}) => {
  const router = useRouter();
  const [inCart, setInCart] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const { toast } = useToast();
  const { setCartCount } = useCart();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      setIsLoggedIn(true);
      fetchCartStatus(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchCartStatus = async (token: string): Promise<void> => {
    try {
      const response = await fetch(
        "https://api.crownumrah.co.uk/shop/api/cart/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data: CartItem[] = await response.json();
        const isInCart = data.some((item) => item.product_id === productId);
        setInCart(isInCart);
      } else if (response.status === 401) {
        handleTokenExpiration();
      } else {
        console.log("Failed to fetch cart items" + response);
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        description: "Failed to fetch cart items",
      });
    }
  };

  const handleTokenExpiration = () => {
    localStorage.removeItem("token");
    toast({
      variant: "destructive",
      description: "Session expired, please log in again",
    });
    router.push("/auth/login");
  };

  const handleToggleCart = async () => {
    if (!isLoggedIn) {
      router.push("/auth/login");
      return;
    }

    const url = inCart
      ? "https://api.crownumrah.co.uk/shop/api/cart/remove/"
      : "https://api.crownumrah.co.uk/shop/api/cart/add/";
 
      
 

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
        body: JSON.stringify({ product_id: productId, quantity }),
      });

      if (response.ok) {
        setInCart(!inCart);
        const token = localStorage.getItem("token")!;
        fetchCartCount(token);
        toast({
          variant: "default",
        
        });
      } else if (response.status === 401) {
        handleTokenExpiration();
      } else {
        toast({
          variant: "destructive",
          
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
  
      });
    }
  };

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
      localStorage.setItem("cartCount", data);
      setCartCount(data);
    } catch (error: any) {
      console.log("error while fetching cart count", error.message);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="relative m-3 bg-slate-100 flex flex-col  md:m-auto overflow-hidden rounded-lg p-5 hover:shadow-2xl hover:scale-105 transition-all duration-300  shadow-lg border-2 border-slate-200 h-96 w-full">
    

      <div className="w-full h-4/5 max-h-48 rounded-lg overflow-hidden bg-gray-200 border border-gray-300 shadow-sm">
        <img
          className=" object-contain overflow-hidden w-full h-full"
          src={image}
          alt="product image"
        />
      </div>

      <span className="absolute top-0 left-0 w-28 translate-y-4 -translate-x-6 -rotate-45 bg-black text-center text-sm text-white">
       
      </span>
      <div className="mt-4 ">
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-slate-900">
            {title}
          </h5>
        </a>
        <div className="mt-2.5 mb-5 flex items-center justify-between">

            <div className="flex items-center">
          <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-xs font-semibold">
            5.0
          </span>
          {[...Array(5)].map((_, index) => (
            <svg
              key={index}
              aria-hidden="true"
              className="h-5 w-5 text-yellow-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          ))}
          </div>

          <div className="flex items-center justify-center border-gray-100">
            <span
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-stone-500 hover:text-stone-50"
              onClick={decreaseQuantity}
            >
              {" "}
              -{" "}
            </span>
            <input
              className="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value={quantity}
              readOnly
            />
            <span
              className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-stone-500 hover:text-stone-50"
              onClick={increaseQuantity}
            >
              {" "}
              +{" "}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              &#163;{price}
            </span>
          </p>
          <button
            onClick={handleToggleCart}
            className={`flex items-center md:justify-between rounded-md px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 ${
              inCart
                ? "bg-slate-900 hover:bg-gray-600"
                : "bg-stone-600 hover:bg-gray-700"
            }`}
          >
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
            {inCart ? "Item in Cart" : "Add to cart"}
          </button>
        </div>
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
};

export default ProductCard;
