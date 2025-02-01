import { httpClient } from "@/lib/utils";

export const getComments = async (postId: string) => {
  return httpClient(`/comments/${postId}`);
};

export const createComment = async (
  postId: string,
  content: string,
  authorId: string
) => {
  return httpClient(`/comments/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, authorId }),
  });
};

export const deleteComment = async (id: string): Promise<void> => {
  await httpClient(`/comments/${id}`, {
    method: "DELETE",
  });
};
