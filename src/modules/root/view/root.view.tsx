"use client";

import { BottomNavigation } from "../components/BottomNavigation";
import { PointCard } from "../components/PointCard";
import { PointTransactionList } from "../components/PointTransactionList";

// Mock data - replace with real data from API
const mockTransactions = [
  {
    id: "1",
    type: "earned" as const,
    amount: 500,
    description: "Welcome bonus",
    date: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
  },
  {
    id: "2",
    type: "spent" as const,
    amount: 200,
    description: "Redeemed coffee voucher",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
  },
  {
    id: "3",
    type: "earned" as const,
    amount: 1000,
    description: "Purchase reward",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
  },
  {
    id: "4",
    type: "earned" as const,
    amount: 250,
    description: "Referral bonus",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  },
  {
    id: "5",
    type: "spent" as const,
    amount: 800,
    description: "Premium product purchase",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
  },
  {
    id: "6",
    type: "earned" as const,
    amount: 150,
    description: "Daily check-in",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
  },
];

const RootViewPage = () => {
  const handleBuyPoints = () => {
    console.log("Buy points clicked");
    // TODO: Navigate to buy points page
  };

  const handleViewAllTransactions = () => {
    console.log("View all transactions clicked");
    // TODO: Navigate to transaction history page
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main content with bottom padding for navigation */}
      <main className="mx-auto max-w-md space-y-6 p-4 pb-24">
        {/* Header */}
        <div className="space-y-2 pt-4">
          <h1 className="text-2xl font-bold">Welcome Back!</h1>
          <p className="text-sm text-muted-foreground">
            Manage your points and rewards
          </p>
        </div>

        {/* Point Card */}
        <PointCard points={2850} onBuyPoints={handleBuyPoints} />

        {/* Transaction List */}
        <PointTransactionList transactions={mockTransactions} />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default RootViewPage;
