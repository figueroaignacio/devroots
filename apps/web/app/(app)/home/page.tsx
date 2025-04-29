"use client";

// Hooks
import { useAuthStore } from "@/modules/auth/store/auth-store";

// Components
import LogoutButton from "@/modules/auth/components/logout-button";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <main className="flex flex-col items-center justify-between p-24 min-h-full">
      <h1>Hello {user?.firstName || "Guest"}</h1>
      <pre className="border max-w-3xl p-4 overflow-x-auto rounded-xl">
        <code>{JSON.stringify(user, null, 2)}</code>
      </pre>
      <LogoutButton />
    </main>
  );
}
