import { ProfileDetails } from "@/modules/profile/ui/profile-details";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile",
  description: "View user profile",
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  return <ProfileDetails params={params} />;
}
