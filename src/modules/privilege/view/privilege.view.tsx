"use client";

import { useParams, useRouter } from "next/navigation";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OrgHeader } from "@/components/org-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BottomNavigation } from "@/modules/point/components/BottomNavigation";
import { PrivilegeCard } from "../components/PrivilegeCard";
import { RouteConfig } from "@/config/route.config";

// Mock data - replace with real data from API
const mockPrivileges = [
  {
    id: "1",
    title: "Free Coffee at Starbucks",
    description:
      "Enjoy a complimentary coffee of your choice at any Starbucks location",
    points: 500,
    category: "Food & Beverage",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
  },
  {
    id: "2",
    title: "20% Off at Central Department Store",
    description: "Get 20% discount on all items at Central Department Store",
    points: 1000,
    category: "Shopping",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 15), // 15 days
  },
  {
    id: "3",
    title: "Movie Ticket - Major Cineplex",
    description:
      "Complimentary movie ticket for any showtime at Major Cineplex",
    points: 800,
    category: "Entertainment",
  },
  {
    id: "4",
    title: "Spa Treatment Voucher",
    description: "60-minute relaxing spa treatment at selected locations",
    points: 2000,
    category: "Wellness",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60), // 60 days
  },
  {
    id: "5",
    title: "Restaurant Voucher - 500 THB",
    description: "500 THB dining voucher at participating restaurants",
    points: 1500,
    category: "Food & Beverage",
    expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 45), // 45 days
  },
  {
    id: "6",
    title: "Fitness Class Pass",
    description: "5 complimentary fitness classes at selected gyms",
    points: 1200,
    category: "Wellness",
  },
];

const PrivilegeViewPage = () => {
  const router = useRouter();
  const params = useParams<{ orgId: string }>();

  const handleRedeem = (privilegeId: string) => {
    console.log("Redeem privilege:", privilegeId);
    // TODO: Implement redeem logic
    // After successful redeem, could navigate to my vouchers
    // router.push(RouteConfig.PRIVILEGE.HISTORY);
  };

  const handleViewMyVouchers = () => {
    router.push(RouteConfig.PRIVILEGE.HISTORY(params.orgId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Organization Header */}
      <OrgHeader />

      {/* Main content with bottom padding for navigation */}
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 sm:p-6 md:p-8 pb-24">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 pt-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Privileges</h1>
            <p className="text-sm text-muted-foreground">
              Redeem exclusive rewards with your points
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewMyVouchers}
            className="gap-2"
          >
            <Ticket className="h-4 w-4" />
            My Vouchers
          </Button>
        </div>

        {/* Privilege List */}
        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="grid grid-cols-2 gap-3 pb-4">
            {mockPrivileges.map((privilege) => (
              <PrivilegeCard
                key={privilege.id}
                privilege={privilege}
                onRedeem={handleRedeem}
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

export default PrivilegeViewPage;
