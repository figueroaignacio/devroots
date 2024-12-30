// Compoennts
import { UserSettings } from "@/modules/settings/ui/user-settings";

// Utils
import { auth } from "@/modules/auth/lib/auth";
import { redirect } from "next/navigation";

export default async function SettingsPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/login");
  }

  return <UserSettings />;
}
