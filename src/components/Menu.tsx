"use client";

import Link from "next/link";
import React, { useState } from "react";
import { RiMenu4Fill, RiCloseFill } from "react-icons/ri";
import { MenuLink } from "@/entities/MenuLink";

interface Props {
  links: MenuLink[];
  user: boolean;
}

function MobileMenu({ links, user }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {open ? (
        <RiCloseFill
          className="text-red-500 text-4xl"
          onClick={() => setOpen(false)}
        />
      ) : (
        <RiMenu4Fill
          className="text-red-500 text-4xl"
          onClick={() => setOpen(true)}
        />
      )}

      {open && (
        <div className="bg-yellow text-white absolute w-full h-[calc(100vh-5.5rem)] top-[5.5rem] left-0 flex justify-center items-center flex-col z-10 gap-6 text-3xl">
          {links.map((link) => (
            <Link key={link.id} href={link.url} onClick={() => setOpen(false)}>
              {link.title}
            </Link>
          ))}
          {user ? (
            <Link href="/orders" onClick={() => setOpen(false)}>
              Orders
            </Link>
          ) : (
            <Link href="/login" onClick={() => setOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

export default MobileMenu;
