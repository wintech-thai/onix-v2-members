"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Coins } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BottomNavigation } from "@/modules/root/components/BottomNavigation";
import { RouteConfig } from "@/config/route.config";

interface Transaction {
  id: string;
  title: string;
  description: string;
  points: number;
  type: "earned" | "spent";
  date: Date;
  category?: string;
}

// Mock data - replace with real data from API
const mockTransactions: Transaction[] = [
  {
    id: "t1",
    title: "Daily Check-in",
    description: "Check-in Reward",
    points: 6,
    type: "earned",
    date: new Date("2026-01-06T23:54:00"),
    category: "Check-in",
  },
  {
    id: "t2",
    title: "Daily Check-in",
    description: "Check-in Reward",
    points: 1,
    type: "earned",
    date: new Date("2026-01-03T23:06:00"),
    category: "Check-in",
  },
  {
    id: "t3",
    title: "Daily Check-in",
    description: "Check-in Reward",
    points: 1,
    type: "earned",
    date: new Date("2026-01-02T17:58:00"),
    category: "Check-in",
  },
  {
    id: "t4",
    title: "Daily Check-in",
    description: "Check-in Reward",
    points: 1,
    type: "earned",
    date: new Date("2026-01-01T17:38:00"),
    category: "Check-in",
  },
  {
    id: "t5",
    title: "Daily Check-in",
    description: "Check-in Reward",
    points: 1,
    type: "earned",
    date: new Date("2025-12-31T21:15:00"),
    category: "Check-in",
  },
  {
    id: "t6",
    title: "Daily Check-in",
    description: "Check-in Reward",
    points: 1,
    type: "earned",
    date: new Date("2025-12-30T18:34:00"),
    category: "Check-in",
  },
];

const PointTransactionHistoryViewPage = () => {
  const router = useRouter();
  const totalPoints = 111;

  const handleBack = () => {
    router.push(RouteConfig.ROOT);
  };

  const handleTransactionClick = (transactionId: string) => {
    console.log("View transaction:", transactionId);
    // TODO: Navigate to transaction detail if needed
  };

  // Group transactions by month/year
  const groupedTransactions = mockTransactions.reduce((groups, transaction) => {
    const monthYear = transaction.date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    groups[monthYear].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main content with bottom padding for navigation */}
      <main className="mx-auto max-w-md p-4 pb-24">
        {/* Header with back button */}
        <div className="flex items-center gap-3 pb-6 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Point Transaction History</h1>
          </div>
        </div>

        {/* Current Balance */}
        <Card className="mb-6 bg-muted">
          <CardContent className="flex items-center justify-between p-4 h-5">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Current Balance
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">{totalPoints}</span>
            </div>
          </CardContent>
        </Card>

        {/* Transaction List */}
        <ScrollArea className="h-[calc(100vh-280px)]">
          <div className="space-y-6 pb-4">
            {Object.entries(groupedTransactions).map(
              ([monthYear, transactions]) => (
                <div key={monthYear}>
                  {/* Month/Year Header */}
                  <h2 className="mb-3 text-lg font-bold text-primary">
                    {monthYear}
                  </h2>

                  {/* Transactions for this month */}
                  <div className="space-y-2">
                    {transactions.map((transaction) => (
                      <Card
                        key={transaction.id}
                        className="cursor-pointer transition-all hover:shadow-md"
                        onClick={() => handleTransactionClick(transaction.id)}
                      >
                        <CardContent className="flex items-center justify-between p-4">
                          <div className="flex-1">
                            <h3 className="font-semibold">
                              {transaction.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {transaction.description}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {formatDateTime(transaction.date)}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <p
                                className={`text-lg font-bold ${
                                  transaction.type === "earned"
                                    ? "text-green-600"
                                    : "text-red-600"
                                }`}
                              >
                                {transaction.type === "earned" ? "+" : "-"}{" "}
                                {transaction.points} points
                              </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </ScrollArea>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default PointTransactionHistoryViewPage;
