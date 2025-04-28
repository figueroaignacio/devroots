// Components
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import Link from "next/link";
import { OAuthProviders } from "./oauth-providers";

interface FormWrapperProps {
  children: React.ReactNode;
  title: string;
  description: string;
  backLinkHref: string;
  backLinkLabel: string;
  className?: string;
}

export function FormWrapper({
  backLinkHref,
  backLinkLabel,
  children,
  description,
  title,
  className,
}: FormWrapperProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <div className="flex flex-col gap-3 mt-6">
          <OAuthProviders />
        </div>
        <div className="mt-4 text-center text-sm">
          <Button asChild variant="link" className="p-0">
            <Link href={backLinkHref} className="underline underline-offset-4">
              {backLinkLabel}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
