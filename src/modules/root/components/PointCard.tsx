"use client";

import { Wallet, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PointCardProps {
  points: number;
  onBuyPoints?: () => void;
}

export const PointCard = ({ points, onBuyPoints }: PointCardProps) => {
  return (
    <Card className="relative overflow-hidden border-none bg-primary text-primary-foreground shadow-lg">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-primary-foreground/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-10 translate-y-10 rounded-full bg-primary-foreground/10 blur-2xl" />

      <CardHeader className="relative pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary-foreground/20 p-2 backdrop-blur-sm">
            <Wallet className="h-5 w-5" />
          </div>
          <span className="text-sm font-medium opacity-90">Your Points</span>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight">
              {points.toLocaleString()}
            </span>
            <span className="text-lg font-medium opacity-80">pts</span>
          </div>
          <p className="text-sm opacity-70">Available balance</p>
        </div>

        <Button
          onClick={onBuyPoints}
          className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
          size="lg"
        >
          <Plus className="mr-2 h-4 w-4" />
          Buy Points
        </Button>
      </CardContent>
    </Card>
  );
};
