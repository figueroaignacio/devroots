import { apiFetcher } from "@/lib/utils";
import { Comment, Post, UpdateUser, User } from "../lib/definitions";

export async function getUsers(): Promise<User[]> {
  return apiFetcher<User[]>("/users");
}

export async function getUser(id: string): Promise<User> {
  return apiFetcher<User>(`/users/${id}`);
}

export async function getUserByUsername(username: string): Promise<User> {
  return apiFetcher<User>(`/users/username/${username}`);
}

export async function updateUser(id: string, user: UpdateUser): Promise<User> {
  return apiFetcher<User>(`/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
}

export async function getUserPosts(userId: string): Promise<Post[]> {
  return apiFetcher<Post[]>(`/users/${userId}/posts`);
}

export async function getUserComments(userId: string): Promise<Comment[]> {
  return apiFetcher<Comment[]>(`/users/${userId}/comments`);
}
