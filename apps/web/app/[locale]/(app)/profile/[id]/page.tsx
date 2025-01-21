import { getUser } from "@/modules/app/services/users-service";
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  const user = await getUser(params.id);

  if (!user) {
    return <div>No user found</div>;
  }

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return <pre>{JSON.stringify(user, null, 2)}</pre>;
}
