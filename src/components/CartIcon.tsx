"use client";
import { useCartStore } from "@/utils/store";
import Link from "next/link";
import React from "react";
import { RiShoppingBagFill } from "react-icons/ri";

function CartIcon() {
  const { totalItems } = useCartStore();
  return (
    <Link href="/cart" className="flex items-center gap-1">
      <RiShoppingBagFill />
      <span>Cart ({totalItems}) </span>
    </Link>
  );
}

export default CartIcon;
