"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { Loader } from "@/components/shared/loader";
import { formatDate, getInitials } from "@/modules/app/lib/utils";
import {
  deleteComment,
  getComments,
} from "@/modules/app/services/comments-service";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@repo/ui/components/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { CommentForm } from "./comment-form";

import type { Comment } from "../lib/definitions";

export default function Comments({ postId }: { postId: string }) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const {
    data: comments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    staleTime: 1000 * 60 * 5,
  });

  const addCommentMutation = useMutation<Comment, Error, Comment>({
    mutationFn: async (newComment: Comment) => {
      return newComment;
    },
    onSuccess: (newComment) => {
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
    onError: (error) => {
      console.error("Error deleting comment:", error);
    },
  });

  const handleCommentAdded = (newComment: Comment) => {
    addCommentMutation.mutate(newComment);
  };

  const handleCommentDelete = (id: string) => {
    deleteCommentMutation.mutate(id);
  };

  // TODO: Implement comment editing

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-bold">
          Comments {comments.length > 0 && `(${comments.length})`}
        </h2>
      </div>

      {session?.user && (
        <>
          <CommentForm postId={postId} onCommentAdded={handleCommentAdded} />
        </>
      )}

      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader />
        </div>
      ) : isError ? (
        <p className="text-red-500">
          Failed to load comments. Please try again later.
        </p>
      ) : comments.length > 0 ? (
        <div className="space-y-8">
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={comment.author?.image || ""}
                      alt={comment.author?.name || ""}
                    />
                    <AvatarFallback>
                      {getInitials(comment.author?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">
                      {comment.author?.name || ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                {session?.user?.id === comment.author?.id && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {/* <DropdownMenuItem
                        onClick={() => handleCommentEdit(comment.id)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit</span>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem
                        onClick={() => handleCommentDelete(comment.id)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              <p className="mt-3 text-sm text-foreground/90 whitespace-pre-wrap">
                {comment.content}
              </p>
            </div>
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
