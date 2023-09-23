import Image from "next/image";
import React from "react";

function Offer() {
  return (
    <div className="bg-black h-screen flex flex-col md:flex-row md:justify-between md:h-[70vh] md:bg-[url('/images/yellowBG1.png')] md:bg-cover">
      <div className="flex-1 flex flex-col justify-center items-center text-center  gap-8 p-6">
        <h1 className="text-white text-5xl font-bold xl:text-6xl">
          Garlic Knots
        </h1>
        <p className="text-white xl:text-xl">
          With every order over $25 get a free order of garlic knots, each bite
          bursting with the aromatic essence of fresh garlic and buttery.
          goodness.
        </p>
        <button className="bg-red-500 text-white rounded-lg p-3">
          Order Now
        </button>
      </div>
      <div className="flex-1 w-full relative">
        <Image
          src="/images/food/garlicknots.png"
          alt="garlic knots"
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default Offer;
