"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/modules/point/components/BottomNavigation";

// Mock voucher data - replace with real data from API
const mockVoucher = {
  id: "v1",
  title: "Free Coffee at Starbucks",
  description:
    "Enjoy a complimentary coffee of your choice at any Starbucks location",
  voucherCode: "STAR-2024-ABC123",
  redeemedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2), // 2 days ago
  expiryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 28), // 28 days from now
  status: "unused" as "used" | "unused",
  points: 500,
  category: "Food & Beverage",
  imageUrl:
    "https://ghbloyalty.ghbank.co.th/api/rewards/image/632?t=1732873911000",
  terms: [
    "Valid at all Starbucks locations nationwide",
    "One voucher per transaction",
    "Cannot be combined with other promotions",
    "No cash value",
    "Present this voucher code before payment",
  ],
};

const VoucherDetailViewPage = () => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleUseVoucher = () => {
    console.log("Use voucher:", mockVoucher.id);
    // TODO: Implement voucher usage logic
    // This would typically mark the voucher as used in the backend
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isExpired = mockVoucher.expiryDate < new Date();
  const isUsed = mockVoucher.status === "used";
  const canUse = !isExpired && !isUsed;

  return (
    <div className="min-h-screen bg-background">
      {/* Main content with bottom padding for navigation */}
      <main className="mx-auto max-w-md sm:max-w-lg md:max-w-2xl lg:max-w-4xl p-4 sm:p-6 md:p-8 pb-24 md:pb-24">
        {/* Header with back button */}
        <div className="flex items-center gap-3 pb-6 pt-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Voucher Details</h1>
          </div>
        </div>

        {/* Voucher Image */}
        <div className="relative mb-6 h-48 overflow-hidden rounded-lg bg-muted">
          {mockVoucher.imageUrl ? (
            <img
              src={mockVoucher.imageUrl}
              alt={mockVoucher.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-muted-foreground">
                  {mockVoucher.category}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Voucher Info */}
        <div className="space-y-6">
          {/* Title and Status */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-2xl font-bold">{mockVoucher.title}</h2>
              <Badge variant={isUsed ? "secondary" : "default"}>
                {isUsed ? "Used" : "Available"}
              </Badge>
            </div>
            <p className="text-muted-foreground">{mockVoucher.description}</p>
          </div>

          {/* Voucher Code Card */}
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Voucher Code</p>
                  <p className="mt-2 font-mono text-2xl font-bold tracking-wider">
                    {mockVoucher.voucherCode}
                  </p>
                </div>

                {/* QR Code Placeholder */}
                <div className="flex justify-center">
                  <div className="flex h-48 w-48 items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted">
                    <p className="text-sm text-muted-foreground">QR Code</p>
                  </div>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  Show this code to redeem your voucher
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Expiry Info */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {isExpired ? "Expired on" : "Valid until"}
                  </p>
                  <p
                    className={`text-sm ${
                      isExpired ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {formatDate(mockVoucher.expiryDate)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Terms and Conditions */}
          <Card>
            <CardContent className="p-4">
              <h3 className="mb-3 font-semibold">Terms & Conditions</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {mockVoucher.terms.map((term, index) => (
                  <li key={index} className="flex gap-2">
                    <span className="text-primary">•</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Use Voucher Button */}
          {canUse && (
            <Button onClick={handleUseVoucher} className="w-full" size="lg">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Mark as Used
            </Button>
          )}

          {isUsed && (
            <div className="rounded-lg border border-muted bg-muted/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">
                This voucher has been used
              </p>
            </div>
          )}

          {isExpired && !isUsed && (
            <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-center">
              <p className="text-sm text-destructive">
                This voucher has expired
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default VoucherDetailViewPage;
