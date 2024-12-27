"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useState, useTransition } from "react";

export function SignOutButton() {
  const [isPending, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    startTransition(async () => {
      try {
        await signOut({
          redirect: true,
          callbackUrl: "/auth/login",
        });
        toast({
          title: "Sesión cerrada",
          description: "Has cerrado sesión correctamente.",
          duration: 3000,
        });
      } catch (error) {
        console.error("Error during sign out:", error);
        toast({
          title: "Error",
          description: "Hubo un problema al cerrar la sesión.",
          variant: "destructive",
          duration: 3000,
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
              {isPending ? "Cerrando sesión..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
