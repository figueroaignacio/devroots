"use client";

// Hooks
import { useToast } from "@/hooks/use-toast";
import { useState, useTransition } from "react";

// Components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@repo/ui/components/button";
import { LogOut } from "lucide-react";

// Utils
import { signOut } from "next-auth/react";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        toast({
          title: "Cerrando sesión...",
          description: "Por favor, espera un momento.",
        });
        await signOut({
          redirect: true,
          callbackUrl: "/auth/login",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Hubo un problema al cerrar la sesión.",
          variant: "destructive",
        });
      } finally {
        setIsDialogOpen(false);
      }
    });
  };

  return (
    <>
      <Button
        variant="destructive"
        className="w-full"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsDialogOpen(true);
        }}
      >
        Cerrar sesión
        <LogOut className="ml-2 h-4 w-4" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>¿Estás seguro?</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas cerrar sesión? Esta acción te
            desconectará.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSignOut}
              disabled={isPending}
              variant="destructive"
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
