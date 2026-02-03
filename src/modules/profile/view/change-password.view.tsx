"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/custom-input";
import { BottomNavigation } from "@/modules/point/components/BottomNavigation";
import { RouteConfig } from "@/config/route.config";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangePasswordSchema,
  ChangePasswordSchemaType,
} from "../schema/change-password.schema";
import { updatePasswordMutation } from "../hooks/profile-api.hooks";
import { toast } from "sonner";
import { errorMessageAsLangKey } from "@/lib/utils";

const ChangePasswordViewPage = () => {
  const router = useRouter();
  const { t } = useTranslation("profile");
  const params = useParams<{ orgId: string }>();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const mutation = updatePasswordMutation({
    onSuccess: ({ data }) => {
      if (data.status !== "OK" && data.status !== "SUCCESS") {
        toast.error(t("changePassword.form.message.updateError"));
        return;
      }

      toast.success(t("changePassword.form.message.updateSuccess"));
      router.push(RouteConfig.PROFILE.PROFILE(params.orgId));
    },
    onError: (error) => {
      console.error(error);
      toast.error(t("changePassword.form.message.updateError"));
    },
  });

  const handleBack = () => {
    router.push(RouteConfig.PROFILE.PROFILE(params.orgId));
  };

  const onSubmit = (data: ChangePasswordSchemaType) => {
    mutation.mutate({
      params: { orgId: params.orgId },
      data: {
        CurrentPassword: data.currentPassword,
        NewPassword: data.newPassword,
      },
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 sm:p-6 md:p-8 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3 pb-6 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{t("changePassword.title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("changePassword.subtitle")}
            </p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{t("changePassword.requirements.title")}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {t("changePassword.requirements.description")}
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {/* Current Password */}
              <div className="space-y-2">
                <div className="relative">
                  <Controller
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="currentPassword"
                        label={t("changePassword.form.currentPassword")}
                        type={showCurrentPassword ? "text" : "password"}
                        isRequired
                        className="pr-10"
                        errorMessage={errorMessageAsLangKey(
                          form.formState.errors.currentPassword?.message,
                          t
                        )}
                        endContent={
                          <div
                            onClick={() =>
                              setShowCurrentPassword(!showCurrentPassword)
                            }
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </div>
                        }
                      />
                    )}
                  />
                </div>
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <div className="relative">
                  <Controller
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="newPassword"
                        label={t("changePassword.form.newPassword")}
                        type={showNewPassword ? "text" : "password"}
                        isRequired
                        className="pr-10"
                        errorMessage={errorMessageAsLangKey(
                          form.formState.errors.newPassword?.message,
                          t
                        )}
                        endContent={
                          <div
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </div>
                        }
                      />
                    )}
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <div className="relative">
                  <Controller
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="confirmPassword"
                        label={t("changePassword.form.confirmPassword")}
                        type={showConfirmPassword ? "text" : "password"}
                        isRequired
                        className="pr-10"
                        errorMessage={errorMessageAsLangKey(
                          form.formState.errors.confirmPassword?.message,
                          t
                        )}
                        endContent={
                          <div
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="text-muted-foreground hover:text-foreground"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4" />
                            ) : (
                              <Eye className="h-4 w-4" />
                            )}
                          </div>
                        }
                      />
                    )}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1"
                >
                  {t("changePassword.form.action.cancel")}
                </Button>
                <Button
                  type="submit"
                  className="flex-1"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending
                    ? t("changePassword.form.action.updating")
                    : t("changePassword.form.action.update")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default ChangePasswordViewPage;
