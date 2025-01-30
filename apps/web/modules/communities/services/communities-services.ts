import { API_URL } from "@/lib/constants";
import { Community } from "../lib/definitions";

export async function getAllCommunities(): Promise<Community[]> {
  const response = await fetch(`${API_URL}/communities`);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  return response.json();
}

export async function getCommunityBySlug(slug: string): Promise<Community> {
  const response = await fetch(`${API_URL}/communities/slug/${slug}`);
  if (!response.ok) {
    throw new Error("An error occurred while fetching the data");
  }
  return response.json();
}
