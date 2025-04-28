"use client";

// Hooks
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/auth-store";

// Components
import { Loader } from "@/components/loader";
import { Button } from "@workspace/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@workspace/ui/components/form";
import { Input } from "@workspace/ui/components/input";
import { FormWrapper } from "./form-wrapper"; // <--- Importamos el wrapper

// Utils
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import {
  LoginFormSchema,
  loginFormSchema,
} from "@/modules/auth/schemas/login-schema";

export function LoginForm({ className }: { className?: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { login } = useAuthStore();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    startTransition(async () => {
      try {
        await login(values.email, values.password);
        router.push("/dashboard");
      } catch (error: any) {
        form.setError("root", { type: "server", message: error.message });
      }
    });
  }

  return (
    <FormWrapper
      title="Login to your account"
      description="Enter your email below to login to your account"
      backLinkHref="/auth/register"
      backLinkLabel="Don't have an account? Sign up"
      className={className}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="m@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? <Loader /> : "Log in"}
          </Button>
        </form>
      </Form>
    </FormWrapper>
  );
}
