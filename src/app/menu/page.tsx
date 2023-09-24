import { menu } from "@/data";
import Link from "next/link";
import React from "react";

function MenuPage() {
  return (
    <div className="flex flex-col p-4 items-center h-[calc(100vh-5rem)] md:flex-row lg:px-20 xl:px-30">
      {menu.map((category) => (
        <Link
          href={`/menu/${category.slug}`}
          key={category.id}
          className="w-full h-1/3 bg-cover p-8 md:h-1/2 border-2"
          style={{ backgroundImage: `url(${category.img})` }}
        >
          <div className={`w-1/2 text-${category.color}`}>
            <h1 className="font-bold text-3xl uppercase">{category.title}</h1>
            <p className="text-sm my-6">{category.description}</p>
            <button
              className={`hidden xl:block bg-${category.color} py-4 rounded-md`}
            >
              Explore
            </button>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default MenuPage;
