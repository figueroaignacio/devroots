import { Skeleton } from "@repo/ui/components/skeleton";

export function FeedPostSkeleton() {
  return (
    <div className="bg-card rounded-lg p-6 flex flex-col gap-4 border">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex flex-col gap-y-2">
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <Skeleton className="h-6 w-3/4 mt-2" />
      <Skeleton className="h-4 w-full mt-1" />

      <div className="flex gap-x-3 mt-4">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}
