import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="h-12 p-4 lg-p-20 flex items-center justify-between">
      <Link href="/" className="font-bold">
        iEats
      </Link>
      <p>ALL RIGHTS RESERVED</p>
    </div>
  );
}

export default Footer;
