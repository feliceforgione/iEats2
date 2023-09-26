"use client";
import React, { useEffect, useState } from "react";

type Props = {
  id: number;
  price: number;
  options?: {
    title: string;
    additionalPrice: number;
  }[];
};

function Price({ id, price, options }: Props) {
  const [totalPrice, setTotalPrice] = useState(price);
  const [selectedOption, setSelectedOption] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const newTotal =
      quantity *
      (options ? price + options[selectedOption].additionalPrice : price);
    setTotalPrice(newTotal);
  }, [price, options, selectedOption, quantity]);
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">${totalPrice.toFixed(2)}</h2>
      <div className="flex gap-3">
        {options?.map((option, ind) => (
          <button
            key={option.title}
            className={`ring-1 ring-yellow  p-2 rounded-lg min-w-[6rem] ${
              selectedOption === ind ? "bg-yellow" : "bg-white"
            }`}
            onClick={() => setSelectedOption(ind)}
          >
            {option.title}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-yellow">
          <span>Quantity</span>
          <div className="flex gap-3 items-center">
            <button
              onClick={() => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))}
            >
              {"<"}
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>
              {">"}
            </button>
          </div>
        </div>
        <button className="uppercase w-56 bg-yellow p-3 ring-1 ring-yellow">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Price;
