"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BottomNavigation } from "@/modules/root/components/BottomNavigation";
import { PurchaseHistoryCard } from "../components/PurchaseHistoryCard";
import { RouteConfig } from "@/config/route.config";

// Mock data - replace with real data from API
const mockPurchaseHistory = [
  {
    id: "p1",
    productName: "Premium Headphones",
    price: 3990,
    paymentMethod: "cash" as const,
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: "completed" as const,
    quantity: 1,
  },
  {
    id: "p2",
    productName: "Fitness Tracker Watch",
    price: 5000,
    paymentMethod: "points" as const,
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    status: "completed" as const,
    quantity: 1,
  },
  {
    id: "p3",
    productName: "Yoga Mat Premium",
    price: 1800,
    paymentMethod: "points" as const,
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7), // 7 days ago
    status: "processing" as const,
    quantity: 2,
  },
  {
    id: "p4",
    productName: "Bluetooth Speaker",
    price: 1990,
    paymentMethod: "cash" as const,
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    status: "completed" as const,
    quantity: 1,
  },
  {
    id: "p5",
    productName: "Travel Backpack",
    price: 1490,
    paymentMethod: "cash" as const,
    purchasedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    status: "cancelled" as const,
    quantity: 1,
  },
];

const ProductHistoryViewPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push(RouteConfig.PRODUCT.LIST);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main content with bottom padding for navigation */}
      <main className="mx-auto max-w-md p-4 pb-24">
        {/* Header with back button */}
        <div className="flex items-center gap-3 pb-4 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Purchase History</h1>
            <p className="text-sm text-muted-foreground">
              View your past orders
            </p>
          </div>
        </div>

        {/* Purchase History List */}
        <ScrollArea className="h-[calc(100vh-200px)]">
          {mockPurchaseHistory.length > 0 ? (
            <div className="space-y-3 pb-4">
              {mockPurchaseHistory.map((history) => (
                <PurchaseHistoryCard key={history.id} history={history} />
              ))}
            </div>
          ) : (
            <div className="flex h-60 flex-col items-center justify-center text-center">
              <p className="text-muted-foreground">No purchase history yet</p>
              <Button variant="link" onClick={handleBack} className="mt-2">
                Browse Products
              </Button>
            </div>
          )}
        </ScrollArea>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ProductHistoryViewPage;
