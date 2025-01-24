import { API_URL } from "@/lib/constants";
import { Post, UpdateUser, User } from "../lib/definitions";

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

export async function getUserByUsername(username: string): Promise<User> {
  const response = await fetch(`${API_URL}/users/username/${username}`);
  if (!response) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
}

export async function updateUser(id: string, user: UpdateUser): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`, {
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

export async function getUserPosts(userId: string): Promise<Post[]> {
  const response = await fetch(`${API_URL}/users/${userId}/posts`);
  if (!response.ok) {
    throw new Error("Failed to fetch user posts");
  }
  return response.json();
}
