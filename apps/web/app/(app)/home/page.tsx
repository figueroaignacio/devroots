"use client";

// Hooks
import { useAuthStore } from "@/modules/auth/store/auth-store";

// Components
import LogoutButton from "@/modules/auth/components/logout-button";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <section>
      <LogoutButton />
    </section>
  );
}
