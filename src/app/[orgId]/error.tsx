"use client";

import { OrgLayout } from "@/components/layout/org-layout";
import { ErrorState } from "@/components/ui/error-state";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Next.js Error Boundary for [orgId] pages.
 * Automatically wrapped by the parent layout — OrgLayout renders header + nav.
 * Catches throwOnError from react-query and any other unhandled rendering errors.
 */
const ErrorPage = ({ error }: ErrorPageProps) => {
  return (
    <OrgLayout>
      <ErrorState
        error={error}
        onRetry={() => window.location.reload()}
        showGoBack={true}
      />
    </OrgLayout>
  );
};

export default ErrorPage;
