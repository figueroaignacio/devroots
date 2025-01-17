import { auth } from "@/modules/auth/lib/auth";

export async function Feed() {
  const session = await auth();

  return <pre className="space-y-6">{JSON.stringify(session, null, 2)}</pre>;
}
