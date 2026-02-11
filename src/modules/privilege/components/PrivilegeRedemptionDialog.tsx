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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation("privilege");

  if (!target) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("redemptionDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("redemptionDialog.description")}
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
                  {t("redemptionDialog.expires")}{" "}
                  {target.expiryDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            <p className="text-sm text-muted-foreground border-t pt-3 mt-2">
              {t("redemptionDialog.deductMessage")}{" "}
              <span className="font-bold text-primary text-base">
                {target.points?.toLocaleString()}{" "}
                {t("redemptionDialog.pointsLabel")}
              </span>{" "}
              {t("redemptionDialog.fromBalance")}
            </p>
          </div>
        </div>

        <DialogFooter className="flex-col-reverse sm:flex-row gap-2">
          <Button
            variant="secondary"
            onClick={() => onOpenChange(false)}
            disabled={isPending}
          >
            {t("redemptionDialog.cancel")}
          </Button>
          <Button onClick={onConfirm} disabled={isPending}>
            {t("redemptionDialog.confirmRedeem")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
