import { ProductDetail } from "@/components/productDetail";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }
  const product: Product = await res.json();

  return(

      <ProductDetail product={product} />
      
  );
}