"use client";

// Hooks
import { useToast } from "@repo/ui/hooks/use-toast";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Components
import { Loader } from "@/components/shared/loader";
import { FormError } from "./form-error";
import { FormSuccess } from "./form-success";
import { FormWrapper } from "./form-wrapper";

// Utils
import { newVerification } from "../lib/actions";

export function NewVerificationForm() {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token");
      return;
    }

    try {
      const data = await newVerification(token);
      setSuccess(data.success);
      setError(data.error);
      if (data.success) {
        toast({
          title: "Redirecting to login page...",
        });
        setTimeout(() => {
          router.push("/auth/login");
        }, 2000);
      }
    } catch (error) {
      setError("Something went wrong");
    }
  }, [token, router, toast]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div className="min-h-[80dvh] grid place-items-center">
      <FormWrapper label="Confirming your verification">
        <div className="flex justify-center">
          {!success && !error && <Loader />}
          <FormSuccess message={success} />
          <FormError message={error} />
        </div>
      </FormWrapper>
    </div>
  );
}
