"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Filter, RefreshCw, SearchIcon, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/custom-input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PrivilegeCard } from "../components/PrivilegeCard";
import { RouteConfig } from "@/config/route.config";
import {
  useGetRedeemablePrivileges,
  useRedeemPrivilegesById,
} from "../hooks/privilege.hooks";
import { PrivilegeListSkeleton } from "../components/PrivilegePageSkeleton";
import { LoadingBackdrop } from "@/components/ui/loading-backdrop";
import { useDebounceValue } from "usehooks-ts";
import { keepPreviousData } from "@tanstack/react-query";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { getRedeemablePrivilegesApi } from "../api/privilege.api";
import { PrivilegeRedemptionDialog } from "../components/PrivilegeRedemptionDialog";
import { OrgLayout } from "@/components/layout/org-layout";

const PrivilegeViewPage = () => {
  const router = useRouter();
  const params = useParams<{ orgId: string }>();
  const queryClient = useQueryClient();

  const [searchTermInput, setSearchTermInput] = useState("");
  const [debouncedSearchTerm] = useDebounceValue(searchTermInput, 500);
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "expired"
  >("all");
  const [redeemTarget, setRedeemTarget] = useState<{
    id: string;
    points: number;
    title: string;
    imageUrl?: string;
    description?: string;
    expiryDate?: Date;
  } | null>(null);
  const [isManualRefetching, setIsManualRefetching] = useState(false);

  const handleManualRefresh = async () => {
    setIsManualRefetching(true);
    try {
      await refetch();
    } finally {
      setIsManualRefetching(false);
    }
  };

  // Debounce search term manually if hook not guaranteed, but for now direct state is fine for low volume
  // refined: use a simple effect if needed, but let's pass it directly for responsiveness

  const {
    data: privileges,
    isLoading,
    isFetching,
    refetch,
  } = useGetRedeemablePrivileges(
    {
      orgId: params.orgId,
    },
    {
      fromDate: undefined,
      toDate: undefined,
      offset: undefined,
      limit: undefined,
      fullTextSearch: debouncedSearchTerm || undefined,
      status:
        filterStatus !== "all"
          ? filterStatus === "active"
            ? "ACTIVE"
            : "EXPIRE"
          : undefined,
    },
    {
      placeholderData: keepPreviousData,
    }
  );

  const redeemMutation = useRedeemPrivilegesById({
    onSuccess: ({ data }) => {
      if (data.status !== "OK" && data.status !== "SUCCESS") {
        toast.error(data.description);
        setRedeemTarget(null);
        return;
      }

      setRedeemTarget(null);

      setIsManualRefetching(true);
      queryClient.invalidateQueries({
        queryKey: getRedeemablePrivilegesApi.key,
      });
      setIsManualRefetching(false);

      toast.success("Redeem success");
    },
    onError: (error) => {
      console.error("Redeem error:", error);
      toast.error(error.message);
    },
  });

  const handleRedeemClick = (
    privilegeId: string,
    points: number,
    title: string,
    description: string,
    expiryDate: Date | undefined,
    imageUrl?: string
  ) => {
    setRedeemTarget({
      id: privilegeId,
      points,
      title,
      description,
      expiryDate,
      imageUrl,
    });
  };

  const handleConfirmRedeem = () => {
    if (redeemTarget) {
      redeemMutation.mutate({
        params: {
          orgId: params.orgId,
          privilegeId: redeemTarget.id,
        },
      });
    }
  };

  const handleViewMyVouchers = () => {
    router.push(RouteConfig.PRIVILEGE.HISTORY(params.orgId));
  };

  return (
    <OrgLayout>
      {/* Main content with bottom padding for navigation */}
      {/* Header */}
      <div className="sticky top-16 z-10 flex flex-col gap-4 bg-background pb-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Privileges</h1>
            <p className="text-sm text-muted-foreground">
              Redeem exclusive rewards with your points
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleManualRefresh}
              disabled={isManualRefetching}
            >
              <RefreshCw
                className={`h-4 w-4 ${
                  isManualRefetching ? "animate-spin" : ""
                }`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
            <Button onClick={handleViewMyVouchers} className="gap-2">
              <Ticket className="h-4 w-4" />
              <span className="hidden sm:inline">My Vouchers</span>
            </Button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              placeholder="Search privileges..."
              value={searchTermInput}
              onChange={(e) => setSearchTermInput(e.target.value)}
              startContent={<SearchIcon className="h-4 w-4" />}
            />
          </div>
          <Select
            value={filterStatus}
            onValueChange={(value: "all" | "active" | "expired") =>
              setFilterStatus(value)
            }
          >
            <SelectTrigger size="lg">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent side="bottom" align="start">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Privilege List */}
      <ScrollArea>
        {isLoading ? (
          <PrivilegeListSkeleton />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
            {privileges?.data?.map((privilege) => (
              <PrivilegeCard
                key={privilege.id}
                privilege={{
                  id: privilege.id,
                  title: privilege.description || privilege.code,
                  description: privilege.narrative || "",
                  points: privilege.pointRedeem || 0,
                  imageUrl: privilege.images?.[0] || "",
                  expiryDate: privilege.expireDate
                    ? new Date(privilege.expireDate)
                    : undefined,
                  category: privilege.tags || "General",
                  quota: privilege.currentBalance || 0,
                }}
                onRedeem={(id, points) =>
                  handleRedeemClick(
                    id,
                    points,
                    privilege.description || privilege.code || "",
                    privilege.narrative || "",
                    privilege.expireDate
                      ? new Date(privilege.expireDate)
                      : undefined,
                    privilege.images?.[0]
                  )
                }
              />
            ))}
            {!isLoading && privileges?.data?.length === 0 && (
              <div className="col-span-full py-12 text-center text-muted-foreground">
                No privileges found
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Loading Backdrop for background refreshes - shown if manual refresh OR if fetching without search term */}
      <LoadingBackdrop
        show={
          isManualRefetching || (!searchTermInput && !isLoading && isFetching)
        }
      />

      {/* Redemption Confirmation Dialog */}
      <PrivilegeRedemptionDialog
        open={!!redeemTarget}
        onOpenChange={(open) => !open && setRedeemTarget(null)}
        target={redeemTarget}
        onConfirm={handleConfirmRedeem}
        isPending={redeemMutation.isPending}
      />
    </OrgLayout>
  );
};

export default PrivilegeViewPage;
