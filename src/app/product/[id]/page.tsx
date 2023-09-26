import Price from "@/components/Price";
import { singleProduct } from "@/data";
import Image from "next/image";
import React from "react";

function ProductPage() {
  return (
    <div className="p-4 lg:px-20 h-screen flex flex-col justify-around md:flex-row">
      <div className="relative w-full h-1/2">
        {singleProduct.img && (
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        )}
      </div>
      <div className="h-1/2 flex flex-col gap-3">
        <h1 className="text-3xl font-bold uppercase">{singleProduct.title}</h1>
        <p>{singleProduct.description}</p>
        <Price
          id={singleProduct.id}
          price={singleProduct.price}
          options={singleProduct.options}
        />
      </div>
    </div>
  );
}

export default ProductPage;
