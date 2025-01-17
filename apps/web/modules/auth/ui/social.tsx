"use client";

import { Github } from "@/components/shared/tech-icons";
import { Button } from "@/components/ui/button";

export function Social() {
  return (
    <div className="flex items-center w-full gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={() => {}}>
        <Github />
      </Button>
    </div>
  );
}
