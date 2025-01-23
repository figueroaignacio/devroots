import { cn } from "@repo/ui/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-[#dde3ea] dark:bg-muted-foreground/15",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
