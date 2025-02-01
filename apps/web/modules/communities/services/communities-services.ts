import { httpClient } from "@/lib/utils";
import { Community } from "../lib/definitions";

export async function getAllCommunities() {
  return httpClient<Community[]>("/communities");
}

export async function getCommunityBySlug(slug: string) {
  return httpClient<Community>(`/communities/slug/${slug}`);
}
