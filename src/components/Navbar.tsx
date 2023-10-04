import React from "react";
import MobileMenu from "./Menu";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";
import { MenuLink } from "@/entities/MenuLink";
import CartIcon from "./CartIcon";
import { RiPhoneFill } from "react-icons/ri";
import UserLinks from "./UserLinks";

const LINKS: MenuLink[] = [
  { id: 1, title: "Home", url: "/" },
  { id: 2, title: "Menu", url: "/menu" },
];

function Navbar() {
  const user = false; // temp
  return (
    <div className="h-12 p-4 flex justify-between items-center border-b-2 uppercase lg:px-20 xl:px-30">
      <div className="relative w-32 h-8">
        <Image src={logo} alt="logo" fill />
      </div>
      <div className="w-48 bg-yellow rounded-md flex p-1  gap-1 justify-around items-center lg:order-5">
        <RiPhoneFill className="text-xl" />
        <span className="border-l-2 border-black px-2">888-888-8888</span>
      </div>
      <div className="hidden md:flex gap-4">
        {LINKS.map((link) => (
          <Link href={link.url} key={link.id}>
            {link.title}
          </Link>
        ))}
        <UserLinks />
        <CartIcon />
      </div>
      <div className="md:hidden">
        <MobileMenu links={LINKS} user={user} />
      </div>
    </div>
  );
}

export default Navbar;
