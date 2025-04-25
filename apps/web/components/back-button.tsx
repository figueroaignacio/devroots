"use client";

// Hooks
import { useRouter } from "next/navigation";

// Components
import { Button } from "@workspace/ui/components/button";

export function BackButton() {
  const router = useRouter();

  function handleBack() {
    router.back();
  }

  return (
    <Button variant="link" onClick={handleBack}>
      Go back
    </Button>
  );
}
