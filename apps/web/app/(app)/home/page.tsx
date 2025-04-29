"use client";

// Hooks
import { useAuthStore } from "@/modules/auth/store/auth-store";

// Components
import LogoutButton from "@/modules/auth/components/logout-button";

export default function DashboardPage() {
  const { user } = useAuthStore();

  return (
    <section className="space-y-12 mt-24">
      <div className="bg-slate-900 rounded-lg p-4 text-sm font-mono text-slate-300 overflow-x-auto">
        <pre>
          <code>{JSON.stringify(user, null, 2)}</code>
        </pre>
      </div>
      <LogoutButton />
    </section>
  );
}
