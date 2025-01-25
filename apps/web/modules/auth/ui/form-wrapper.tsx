"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";
import { FormLink } from "./form-link";
import { Providers } from "./providers";

interface FormWrapperProps {
  children: React.ReactNode;
  label?: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export function FormWrapper({
  backButtonHref = "",
  backButtonLabel = "",
  children,
  label,
  showSocial,
}: FormWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader className="text-2xl font-semibold text-center">
        {label}
      </CardHeader>
      {showSocial && (
        <CardContent>
          <Providers />
          <div className="relative mt-8">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              Or continue with email
            </span>
          </div>
        </CardContent>
      )}
      <CardContent>{children}</CardContent>
      <CardFooter>
        <FormLink label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
}
