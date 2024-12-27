// Hooks
import { useTranslations } from "next-intl";

// Components
import { Button } from "@/components/ui/button";
import { Link } from "@/config/i18n/routing";

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
