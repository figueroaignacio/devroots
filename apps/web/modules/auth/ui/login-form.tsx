"use client";

// Hooks
import { useRouter } from "@/config/i18n/routing";
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

// Components
import { Github } from "@/components/shared/tech-icons";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "@/config/i18n/routing";
import { Loader2 } from "lucide-react";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";

// Schema
import { z } from "zod";
import { loginAction } from "../lib/actions";
import { loginSchema } from "../lib/schemas";

export function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

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
          title: "toast.error.title",
          description: "toast.error.description",
        });
      } else {
        toast({
          title: "toast.success.title",
          description: "toast.success.description",
          variant: "success",
          duration: 4000,
        });
        router.push("/hub");
      }
    });
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Log in to devs
        </CardTitle>
        <CardDescription className="text-center">Welcome back</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-3"
          >
            <Github />
            Continue with GitHub
          </Button>
        </div>
        <div className="relative mb-6">
          <div className="relative flex justify-center items-center text-xs">
            <div className="w-20 h-[1px] bg-muted-foreground" />
            <span className="px-2 text-muted-foreground">Or continue with</span>
            <div className="w-20 h-[1px] bg-muted-foreground" />
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe@email.com"
                      type="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {error && <FormMessage>{error}</FormMessage>}
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? (
                <>
                  Wait a moment...
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-muted-foreground">
          Do not have an account?{" "}
          <Link href="/auth/register" className="text-primary underline">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
