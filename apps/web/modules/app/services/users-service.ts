import { API_URL } from "@/lib/constants";
import { UpdateUser, User } from "../lib/definitions";

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

export async function updatePost(id: string, user: UpdateUser): Promise<User> {
  const response = await fetch(`${API_URL}/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  return response.json();
}
