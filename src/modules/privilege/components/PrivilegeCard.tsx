"use client";

import { Gift, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Privilege {
  id: string;
  title: string;
  description: string;
  points: number;
  imageUrl?: string;
  expiryDate?: Date;
  category: string;
}

interface PrivilegeCardProps {
  privilege: Privilege;
  onRedeem?: (privilegeId: string) => void;
}

export const PrivilegeCard = ({ privilege, onRedeem }: PrivilegeCardProps) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Image placeholder - larger for vertical layout */}
      <div className="relative h-48 bg-muted">
        {privilege.imageUrl ? (
          <img
            src={privilege.imageUrl}
            alt={privilege.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Gift className="h-16 w-16 text-muted-foreground" />
          </div>
        )}
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 flex-1 text-base font-semibold leading-tight">
            {privilege.title}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold text-primary">
              {privilege.points.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">points</span>
          </div>
          {privilege.expiryDate && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span className="line-clamp-1">
                {privilege.expiryDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        <Button
          onClick={() => onRedeem?.(privilege.id)}
          className="w-full"
          size="sm"
        >
          Redeem
        </Button>
      </CardContent>
    </Card>
  );
};
