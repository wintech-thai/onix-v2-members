import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

interface PrivilegeRedemptionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  target: {
    title: string;
    points: number;
    description?: string;
    imageUrl?: string;
    expiryDate?: Date;
  } | null;
  onConfirm: () => void;
  isPending: boolean;
}

export const PrivilegeRedemptionDialog = ({
  open,
  onOpenChange,
  target,
  onConfirm,
  isPending,
}: PrivilegeRedemptionDialogProps) => {
  if (!target) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Redemption</DialogTitle>
          <DialogDescription>
            Please verify the details below before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-4">
          <div className="relative h-64 w-full overflow-hidden rounded-lg bg-muted">
            {target.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={target.imageUrl}
                alt={target.title}
                className="h-full w-full object-cover"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src="/default-voucher.jpg"
                alt={target.title}
                className="h-full w-full object-cover"
              />
            )}
          </div>

          <div className="text-center space-y-3 px-4">
            <div className="space-y-1">
              <h3 className="font-semibold text-lg leading-tight">
                {target.title}
              </h3>
              {target.description && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {target.description}
                </p>
              )}
            </div>

            {target.expiryDate && (
              <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground bg-muted/50 py-1.5 px-3 rounded-full w-fit mx-auto">
                <Calendar className="h-4 w-4" />
                <span>
                  Expires:{" "}
                  {target.expiryDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            <p className="text-sm text-muted-foreground border-t pt-3 mt-2">
              This will deduct{" "}
              <span className="font-bold text-primary text-base">
                {target.points.toLocaleString()} Points
              </span>{" "}
              from your balance.
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button onClick={onConfirm} disabled={isPending}>
            Confirm Redeem
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
