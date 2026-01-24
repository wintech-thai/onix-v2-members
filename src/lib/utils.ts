import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "sonner";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Extract API action name from Axios error URL
 * @param error - Axios error object
 * @returns API action name (e.g., "GetJobs") or undefined
 *
 * @example
 * // URL: /api/Stat/org/123/action/GetCurrentBalanceStats
 * // Returns: "GetCurrentBalanceStats"
 *
 * @example
 * // URL: /api/Jobs/org/456/action/FetchJobs?limit=10&offset=0
 * // Returns: "FetchJobs" (query params are excluded)
 */
export function extractApiNameFromError(error: AxiosError | null | undefined): string | undefined {
  if (!error?.config?.url) return undefined;

  const url = error.config.url;
  // Match only the API name after /action/ (excludes query params and path segments)
  const match = url.match(/\/action\/([^/?]+)/);

  return match ? match[1] : undefined;
}

export function useErrorToast() {

  return (error: AxiosError) => {
    const status = error.response?.status;

    if (status === 403) {
      const apiName = extractApiNameFromError(error);
      const message = apiName
        ? "error.noPermissions"
        : "error.noPermissions.generic";

      toast.error(message);
      return;
    }

    // toast.error(t("common.error"));
    toast.error(error.message);
  };
}
