// Hooks
import { useTranslations } from "next-intl";

// Components
import { Link } from "@/config/i18n/routing";
import { buttonVariants } from "@repo/ui/components/button";

// Icons
import { ArrowLeft } from "lucide-react";

export function BackToHomeButton() {
  const t = useTranslations("buttons");

  return (
    <div className="my-3 flex max-w-28">
      <Link
        href="/"
        className={`items-center gap-2 relative group ${buttonVariants({
          variant: "link",
        })}`}
      >
        <ArrowLeft
          className="transition-transform ease-in-out duration-300 transform translate-x-0 group-hover:-translate-x-1"
          size=".85rem"
        />
        {t("backButton")}
      </Link>
    </div>
  );
}
