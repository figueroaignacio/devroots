import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function HubPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
    <div className="p-6 font-sans space-y-4">
      <h2 className="text-2xl font-bold mb-4">Welcome, {session.user.name}!</h2>
      <p className="text-lg mb-2">Here is your session data:</p>
      <pre className="p-4 rounded-lg overflow-x-auto text-sm bg-card">
        {JSON.stringify(session, null, 2)}
      </pre>
    </div>
  );
}
