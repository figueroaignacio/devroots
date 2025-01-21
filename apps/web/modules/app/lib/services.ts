import { CreatePost, Post, UpdatePost } from "./definitions";

const API_URL = "http://localhost:3001/api/posts";

export async function getPosts(): Promise<Post[]> {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
}

export async function getPost(id: string): Promise<Post> {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch post");
  }
  return response.json();
}

export async function createPost(post: CreatePost): Promise<Post> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error("Failed to create post");
  }
  return response.json();
}

export async function updatePost(id: string, post: UpdatePost): Promise<Post> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  if (!response.ok) {
    throw new Error("Failed to update post");
  }
  return response.json();
}

export async function deletePost(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete post");
  }
}
