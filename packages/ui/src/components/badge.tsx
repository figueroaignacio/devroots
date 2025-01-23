import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@repo/ui/lib/utils";
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[.625rem] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-violet-500 text-white dark:hover:brightness-125",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        tag: "dark:bg-gray-600 dark:bg-opacity-30 border-none bg-gray-300 bg-opacity-50 dark:hover:brightness-125",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
