"use client";

// Hooks
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
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
  const { theme } = useTheme();
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
          title: "Login failed",
          description: "There was an issue logging in. Please try again.",
        });
      } else {
        toast({
          title: "Login Successful!",
          description: "Welcome back! You have successfully logged in.",
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
    <div className="container mx-auto max-w-md">
      <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
              href="/forgot-password"
              className="text-sm text-blue-600 hover:underline"
            >
              {t("forgotPassword")}
            </Link>
          </div>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? t("submitting") : t("submit")}
          </Button>
        </form>
      </Form>
      <Separator className="my-7" />
      <div className="mt-4">
        <GitHubButton handleGitHubAuth={handleGitHubSignIn} />
      </div>
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
