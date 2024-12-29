"use client";

// Hooks
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
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
import { Link } from "@/config/i18n/routing";
import { GitHubButton } from "./github-button";

// Icons
import { Loader2 } from "lucide-react";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { z } from "zod";
import { registerAction } from "../lib/actions";
import { registerSchema } from "../lib/schemas";

export function RegisterForm() {
  const t = useTranslations("register");
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    setError(null);
    startTransition(async () => {
      const response = await registerAction(values);
      if (response.error) {
        setError(response.error);
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
        });
      } else {
        toast({
          title: "Registration Successful!",
          description: "You have successfully registered. Welcome aboard!",
          variant: "success",
          duration: 4000,
        });
        router.push("/hub");
      }
    });
  }

  const handleGitHubSignUp = () => {
    signIn("github", { callbackUrl: "/hub" });
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <GitHubButton handleGitHubAuth={handleGitHubSignUp} />
      <Separator className="my-6" />
      <p className="text-center text-sm text-gray-600 mb-6">
        {t("orUseEmail")}
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.name.label")}</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("fields.email.label")}</FormLabel>
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
                <FormLabel>{t("fields.password.label")}</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <FormMessage>{error}</FormMessage>}
          <Button
            type={!isPending ? "submit" : undefined}
            disabled={isPending}
            className="w-full"
          >
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
          {t("haveAccount")}{" "}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            {t("login")}
          </Link>
        </p>
      </div>
    </div>
  );
}
