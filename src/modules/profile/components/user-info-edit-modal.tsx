"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UpdateUserSchema, UpdateUserSchemaType } from "../schema/user.schema";
import { updateUserInfoMutation } from "../hooks/profile-api.hooks";
import { IUserInfo } from "../api/profile.api";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/custom-input";
import { errorMessageAsLangKey } from "@/lib/utils";

interface UserInfoEditModalProps {
  user: IUserInfo | undefined;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const UserInfoEditModal = ({
  user,
  isOpen,
  onClose,
  onSuccess,
}: UserInfoEditModalProps) => {
  const params = useParams<{ orgId: string }>();
  const { t } = useTranslation("profile");

  const form = useForm<UpdateUserSchemaType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      Name: "",
      LastName: "",
      PhoneNumber: undefined,
      SecondaryEmail: "",
    },
  });

  const mutation = updateUserInfoMutation({
    onSuccess: ({ data }) => {
      if (data.status !== "OK" && data.status !== "SUCCESS") {
        toast.error(t("editProfile.messages.updateError"));
        return;
      }

      toast.success(t("editProfile.messages.updateSuccess"));
      onSuccess();
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(t("editProfile.messages.updateError"));
    },
  });

  // Reset form when user data changes
  useEffect(() => {
    if (user) {
      form.reset({
        Name: user.name || "",
        LastName: user.lastName || "",
        PhoneNumber: user.phoneNumber || "",
      });
    }
  }, [form, user]);

  const onSubmit = (data: UpdateUserSchemaType) => {
    mutation.mutate({
      params: { orgId: params.orgId },
      data: {
        ...data,
        PhoneNumber: data.PhoneNumber || null,
        SecondaryEmail: user?.secondaryEmail || null,
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>{t("editProfile.title")}</DialogTitle>
          <DialogDescription>{t("editProfile.description")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Controller
            control={form.control}
            name="Name"
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                label={t("editProfile.form.firstName")}
                errorMessage={errorMessageAsLangKey(
                  form.formState.errors.Name?.message,
                  t
                )}
              />
            )}
          />
          <Controller
            control={form.control}
            name="LastName"
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                label={t("editProfile.form.lastName")}
                errorMessage={errorMessageAsLangKey(
                  form.formState.errors.LastName?.message,
                  t
                )}
              />
            )}
          />

          <Controller
            control={form.control}
            name="PhoneNumber"
            render={({ field }) => (
              <Input
                {...field}
                isRequired
                label={t("editProfile.form.phoneNumber")}
                placeholder="+66904567895"
                errorMessage={errorMessageAsLangKey(
                  form.formState.errors.PhoneNumber?.message,
                  t
                )}
              />
            )}
          />

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={mutation.isPending}>
              {mutation.isPending
                ? t("editProfile.form.action.saving")
                : t("editProfile.form.action.save")}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
