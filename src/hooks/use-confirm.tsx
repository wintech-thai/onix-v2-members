import { JSX, useState } from "react";

import { type ButtonProps } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { ResponsiveConfirmation } from "@/components/ui/responsive-confirmation";

interface ConfirmProps {
  title: string;
  message: string;
  variant: ButtonProps["variant"];
  confirmButton?: string;
  cancelButton?: string;
}

export const useConfirm = ({
  title,
  message,
  variant,
  confirmButton,
  cancelButton,
}: ConfirmProps): [() => JSX.Element, () => Promise<unknown>] => {
  const { t } = useTranslation();
  const [promise, setPromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = () => {
    return new Promise((resolve) => {
      setPromise({ resolve });
    });
  };

  const handleClose = () => {
    setPromise(null);
  };

  const handleConfirm = () => {
    promise?.resolve(true);
    handleClose();
  };

  const handleCancel = () => {
    promise?.resolve(false);
    handleClose();
  };

  const ConfirmationDialog = () => {
    return (
      <ResponsiveConfirmation
        open={promise !== null}
        onOpenChange={handleClose}
        title={title}
        message={message}
        variant={variant}
        confirmButton={confirmButton ?? t("button.ok")}
        cancelButton={cancelButton ?? t("button.cancel")}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    );
  };

  return [ConfirmationDialog, confirm];
};
