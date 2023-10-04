"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { RiFileUploadLine } from "react-icons/ri";
import { MenuType } from "@/entities/MenuType";
import { toast } from "react-toastify";

type Option = {
  title: string;
  additionalPrice: number;
};

type Inputs = {
  title: string;
  description: string;
  price: number;
  catSlug: string;
  isFeatured: boolean;
};

function AddProduct() {
  const { data: session, status } = useSession();
  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    description: "",
    price: 0,
    catSlug: "",
    isFeatured: false,
  });
  const [option, setOption] = useState<Option>({
    title: "",
    additionalPrice: 0,
  });
  const [options, setOptions] = useState<Option[]>([]);
  const [file, setFile] = useState<File>();
  const router = useRouter();

  const { isLoading, data: categories } = useQuery<MenuType>({
    queryKey: ["catgories"],
    queryFn: () =>
      fetch(
        `http://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/categories`
      ).then((res) => res.json()),
  });

  if (status === "loading" || isLoading) {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated" || !session?.user.isAdmin) {
    router.push("/login");
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  };

  const changeOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const upload = async () => {
    const data = new FormData();
    data.append("file", file!);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    );

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const resData = await res.json();
    return resData.url;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const url = await upload();
      const resp = await fetch(
        `http://${process.env.NEXT_PUBLIC_SERVER_DOMAIN}:${process.env.NEXT_PUBLIC_SERVER_PORT}/api/products`,
        {
          method: "POST",
          body: JSON.stringify({
            img: url,
            ...inputs,
            options,
          }),
        }
      );

      const data = await resp.json();
      toast.success("Product added");
      router.push(`/product/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] md:h-min flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-wrap gap-6">
        <h1 className="text-3xl mb-2 text-gray-500 font-bold">
          Add New Product
        </h1>
        <div className="w-full flex gap-2 ">
          <label
            className="cursor-pointer flex gap-4 items-center"
            htmlFor="file"
          >
            <RiFileUploadLine className="text-2xl" />
            <span>Upload Image</span>
            {file && (
              <span className="text-red-500 font-light">{file.name}</span>
            )}
          </label>
          <input
            type="file"
            onChange={handleChangeImg}
            id="file"
            className="opacity-0"
            accept="image/png, image/jpeg"
            required
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Title</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm placeholder:text-red-200 outline-none"
            type="text"
            placeholder=""
            name="title"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Description</label>
          <textarea
            rows={3}
            className="ring-1 ring-red-200 p-4 rounded-sm  outline-none"
            placeholder=""
            name="description"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Price</label>
          <input
            className="ring-1 ring-red-200 p-4 rounded-sm outline-none"
            type="number"
            placeholder=""
            name="price"
            onChange={handleChange}
          />
        </div>
        <div className="w-full flex flex-col gap-2 ">
          <label className="text-sm">Category</label>
          <select
            name="catSlug"
            onChange={handleChange}
            className="ring-1 ring-red-200 p-4 rounded-sm  outline-none"
            required
            value={inputs.catSlug}
          >
            <option value="" disabled>
              Select a Category
            </option>
            {categories?.map((category, ind) => (
              <option value={category.slug} key={category.id} className="py-5">
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className=" flex gap-2 items-center">
          <label htmlFor="isFeatured" className="">
            Homepage Featured Product:
          </label>
          <input
            type="checkbox"
            className="w-6 h-6"
            name="isFeatured"
            onChange={(e) =>
              setInputs((prev) => {
                return { ...prev, isFeatured: e.target.checked };
              })
            }
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <label className="text-sm">Options</label>
          <div className="flex">
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm  outline-none"
              type="text"
              placeholder="Title"
              name="title"
              value={option.title}
              onChange={changeOption}
            />
            <input
              className="ring-1 ring-red-200 p-4 rounded-sm outline-none"
              type="number"
              placeholder="Additional Price"
              name="additionalPrice"
              value={option.additionalPrice}
              onChange={changeOption}
            />
            <button
              type="button"
              className="bg-gray-500 p-2 text-white"
              onClick={() => {
                setOptions((prev) => [...prev, option]);
                setOption({
                  title: "",
                  additionalPrice: 0,
                });
              }}
            >
              Add Option
            </button>
          </div>
          <div className="flex flex-wrap gap-4 mt-2">
            {options.map((option) => (
              <div
                key={option.title}
                className="p-2  rounded-md cursor-pointer bg-gray-200 text-gray-600"
                onClick={() =>
                  setOptions((prev) =>
                    prev.filter((item) => item.title !== option.title)
                  )
                }
              >
                <span>{option.title}</span>
                <span className="text-xs"> (+ ${option.additionalPrice})</span>
              </div>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-yellow p-4 text-white w-48 rounded-md relative h-14 flex items-center justify-center"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddProduct;
