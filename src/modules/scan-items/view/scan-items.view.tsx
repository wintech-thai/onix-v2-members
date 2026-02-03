"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Package,
  Calendar,
  Barcode,
  Hash,
  Link as LinkIcon,
} from "lucide-react";

import { OrgLayout } from "@/components/layout/org-layout";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

// Mock Data Type
interface ScanItem {
  id: string;
  orgId: string;
  serial: string;
  pin: string;
  tags: null | string;
  productCode: string | null;
  sequenceNo: string;
  url: string;
  runId: string;
  uploadedPath: string;
  itemGroup: string;
  registeredFlag: "TRUE" | "FALSE";
  scanCount: number | null;
  usedFlag: null | string;
  itemId: null | string;
  appliedFlag: null | string;
  customerId: null | string;
  folderId: string;
  createdDate: string;
  registeredDate: string | null;
  scanItemActionId: null | string;
  scanItemActionName: null | string;
  productId: null | string;
  productDesc: null | string;
  customerEmail: null | string;
  folderName: string;
  productDescLegacy: null | string;
  productCodeLegacy: null | string;
}

// Generate Mock Data
const generateMockData = (count: number): ScanItem[] => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `id-${i}`,
    orgId: "pjame16",
    serial: `IF${(274 + i).toString().padStart(6, "0")}`,
    pin: `G*****${String.fromCharCode(65 + (i % 26))}`,
    tags: null,
    productCode: i % 3 === 0 ? "PROD-001" : null,
    sequenceNo: `${274 + i}`,
    url: `https://scan-dev.please-scan.com/org/pjame16/Verify/IF${(274 + i)
      .toString()
      .padStart(6, "0")}/G*****Z`,
    runId: `NG${6 + (i % 5)}`,
    uploadedPath: "gs://onix-v2-artifacts/...",
    itemGroup: "dev/ScanItems",
    registeredFlag: i % 5 === 0 ? "TRUE" : "FALSE",
    scanCount: i % 4 === 0 ? 1 : null,
    usedFlag: null,
    itemId: null,
    appliedFlag: null,
    customerId: null,
    folderId: "82b6735e-f812-43a4-b034-3b8bc2edefc8",
    createdDate: "2025-12-23T18:51:45.697839Z",
    registeredDate: i % 5 === 0 ? "2025-12-24T10:00:00.000Z" : null,
    scanItemActionId: null,
    scanItemActionName: null,
    productId: null,
    productDesc: null,
    customerEmail: null,
    folderName: "dev",
    productDescLegacy: null,
    productCodeLegacy: null,
  }));
};

const MOCK_DATA = generateMockData(45);
const ITEMS_PER_PAGE = 10;

const ScanItemViewPage = () => {
  const { t } = useTranslation("scan-item");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = MOCK_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <OrgLayout>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
            <p className="text-muted-foreground mt-1">{t("description")}</p>
          </div>
        </div>

        <Card className="border-none bg-transparent shadow-none">
          <CardHeader className="">
            <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
              <div className="flex-1 uppercase">{t("columns.serial")}</div>
              <div className="flex-1 uppercase">{t("columns.pin")}</div>
              <div className="flex-1 uppercase">
                {t("columns.product-code")}
              </div>
              {/* Spacer for chevron */}
              <div className="w-4"></div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full">
              {currentItems.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b"
                >
                  <AccordionTrigger className="hover:no-underline py-4 px-4 cursor-pointer">
                    <div className="flex flex-1 items-center justify-between text-left">
                      <div className="flex-1 font-mono font-medium">
                        {item.serial}
                      </div>
                      <div className="flex-1 font-mono text-muted-foreground">
                        {item.pin}
                      </div>
                      <div className="flex-1">
                        {item.productCode ? (
                          <Badge variant="outline" className="font-normal">
                            {item.productCode}
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground/50 text-sm">
                            -
                          </span>
                        )}
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pt-2">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 bg-muted/30 p-4 rounded-lg border">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
                          <Barcode className="h-3.5 w-3.5" />
                          {t("details.sequence-no")}
                        </div>
                        <div className="text-sm font-medium">
                          {item.sequenceNo}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
                          <Calendar className="h-3.5 w-3.5" />
                          {t("timestamps.created")}
                        </div>
                        <div className="text-sm font-medium">
                          {dayjs(item.createdDate).format("D MMM YYYY, HH:mm")}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
                          <Calendar className="h-3.5 w-3.5" />
                          {t("timestamps.registered")}
                        </div>
                        <div className="text-sm font-medium">
                          {item.registeredDate
                            ? dayjs(item.registeredDate).format(
                                "D MMM YYYY, HH:mm"
                              )
                            : "-"}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
                          <Package className="h-3.5 w-3.5" />
                          {t("attributes.box-group")}
                        </div>
                        <div className="text-sm font-medium break-all">
                          {item.itemGroup}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
                          <Hash className="h-3.5 w-3.5" />
                          {t("details.run-id")}
                        </div>
                        <div className="text-sm font-medium">{item.runId}</div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
                          {t("columns.status")}
                        </div>
                        <div className="flex gap-2">
                          <Badge
                            variant={
                              item.registeredFlag === "TRUE"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {item.registeredFlag === "TRUE"
                              ? t("status.registered")
                              : t("status.not-registered")}
                          </Badge>
                          {item.scanCount !== null && (
                            <Badge variant="outline">
                              {t("status.scanned", { count: item.scanCount })}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="col-span-full space-y-1">
                        <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground uppercase">
                          <LinkIcon className="h-3.5 w-3.5" />
                          {t("attributes.url")}
                        </div>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm text-primary hover:underline break-all"
                        >
                          {item.url}
                        </a>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("pagination.showing", {
              start: startIndex + 1,
              end: Math.min(startIndex + ITEMS_PER_PAGE, MOCK_DATA.length),
              total: MOCK_DATA.length,
            })}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              {t("pagination.previous")}
            </Button>
            <div className="text-sm font-medium min-w-12 text-center">
              {t("pagination.page", {
                current: currentPage,
                total: totalPages,
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              {t("pagination.next")}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </OrgLayout>
  );
};

export default ScanItemViewPage;
