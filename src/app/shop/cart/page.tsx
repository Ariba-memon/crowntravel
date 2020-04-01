"use client";

import CartItem from "@/components/shop/CartItem";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useCart } from "@/app/CartContext";

interface CartItems {
  product_id: number;
  product_name: string;
  price: string;
  quantity: number;
  image_url: string;
  get_total: number;
}

interface OrderItem {
  id: number;
  product: Product | null;
  order: number;
  quantity: number;
  date_added: string;
  get_total: number;
}

interface Product {
  id: number;
  name: string;
  short_description: string;
  description: string;
  price: string;
  image_url: string;
  available: boolean;
  images: { id: number; image_url: string }[];
}

interface CartResponse {
  id: number;
  user: number;
  date_ordered: string;
  complete: boolean;
  transaction_id: string;
  orderitems: OrderItem[];
  get_cart_items: number;
  get_cart_total: number;
}

export default function Checkout() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cartTotal, setCartTotal] = useState(0);
  const { cartCount, setCartCount } = useCart();
  const [cart, setCart] = useState<CartItems[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== undefined && token !== null) {
      setIsLoggedIn(true);
      fetchCartStatus(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const fetchCartStatus = async (token: string) => {
    try {
      const response = await fetch(
        "https://api.crownumrah.co.uk/shop/api/order/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data: CartResponse = await response.json();

        const itemsList: CartItems[] = data.orderitems.map((item) => ({
          product_id: item.product ? item.product.id : 0,
          product_name: item.product ? item.product.name : "Unknown Product",
          price: item.product ? item.product.price : "0.00",
          quantity: item.quantity,
          image_url: item.product ? item.product.image_url : "",
          get_total: item.get_total,
        }));

        setCartTotal(data.get_cart_total);
        setCartCount(data.get_cart_items);
        setCart(itemsList);
      } else if (response.status === 401) {
        handleTokenExpiration();
      } else {
        toast({
          variant: "destructive",
          description: `Failed to fetch cart items: ${response.status}`,
        });
      }
    } catch (error: any) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        description: "Failed to fetch cart items due to a network error.",
      });
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const response = await fetch(
        `https://api.crownumrah.co.uk/shop/api/cart/remove/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ product_id: id }),
        }
      );

      if (response.ok) {
        setCart((prev) => prev.filter((c) => c.product_id !== id));
        toast({
          variant: "default",
          description: "Item removed from cart",
        });

        const token = localStorage.getItem("token");
        if (token) {
          fetchCartCount(token);
          fetchCartStatus(token);
        }
      } else if (response.status === 401) {
        handleTokenExpiration();
      } else {
        toast({
          variant: "destructive",
          description: "Failed to remove item from cart",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        description: "Failed to remove item from cart",
      });
    }
  };

  const increaseQuantity = (product_id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === product_id
          ? {
              ...item,
              quantity: item.quantity + 1,
              get_total: (item.quantity + 1) * parseFloat(item.price),
            }
          : item
      )
    );
  };

  const decreaseQuantity = (product_id: number) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === product_id && item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
              get_total: (item.quantity - 1) * parseFloat(item.price),
            }
          : item
      )
    );
  };

  useEffect(() => {
    updateCartTotal();
  }, [cart]);

  const updateCartTotal = () => {
    const total = cart.reduce((acc, item) => acc + item.get_total, 0);
    setCartTotal(total);
  };

  const handleTokenExpiration = () => {
    localStorage.removeItem("token");
    toast({
      variant: "destructive",
      description: "Session expired, please log in again",
    });
    router.push("/auth/login");
  };

  if (typeof window === "undefined") {
    return null;
  }

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

  return (
    <div>
      <Toaster />
      <div className="h-full my-10 bg-gray-100 pt-20">
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
        <div className="mx-auto max-w-7xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3 md:h-[50vh] md:overflow-auto">
            {cart.map((item) => (
              <CartItem
                key={item.product_id}
                product_id={item.product_id}
                className={"mt-6"}
                image={item.image_url}
                title={item.product_name}
                totalPrice={item.get_total.toFixed(2)}
                quantity={item.quantity}
                price={item.price}
                deleteItem={deleteItem}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            ))}
          </div>
          <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
            <div className="mb-2 flex justify-between">
              <p className="text-gray-700">Cart Count</p>
              <p className="text-gray-700">{cartCount}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total</p>
              <div>
                <p className="mb-1 text-lg font-bold">
                  £{cartTotal.toFixed(2)} GBP
                </p>
              </div>
            </div>
            <button
              onClick={() => router.push("/shop/checkout")}
              className="mt-6 w-full rounded-md bg-orange-500 py-1.5 font-medium text-stone-50 hover:bg-orange-600"
            >
              Check out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
