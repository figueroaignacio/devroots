"use client";

// Components
import { Link } from "@/config/i18n/routing";
import { Button } from "@repo/ui/components/button";

interface FormLinkProps {
  href: string;
  label: string;
}

export function FormLink({ href, label }: FormLinkProps) {
  return (
    <Button variant="link" asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
}
