"use client";

import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/storage";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
};

interface ProductCardProps {
  product: Product;
}

export const ProductDetail = ({ product }: ProductCardProps) => {
  const { items, addItem, removeItem } = useCartStore();

  // Check if product already in cart
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAdd = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      description: product.description || "",
      category: "",
      quantity: 1,
    });
  };

  const handleRemove = () => {
    if (quantity > 0) {
      removeItem(product.id);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col md:flex-row">
      {/* Image Section */}
      {product.image && (
        <div className="relative w-full md:w-1/2 h-64 md:h-auto">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
            priority
          />
        </div>
      )}

      {/* Details Section */}
      <div className="p-6 flex flex-col justify-between md:w-1/2">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {product.title}
          </h1>
          {product.description && (
            <p className="text-gray-600 mb-4">{product.description}</p>
          )}
          <p className="text-xl font-semibold text-blue-600 mb-6">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Cart Controls */}
        <div className="flex items-center gap-4">
          <Button
            onClick={handleRemove}
            disabled={quantity === 0}
            className="px-4 py-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:opacity-50"
          >
            -
          </Button>
          <span className="text-lg font-medium">{quantity}</span>
          <Button
            onClick={handleAdd}
            className="px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};
