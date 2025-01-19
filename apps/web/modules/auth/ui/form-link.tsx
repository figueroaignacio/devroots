"use client";

// Components
import { Button } from "@/components/ui/button";
import { Link } from "@/config/i18n/routing";

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
