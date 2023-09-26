import React from "react";

type Props = {
  id: number;
  price: number;
  options?: {
    title: string;
    additionalPrice: number;
  }[];
};

function Price({ id, price, options }: Props) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">${price.toFixed(2)}</h2>
      <div className="flex gap-3">
        {options?.map((option) => (
          <button
            key={option.title}
            className="ring-1 ring-yellow  p-2 rounded-lg"
          >
            {option.title}
          </button>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-between w-full p-3 ring-1 ring-yellow">
          <span>Quantity</span>
          <div className="flex gap-3 items-center">
            <button>{"<"}</button>
            <span>1</span>
            <button>{">"}</button>
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
