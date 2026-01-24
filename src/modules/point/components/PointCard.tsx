"use client";

import { Wallet, Plus } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DialogComingSoon } from "@/components/ui/dialog-coming-soon";

interface PointCardProps {
  points: number;
  onBuyPoints?: () => void;
}

export const PointCard = ({ points, onBuyPoints }: PointCardProps) => {
  return (
    <Card className="relative overflow-hidden border-none bg-primary shadow-lg">
      {/* Decorative elements */}
      <div className="absolute right-0 top-0 h-40 w-40 translate-x-10 -translate-y-10 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-32 w-32 -translate-x-10 translate-y-10 rounded-full bg-white/10 blur-2xl" />

      <CardHeader className="relative pb-2">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white/20 p-2 backdrop-blur-sm">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <span className="text-sm font-medium text-white/90">Your Points</span>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <div className="space-y-1">
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold tracking-tight text-white">
              {points.toLocaleString()}
            </span>
            <span className="text-lg font-medium text-white/80">pts</span>
          </div>
          <p className="text-sm text-white/70">Available balance</p>
        </div>

        <DialogComingSoon>
          <Button
            onClick={onBuyPoints}
            className="w-full bg-white text-primary hover:bg-white/90 cursor-pointer"
            size="lg"
          >
            <Plus className="mr-2 h-4 w-4" />
            Buy Points
          </Button>
        </DialogComingSoon>
      </CardContent>
    </Card>
  );
};
