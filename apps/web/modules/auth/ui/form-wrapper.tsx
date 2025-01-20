"use client";

// Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
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
          <div className="relative my-4">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
              OR
            </span>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Continue with email
          </p>
        </CardContent>
      )}
      <CardContent>{children}</CardContent>
      <CardFooter>
        <FormLink label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
}
