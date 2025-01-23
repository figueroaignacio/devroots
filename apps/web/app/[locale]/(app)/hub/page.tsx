import { Feed } from "@/modules/app/ui/feed";
import { UsersList } from "@/modules/app/ui/users-list";

export default async function HubPage() {
  return (
    <div className="px-3 mx-auto min-h-screen overflow-visible">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-7 space-y-6">
          <h1 className="text-3xl font-bold mb-6">Feed</h1>
          <Feed />
        </main>
        <aside className="lg:col-span-5 lg:h-full space-y-6 pt-14">
          <UsersList />
        </aside>
      </div>
    </div>
  );
}
