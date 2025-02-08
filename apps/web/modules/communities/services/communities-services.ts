import { httpClient } from "@/lib/utils";
import { Community } from "../lib/definitions";

export async function getAllCommunities() {
  return httpClient<Community[]>("/communities");
}

export async function getCommunityBySlug(slug: string) {
  return httpClient<Community>(`/communities/slug/${slug}`);
}

export async function joinCommunity(userId: string, communityId: string) {
  return httpClient<{ message: string }>("/communities/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, communityId }),
  });
}

export async function checkMembership(
  userId: string,
  communityId: string
): Promise<boolean> {
  try {
    const response = await httpClient<{ isMember: boolean }>(
      `/communities/${communityId}/check-membership`,
      {
        method: "POST",
        body: JSON.stringify({ userId }),
      }
    );
    return response.isMember;
  } catch (error) {
    console.error("Error checking membership:", error);
    return false;
  }
}
