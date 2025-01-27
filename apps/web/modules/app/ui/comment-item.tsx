"use client";

import { formatDate, getInitials } from "@/modules/app/lib/utils";
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
import type { Comment } from "../lib/definitions";

type CommentItemProps = {
  comment: Comment;
  sessionUserId?: string;
  onDelete: (id: string) => void;
};

export function CommentItem({
  comment,
  sessionUserId,
  onDelete,
}: CommentItemProps) {
  return (
    <div>
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
        {sessionUserId === comment.author?.id && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onDelete(comment.id)}>
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
  );
}
