"use client";

import { Link } from "@/config/i18n/routing";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@repo/ui/components/tooltip";
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import type { Post } from "../lib/definitions";
import { formatDateDistance } from "../lib/utils";

interface FeedPostProps {
  post: Post;
  onUpdate?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

export function FeedPost({ post, onDelete }: FeedPostProps) {
  const { data: session } = useSession();
  const currentUserId = session?.user?.id;
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    if (onDelete) {
      onDelete(post);
    }
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="p-6 flex flex-col gap-4 border-b dark:hover:bg-gray-600 hover:dark:bg-opacity-30 hover:bg-[#dde3ea] transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-3">
          <Avatar>
            <AvatarImage
              src={post.author.image || undefined}
              alt={post.author.name}
            />
            <AvatarFallback>
              {post.author.name ? post.author.name[0] : "?"}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-x-2">
              <Link href={`/profile/${post.author.username}`}>
                <span className="font-semibold">{post.author.username}</span>
              </Link>
              <span className="text-xs">·</span>
              <span className="text-xs">
                {formatDateDistance(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
      <Link href={`/post/${post.slug}`}>
        <h3>{post.title}</h3>
      </Link>
      <div className="flex gap-x-3 mt-4">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon">
                <Heart size={20} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Like</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/post/${post.slug}`}>
                  <MessageCircle size={20} />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comments</p>
            </TooltipContent>
          </Tooltip>
          {currentUserId === post.authorId && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <Link href={`/post/edit/${post.id}`}>
                      <Pencil size={20} />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsDeleteDialogOpen(true)}
                  >
                    <Trash2 size={20} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
        </TooltipProvider>
      </div>
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete this post? This action cannot be
            undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
