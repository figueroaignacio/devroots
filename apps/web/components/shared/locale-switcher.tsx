"use client";

// Hooks
import { usePathname, useRouter } from "@/config/i18n/routing";
import { useLocale } from "next-intl";
import { useTransition } from "react";

// Components
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

// Icons
import { Languages } from "lucide-react";

// Config
import { locales } from "@/config/i18n/routing";

// Types
import { Locale } from "@/lib/definitions";

export function LocaleSwitcher() {
  const router = useRouter();
  const [_, startTransition] = useTransition();
  const pathname = usePathname();
  const locale = useLocale();

  function onLocaleChange(value: string) {
    const newLocale = value as Locale;
    startTransition(() => {
      router.replace({ pathname }, { locale: newLocale });
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          <Languages size={16} />
          <span>{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        {locales.map((localeOption) => (
          <DropdownMenuItem
            key={localeOption}
            onClick={() => onLocaleChange(localeOption)}
            className={`flex items-center justify-between ${
              locale === localeOption ? "text-accent-foreground" : ""
            }`}
          >
            {localeOption.toUpperCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
