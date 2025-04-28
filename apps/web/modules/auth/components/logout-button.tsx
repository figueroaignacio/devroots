"use client";

// Hooks
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";

// Components
import { Button } from "@workspace/ui/components/button";

export default function LogoutButton() {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push("/auth/login");
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Logout
    </Button>
  );
}
