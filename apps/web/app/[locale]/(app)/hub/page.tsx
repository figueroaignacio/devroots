import { Feed } from "@/modules/app/ui/feed";

export default async function HubPage() {
  return (
    <div className="lg:px-0 min-h-screen overflow-visible border max-w-2xl">
      <div className="grid gap-8">
        <main className="lg:col-span-7 space-y-6">
          {/* <h1 className="text-3xl font-bold mb-6">Feed</h1> */}
          <Feed />
        </main>
      </div>
    </div>
  );
}
