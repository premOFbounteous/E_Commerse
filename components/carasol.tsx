"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "./ui/card";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

interface Props {
  products: Product[];
}

export default function Carousel({ products }: Props) {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [products.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % products.length);
  };

  const currentProduct = products[current];

  return (
    <div className="relative max-w-4xl mx-auto">
      <Card className="rounded-3xl shadow-2xl overflow-hidden">
        {/* Product Image - height reduced */}
        <div className="relative w-full h-40 sm:h-56 md:h-72 lg:h-80 flex items-center justify-center bg-white">
          <Image
            src={currentProduct.image}
            alt={currentProduct.title}
            fill
            className="object-contain p-4 transition-transform duration-500 ease-in-out hover:scale-105"
            sizes="(max-width: 640px) 100vw,
                   (max-width: 1024px) 70vw,
                   50vw"
          />
        </div>


        {/* Product Info */}
        <CardContent className="p-6 flex flex-col items-center text-center">
          <CardTitle className="text-xl font-bold mb-2 line-clamp-2">
            {currentProduct.title}
          </CardTitle>
          <p className="text-indigo-600 font-bold text-2xl">
            ${currentProduct.price.toFixed(2)}
          </p>
        </CardContent>
      </Card>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
      >
        <ChevronLeftIcon className="h-6 w-6 text-gray-700" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow hover:bg-gray-100 transition"
      >
        <ChevronRightIcon className="h-6 w-6 text-gray-700" />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center mt-4 space-x-2">
        {products.map((_, idx) => (
          <span
            key={idx}
            className={`h-2 w-2 rounded-full transition-colors ${
              idx === current ? "bg-indigo-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
