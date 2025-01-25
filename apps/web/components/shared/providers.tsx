"use client";

import { SidebarProvider } from "@repo/ui/components/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { useState } from "react";

export function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: any;
}) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <SidebarProvider>{children}</SidebarProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
