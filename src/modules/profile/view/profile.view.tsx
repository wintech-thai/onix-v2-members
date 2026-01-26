"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  User,
  Phone,
  Calendar,
  Lock,
  Globe,
  FileText,
  ChevronRight,
  LogOut,
  Mail,
  Info,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrgHeader } from "@/components/org-header";
import { BottomNavigation } from "@/modules/point/components/BottomNavigation";
import { RouteConfig } from "@/config/route.config";
import { ThemeToggle } from "@/components/theme-toggle";
import { env } from "next-runtime-env";
import Cookie from "js-cookie";

// Mock user data - replace with real data from API
const mockUser = {
  firstName: "John",
  lastName: "Doe",
  phone: "+66 81 234 5678",
  birthDate: new Date(1990, 5, 15),
  email: "john.doe@example.com",
  language: "en",
};

const ProfileViewPage = () => {
  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const [user] = useState(mockUser);

  const appVersion = env("NEXT_PUBLIC_APP_VERSION");

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
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

  const handleLogout = () => {
    console.log("Logout");
    // TODO: Implement logout logic
  };

  const currentLang = Cookie.get("i18next") || "en";

  return (
    <div className="min-h-screen bg-background">
      {/* Organization Header */}
      <OrgHeader />

      {/* Main content with bottom padding for navigation */}
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 sm:p-6 md:p-8 pb-24 md:pb-24">
        {/* Header */}
        <div className="space-y-2 pb-6 pt-4">
          <h1 className="text-2xl font-bold">Profile</h1>
          <p className="text-sm text-muted-foreground">
            Manage your account settings
          </p>
        </div>

        {/* Personal Information */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            PERSONAL INFORMATION
          </h3>

          <Card>
            <CardContent className="divide-y p-0">
              <div className="flex items-center gap-3 p-4">
                <User className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Name</p>
                  <p className="font-medium">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Birth Date</p>
                  <p className="font-medium">{formatDate(user.birthDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Settings */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            SETTINGS
          </h3>

          <Card>
            <CardContent className="divide-y p-0">
              <button
                onClick={handleChangePassword}
                className="flex w-full items-center gap-3 p-4 transition-colors hover:bg-accent"
              >
                <Lock className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1 text-left">
                  <p className="font-medium">Change Password</p>
                  <p className="text-xs text-muted-foreground">
                    Update your password
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
                  <p className="font-medium">Language</p>
                  <p className="text-xs text-muted-foreground">
                    {currentLang === "en" ? "English" : "ไทย"}
                  </p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </button>

              <ThemeToggle />

              <button
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
              </button>
            </CardContent>
          </Card>
        </div>

        {/* App Version */}
        <div className="mb-6 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground">
            APP INFO
          </h3>

          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Info className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="font-medium">App Version</p>
                  <p className="text-sm text-muted-foreground">
                    versions: {env("NEXT_PUBLIC_APP_VERSION")}
                  </p>
                </div>
              </div>

              <div className="border-t pt-3">
                <Link
                  target="_blank"
                  href={env("NEXT_PUBLIC_PROVIDER_URL") ?? ""}
                  className="text-sm text-muted-foreground hover:underline hover:text-foreground transition-colors"
                >
                  &copy; {new Date().getFullYear()} Dev Hub Co., Ltd. All rights
                  reserved.
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ProfileViewPage;
