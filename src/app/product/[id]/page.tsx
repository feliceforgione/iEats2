import { singleProduct } from "@/data";
import Image from "next/image";
import React from "react";

function ProductPage() {
  return (
    <div className="p-4 lg:px-20 h-screen flex flex-col justify-around md:flex-row">
      <div className="relative">
        {singleProduct.img && (
          <Image
            src={singleProduct.img}
            alt=""
            className="object-contain"
            fill
          />
        )}
      </div>
      <div>
        <h1>{singleProduct.title}</h1>
        <p>{singleProduct.description}</p>
      </div>
    </div>
  );
}

export default ProductPage;
