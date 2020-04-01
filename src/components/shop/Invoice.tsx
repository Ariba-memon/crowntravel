import React from "react";

const Invoice: React.FC = () => {
  return (
    <div className="bg-gray-100 min-h-screen my-24 flex items-center justify-center py-10">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Invoice</h1>
            <p className="text-gray-600">Invoice number 26834523-DRAFT</p>
            <p className="text-gray-600">Date due: February 5, 2022</p>
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQGluJhW7I1NYU7jF77E-9K9I46_ib_DUNHw&s"
              alt="description"
              className="h-full w-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="mb-6">
          <div className="text-gray-600">Stripe Shop</div>
          <div className="mt-4">
            <div className="text-gray-600">Bill to:</div>
            <div className="text-gray-800 font-bold">Jane Diaz</div>
            <div className="text-gray-600">jane.diaz@stripe.com</div>
          </div>
        </div>
        <div className="border-t border-gray-200 mt-6 mb-6"></div>
        <div className="mb-4">
          <div className="text-lg font-semibold">
            $48.99 due February 5, 2022
          </div>
          <a href="#" className="text-blue-500 underline mt-2 inline-block">
            Pay online
          </a>
        </div>
        <p className="text-gray-600 mb-6">Thanks for your business!</p>
        <table className="w-full mb-6">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="py-2 text-left text-gray-600">Description</th>
              <th className="py-2 text-left text-gray-600">Qty</th>
              <th className="py-2 text-left text-gray-600">Unit price</th>
              <th className="py-2 text-left text-gray-600">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-200">
              <td className="py-2 text-gray-800">Shoes</td>
              <td className="py-2 text-gray-800">1</td>
              <td className="py-2 text-gray-800">$48.99</td>
              <td className="py-2 text-gray-800">$48.99</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="py-2 pr-12 text-right text-gray-600">
                Subtotal
              </td>
              <td className="py-2 text-gray-800">$48.99</td>
            </tr>
            <tr>
              <td
                colSpan={3}
                className="py-2 pr-16 text-right text-gray-600 font-semibold"
              >
                Total
              </td>
              <td className="py-2 text-gray-800 font-semibold">$48.99</td>
            </tr>
          </tfoot>
        </table>
        <div className="border-t border-gray-200 mt-6 mb-6"></div>
        <div className="text-gray-600 mb-6">
          <p>Pay with ACH or wire transfer:</p>
          <p>
            A routing number, account number, and SWIFT code will be generated
            for this customer when the invoice is sent.
          </p>
        </div>
        <div className="text-gray-600 mb-6">
          <p>Bank name:</p>
          <p>Routing number:</p>
          <p>Account number:</p>
          <p>SWIFT code:</p>
        </div>
        <div className="border-t border-gray-200 mt-6 mb-6"></div>
        <p className="text-gray-600">
          26834523-DRAFT · $48.99 due February 5, 2022
        </p>
      </div>
    </div>
  );
};

export default Invoice;
