"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowUpRight, ArrowDownRight, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RouteConfig } from "@/config/route.config";
import { IPointTransaction } from "../api/point.api";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface PointTransactionListProps {
  transactions: IPointTransaction[];
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
  const params = useParams<{ orgId: string }>();
  const { t } = useTranslation("point");

  const handleViewAll = () => {
    router.push(RouteConfig.POINT_HISTORY(params.orgId));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{t("recentTransactions")}</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewAll}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          {t("viewAll")}
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {transactions.length === 0 ? (
          <Card>
            <CardContent className="flex items-center justify-center p-8">
              <p className="text-sm text-muted-foreground">
                {t("noTransactionsYet")}
              </p>
            </CardContent>
          </Card>
        ) : (
          transactions.map((transaction) => {
            // txType: 1 = earned, -1 = spent
            const isEarned = transaction.txType === 1;
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
                      {transaction.description ||
                        (isEarned ? t("pointsEarned") : t("pointsSpent"))}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dayjs(transaction.createdDate).format(
                        "DD MMM YYYY HH:mm [GMT] Z"
                      )}
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
                      {transaction.txAmount?.toLocaleString()}
                    </span>
                    <Badge
                      variant={isEarned ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {isEarned ? t("earned") : t("spent")}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
