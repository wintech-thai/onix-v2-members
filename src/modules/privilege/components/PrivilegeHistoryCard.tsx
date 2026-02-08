"use client";

import { useRouter } from "next/navigation";
import { Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RouteConfig } from "@/config/route.config";
import { useTranslation } from "react-i18next";

interface PrivilegeHistory {
  id: string;
  title: string;
  points: number;
  redeemedAt: Date;
  status: "used" | "unused";
  expiryDate?: Date;
  voucherCode?: string;
  imageUrl?: string;
}

interface PrivilegeHistoryCardProps {
  history: PrivilegeHistory;
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const PrivilegeHistoryCard = ({
  history,
}: PrivilegeHistoryCardProps) => {
  const { t } = useTranslation("privilege");
  const router = useRouter();
  const isUsed = history.status === "used";

  const handleClick = () => {
    router.push(RouteConfig.PRIVILEGE.VOUCHER_DETAIL(history.id, "history"));
  };

  return (
    <Card
      className={`overflow-hidden transition-all hover:shadow-md cursor-pointer ${
        isUsed ? "opacity-60" : ""
      }`}
      onClick={handleClick}
    >
      <CardContent className="flex gap-3 p-3">
        {/* Image on left */}
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-muted">
          {history.imageUrl ? (
            <img
              src={history.imageUrl}
              alt={history.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <img
              src="/default-voucher.jpg"
              alt={history.title}
              className="h-full w-full object-cover"
            />
          )}
        </div>

        {/* Content on right */}
        <div className="flex flex-1 flex-col justify-between">
          <div className="space-y-1">
            <h4 className="line-clamp-2 text-sm font-semibold leading-tight">
              {history.title}
            </h4>
            <Badge
              variant={isUsed ? "secondary" : "default"}
              className="text-xs"
            >
              {isUsed ? t("history.used") : t("history.available")}
            </Badge>
          </div>

          <div>
            {history.points.toLocaleString()} {t("history.points")}
          </div>

          <div className="space-y-0.5">
            {history.expiryDate && !isUsed && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                <span>
                  {t("history.expires")} {formatDate(history.expiryDate)}
                </span>
              </div>
            )}
            {isUsed && (
              <p className="text-xs text-muted-foreground">
                {t("history.usedOn")} {formatDate(history.redeemedAt)}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
