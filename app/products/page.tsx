// app/products/page.tsx
import { ProductList } from "@/components/productList";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category?: string;
  image: string;
  rating?: { rate: number; count: number };
};

interface Props {
  searchParams?: { category?: string };
}

export default async function ProductsPage({ searchParams }: Props) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const category = searchParams?.category;

  let products: Product[] = [];

  if (category) {
    // Fetch products by category dynamically
    const res = await fetch(`${apiUrl}/products/category/${category}`);
    if (!res.ok) throw new Error("Failed to fetch category products");
    products = await res.json();
  } else {
    const res = await fetch(`${apiUrl}/products`);
    if (!res.ok) throw new Error("Failed to fetch products");
    products = await res.json();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
        {category ? `🛍️ ${category}` : "🛍️ All Products"}
      </h1>
      <ProductList products={products} />
    </div>
  );
}
