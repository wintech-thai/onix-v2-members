import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const PrivilegeCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      {/* Image placeholder */}
      <div className="relative h-48 bg-muted">
        <div className="flex h-full items-center justify-center">
          <Skeleton className="h-16 w-16 rounded-full bg-muted-foreground/20" />
        </div>
      </div>

      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-5 w-full" />
        </div>
      </CardHeader>

      <CardContent className="space-y-3 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1">
            <Skeleton className="h-7 w-16" />
            <Skeleton className="h-4 w-10" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>

        <Skeleton className="h-9 w-full" />
      </CardContent>
    </Card>
  );
};

export const PrivilegeListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 pb-4">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <PrivilegeCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const PrivilegeHistoryCardSkeleton = () => {
  return (
    <Card className="flex flex-row overflow-hidden">
      {/* Image placeholder */}
      <Skeleton className="h-24 w-24 shrink-0 rounded-none bg-muted ml-4" />

      <CardContent className="flex flex-1 flex-col justify-between p-3">
        <div className="space-y-2">
          <div className="flex justify-between gap-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </CardContent>
    </Card>
  );
};

export const PrivilegeHistoryListSkeleton = () => {
  return (
    <div className="space-y-3 pb-4">
      {[1, 2, 3, 4, 5].map((i) => (
        <PrivilegeHistoryCardSkeleton key={i} />
      ))}
    </div>
  );
};
