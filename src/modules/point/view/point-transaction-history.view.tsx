"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronRight, Coins, ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RouteConfig } from "@/config/route.config";
import {
  useGetPointTransactionQuery,
  useGetWalletQuery,
} from "../hooks/point-api.hooks";
import { IPointTransaction } from "../api/point.api";
import dayjs from "dayjs";
import { Skeleton } from "@/components/ui/skeleton";
import { OrgLayout } from "@/components/layout/org-layout";

const ITEMS_PER_PAGE = 10;

const PointTransactionHistoryViewPage = () => {
  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const [currentPage, setCurrentPage] = useState(1);

  const getWallet = useGetWalletQuery({
    orgId: params.orgId,
  });
  const getPointTransaction = useGetPointTransactionQuery({
    orgId: params.orgId,
  });

  const handleBack = () => {
    router.push(RouteConfig.ROOT(params.orgId));
  };

  const handleTransactionClick = (transactionId: string) => {
    console.log("View transaction:", transactionId);
    // TODO: Navigate to transaction detail if needed
  };

  if (getWallet.isLoading || getPointTransaction.isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <main className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 sm:p-6 md:p-8 pb-24">
          <div className="flex items-center gap-3 pb-6 pt-4">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-8 w-64" />
          </div>
          <Card className="mb-6">
            <CardContent className="flex items-center justify-between p-4">
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-8 w-24" />
            </CardContent>
          </Card>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i}>
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-3 w-48" />
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    );
  }

  const walletPayload = getWallet.data?.data.wallet;
  const allTransactions = getPointTransaction.data?.data || [];

  if (!walletPayload) {
    throw new Error(getWallet.data?.data.description);
  }

  // Calculate pagination
  const totalItems = allTransactions.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedTransactions = allTransactions.slice(startIndex, endIndex);

  // Group paginated transactions by month/year
  const groupedTransactions = paginatedTransactions.reduce(
    (groups, transaction) => {
      const monthYear = dayjs(transaction.createdDate).format("MMM YYYY");
      if (!groups[monthYear]) {
        groups[monthYear] = [];
      }
      groups[monthYear].push(transaction);
      return groups;
    },
    {} as Record<string, IPointTransaction[]>
  );

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <OrgLayout>
      <div className="flex flex-col gap-y-4 h-full">
        <div className="flex items-center gap-3">
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

        <Card className="bg-muted">
          <CardContent className="flex items-center justify-between p-4 h-5">
            <div className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                Current Balance
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Coins className="h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">
                {walletPayload.pointBalance ?? 0}
              </span>
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="space-y-6 pb-4">
            {totalItems === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center p-8">
                  <p className="text-sm text-muted-foreground">
                    No transactions yet
                  </p>
                </CardContent>
              </Card>
            ) : (
              Object.entries(groupedTransactions).map(
                ([monthYear, monthTransactions]) => (
                  <div key={monthYear}>
                    {/* Month/Year Header */}
                    <h2 className="mb-3 text-lg font-bold text-primary">
                      {monthYear}
                    </h2>

                    {/* Transactions for this month */}
                    <div className="space-y-2">
                      {monthTransactions.map((transaction) => {
                        const isEarned = transaction.txType === 1;
                        return (
                          <Card
                            key={transaction.id}
                            className="cursor-pointer transition-all hover:shadow-md"
                            onClick={() =>
                              handleTransactionClick(transaction.id)
                            }
                          >
                            <CardContent className="flex items-center justify-between p-4">
                              <div className="flex-1">
                                <h3 className="font-semibold">
                                  {transaction.description ||
                                    (isEarned
                                      ? "Points Earned"
                                      : "Points Spent")}
                                </h3>
                                {transaction.tags && (
                                  <p className="text-sm text-muted-foreground">
                                    {transaction.tags}
                                  </p>
                                )}
                                <p className="mt-1 text-xs text-muted-foreground">
                                  {dayjs(transaction.createdDate).format(
                                    "DD MMM YYYY HH:mm [GMT] Z"
                                  )}
                                </p>
                              </div>

                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <p
                                    className={`text-lg font-bold ${
                                      isEarned
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                                  >
                                    {isEarned ? "+" : "-"}{" "}
                                    {transaction.txAmount} points
                                  </p>
                                </div>
                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </div>
                )
              )
            )}
          </div>
        </ScrollArea>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>
              <span className="text-xs text-muted-foreground">
                ({startIndex + 1}-{Math.min(endIndex, totalItems)} of{" "}
                {totalItems})
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="gap-2"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </OrgLayout>
  );
};

export default PointTransactionHistoryViewPage;
