// app/products/page.tsx

import { ProductList } from "@/components/productList";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
};

export default async function ProductsPage() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // from .env.local
  const res = await fetch(`${apiUrl}/products`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        🛍️ All Products
      </h1>
      <ProductList products={products} />
    </div>
  );
}
