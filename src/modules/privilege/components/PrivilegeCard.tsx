/* eslint-disable @next/next/no-img-element */
"use client";

import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

interface Privilege {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl?: string;
  expiryDate?: Date;
  category: string;
  quota: number;
}

interface PrivilegeCardProps {
  privilege: Privilege;
  onRedeem?: (privilegeId: string, point: number) => void;
}

export const PrivilegeCard = ({ privilege, onRedeem }: PrivilegeCardProps) => {
  const { t } = useTranslation("privilege");
  const isOutOfStock = privilege.quota <= 0;
  const isExpired = privilege.expiryDate
    ? dayjs(privilege.expiryDate).isBefore(dayjs(), "day")
    : false;
  const isUnavailable = isOutOfStock || isExpired;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg flex flex-col gap-0 h-full p-0 border-0 shadow-sm">
      {/* Image placeholder - larger for vertical layout */}
      <div className="relative h-48 bg-muted group w-full">
        {privilege.imageUrl ? (
          <img
            src={privilege.imageUrl}
            alt={privilege.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <img
            src="/default-voucher.jpg"
            alt={privilege.title}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        )}
        {isUnavailable && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center backdrop-blur-sm">
            <Badge variant="destructive" className="text-lg px-4 py-1">
              {isExpired ? t("card.expired") : t("card.outOfStock")}
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="space-y-2 p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 flex-1 text-base font-semibold leading-tight min-h-1">
            {privilege.title}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 p-4 pt-0 flex-1 flex flex-col justify-end">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-primary">
                {privilege.points.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground">
                {t("card.points")}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 text-xs text-muted-foreground">
            {privilege.expiryDate && (
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span className="line-clamp-1">
                  {t("card.expire")}{" "}
                  {privilege.expiryDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <span
                className={`font-medium ${
                  privilege.quota < 10 ? "text-red-500" : ""
                }`}
              >
                {t("card.remaining")} {privilege.quota.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        <Button
          onClick={() => onRedeem?.(privilege.id, privilege.points)}
          className="w-full"
          size="sm"
          disabled={isUnavailable}
          variant={isUnavailable ? "outline" : "default"}
        >
          {isExpired
            ? t("card.expired")
            : isOutOfStock
            ? t("card.outOfStock")
            : t("card.redeem")}
        </Button>
      </CardContent>
    </Card>
  );
};
