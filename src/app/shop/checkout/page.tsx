"use client";

import CountryDropdown from "@/components/shop/CountryDropdown";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useEffect, useState, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";

interface Countries {
  id: number;
  name: string;
}
interface Region {
  region_id: number;
  region: string;
  country: string;
  rate: string;
}

export default function Checkout() {
  const router = useRouter();
  const [deliveryType, setDeliveryType] = useState<string>("normal");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [cartTotal, setCartTotal] = useState<number>(0);
  const [cartCount, setCartCount] = useState(10);

  const [countries, setCountries] = useState<Countries[]>([]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [shippingMethods, setShippingMethods] = useState([]);
  const [tax, setTax] = useState<number>(0);
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedShippingMethod, setSelectedShippingMethod] = useState<
    number | null
  >(null);
  const [orderId, setOrderId] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [deliveryCharges, setDeliveryCharges] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    fetch("https://api.crownumrah.co.uk/shop/api/countries/")
      .then((response) => response.json())
      .then((data) => setCountries(data));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchCartStatus(token);
    } else {
      setIsLoggedIn(false);
      handleTokenExpiration();
    }
  }, []);

  const handleCountryChange = async (countryId: number) => {
    try {
      setSelectedCountry(countryId);
      const response = await fetch(
        `https://api.crownumrah.co.uk/shop/api/shipping-info/${countryId}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRegions(data.shipping_rates);
        setShippingMethods(data.shipping_methods);
        setTax(data.tax.tax_percentage);
        CalculateTotal();
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(
        "https://api.crownumrah.co.uk/shop/api/checkout-calculate/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            order_id: orderId,
            country_id: selectedCountry,
            region_id: selectedRegion,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setTotal(data.total);
      } else {
        console.log("Error: " + response.status + ": " + "Failed to fetch");
      }
    } catch (error: any) {
      console.log("Error: " + error.message);
    }
  };

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
        const data = await response.json();
        setCartTotal(data.get_cart_total);
        setCartCount(data.get_cart_items);
        setOrderId(data.id);
        CalculateTotal();
      } else if (response.status === 401) {
        handleTokenExpiration();
      } else {
        console.log("Error: " + response.status + ": " + "Failed to fetch");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTokenExpiration = () => {
    localStorage.removeItem("token");
    router.push("/auth/login");
  };

  const handleRegionChange = (id: number) => {
    setSelectedRegion(id);
    const selectedRegionObj = regions.find((region) => region.region_id === id);
    if (selectedRegionObj) {
      setDeliveryCharges(Number(selectedRegionObj.rate));
      CalculateTotal();
    }
  };
  const handleDeliveryTypeChange = (type: string) => {
    setDeliveryType(type);
    if (type === "normal") {
      setDeliveryCharges(6);
    } else if (type === "express") {
      setDeliveryCharges(10);
    }
    CalculateTotal();
  };

  const CalculateTotal = useCallback(() => {
    let total = cartTotal;
    let deliveryCharge = deliveryCharges;
    let taxAmount = total * (tax / 100);
    total = total + deliveryCharge + taxAmount;
    setTotal(total);
  }, [cartTotal, deliveryCharges, tax]);

  useEffect(() => {
    CalculateTotal();
  }, [cartTotal, deliveryCharges, tax, CalculateTotal]);

  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState<number>(0);
  const [city, setCity] = useState("");

  const SubmitOrder = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        "https://api.crownumrah.co.uk/shop/api/checkout/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            order: orderId,
            country: selectedCountry,
            region: selectedRegion,
            name: fullName,
            phone: phone,
            email: email,
            address: address,
            city: city,
            zipcode: zipCode,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setLoading(false);
        router.push("/shop/checkout/success");
      } else {
        console.log(await response.json());
      }
    } catch (error: any) {
      console.log("error while sumbit form! " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-28">
      <Toaster />
      <form
        onSubmit={SubmitOrder}
        className="mx-auto max-w-screen-xl px-4 2xl:px-0"
      >
        <div className="mt-6 sm:mt-8 lg:flex lg:items-start lg:gap-12 xl:gap-16">
          <div className="min-w-0 flex-1 space-y-8">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Delivery Details
              </h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="name">Your Name</Label>
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    type="text"
                    id="name"
                    className="border-[1px] border-gray-300"
                    placeholder="Full Name"
                  />
                </div>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    id="email"
                    className="border-[1px] border-gray-300"
                    placeholder="Email"
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    type="number"
                    id="phone"
                    className="border-[1px] border-gray-300"
                    placeholder="Phone"
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="country">Country</Label>
                  {/* <CountryDropdown /> */}
                  <select
                    required
                    className="py-2 border-[1px] border-gray-300 rounded-lg"
                    onChange={(e) =>
                      handleCountryChange(Number(e.target.value))
                    }
                  >
                    <option value="0">Select Country</option>
                    {countries.map((country) => (
                      <option key={country.id} value={country.id}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="country">Region</Label>
                  {/* <CountryDropdown /> */}
                  <select
                    required
                    className="py-2 border-[1px] border-gray-300 rounded-lg"
                    onChange={(e) => handleRegionChange(Number(e.target.value))}
                  >
                    <option selected value="0">
                      Select Region
                    </option>
                    {regions.map((obj) => (
                      <option key={obj.region_id} value={obj.region_id}>
                        {obj.region}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="city">City</Label>
                  <Input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                    type="text"
                    id="city"
                    className="border-[1px] border-gray-300"
                    placeholder="City"
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                    type="text"
                    id="address"
                    className="border-[1px] border-gray-300"
                    placeholder="Address"
                  />
                </div>

                <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="zip">Zip Code</Label>
                  <Input
                    value={zipCode}
                    onChange={(e) => setZipCode(Number(e.target.value))}
                    required
                    type="number"
                    id="zip"
                    className="border-[1px] border-gray-300"
                    placeholder="Zip Code"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Payment Methods
              </h3>
              <div className="grid lg:grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="cashOnDelivery"
                    type="radio"
                    name="paymentMethod"
                    onChange={() => setSelectedShippingMethod(null)}
                  />

                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 relative"
                    htmlFor="cashOnDelivery"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/icons/cash-on-delivery.png"
                      alt=""
                    />
                    <div className="pl-3">
                      <span className="mt-2 font-semibold">
                        Cash On Delivery
                      </span>
                      <p className="text-slate-500 text-sm leading-6">
                        Delivery: 2-4 Days
                      </p>
                    </div>
                  </label>

                  {selectedShippingMethod === null && (
                    <div className="pl-6 mt-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="normalDelivery"
                          name="deliveryType"
                          className="h-4 w-4 border-gray-300 text-gray-900"
                          value="normal"
                          checked={deliveryType === "normal"}
                          onChange={() => handleDeliveryTypeChange("normal")}
                        />
                        <label
                          htmlFor="normalDelivery"
                          className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Normal Delivery (3-5 working days)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="radio"
                          id="expressDelivery"
                          name="deliveryType"
                          className="h-4 w-4 border-gray-300 "
                          value="express"
                          checked={deliveryType === "express"}
                          onChange={() => handleDeliveryTypeChange("express")}
                        />
                        <label
                          htmlFor="expressDelivery"
                          className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300"
                        >
                          Express Delivery (within 48 hours)
                        </label>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                  />
                  {/* <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span> */}
                  <label
                    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                    htmlFor="radio_2"
                  >
                    <img
                      className="w-14 object-contain"
                      src="/icons/atm-card.png"
                      alt=""
                    />
                    <div
                      className="ml-5"
                      onClick={() => {
                        toast({
                          description:
                            "This payment method is currently not supported.",
                        });
                      }}
                    >
                      <span className="mt-2 font-semibold">Card Payment</span>
                      <p className="text-slate-500 text-sm leading-6">
                        Delivery: 2-4 Days
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full space-y-6 sm:mt-8 lg:mt-0 lg:max-w-xs xl:max-w-md">
            <div className="flow-root">
              <div className="-my-3 divide-y divide-gray-200 dark:divide-gray-800">
                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                  £{cartTotal}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Total Items
                  </dt>
                  <dd className="text-base font-medium text-green-500">
                    {cartCount}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Delivery Charges
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                  £{deliveryCharges}
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Tax
                  </dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">
                    {tax}%
                  </dd>
                </dl>

                <dl className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                  £{total}
                  </dd>
                </dl>
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="submit"
                // onClick={() => router.push("@/components/shop/Invoice")}
                className="flex w-full items-center justify-center rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-4  focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                {loading ? "Processing" : "Proceed to Payment"}
              </button>

              <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                One or more items in your cart require an account.{" "}
                <a
                  href="#"
                  title=""
                  className="font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
                >
                  Sign in or create an account now.
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
