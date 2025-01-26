import { API_URL } from "@/lib/constants";

export const getComments = async (postId: string) => {
  const response = await fetch(`${API_URL}/comments/${postId}`);
  if (!response.ok) throw new Error("Failed to fetch comments");
  return response.json();
};

export const createComment = async (
  postId: string,
  content: string,
  authorId: string
) => {
  const response = await fetch(`${API_URL}/comments/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, authorId }),
  });
  if (!response.ok) throw new Error("Failed to post comment");
  return response.json();
};

export async function deleteComment(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/comments/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete comment");
  }
}
