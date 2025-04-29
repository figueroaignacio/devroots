"use client";

// Hooks
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/auth-store";

// Components
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Log out</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Log out of your account?</DialogTitle>
          <DialogDescription>
            You’ll be signed out from your current session. You can log in again
            anytime.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
