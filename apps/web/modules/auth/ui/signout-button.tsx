"use client";

// Hooks
import { useToast } from "@repo/ui/hooks/use-toast";
import { useState, useTransition } from "react";

// Components
import { Loader } from "@/components/shared/loader";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@repo/ui/components/dialog";
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
          title: "Closing session...",
          action: <Loader />,
        });
        await signOut({
          redirect: true,
          callbackUrl: "/auth/login",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: "Something went wrong!",
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
        Log out
        <LogOut className="ml-2 h-4 w-4" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            Are you sure you want to log out? This action will log you out.
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSignOut}
              disabled={isPending}
              variant="destructive"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
