import React from "react";
import { PiMopedBold } from "react-icons/pi";

function Notification() {
  return (
    <div className="h-10 px-4 bg-gray-700   text-white flex justify-center items-center  text-sm md:text-base">
      <PiMopedBold className="text-2xl mr-3" />{" "}
      <span> Free delivery on orders over $25</span>
    </div>
  );
}

export default Notification;
