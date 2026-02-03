import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { OrgLayout } from "@/components/layout/org-layout";

export const PointCardSkeleton = () => {
  return (
    <Card className="bg-primary border-none text-primary-foreground">
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24 bg-white/20" />
          <Skeleton className="h-12 w-40 bg-white/30" />
        </div>
        <Skeleton className="h-10 w-full bg-white/20 rounded-lg" />
      </CardContent>
    </Card>
  );
};

export const TransactionListSkeleton = () => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-8 w-20" />
      </div>

      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <Card key={i} className="border-none shadow-none bg-muted/20">
            <CardContent className="flex items-center gap-3 p-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-20" />
              </div>
              <div className="flex flex-col items-end gap-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export const PointPageSkeleton = () => {
  return (
    <OrgLayout>
      <main className="space-y-6 p-4">
        {/* Header Skeleton */}
        <div className="space-y-2 pt-4">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>

        <PointCardSkeleton />
        <TransactionListSkeleton />
      </main>
    </OrgLayout>
  );
};
