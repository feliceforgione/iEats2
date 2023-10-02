import React from "react";
import Image from "next/image";
import { Product } from "@/entities/ProductType";

const getData = async () => {
  const resp = await fetch(
    `http://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api//products`,
    {
      cache: "no-store",
    }
  );

  if (!resp.ok) {
    throw new Error("Category fetch failed");
  }

  return resp.json();
};

async function Featured() {
  const featuredProducts: Product[] = await getData();
  return (
    <div className="w-screen overflow-x-scroll ">
      <div className="flex  w-max">
        {featuredProducts.map((product) => (
          <div
            className="w-screen h-[65vh] flex flex-col items-center justify-around p-4 hover:bg-orange-50 transition-all duration-300 md:w-[50vw] xl:w-[33vw] xl:h-[90vh]"
            key={product.id}
          >
            <div className="relative flex-1 w-full  hover:rotate-[30deg] transition-all duration-200">
              <Image
                src={product.img}
                alt=""
                fill
                className="object-contain "
              />
            </div>
            <div className="flex-1 flex flex-col gap-4 items-center justify-center text-center">
              <h1 className="font-bold uppercase text-xl xl:text-2xl">
                {product.title}
              </h1>
              <p className="lg:p-4">{product.description}</p>
              <span className="font-bold text-lg">${product.price}</span>
              <button className="bg-yellow p-2 rounded-lg text-white">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Featured;
