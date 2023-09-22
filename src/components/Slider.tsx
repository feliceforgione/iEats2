"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SLIDES = [
  {
    id: 1,
    title: "Hot and fresh pizza is just a click away",
    image: "/images/slide1.jpg",
    alt: "pizza in brick oven",
    description: "",
  },
  {
    id: 2,
    title: "Buon appetito! Order our Italian delicacies for a delightful meal.",
    image: "/images/slide2.jpg",
    alt: "plate of pasta",
    description: "",
  },
  {
    id: 3,
    title: "Get a taste of Italy delivered to your doorstep!",
    image: "/images/slide3.jpg",
    alt: "delivery of food",
    description: "",
  },
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setCurrentSlide((prevSlide) => {
        return prevSlide === SLIDES.length - 1 ? 0 : prevSlide + 1;
      });
    }, 3000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <>
      <div className="flex flex-col h-[calc(100vh-6rem)] w-full lg:flex-row bg-amber-50">
        <div className="flex-1 items-center justify-center flex flex-col gap-6 p-6 ">
          <h1 className="text-4xl text-center uppercase font-bold">
            {SLIDES[currentSlide].title}
          </h1>
          <p>{SLIDES[currentSlide].description}</p>
          <button className="bg-yellow text-white px-6 py-4 rounded-xl">
            Order Now
          </button>
        </div>
        <div className="relative flex-1 ">
          <Image
            src={SLIDES[currentSlide].image}
            alt={SLIDES[currentSlide].alt}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </>
  );
}

export default Slider;
