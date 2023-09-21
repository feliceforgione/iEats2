import React from "react";
import MobileMenu from "./Menu";
import Image from "next/image";
import logo from "../../public/logo.png";
import Link from "next/link";

const LINKS = [
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
      </div>
      <div className="md:hidden">
        <MobileMenu links={LINKS} user={user} />
      </div>
    </div>
  );
}

export default Navbar;
