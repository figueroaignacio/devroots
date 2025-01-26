"use client";

import { Loader } from "@/components/shared/loader";
import { Comment } from "@/modules/app/lib/definitions";
import { formatDate, getInitials } from "@/modules/app/lib/utils";
import { getUserComments } from "@/modules/app/services/users-service";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface CommentsTabProps {
  userId: string;
}

export function CommentsTab({ userId }: CommentsTabProps) {
  const queryClient = useQueryClient();

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery<Comment[], Error>({
    queryKey: ["comments"],
    queryFn: () => getUserComments(userId),
  });

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error loading posts</div>;
  }

  return (
    <ul className="space-y-6">
      {comments?.map((comment) => (
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
          </div>
          <p className="mt-3 text-sm text-foreground/90 whitespace-pre-wrap">
            {comment.content}
          </p>
        </div>
      ))}
    </ul>
  );
}
