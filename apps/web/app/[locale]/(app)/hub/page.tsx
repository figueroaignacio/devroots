import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function HubPage() {
  const session = await auth();

  console.log("Session data:", session);

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
    <div className="page-container flex justify-center items-center min-h-dvh flex-col">
      <h2>Welcome {session.user.name}</h2>
    </div>
  );
}
