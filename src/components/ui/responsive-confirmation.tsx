import { useMediaQuery } from "usehooks-ts";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button, type ButtonProps } from "@/components/ui/button";

interface ResponsiveConfirmationProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  message: string;
  variant: ButtonProps["variant"];
  confirmButton?: string;
  cancelButton?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ResponsiveConfirmation = ({
  open,
  onOpenChange,
  title,
  message,
  variant,
  confirmButton,
  cancelButton,
  onConfirm,
  onCancel,
}: ResponsiveConfirmationProps) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{message}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClickCapture={onCancel}
              variant="secondary"
              onClick={() => onOpenChange(false)}
            >
              {cancelButton}
            </Button>
            <Button variant={variant} onClick={onConfirm}>
              {confirmButton}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{message}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button variant={variant} onClick={onConfirm}>
            {confirmButton}
          </Button>
          <Button
            onClickCapture={onCancel}
            variant="secondary"
            onClick={() => onOpenChange(false)}
          >
            {cancelButton}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
