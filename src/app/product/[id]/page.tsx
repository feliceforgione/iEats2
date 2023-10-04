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
    <div className="flex flex-col mx-10 py-5 md:min-h-[calc(100vh-9rem)] ">
      <DeleteButton id={product.id} type="products" />
      <div className="flex flex-col justify-around items-center gap-6  md:flex-row h-5/6 w-full">
        <div className="relative w-96 h-96 mb-6 md:h-[36rem] md:w-[36rem]">
          {product?.img && (
            <Image src={product.img} alt="" className="object-contain" fill />
          )}
        </div>
        <div className="flex flex-col gap-3 w-full mb-8  md:mb-2 md:w-[30rem]  md:justify-center md:gap-6 lg:gap-8 ">
          <h1 className="text-3xl font-bold uppercase xl:text-4xl">
            {product.title}
          </h1>
          <p>{product.description}</p>
          <Price product={product} />
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
