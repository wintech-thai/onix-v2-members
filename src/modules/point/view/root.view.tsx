"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import {
  PointCardSkeleton,
  TransactionListSkeleton,
} from "../components/PointPageSkeleton";
import {
  useGetPointTransactionQuery,
  useGetWalletQuery,
} from "../hooks/point-api.hooks";
import { OrgLayout } from "@/components/layout/org-layout";
import { Button } from "@/components/ui/button";
import { QRScannerDialog } from "@/components/ui/qr-scanner-dialog";
import { RefreshCw, QrCode } from "lucide-react";
import { PointCard } from "../components/PointCard";
import { PointTransactionList } from "../components/PointTransactionList";
import { useTranslation } from "react-i18next";
import { ResponsiveConfirmation } from "@/components/ui/responsive-confirmation";
import { LoadingBackdrop } from "@/components/ui/loading-backdrop";

const RootViewPage = () => {
  const params = useParams<{ orgId: string }>();
  const { t } = useTranslation(["point", "common"]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedUrl, setScannedUrl] = useState<string | null>(null);

  const getWallet = useGetWalletQuery(
    {
      orgId: params.orgId,
    },
    null,
    {
      // refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );
  const getPointTransaction = useGetPointTransactionQuery(
    {
      orgId: params.orgId,
    },
    null,
    {
      // refetchOnWindowFocus: true,
      staleTime: 0,
    }
  );

  const handleBuyPoints = () => {
    console.log("Buy points clicked");
    // TODO: Navigate to buy points page
  };

  const handleRefresh = () => {
    getWallet.refetch();
    getPointTransaction.refetch();
  };

  const handleScanQR = () => {
    setIsScannerOpen(true);
  };

  const handleQRScanSuccess = (decodedText: string) => {
    // We keep the logic simple here, just ensure it's a valid URL format
    const url = decodedText.startsWith("http")
      ? decodedText
      : `https://${decodedText}`;

    setScannedUrl(url);
    setIsScannerOpen(false);
  };

  const handleConfirmNav = () => {
    if (scannedUrl) {
      // Redirect to our internal API which will inject the header and redirect to the final URL
      const proxyUrl = `/api/qr-navigate?url=${encodeURIComponent(scannedUrl)}`;
      window.open(proxyUrl, "_blank", "noopener,noreferrer");
      setScannedUrl(null);
    }
  };

  const isLoading = getWallet.isLoading || getPointTransaction.isLoading;
  const walletPayload = getWallet.data?.data.wallet;
  const transactions = (getPointTransaction.data?.data || []).slice(0, 6);

  if (!isLoading && !walletPayload) {
    throw new Error(getWallet.data?.data.description);
  }

  const isRefreshing = getWallet.isFetching || getPointTransaction.isFetching;

  return (
    <OrgLayout>
      <div className="bg-background h-full overflow-y-auto">
        {/* Organization Header */}

        {/* Main content with bottom padding for navigation */}
        <main className="space-y-6 p-4">
          {/* Header with Actions */}
          <div className="flex items-start justify-between pt-4">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">{t("common:welcome")}</h1>
              <p className="text-sm text-muted-foreground">
                {t("manageYourPoint")}
              </p>
            </div>

            <div className="flex gap-2">
              {/* Refresh Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="h-10 w-10"
              >
                <RefreshCw
                  className={`h-5 w-5 ${isRefreshing ? "animate-spin" : ""}`}
                />
              </Button>

              {/* Scan QR Button */}
              <Button
                variant="default"
                size="icon"
                onClick={handleScanQR}
                className="h-10 w-10"
              >
                <QrCode className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Point Card */}
          {isLoading ? (
            <PointCardSkeleton />
          ) : (
            <PointCard
              points={walletPayload?.pointBalance ?? 0}
              onBuyPoints={handleBuyPoints}
            />
          )}

          {/* Transaction List */}
          {isLoading ? (
            <TransactionListSkeleton />
          ) : (
            <PointTransactionList transactions={transactions} />
          )}
        </main>

        {/* QR Scanner Dialog */}
        <QRScannerDialog
          open={isScannerOpen}
          onOpenChange={setIsScannerOpen}
          onScanSuccess={handleQRScanSuccess}
        />

        {/* Confirmation Dialog for opening URL */}
        <ResponsiveConfirmation
          open={!!scannedUrl}
          onOpenChange={(open) => !open && setScannedUrl(null)}
          title={t("common:dialog.openLink.title")}
          message={t("common:dialog.openLink.message", { url: scannedUrl })}
          variant="default"
          confirmButton={t("common:dialog.openLink.confirm")}
          cancelButton={t("common:button.cancel")}
          onConfirm={handleConfirmNav}
          onCancel={() => setScannedUrl(null)}
        />

        {/* Loading Backdrop for background refreshes */}
        <LoadingBackdrop show={!isLoading && isRefreshing} />
      </div>
    </OrgLayout>
  );
};

export default RootViewPage;
