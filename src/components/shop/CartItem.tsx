import React from "react";

export default function CartItem({
  deleteItem,
  product_id,
  className = "",
  quantity = 0,
  image = "",
  totalPrice = "0",
  price = "0",
  title = "",
  increaseQuantity,
  decreaseQuantity,
}: {
  product_id: number;
  className: string;
  image: string;
  totalPrice: string;
  title: string;
  quantity: number;
  price: string;
  deleteItem: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
}) {
  const orderThroughAdmin = () => {
    console.log("Order items through admin");
  };

  return (
    <div
      className={`justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start ${className}`}
    >
      <img
        src={image}
        alt="product-image"
        className="w-full rounded-lg sm:w-40"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0 flex flex-col items-center gap-6">
          <h2 className="text-lg font-bold text-gray-900">{title}</h2>
          <p className="text-sm">Price: {price} £ </p>
        </div>
        <div className="mt-4 flex justify-between flex-col gap-3 md:flex-row sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div className="flex items-center justify-center border-gray-100">
            <span
              className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-stone-500 hover:text-stone-50"
              onClick={() => decreaseQuantity(product_id)}
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
              onClick={() => increaseQuantity(product_id)}
            >
              {" "}
              +{" "}
            </span>
          </div>
          <div className="flex items-center flex-col md:flex-row">
            <p className="text-sm">Total: {totalPrice} £ </p>
            <svg
              onClick={() => deleteItem(product_id)}
              className="w-6 h-6 text-red-500 mt-2 md:ml-4 hover:text-red-700 hover:cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </div>
        </div>
        {quantity > 10 && (
          <div className="mt-4 justify-center flex flex-col items-center">
            <p className="text-red-500 pb-4">
              Inventory short, order through admin
            </p>
            <button
              onClick={orderThroughAdmin}
              className="ml-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
