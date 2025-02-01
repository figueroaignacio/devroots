import { apiFetcher } from "@/lib/utils";

export const getComments = async (postId: string) => {
  return apiFetcher(`/comments/${postId}`);
};

export const createComment = async (
  postId: string,
  content: string,
  authorId: string
) => {
  return apiFetcher(`/comments/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, authorId }),
  });
};

export const deleteComment = async (id: string): Promise<void> => {
  await apiFetcher(`/comments/${id}`, {
    method: "DELETE",
  });
};
