"use client";

// Hooks
import { useToast } from "@repo/ui/hooks/use-toast";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Components
import { Loader } from "@/components/shared/loader";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import { Label } from "@repo/ui/components/label";
import { Textarea } from "@repo/ui/components/textarea";

// Services
import { updateUser } from "@/modules/app/services/users-service";

export function EditProfileForm() {
  const { data: session, update } = useSession();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    bio: "",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (session?.user) {
      setFormData({
        username: session.user.username || "",
        name: session.user.name || "",
        bio: session.user.bio || "",
        image: session.user.image || "",
      });
    }
  }, [session]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!session) {
      toast({
        title: "Authentication Error",
        description: "You need to be logged in to update your profile.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    const userData = {
      username: formData.username,
      name: formData.name,
      bio: formData.bio,
      image: formData.image,
    };

    if (!session.user?.id) {
      toast({
        title: "Update Error",
        description: "User ID is required for update",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const updatedUser = await updateUser(session.user.id, userData);
      await update();
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Update Error",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-6">Edit Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username" className="block text-sm font-medium">
            Username
          </Label>
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-2"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="name" className="block text-sm font-medium">
            Name
          </Label>
          <Input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="bio" className="block text-sm font-medium">
            Bio
          </Label>
          <Textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            className="mt-2"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <Label htmlFor="image" className="block text-sm font-medium">
            Profile Image URL (optional)
          </Label>
          <Input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-2"
            disabled={isSubmitting}
          />
        </div>
        <Button
          type="submit"
          variant="default"
          className="mt-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader /> : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
