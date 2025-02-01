import { apiFetcher } from "@/lib/utils";
import { Community } from "../lib/definitions";

export async function getAllCommunities() {
  return apiFetcher<Community[]>("/communities");
}

export async function getCommunityBySlug(slug: string) {
  return apiFetcher<Community>(`/communities/slug/${slug}`);
}
