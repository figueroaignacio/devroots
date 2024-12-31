import { Post } from "../definitions";

export async function getPosts(): Promise<Post[]> {
  const res = await fetch("http://localhost:3001/api/posts", {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  return res.json();
}
