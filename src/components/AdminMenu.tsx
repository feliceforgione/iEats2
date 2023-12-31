"use client";
import { useSession } from "next-auth/react";
import { RiAddBoxFill } from "react-icons/ri";
import React from "react";
import Link from "next/link";

function AdminMenu() {
  const { data, status } = useSession();

  if (
    status === "loading" ||
    status === "unauthenticated" ||
    !data?.user.isAdmin
  )
    return " ";
  return (
    <div className="flex  items-center justify-center gap-6 text-red-800 font-bold md:justify-end">
      <Link
        href={"/addcategory"}
        className="flex justify-center items-center gap-1"
      >
        <RiAddBoxFill />
        <span>Add Category</span>
      </Link>
      <Link
        href={"/addproduct"}
        className="flex justify-center items-center gap-1"
      >
        <RiAddBoxFill />
        <span>Add Product</span>
      </Link>
    </div>
  );
}

export default AdminMenu;
