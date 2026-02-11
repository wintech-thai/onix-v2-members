"use client";

import {
  AlertTriangle,
  RefreshCw,
  ArrowLeft,
  WifiOff,
  ServerCrash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import axios, { AxiosError } from "axios";

type ErrorType = "network" | "server" | "generic";

function getErrorType(error?: Error | AxiosError | null): ErrorType {
  if (!error) return "generic";

  // Axios error — use axios.isAxiosError() instead of instanceof (works across bundler boundaries)
  if (axios.isAxiosError(error)) {
    // No response = network error (offline, timeout, DNS, CORS, etc.)
    if (!error.response) return "network";

    const status = error.response.status;

    // 502 from BFF = upstream unreachable
    // Check navigator.onLine to distinguish: user offline vs backend down
    if (status === 502) {
      return typeof navigator !== "undefined" && !navigator.onLine
        ? "network" // User's device is offline
        : "server"; // User is online but backend is unreachable
    }

    // Other 5xx = server error
    if (status >= 500 && status <= 599) return "server";
  }

  // Check for common network error messages
  if (error.message) {
    const msg = error.message.toLowerCase();
    if (
      msg.includes("network") ||
      msg.includes("timeout") ||
      msg.includes("fetch") ||
      msg.includes("econnrefused") ||
      msg.includes("failed to fetch")
    ) {
      return "network";
    }
  }

  return "generic";
}

function isUnauthorizedError(error?: Error | AxiosError | null): boolean {
  if (!error) return false;
  if (axios.isAxiosError(error)) {
    return error.response?.status === 401;
  }
  return false;
}

interface ErrorStateProps {
  /** The error object from react-query or catch block */
  error?: Error | AxiosError | null;
  /** Override title (otherwise auto-detected from error type) */
  title?: string;
  /** Override message (otherwise auto-detected from error type) */
  message?: string;
  /** Callback when user clicks Retry */
  onRetry?: () => void;
  /** Show go back button, default true */
  showGoBack?: boolean;
}

export const ErrorState = ({
  error,
  title,
  message,
  onRetry,
  showGoBack = true,
}: ErrorStateProps) => {
  const { t } = useTranslation("common");
  const router = useRouter();

  // 401 is handled by axios interceptor (redirect to sign-in)
  // Don't show error page — return null to avoid flashing error UI during redirect
  if (isUnauthorizedError(error)) {
    return null;
  }

  const errorType = getErrorType(error);

  // Pick icon based on error type
  const Icon =
    errorType === "network"
      ? WifiOff
      : errorType === "server"
      ? ServerCrash
      : AlertTriangle;

  // Auto-detect title and message from error type
  const resolvedTitle = title ?? t(`error.${errorType}.title`);
  const resolvedMessage = message ?? t(`error.${errorType}.message`);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center p-6 text-center">
      {/* Icon */}
      <div className="relative mb-6">
        <div className="absolute inset-0 rounded-full bg-destructive/20 blur-xl animate-pulse" />
        <div className="relative rounded-full bg-destructive/10 p-5">
          <Icon className="h-12 w-12 text-destructive" />
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-foreground mb-2">
        {resolvedTitle}
      </h2>

      {/* Message */}
      <p className="text-muted-foreground max-w-sm mb-6">{resolvedMessage}</p>

      {/* Actions */}
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {onRetry && (
          <Button onClick={onRetry} className="w-full" size="lg">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t("error.retry")}
          </Button>
        )}

        {showGoBack && (
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="w-full"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("error.goBack")}
          </Button>
        )}
      </div>
    </div>
  );
};
