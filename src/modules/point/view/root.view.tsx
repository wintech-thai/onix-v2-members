"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { PointPageSkeleton } from "../components/PointPageSkeleton";
import {
  useGetPointTransactionQuery,
  useGetWalletQuery,
} from "../hooks/point-api.hooks";
import { toast } from "sonner";
import { OrgLayout } from "@/components/layout/org-layout";
import { Button } from "@/components/ui/button";
import { QRScannerDialog } from "@/components/ui/qr-scanner-dialog";
import { RefreshCw, QrCode } from "lucide-react";
import { PointCard } from "../components/PointCard";
import { PointTransactionList } from "../components/PointTransactionList";
import { useTranslation } from "react-i18next";

const RootViewPage = () => {
  const params = useParams<{ orgId: string }>();
  const { t } = useTranslation(["point", "common"]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  const getWallet = useGetWalletQuery(
    {
      orgId: params.orgId,
    },
    null,
    {
      refetchOnWindowFocus: true,
      gcTime: 0,
      staleTime: 0,
    }
  );
  const getPointTransaction = useGetPointTransactionQuery(
    {
      orgId: params.orgId,
    },
    null,
    {
      refetchOnWindowFocus: true,
      gcTime: 0,
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
    console.log("QR Code scanned:", decodedText);
    toast.success("QR Code Scanned!", {
      description: `Code: ${decodedText}`,
    });
    // TODO: Process QR code data (e.g., earn points, redeem rewards)
  };

  if (getWallet.isLoading || getPointTransaction.isLoading) {
    return <PointPageSkeleton />;
  }

  const walletPayload = getWallet.data?.data.wallet;
  const transactions = (getPointTransaction.data?.data || []).slice(0, 6);

  if (!walletPayload) {
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
          <PointCard
            points={walletPayload.pointBalance ?? 0}
            onBuyPoints={handleBuyPoints}
          />

          {/* Transaction List */}
          <PointTransactionList transactions={transactions} />
        </main>

        {/* QR Scanner Dialog */}
        <QRScannerDialog
          open={isScannerOpen}
          onOpenChange={setIsScannerOpen}
          onScanSuccess={handleQRScanSuccess}
        />
      </div>
    </OrgLayout>
  );
};

export default RootViewPage;
