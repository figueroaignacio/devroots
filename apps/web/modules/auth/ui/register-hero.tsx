// Hooks
import { useTranslations } from "next-intl";

// Components
import { Logo } from "@/components/shared/logo";
import { CheckCircle } from "lucide-react";

interface Feature {
  title: string;
}

export function RegisterHero() {
  const t = useTranslations();
  const features = t.raw("register.hero.items") as Feature[];

  return (
    <div className="lg:flex flex-col justify-center p-8 max-w-2xl mx-auto lg:mx-0 hidden">
      <Logo />
      <h2 className="text-4xl lg:text-5xl font-bold leading-tight text-primary-900 my-6">
        {t("register.hero.title")}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="flex flex-col gap-3 bg-card p-4 rounded-lg text-foreground border gradient-background text-white"
          >
            <CheckCircle className="w-6 h-6 flex-shrink-0" />
            <span className="font-medium">{feature.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
