// Components
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return <div>User Profile</div>;
}
