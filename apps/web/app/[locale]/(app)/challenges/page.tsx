// Utils
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function ChallengesPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return <div>Challenges page</div>;
}
