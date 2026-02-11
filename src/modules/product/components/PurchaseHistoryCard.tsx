"use client";

import { Package, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PurchaseHistory {
  id: string;
  productName: string;
  price: number;
  paymentMethod: "cash" | "points";
  purchasedAt: Date;
  status: "completed" | "processing" | "cancelled";
  quantity: number;
}

interface PurchaseHistoryCardProps {
  history: PurchaseHistory;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-600 dark:bg-green-950 dark:text-green-400";
    case "processing":
      return "bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400";
    case "cancelled":
      return "bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400";
    default:
      return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
  }
};

export const PurchaseHistoryCard = ({ history }: PurchaseHistoryCardProps) => {
  return (
    <Card className="transition-all hover:bg-accent">
      <CardContent className="flex items-start gap-4 p-4">
        <div className={`rounded-full p-2 ${getStatusColor(history.status)}`}>
          <Package className="h-5 w-5" />
        </div>

        <div className="flex-1 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <h4 className="font-semibold leading-none">
                {history.productName}
              </h4>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{formatDate(history.purchasedAt)}</span>
              </div>
            </div>
            <Badge
              variant={history.status === "completed" ? "default" : "secondary"}
            >
              {history.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="space-y-1">
              <p className="text-muted-foreground">
                Quantity: {history.quantity}
              </p>
              <p className="font-semibold">
                {history.paymentMethod === "cash" ? (
                  <span className="text-blue-600">
                    ฿{history.price?.toLocaleString()}
                  </span>
                ) : (
                  <span className="text-purple-600">
                    {history.price?.toLocaleString()} points
                  </span>
                )}
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              {history.paymentMethod === "cash" ? "Cash" : "Points"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
