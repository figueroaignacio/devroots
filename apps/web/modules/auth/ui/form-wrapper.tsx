"use client";

// Components
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FormLink } from "./form-link";
import { Social } from "./social";

interface FormWrapperProps {
  children: React.ReactNode;
  label: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export function FormWrapper({
  backButtonHref,
  backButtonLabel,
  children,
  label,
  showSocial,
}: FormWrapperProps) {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>{label}</CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <FormLink label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
}
