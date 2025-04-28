"use client";

import { Loader } from "@/components/loader";
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const { user, getMe } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const userData = await getMe();
      if (!userData) {
        router.push("/auth/login");
      }
    }

    checkAuth();
  }, [getMe, router]);

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}
