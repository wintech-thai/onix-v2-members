"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import {
  User,
  Phone,
  Calendar,
  Globe,
  ChevronRight,
  LogOut,
  Mail,
  Info,
  Edit2,
  Lock,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrgHeader } from "@/components/org-header";
import { BottomNavigation } from "@/modules/point/components/BottomNavigation";
import { RouteConfig } from "@/config/route.config";
import { ThemeToggle } from "@/components/theme-toggle";
import { env } from "next-runtime-env";
import Cookie from "js-cookie";
import {
  getCustomerUserInfoQuery,
  logoutUserMutation,
} from "../hooks/profile-api.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { UserInfoEditModal } from "../components/user-info-edit-modal";
import { toast } from "sonner";

const ProfileInfoItem = ({
  icon: Icon,
  label,
  value,
  isLoading,
  skeletonClassName = "h-6 w-32",
}: {
  icon: React.ElementType;
  label: string;
  value: React.ReactNode;
  isLoading: boolean;
  skeletonClassName?: string;
}) => {
  return (
    <div className="flex items-center gap-3 p-4">
      <Icon className="h-5 w-5 text-muted-foreground" />
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        {isLoading ? (
          <Skeleton className={skeletonClassName} />
        ) : (
          <p className="font-medium">{value}</p>
        )}
      </div>
    </div>
  );
};

const ProfileViewPage = () => {
  const router = useRouter();
  const { t } = useTranslation("profile");
  const params = useParams<{ orgId: string }>();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const getCustomerUserInfo = getCustomerUserInfoQuery({
    orgId: params.orgId,
  });

  const logoutUser = logoutUserMutation();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleUpdateSuccess = () => {
    getCustomerUserInfo.refetch();
  };

  const handleChangePassword = () => {
    router.push(RouteConfig.PROFILE.CHANGE_PASSWORD(params.orgId));
  };

  const handleChangeLanguage = () => {
    router.push(RouteConfig.PROFILE.LANGUAGE(params.orgId));
  };

  const handleViewConsent = () => {
    router.push(RouteConfig.PROFILE.CONSENT(params.orgId));
  };

  const handleLogout = async () => {
    await logoutUser.mutateAsync(
      {
        params: {
          orgId: params.orgId,
        },
      },
      {
        onSuccess: ({ data }) => {
          if (data.status !== "SUCCESS" && data.status !== "OK") {
            toast.error(data.message);
          }
          toast.success(data.status);
          // router.push(RouteConfig.HOME(params.orgId));
        },
      }
    );
  };

  const currentLang = Cookie.get("i18next") || "en";

  const user = getCustomerUserInfo.data?.data?.user;

  return (
    <div className="min-h-screen bg-background">
      {/* Organization Header */}
      <OrgHeader />

      {/* Main content with bottom padding for navigation */}
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 sm:p-6 md:p-8 pb-24 md:pb-24">
        {/* Header */}
        <div className="space-y-2 pb-6 pt-4">
          <h1 className="text-2xl font-bold">{t("title")}</h1>
          <p className="text-sm text-muted-foreground">{t("description")}</p>
        </div>

        {/* Personal Information */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-muted-foreground">
              {t("section.personal_information")}
            </h3>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 gap-2 text-primary hover:text-primary/90"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit2 className="h-4 w-4" />
              {t("action.edit")}
            </Button>
          </div>

          <Card>
            <CardContent className="divide-y p-0">
              <ProfileInfoItem
                icon={User}
                label={t("label.name")}
                value={`${user?.name} ${user?.lastName}`}
                isLoading={getCustomerUserInfo.isLoading}
              />

              <ProfileInfoItem
                icon={Mail}
                label={t("label.email")}
                value={user?.userEmail?.split(":")[2] || user?.userEmail}
                isLoading={getCustomerUserInfo.isLoading}
                skeletonClassName="h-6 w-48"
              />

              <ProfileInfoItem
                icon={Phone}
                label={t("label.phoneNumber")}
                value={user?.phoneNumber}
                isLoading={getCustomerUserInfo.isLoading}
              />

              <ProfileInfoItem
                icon={Calendar}
                label={t("label.birthDate")}
                value={formatDate(user?.birthDate ?? null)}
                isLoading={getCustomerUserInfo.isLoading}
                skeletonClassName="h-6 w-24"
              />
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            {t("section.settings")}
          </h3>

          <Card>
            <CardContent className="divide-y p-0">
              <button
                onClick={handleChangePassword}
                className="flex w-full items-center gap-3 p-4 transition-colors hover:bg-accent"
              >
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <p className="font-medium">
                    {t("settings.changePassword.title")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("settings.changePassword.description")}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <button
                onClick={handleChangeLanguage}
                className="flex w-full items-center gap-3 p-4 transition-colors hover:bg-accent"
              >
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <p className="font-medium">{t("settings.language.title")}</p>
                  <p
                    className="text-xs text-muted-foreground"
                    suppressHydrationWarning
                  >
                    {currentLang === "en" ? "English" : "ไทย"}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <ThemeToggle />

              {/* <button
                onClick={handleViewConsent}
                className="flex w-full items-center gap-3 p-4 transition-colors hover:bg-accent"
              >
                <FileText className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <p className="font-medium">Consent & Privacy</p>
                  <p className="text-xs text-muted-foreground">
                    View terms and privacy policy
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button> */}
            </CardContent>
          </Card>
        </div>

        {/* App Version */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            {t("section.app_info")}
          </h3>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">{t("settings.appInfo.version")}</p>
                  <p className="text-sm text-muted-foreground">
                    {t("label.version")}
                    {env("NEXT_PUBLIC_APP_VERSION")}
                  </p>
                </div>
              </div>

              <div className="border-t pt-3">
                <Link
                  target="_blank"
                  href={env("NEXT_PUBLIC_PROVIDER_URL") ?? ""}
                  className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors"
                >
                  {t("footer.copyright", {
                    year: new Date().getFullYear(),
                  })}
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Button
          disabled={logoutUser.isPending}
          onClick={handleLogout}
          variant="outline"
          className="w-full gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
        >
          <LogOut className="h-4 w-4" />
          {t("action.logout")}
        </Button>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />

      {/* Edit Modal */}
      <UserInfoEditModal
        user={user}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleUpdateSuccess}
      />
    </div>
  );
};

export default ProfileViewPage;
