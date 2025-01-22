// Hooks
import { useTranslations } from "next-intl";

// Components
import { Link } from "@/config/i18n/routing";
import { Button } from "@repo/ui/components/button";

// Icons
import { LogIn } from "lucide-react";

type LoginButtonProps = {
  href?: string;
};

export function LoginButton({ href = "/auth/login" }: LoginButtonProps) {
  const t = useTranslations("actionButtons");

  return (
    <Button variant="outline" asChild>
      <Link href={href}>
        {t("login")}
        <LogIn className="size-4 ml-2" />
      </Link>
    </Button>
  );
}
