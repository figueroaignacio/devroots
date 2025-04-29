"use client";

// Hooks
import { useAuthStore } from "@/modules/auth/store/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

// Components
import { Loader } from "@/components/loader";

type CheckAuthProps = {
  children: React.ReactNode;
};

export function CheckAuth({ children }: CheckAuthProps) {
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
