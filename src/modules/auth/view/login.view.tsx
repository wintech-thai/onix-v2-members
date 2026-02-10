"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  LoginSchemaType,
} from "@/modules/auth/schema/login.schema";
import { Input } from "@/components/ui/input";
import { useCustomerLoginMutation } from "../hooks/auth-api.hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { DialogComingSoon } from "@/components/ui/dialog-coming-soon";
import Image from "next/image";
import { RouteConfig } from "@/config/route.config";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { EyeClosedIcon, EyeIcon } from "lucide-react";

const LoginViewPage = () => {
  const { t } = useTranslation("auth");

  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });
  const disabled = form.formState.isSubmitting;

  const customerLogin = useCustomerLoginMutation();

  const onSubmit = async (values: LoginSchemaType) => {
    await customerLogin.mutateAsync(
      {
        data: {
          password: values.password,
          userName: values.userName,
          orgId: params.orgId,
        },
        params: null,
      },
      {
        onSuccess: () => {
          toast.success(t("message.loginSuccess"));

          // Redirect to saved page (from 401 redirect) or default root
          const returnUrl = sessionStorage.getItem("returnUrl");
          sessionStorage.removeItem("returnUrl");

          return router.push(returnUrl || RouteConfig.ROOT(params.orgId));
        },
        onError: () => {
          toast.error(t("message.loginFailed"));
        },
      }
    );
  };

  return (
    <div className="h-full mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl space-y-6 p-4">
      <div className="h-full flex flex-col items-center justify-center">
        <div className="max-w-md w-full">
          <div className="flex items-center gap-x-2 w-full pb-4">
            <div className="rounded-md bg-gray-100/50 p-2">
              <Image
                src="/logo.png"
                alt="Please Scan"
                width={100}
                height={100}
              />
            </div>
            <div>
              <h3 className="text-3xl font-semibold">Please Scan</h3>
              <h4 className="text-base text-gray-500">Member</h4>
            </div>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="userName"
              control={form.control}
              render={({ field }) => (
                <Input
                  {...field}
                  isRequired
                  label={t("form.userName")}
                  errorMessage={form.formState.errors.userName?.message}
                  t={t}
                  disabled={disabled}
                />
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field }) => (
                <div className="relative">
                  <Input
                    {...field}
                    type={showPassword ? "text" : "password"}
                    isRequired
                    label={t("form.password")}
                    errorMessage={form.formState.errors.password?.message}
                    t={t}
                    disabled={disabled}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    disabled={disabled}
                    className="absolute right-3 top-12 text-sm text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeClosedIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              )}
            />

            <Button type="submit" className="w-full" disabled={disabled}>
              {t("form.action.loginButton")}
            </Button>
            <DialogComingSoon>
              <div className="text-left cursor-pointer">
                <p>{t("form.action.forgotButton")}</p>
              </div>
            </DialogComingSoon>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginViewPage;
