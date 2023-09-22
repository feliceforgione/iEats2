import React from "react";
import MobileMenu from "./Menu";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { MenuLink } from "@/entities/MenuLink";
import CartIcon from "./CartIcon";
import { RiPhoneFill } from "react-icons/ri";

const LINKS: MenuLink[] = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
];

function Navbar() {
  const user = false; // temp
  return (
    <div className="h-12 p-4 flex justify-between items-center border-b-2">
      <div className="relative w-32 h-8">
        <Image src={logo} alt="logo" fill />
      </div>
      <div className="w-36 bg-yellow rounded-xl flex p-1 gap-1 justify-center items-center ">
        <RiPhoneFill /> <span>888-8888</span>
      </div>
      <div className="hidden md:flex gap-4">
        {LINKS.map((link) => (
          <Link href={link.url} key={link.id}>
            {link.title}
          </Link>
        ))}
        {user ? (
          <Link href="/orders">Orders</Link>
        ) : (
          <Link href="/login">Login</Link>
        )}
        <CartIcon />
      </div>
      <div className="md:hidden">
        <MobileMenu links={LINKS} user={user} />
      </div>
    </div>
  );
}

export default Navbar;
