// Hooks
import { useTranslations } from "next-intl";

// Components
import { Link } from "@/config/i18n/routing";
import { Button } from "@repo/ui/components/button";

export function Hero() {
  const t = useTranslations();

  return (
    <div className="overflow-x-hidden lg:min-h-[70dvh] flex justify-center items-center relative">
      <div className="absolute inset-0 -z-50">
        <img
          className="h-full w-full object-cover opacity-10"
          src="/images/hero-bg-2.png"
          alt="Grid Background"
        />
      </div>

      <section className="relative px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-lg font-semibold">
              {t.rich("hero.title", {
                span: (chunks) => <span>{chunks}</span>,
              })}
            </h1>
            <p className="mt-5 text-4xl font-extrabold leading-tight sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight relative">
              <span>{t("hero.subtitle")}</span>
              <span className="relative">
                <span className="absolute inset-0 h-full w-full scale-90 bg-gradient-to-r from-violet-400 via-pink-400 to-violet-300 opacity-30 blur-xl filter -z-40"></span>
                Devs.
              </span>
            </p>
            <div className="mt-10 gap-4 flex justify-center">
              <Button asChild className="w-full sm:w-auto">
                <Link href="/auth/register">{t("hero.ctaPrimary")}</Link>
              </Button>
              <Button asChild variant="link" className="w-full sm:w-auto">
                <Link href="/blog">{t("hero.ctaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
