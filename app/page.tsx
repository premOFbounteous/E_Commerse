import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Carasol from "@/components/carasol";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
};

export default async function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${apiUrl}/products?limit=8`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  return (
    <div className="flex flex-col">
      {/* ✅ Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6">
          {/* Left Text */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900">
              Shop Smarter, <br /> <span className="text-indigo-600">Live Better</span>
            </h1>
            <p className="text-lg text-gray-600">
              Discover trending products at unbeatable prices. Upgrade your lifestyle today!
            </p>
            <Button size="lg" asChild className="rounded-full px-6 py-3">
              <Link href="/products">🛒 Start Shopping</Link>
            </Button>
          </div>

          {/* Right Image */}
          {products.length > 0 && (
            <div className="flex justify-center">
              <Image
                src="/heroImage.png"
                alt="hero banner"
                width={400}
                height={400}
                className="rounded-3xl shadow-xl object-contain bg-white p-6"
              />
            </div>
          )}
        </div>
      </section>

      {/* ✅ Featured Products Carousel */}
      <section className="py-14 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          🌟 Featured Products
        </h2>
        <Carasol products={products} />
      </section>



      {/* ✅ Call to Action Banner */}
      <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto text-center space-y-6 px-6">
          <h2 className="text-4xl font-bold">🔥 Don’t Miss Out!</h2>
          <p className="text-lg">
            Limited-time offers on best-selling products. Grab your deal now!
          </p>
          <Button
            size="lg"
            asChild
            className="bg-white text-indigo-700 font-bold rounded-full px-8 py-3 hover:bg-gray-200"
          >
            <Link href="/products">Shop Deals</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
