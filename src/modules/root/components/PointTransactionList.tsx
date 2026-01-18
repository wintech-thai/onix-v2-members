"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RouteConfig } from "@/config/route.config";

interface Transaction {
  id: string;
  type: "earned" | "spent";
  amount: number;
  description: string;
  date: Date;
}

interface PointTransactionListProps {
  transactions: Transaction[];
}

const formatDate = (date: Date) => {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const PointTransactionList = ({
  transactions,
}: PointTransactionListProps) => {
  const router = useRouter();

  const handleViewAll = () => {
    router.push(RouteConfig.POINT_HISTORY);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Transactions</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          View All
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <ScrollArea className="h-100 pr-4">
        <div className="space-y-2">
          {transactions.map((transaction) => {
            const isEarned = transaction.type === "earned";
            const Icon = isEarned ? ArrowDownRight : ArrowUpRight;

            return (
              <Card
                key={transaction.id}
                className="transition-colors hover:bg-accent"
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <div
                    className={`rounded-full p-2 ${
                      isEarned
                        ? "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400"
                        : "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>

                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <span
                      className={`text-sm font-semibold ${
                        isEarned
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      {isEarned ? "+" : "-"}
                      {transaction.amount.toLocaleString()}
                    </span>
                    <Badge
                      variant={isEarned ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {isEarned ? "Earned" : "Spent"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
