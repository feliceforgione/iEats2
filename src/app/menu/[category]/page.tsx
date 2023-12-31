import DeleteButton from "@/components/DeleteButton";
import { Product } from "@/entities/ProductType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  params: { category: string };
};

const getData = async (category: string) => {
  const resp = await fetch(
    `http://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api//products?cat=${category}`,
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
  const category = params.category;
  const products: Product[] = await getData(category);
  return (
    <div className="relative mx-10 py-5 md:min-h-[calc(100vh-9rem)]">
      <div className="py-2 md:px-5">
        <DeleteButton id={category} type="categories" />
      </div>
      <div className="flex flex-wrap  ">
        {products.map((item) => (
          <Link
            href={`/product/${item.id}`}
            key={item.id}
            className="w-full h-[60vh] border-2 border-gray-200 p-4 flex flex-col justify-between group even:bg-orange-50 sm:w-1/2 lg:w-1/3"
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
    </div>
  );
}

export default CategoryPage;
