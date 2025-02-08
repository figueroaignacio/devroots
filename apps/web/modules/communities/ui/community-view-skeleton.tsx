import { Skeleton } from "@repo/ui/components/skeleton";

export function CommunityViewSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Skeleton className="h-10 w-3/4 mb-4" />
      <Skeleton className="h-4 w-full mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </div>
        <div>
          <Skeleton className="h-40 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    </div>
  );
}
