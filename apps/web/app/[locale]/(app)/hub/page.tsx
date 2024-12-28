import { UserPost } from "@/modules/app/user/ui/user-post";
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function HubPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 space-y-6">
          <h1 className="text-3xl font-bold mb-6">Your Feed</h1>
          <ul className="space-y-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <li key={i}>
                <UserPost />
              </li>
            ))}
          </ul>
        </main>
        {/* <aside className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {[
                  "#TechNews",
                  "#WebDev",
                  "#AI",
                  "#CodingTips",
                  "#Innovation",
                ].map((topic) => (
                  <li
                    key={topic}
                    className="text-sm text-blue-600 hover:underline cursor-pointer"
                  >
                    {topic}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside> */}
      </div>
    </div>
  );
}
