"use client";

import { useRouter } from "next/navigation";
import { History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BottomNavigation } from "@/modules/root/components/BottomNavigation";
import { ProductCard } from "../components/ProductCard";
import { RouteConfig } from "@/config/route.config";

// Mock data - replace with real data from API
const mockProducts = [
  {
    id: "1",
    name: "Premium Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 3990,
    points: 8000,
    category: "Electronics",
    stock: 15,
  },
  {
    id: "2",
    name: "Fitness Tracker Watch",
    description: "Smart fitness tracker with heart rate monitor and GPS",
    price: 2490,
    points: 5000,
    category: "Electronics",
    stock: 8,
  },
  {
    id: "3",
    name: "Yoga Mat Premium",
    description: "Eco-friendly yoga mat with carrying strap",
    price: 890,
    points: 1800,
    category: "Sports",
    stock: 25,
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    description: "Insulated water bottle keeps drinks cold for 24 hours",
    price: 590,
    points: 1200,
    category: "Lifestyle",
    stock: 0,
  },
  {
    id: "5",
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with 12-hour battery life",
    price: 1990,
    points: 4000,
    category: "Electronics",
    stock: 12,
  },
  {
    id: "6",
    name: "Travel Backpack",
    description: "Durable backpack with laptop compartment and USB port",
    price: 1490,
    points: 3000,
    category: "Lifestyle",
    stock: 20,
  },
];

const ProductViewPage = () => {
  const router = useRouter();

  const handlePurchase = (productId: string) => {
    console.log("Purchase product:", productId);
    // TODO: Implement purchase logic
  };

  const handleViewHistory = () => {
    router.push(RouteConfig.PRODUCT.HISTORY);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main content with bottom padding for navigation */}
      <main className="mx-auto max-w-md p-4 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 pt-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Products</h1>
            <p className="text-sm text-muted-foreground">
              Shop with cash or points
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewHistory}
            className="gap-2"
          >
            <History className="h-4 w-4" />
            History
          </Button>
        </div>

        {/* Product List */}
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-2 gap-3 pb-4">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        </ScrollArea>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ProductViewPage;
