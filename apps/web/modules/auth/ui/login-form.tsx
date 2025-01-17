"use client";

// Hooks
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

// Schema
import { LoginSchema } from "../lib/schemas";

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
import { FormError } from "@/modules/auth/ui/form-error";
import { FormSuccess } from "@/modules/auth/ui/form-success";
import { Loader } from "lucide-react";
import { FormWrapper } from "./form-wrapper";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { login } from "../lib/actions";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState<string | undefined>("");
  const [error, setError] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");

    startTransition(() => {
      login(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  }

  return (
    <FormWrapper
      label="Welcome Back!"
      backButtonLabel="Don't have and account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="email@example.com"
                      type="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Your password"
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          {isPending ? (
            <Button type="submit" disabled>
              Logging in...
              <Loader className="size-4 animate-spin" />
            </Button>
          ) : (
            <Button type="submit">Login</Button>
          )}
        </form>
      </Form>
    </FormWrapper>
  );
}
