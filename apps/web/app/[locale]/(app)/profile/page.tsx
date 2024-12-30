// Components
import { auth } from "@/modules/auth/lib/auth";
import { UserProfile } from "@/modules/user/ui/user-profile";
import { redirect } from "next/navigation";

// Utils

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return <UserProfile />;
}
