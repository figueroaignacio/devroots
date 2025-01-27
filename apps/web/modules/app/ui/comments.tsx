"use client";

import { Loader } from "@/components/shared/loader";
import {
  deleteComment,
  getComments,
} from "@/modules/app/services/comments-service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { Comment } from "../lib/definitions";
import { CommentForm } from "./comment-form";
import { CommentItem } from "./comment-item";

type CommentsProps = {
  postId: string;
};

export function Comments({ postId }: CommentsProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    staleTime: 1000 * 60 * 5,
  });

  const addCommentMutation = useMutation<Comment, Error, Comment>({
    mutationFn: async (newComment: Comment) => newComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      refetch();
    },
  });

  const deleteCommentMutation = useMutation<void, Error, string>({
    mutationFn: async (id: string) => {
      await deleteComment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      refetch();
    },
  });

  const handleCommentAdded = (newComment: Comment) => {
    addCommentMutation.mutate(newComment);
  };

  const handleCommentDelete = (id: string) => {
    deleteCommentMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load comments. Please try again later.
      </p>
    );
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      {session?.user && (
        <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
      )}

      {comments.length > 0 ? (
        <div className="space-y-8">
          {comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              sessionUserId={session?.user?.id}
              onDelete={handleCommentDelete}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">No comments yet.</p>
          {!session?.user && (
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to leave a comment.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
