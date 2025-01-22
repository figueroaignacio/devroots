"use client";

// Hooks
import { useSession } from "next-auth/react";
import { useState } from "react";

// Components
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Link } from "@/config/i18n/routing";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { Button } from "@repo/ui/components/button";
import { Heart, MessageCircle, Pencil, Trash2 } from "lucide-react";

// Utils & Definitions
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
    <div className="bg-card rounded-lg p-6 flex flex-col gap-4 border">
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
              <span className="font-semibold">{post.author.name}</span>
              <span className="text-xs">·</span>
              <span className="text-xs">
                {formatDateDistance(post.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="font-semibold text-lg mt-2">{post.title}</h3>
      <p className="text-sm mt-1">{post.content}</p>

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
              <Link href={`/post/details/${post.id}`}>
                <Button variant="ghost" size="icon">
                  <MessageCircle size={20} />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comments</p>
            </TooltipContent>
          </Tooltip>

          {currentUserId === post.author.id && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href={`/post/edit/${post.id}`}>
                    <Button variant="ghost" size="icon">
                      <Pencil size={20} />
                    </Button>
                  </Link>
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
