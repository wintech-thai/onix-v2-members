"use client";

import { ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  points: number;
  imageUrl?: string;
  category: string;
  stock: number;
}

interface ProductCardProps {
  product: Product;
  onPurchase?: (productId: string) => void;
}

export const ProductCard = ({ product, onPurchase }: ProductCardProps) => {
  const isOutOfStock = product.stock === 0;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Image placeholder */}
      <div className="relative h-32 bg-muted">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingCart className="h-12 w-12 text-muted-foreground" />
          </div>
        )}
        <Badge className="absolute right-1.5 top-1.5 text-xs">
          {product.category}
        </Badge>
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <Badge variant="destructive" className="text-xs">
              Out of Stock
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="space-y-1.5 p-3 pb-2">
        <h3 className="line-clamp-2 text-sm font-semibold leading-tight">
          {product.name}
        </h3>
      </CardHeader>

      <CardContent className="space-y-2 p-3 pt-0">
        <div className="flex flex-col gap-0.5">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-bold">
              ฿{product.price?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-baseline gap-1 text-xs text-muted-foreground">
            <span className="font-semibold text-primary">
              {product.points?.toLocaleString()}
            </span>
            <span>pts</span>
          </div>
          {!isOutOfStock && (
            <div className="text-xs text-muted-foreground">
              {product.stock} left
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-3 pt-0">
        <Button
          onClick={() => onPurchase?.(product.id)}
          className="w-full"
          size="sm"
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Sold Out" : "Buy"}
        </Button>
      </CardFooter>
    </Card>
  );
};
