import DeleteButton from "@/components/DeleteButton";
import Price from "@/components/Price";
import { Product } from "@/entities/ProductType";
import Image from "next/image";
import React from "react";

const getData = async (id: string) => {
  const resp = await fetch(
    `http://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!resp.ok) {
    throw new Error("Product fetch failed");
  }

  return resp.json();
};

async function ProductPage({ params }: { params: { id: string } }) {
  const product: Product = await getData(params.id);

  return (
    <div className="p-4 lg:px-20 h-screen flex flex-col justify-around relative md:flex-row md:gap-8 md:items-center">
      <div className="relative w-full h-1/2 md:h-[70%]">
        {product?.img && (
          <Image src={product.img} alt="" className="object-contain" fill />
        )}
      </div>
      <div className="h-1/2 flex flex-col gap-3 md:h-[70%] md:justify-center md:gap-6 lg:gap-8 ">
        <h1 className="text-3xl font-bold uppercase xl:text-4xl">
          {product.title}
        </h1>
        <p>{product.description}</p>
        <Price product={product} />
      </div>
      <DeleteButton id={product.id} type="products" />
    </div>
  );
}

export default ProductPage;
