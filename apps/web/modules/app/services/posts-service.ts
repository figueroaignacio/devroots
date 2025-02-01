import { apiFetcher } from "@/lib/utils";
import { CreatePost, Post, UpdatePost } from "../lib/definitions";

export async function getPosts(): Promise<Post[]> {
  return apiFetcher<Post[]>("/posts");
}

export async function getPost(id: string): Promise<Post> {
  return apiFetcher<Post>(`/posts/${id}`);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  return apiFetcher<Post>(`/posts/slug/${slug}`);
}

export async function createPost(post: CreatePost): Promise<Post> {
  return apiFetcher<Post>("/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
}

export async function updatePost(id: string, post: UpdatePost): Promise<Post> {
  return apiFetcher<Post>(`/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
}

export async function deletePost(id: string): Promise<void> {
  await apiFetcher<void>(`/posts/${id}`, {
    method: "DELETE",
  });
}
