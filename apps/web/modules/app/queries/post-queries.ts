import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Post, UpdatePost } from "../lib/definitions";
import {
  createPost,
  deletePost,
  getPosts,
  updatePost,
} from "../services/posts-service";

export function usePosts() {
  return useQuery<Post[], Error>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: ({ id, post }: { id: string; post: UpdatePost }) =>
      updatePost(id, post),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["post", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      router.push("/hub");
    },
    onError: (error) => {
      console.error("Failed to update post", error);
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["post", id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
