"use client";

// Hooks
import { useRouter } from "@/config/i18n/routing";
import { useTranslations } from "next-intl";

// Components
import { Button } from "@repo/ui/components/button";

// Icons
import { ArrowLeft } from "lucide-react";

export function BackButton() {
  const router = useRouter();
  const t = useTranslations("buttons");

  return (
    <Button
      className="items-center gap-2 relative group"
      variant="link"
      onClick={() => router.back()}
    >
      <ArrowLeft
        className="transition-transform ease-in-out duration-300 transform translate-x-0 group-hover:-translate-x-1"
        size=".85rem"
      />
      <span>{t("backButton")}</span>
    </Button>
  );
}
