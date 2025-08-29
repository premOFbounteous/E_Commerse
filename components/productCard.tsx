import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
  category?: string;
  rating?: {
    rate: number;
    count: number;
  };
};

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const renderStars = (rate: number) => {
    const fullStars = Math.floor(rate);
    const halfStar = rate - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <Link href={`/products/${product.id}`}>
      <Card className="hover:shadow-xl transition rounded-xl overflow-hidden">
        <div className="relative h-56 w-full">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover"
          />
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-1 text-lg font-semibold">
            {product.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {product.category && (
            <span className="text-xs text-gray-500 uppercase mb-1 inline-block">
              {product.category}
            </span>
          )}

          {product.description && (
            <p className="text-sm text-gray-600 line-clamp-2 mb-2">
              {product.description}
            </p>
          )}

          <div className="flex items-center justify-between mb-2">
            <p className="text-lg font-bold text-blue-600">
              ${product.price.toFixed(2)}
            </p>
            {product.rating && (
              <div className="flex items-center gap-1 text-yellow-500 text-sm font-semibold">
                <span>{renderStars(product.rating.rate)}</span>
                <span className="text-gray-500">({product.rating.count})</span>
              </div>
            )}
          </div>

          <Button className="w-full">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
};
