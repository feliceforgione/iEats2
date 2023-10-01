"use client";
import { Product } from "@/entities/ProductType";
import { useCartStore } from "@/utils/store";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Price({ product }: { product: Product }) {
  const [totalPrice, setTotalPrice] = useState(product.price);
  const [selectedOption, setSelectedOption] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCartStore();

  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    if (product.options?.length) {
      setTotalPrice(
        (product.options[selectedOption].additionalPrice +
          Number(product.price)) *
          quantity
      );
    }
  }, [product, selectedOption, quantity]);

  function handleAddCart() {
    addToCart({
      id: product.id,
      title: product.title,
      img: product.img,
      price: totalPrice,
      ...(product.options?.length && {
        optionTitle: product.options[selectedOption].title,
      }),
      quantity: quantity,
    });
    toast.success("Product has been added to cart");
  }

  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-2xl font-bold">${totalPrice}</h2>
      <div className="flex gap-3">
        {product.options?.length &&
          product.options?.map((option, ind) => (
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
        <button
          className="uppercase w-56 bg-yellow p-3 ring-1 ring-yellow"
          onClick={handleAddCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Price;
