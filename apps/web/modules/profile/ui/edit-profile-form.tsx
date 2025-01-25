"use client";

// Hooks
import { useToast } from "@repo/ui/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

// Components
import { Loader } from "@/components/shared/loader";
import { Button } from "@repo/ui/components/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Services
import { updateUser } from "@/modules/app/services/users-service";

// Schemas
import { EditProfileSchema } from "../lib/schemas";

type FormData = z.infer<typeof EditProfileSchema>;

export function EditProfileForm() {
  const { data: session, update } = useSession();
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<FormData>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: "",
      name: "",
      bio: "",
      image: "",
    },
  });

  useEffect(() => {
    if (session?.user) {
      form.reset({
        username: session.user.username || "",
        name: session.user.name || "",
        bio: session.user.bio || "",
        image: session.user.image || null,
      });
    }
  }, [session, form]);

  const updateProfileMutation = useMutation({
    mutationFn: (userData: FormData) => {
      if (!session?.user?.id) {
        throw new Error("User ID is required for update");
      }
      return updateUser(session.user.id, userData);
    },
    onSuccess: async () => {
      await update();
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
      router.push(`/profile/${form.getValues("username")}`);
    },
    onError: (error: Error) => {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Error",
        description:
          error.message || "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: FormData) => {
    if (!session) {
      toast({
        title: "Authentication Error",
        description: "You need to be logged in to update your profile.",
        variant: "destructive",
      });
      return;
    }

    updateProfileMutation.mutate(data);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    disabled={updateProfileMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={updateProfileMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    value={field.value || ""}
                    disabled={updateProfileMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image URL (optional)</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    value={field.value || ""}
                    disabled={updateProfileMutation.isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant="default"
            className="mt-4"
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? <Loader /> : "Save Changes"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
