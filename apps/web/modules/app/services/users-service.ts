import { API_URL } from "@/lib/constants";
import { User } from "../lib/definitions";

export async function getUsers(): Promise<User[]> {
  const response = await fetch(`${API_URL}/users`);
  if (!response) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function getUser(id: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}
