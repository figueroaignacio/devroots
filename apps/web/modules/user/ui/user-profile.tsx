// Components
import { UserProfileDetails } from "./user-profile-details";
import { UserProfileHeader } from "./user-profile-header";

// Utils
import { auth } from "@/modules/auth/lib/auth";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";

export async function UserProfile() {
  const t = await getTranslations("profile");
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
      <div className="space-y-8">
        {session?.user && <UserProfileHeader user={session.user} />}
        {session?.user && <UserProfileDetails user={session.user} />}
      </div>
    </div>
  );
}
