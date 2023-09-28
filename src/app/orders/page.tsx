import React from "react";

function OrdersPage() {
  return (
    <div className="p-4 lg:px-20 xl:px-30">
      <table className="w-full">
        <thead>
          <tr className="text-left">
            <th className="hidden md:block">Order ID</th>
            <th>Date</th>
            <th>Price</th>
            <th className="hidden md:block">Products</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="text-sm md:text-base odd:bg-gray-100">
            <td className="hidden md:block py-6 px-1">123456</td>
            <td className="py-6 px-1">01/12/2023</td>
            <td className="py-6 px-1">50.00</td>
            <td className="hidden py-6 px-1 md:block">
              Margarita Pizza Large (3)
            </td>
            <td className="py-6 px-1">On the way</td>
          </tr>

          <tr className="text-sm md:text-base odd:bg-gray-100">
            <td className="hidden md:block py-6 px-1">123455</td>
            <td className="py-6 px-1">01/11/2023</td>
            <td className="py-6 px-1">30.00</td>
            <td className="hidden py-6 px-1 md:block">
              Margarita Pizza Large (2)
            </td>
            <td className="py-6 px-1">Delivered</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrdersPage;
