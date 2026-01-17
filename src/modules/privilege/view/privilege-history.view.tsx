"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BottomNavigation } from "@/modules/root/components/BottomNavigation";
import { PrivilegeHistoryCard } from "../components/PrivilegeHistoryCard";
import { RouteConfig } from "@/config/route.config";

// Mock data - replace with real data from API
const mockVouchers = [
  {
    id: "h1",
    title: "Free Coffee at Starbucks",
    points: 500,
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
    status: "unused" as const,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28), // 28 days
    voucherCode: "STAR-2024-ABC123",
  },
  {
    id: "h2",
    title: "20% Off at Central Department Store",
    points: 1000,
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10), // 10 days ago
    status: "unused" as const,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5), // 5 days
    voucherCode: "CENTRAL-2024-DEF456",
  },
  {
    id: "h3",
    title: "Restaurant Voucher - 500 THB",
    points: 1500,
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1), // 1 day ago
    status: "unused" as const,
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 43), // 43 days
    voucherCode: "REST-2024-JKL012",
  },
  {
    id: "h4",
    title: "Movie Ticket - Major Cineplex",
    points: 800,
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
    status: "used" as const,
    voucherCode: "MAJOR-2024-XYZ789",
  },
  {
    id: "h5",
    title: "Free Coffee at Starbucks",
    points: 500,
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15), // 15 days ago
    status: "used" as const,
    voucherCode: "STAR-2024-GHI789",
  },
  {
    id: "h6",
    title: "Spa Treatment Voucher",
    points: 2000,
    redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20), // 20 days ago
    status: "used" as const,
    voucherCode: "SPA-2024-MNO345",
  },
];

const PrivilegeHistoryViewPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("available");

  const availableVouchers = mockVouchers.filter((v) => v.status === "unused");
  const usedVouchers = mockVouchers.filter((v) => v.status === "used");

  const handleBack = () => {
    router.push(RouteConfig.PRIVILEGE.LIST);
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
            <h1 className="text-2xl font-bold">My Vouchers</h1>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="available">Available</TabsTrigger>
            <TabsTrigger value="used">Used</TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="mt-4">
            <ScrollArea className="h-[calc(100vh-240px)]">
              {availableVouchers.length > 0 ? (
                <div className="space-y-2 pb-4">
                  {availableVouchers.map((voucher) => (
                    <PrivilegeHistoryCard key={voucher.id} history={voucher} />
                  ))}
                </div>
              ) : (
                <div className="flex h-60 flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground">
                    No available vouchers yet
                  </p>
                  <Button variant="link" onClick={handleBack} className="mt-2">
                    Browse Privileges
                  </Button>
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="used" className="mt-4">
            <ScrollArea className="h-[calc(100vh-240px)]">
              {usedVouchers.length > 0 ? (
                <div className="space-y-2 pb-4">
                  {usedVouchers.map((voucher) => (
                    <PrivilegeHistoryCard key={voucher.id} history={voucher} />
                  ))}
                </div>
              ) : (
                <div className="flex h-60 flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground">
                    ยังไม่มีประวัติการใช้งาน
                  </p>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default PrivilegeHistoryViewPage;
