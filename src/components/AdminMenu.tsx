"use client";
import { useSession } from "next-auth/react";
import { RiAddBoxFill } from "react-icons/ri";
import React from "react";
import Link from "next/link";

function AdminMenu() {
  const { data, status } = useSession();

  if (status === "loading") return;
  if (status === "unauthenticated" || !data?.user.isAdmin) return;
  return (
    <div className="flex absolute top-4 right-4 items-center justify-center gap-6 text-red-800 font-bold ">
      <Link
        href={"/addategory"}
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
