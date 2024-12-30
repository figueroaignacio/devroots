"use client";

// Hooks
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

// Components
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link, useRouter } from "@/config/i18n/routing";
import { signIn } from "next-auth/react";
import { GitHubButton } from "./github-button";

// Icons
import { Loader2 } from "lucide-react";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Schema
import { loginAction } from "../lib/actions";
import { loginSchema } from "../lib/schemas";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const t = useTranslations("login");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await loginAction(values);
      if (response.error) {
        setError(response.error);
        toast({
          variant: "destructive",
          title: t("toast.error.title"),
          description: t("toast.error.description"),
        });
      } else {
        toast({
          title: t("toast.success.title"),
          description: t("toast.success.description"),
          variant: "success",
          duration: 4000,
        });
        router.push("/hub");
      }
    });
  }

  const handleGitHubSignIn = () => {
    signIn("github", { callbackUrl: "/hub" });
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <GitHubButton handleGitHubAuth={handleGitHubSignIn} />
      <Separator className="my-6" />
      <p className="text-center text-sm text-gray-600 mb-6">
        {t("orUseEmail")}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="johndoe@email.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password.label")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("password.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <div className="flex justify-between items-center">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                {t("submitting")}
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              </>
            ) : (
              t("submit")
            )}
          </Button>
        </form>
      </Form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t("noAccount")}{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            {t("signUp")}
          </Link>
        </p>
      </div>
    </div>
  );
}
