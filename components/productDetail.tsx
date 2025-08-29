"use client"
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
      category: "", // optional
      quantity: 1,
    });
  };

  const handleRemove = () => {
    if (quantity > 0) {
      removeItem(product.id);
    }
  };

  return (
    <div>
      {product.image && (
        <div style={{ position: "relative", height: "240px", width: "100%" }}>
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      <div>
        <h1>{product.title}</h1>
        {product.description && <p>{product.description}</p>}
        <p>${product.price.toFixed(2)}</p>

        <div>
          <Button onClick={handleRemove}>-</Button>
          <span>{quantity}</span> {/* ✅ dynamic quantity */}
          <Button onClick={handleAdd}>+</Button>
        </div>
      </div>
    </div>
  );
};
