import { Feed } from "@/modules/app/ui/feed";
import { UsersList } from "@/modules/app/ui/users-list";
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function HubPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
    <div className="px-3 mx-auto min-h-screen overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-7 space-y-6">
          <h1 className="text-3xl font-bold mb-6">Feed</h1>
          <Feed />
        </main>
        <aside className="lg:col-span-5 lg:sticky lg:top-16 lg:h-full space-y-6 lg:border-l lg:pl-8">
          <UsersList />
        </aside>
      </div>
    </div>
  );
}
