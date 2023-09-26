import Image from "next/image";
import React from "react";

function CartPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] lg:flex-row">
      {/* Cart Items */}
      <div className="h-1/2 p-4 flex flex-col justify-center overflow-scroll lg:w-2/3 lg:h-full 2xl:w-1/2 lg:px-20 xl:px-30">
        <div className="flex items-center justify-between mb-4 ">
          <Image src="" alt="" width={100} height={100} />
          <div>
            <h1 className="font-bold text-xl uppercase">Margherita</h1>
            <span>Large</span>
          </div>
          <h2 className="font-bold">$21</h2>
          <span className="cursor-pointer">X</span>
        </div>
      </div>
      {/* Payment Section */}
      <div className="flex flex-col justify-center gap-3 h-1/2 p-4 bg-orange-100 lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-30 2xl:text-xl 2xl:gap-5">
        <div className="flex justify-between">
          <span>Subtotal (2 items)</span>
          <span>$100</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>$10</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>$5</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span>Total</span>
          <span className="font-bold">$115</span>
        </div>
        <button className="bg-red-600 text-white p-3 rounded-lg">
          CHECKOUT
        </button>
      </div>
    </div>
  );
}

export default CartPage;
