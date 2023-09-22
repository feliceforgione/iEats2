import Link from "next/link";
import React from "react";
import { RiShoppingBagFill } from "react-icons/ri";

function CartIcon() {
  return (
    <Link href="/cart" className="flex items-center gap-1">
      <RiShoppingBagFill />
      <span>Cart (1) </span>
    </Link>
  );
}

export default CartIcon;
