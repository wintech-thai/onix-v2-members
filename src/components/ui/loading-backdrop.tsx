"use client";

import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingBackdropProps {
  show: boolean;
  className?: string;
}

export const LoadingBackdrop = ({ show, className }: LoadingBackdropProps) => {
  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-[1px]",
        className
      )}
    >
      <div className="bg-background/80 rounded-full p-4 shadow-lg backdrop-blur-md border">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    </div>
  );
};
