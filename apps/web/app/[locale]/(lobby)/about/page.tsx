// Hooks
import { useTranslations } from "next-intl";

// Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/config/i18n/routing";

export default function About() {
  const t = useTranslations();
  const values = t.raw("about.myValues.items");

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-12">{t("about.title")}</h1>
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {t("about.mision.title")}
        </h2>
        <p className="leading-relaxed">{t("about.mision.description")}</p>
      </section>
      <Separator className="my-8" />
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {t("about.vision.title")}
        </h2>
        <p className="leading-relaxed">{t("about.vision.description")}</p>
      </section>
      <Separator className="my-8" />
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {t("about.aboutMe.title")}
        </h2>
        <p className="leading-relaxed">{t("about.aboutMe.description")}</p>
      </section>
      <Separator className="my-8" />
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {t("about.myValues.title")}
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
          {values.map(
            (item: { description: string; title: string }, index: number) => (
              <li key={index}>
                <Card className="h-full gradient-background text-white">
                  <CardHeader>
                    <CardTitle>{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                  </CardContent>
                </Card>
              </li>
            )
          )}
        </ul>
      </section>
      <Separator className="my-8" />
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">{t("about.join.title")}</h2>
        <p className="leading-relaxed mb-6">{t("about.join.description")}</p>
        <Button asChild>
          <Link href="/auth/register">{t("about.join.action")}</Link>
        </Button>
      </section>
      <Separator className="my-8" />
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          {t("about.contact.title")}
        </h2>
        <p className="leading-relaxed mb-2">{t("about.contact.description")}</p>
        <a
          href="mailto:ignaciofigueroadev@gmail.com"
          className="text-lg underline font-medium"
        >
          ignaciofigueroadev@gmail.com
        </a>
      </section>
    </div>
  );
}
