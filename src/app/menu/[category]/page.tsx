import { Product } from "@/entities/ProductType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
  const resp = await fetch(
    `http://${process.env.SERVER_DOMAIN}:${process.env.SERVER_PORT}/api/products?cat=${category}`,
    {
      cache: "no-store",
    }
  );

  if (!resp.ok) {
    throw new Error("Category fetch failed");
  }

  return resp.json();
};

async function CategoryPage({ params }: Props) {
  const products: Product[] = await getData(params.category);
  return (
    <div className="flex flex-wrap">
      {products.map((item) => (
        <Link
          href={`/product/${item.id}`}
          key={item.id}
          className="w-full h-[60vh] border-r-2 border-b-2 border-red-400 p-4 flex flex-col justify-between group even:bg-orange-50 sm:w-1/2 lg:w-1/3"
        >
          {item.img && (
            <div className="relative h-[80%]">
              <Image
                src={item.img}
                alt=""
                fill
                className="object-contain"
              ></Image>
            </div>
          )}
          <div className="flex items-center justify-between font-bold">
            <h1>{item.title}</h1>
            <h2 className="group-hover:hidden">${item.price}</h2>
            <button className="hidden uppercase bg-yellow p-2 rounded-lg group-hover:block">
              Add to Cart
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CategoryPage;
