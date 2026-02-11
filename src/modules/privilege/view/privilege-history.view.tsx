"use client";

import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PrivilegeHistoryCard } from "../components/PrivilegeHistoryCard";
import { RouteConfig } from "@/config/route.config";
import { useGetVouchers, useGetVoucherCount } from "../hooks/privilege.hooks";
import { PrivilegeHistoryListSkeleton } from "../components/PrivilegePageSkeleton";
import { keepPreviousData } from "@tanstack/react-query";
import { OrgLayout } from "@/components/layout/org-layout";
import { LoadingBackdrop } from "@/components/ui/loading-backdrop";
import { useTranslation } from "react-i18next";

const ITEMS_PER_PAGE = 10;

const PrivilegeHistoryViewPage = () => {
  const { t } = useTranslation("privilege");
  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const [page, setPage] = useState(1);

  const { data: voucherCountResponse, refetch: refetchVoucherCount } =
    useGetVoucherCount(
      {
        orgId: params.orgId,
      },
      {}
    );

  const voucherCount = voucherCountResponse?.data || 0;

  const getVoucher = useGetVouchers(
    {
      orgId: params.orgId,
    },
    {
      offset: (page - 1) * ITEMS_PER_PAGE,
      limit: ITEMS_PER_PAGE,
    },
    {
      placeholderData: keepPreviousData,
      refetchOnWindowFocus: true,
    }
  );

  const vouchers = getVoucher.data?.data || [];
  const totalPages = Math.ceil(voucherCount / ITEMS_PER_PAGE);

  const handleBack = () => {
    router.push(RouteConfig.PRIVILEGE.LIST(params.orgId));
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((p) => p - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage((p) => p + 1);
  };

  return (
    <OrgLayout>
      {/* Loading Backdrop for background refreshes */}
      <LoadingBackdrop show={!getVoucher.isLoading && getVoucher?.isFetching} />
      {/* Main content with bottom padding for navigation */}
      <main>
        {/* Header with back button */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="h-9 w-9"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{t("history.pageTitle")}</h1>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              getVoucher.refetch();
              refetchVoucherCount();
            }}
          >
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">{t("refresh")}</span>
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-275px)]">
          {getVoucher.isLoading ? (
            <PrivilegeHistoryListSkeleton />
          ) : (
            <div className="space-y-4 pb-4">
              {vouchers && vouchers.length > 0 ? (
                <div className="space-y-2">
                  {vouchers.map((voucher) => (
                    <PrivilegeHistoryCard
                      key={voucher.id}
                      history={{
                        id: voucher.id,
                        title:
                          voucher.privilegeName || voucher.description || "",
                        points: voucher?.redeemPrice ?? 0,
                        redeemedAt: new Date(voucher.createdDate),
                        status:
                          voucher.status === "used" || voucher.isUsed === "YES"
                            ? "used"
                            : "unused",
                        expiryDate: voucher.endDate
                          ? new Date(voucher.endDate)
                          : undefined,
                        voucherCode: voucher.voucherNo,
                        imageUrl: "",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="flex h-60 flex-col items-center justify-center text-center">
                  <p className="text-muted-foreground">
                    {t("history.noVouchersFound")}
                  </p>
                  <Button variant="link" onClick={handleBack} className="mt-2">
                    {t("history.browsePrivileges")}
                  </Button>
                </div>
              )}
            </div>
          )}
        </ScrollArea>

        {/* Pagination Controls */}
        {!getVoucher.isLoading && voucherCount > 0 && (
          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={page <= 1}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              {t("history.previous")}
            </Button>
            <span className="text-sm text-muted-foreground">
              {t("history.pageInfo", { current: page, total: totalPages || 1 })}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={page >= totalPages}
            >
              {t("history.next")}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        )}
      </main>
    </OrgLayout>
  );
};

export default PrivilegeHistoryViewPage;
