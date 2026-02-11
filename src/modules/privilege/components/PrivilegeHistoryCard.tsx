"use client";

import { useRouter } from "next/navigation";
import { Calendar, Clock, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RouteConfig } from "@/config/route.config";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";

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
  return dayjs(date).format("DD MMM YYYY HH:mm");
};

const EXPIRING_SOON_DAYS = 10;

const getDaysRemaining = (expiryDate: Date): number => {
  return dayjs(expiryDate).startOf("day").diff(dayjs().startOf("day"), "day");
};

type ExpiryStatus = "expired" | "expires-today" | "expiring-soon" | "normal";

export const PrivilegeHistoryCard = ({
  history,
}: PrivilegeHistoryCardProps) => {
  const { t } = useTranslation("privilege");
  const router = useRouter();
  const isUsed = history.status === "used";

  // Calculate expiry status
  const daysRemaining = history.expiryDate
    ? getDaysRemaining(history.expiryDate)
    : null;
  const expiryStatus: ExpiryStatus =
    daysRemaining !== null
      ? daysRemaining < 0
        ? "expired"
        : daysRemaining === 0
        ? "expires-today"
        : daysRemaining <= EXPIRING_SOON_DAYS
        ? "expiring-soon"
        : "normal"
      : "normal";
  const isExpired = expiryStatus === "expired";
  const isExpiresToday = expiryStatus === "expires-today";
  const isExpiringSoon = expiryStatus === "expiring-soon";

  const handleClick = () => {
    router.push(RouteConfig.PRIVILEGE.VOUCHER_DETAIL(history.id, "history"));
  };

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md cursor-pointer",
        (isUsed || isExpired) && "opacity-60",
        isExpiresToday && !isUsed && "border-red-500/50",
        isExpiringSoon && !isUsed && "border-orange-400/50"
      )}
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
            <div className="flex flex-wrap gap-1">
              <Badge
                variant={
                  isUsed
                    ? "secondary"
                    : isExpired || isExpiresToday
                    ? "destructive"
                    : "default"
                }
                className="text-xs"
              >
                {isUsed
                  ? t("history.used")
                  : isExpired
                  ? t("history.expired")
                  : t("history.available")}
              </Badge>
              {isExpiresToday && !isUsed && (
                <Badge variant="destructive" className="text-xs animate-pulse">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {t("history.expiresToday")}
                </Badge>
              )}
              {isExpiringSoon && !isUsed && daysRemaining !== null && (
                <Badge
                  variant="outline"
                  className="text-xs border-orange-400 text-orange-600 bg-orange-50"
                >
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  {t("history.daysLeft", { days: daysRemaining })}
                </Badge>
              )}
            </div>
          </div>

          <div>
            {history.points?.toLocaleString()} {t("history.points")}
          </div>

          <div className="space-y-0.5">
            {history.expiryDate && !isUsed && (
              <div
                className={`flex items-center gap-1 text-xs ${
                  isExpired || isExpiresToday
                    ? "text-destructive"
                    : isExpiringSoon
                    ? "text-orange-600"
                    : "text-muted-foreground"
                }`}
              >
                {isExpiringSoon || isExpiresToday || isExpired ? (
                  <Clock className="h-3 w-3" />
                ) : (
                  <Calendar className="h-3 w-3" />
                )}
                <span>
                  {isExpiresToday
                    ? t("history.lastDayToUse", {
                        date: formatDate(history.expiryDate),
                      })
                    : isExpiringSoon && daysRemaining !== null
                    ? t("history.expiresInDays", {
                        days: daysRemaining,
                        date: formatDate(history.expiryDate),
                      })
                    : isExpired
                    ? t("history.expiredOn", {
                        date: formatDate(history.expiryDate),
                      })
                    : `${t("history.expires")} ${formatDate(
                        history.expiryDate
                      )}`}
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
