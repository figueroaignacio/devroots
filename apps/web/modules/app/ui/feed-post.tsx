"use client";

// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Heart,
  MessageCircle,
  MoreVertical,
  Pencil,
  Trash2,
} from "lucide-react";

// Definitions
import type { Post } from "../lib/definitions";

// Utils
import { formatDateDistance } from "../lib/utils";

interface FeedPostProps {
  post: Post;
  onUpdate?: (post: Post) => void;
  onDelete?: (post: Post) => void;
}

export function FeedPost({ post, onUpdate, onDelete }: FeedPostProps) {
  return (
    <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-200 ease-in-out">
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
              <span className="text-sm">·</span>
              <span className="text-sm">
                {formatDateDistance(post.createdAt)}
              </span>
            </div>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuItem
              onClick={() => onUpdate && onUpdate(post)}
              className="p-2 dark:hover:bg-gray-600 dark:hover:bg-opacity-30 hover:bg-[#dde3ea] flex justify-evenly"
            >
              <Pencil className="h-4 w-4" />
              <span>Update</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete && onDelete(post)}
              className="p-2 dark:hover:bg-gray-600 dark:hover:bg-opacity-30 hover:bg-[#dde3ea] flex justify-evenly"
            >
              <Trash2 className="flex h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <h3 className="font-semibold text-lg mt-2">{post.title}</h3>
      <p className="text-sm mt-1">{post.content}</p>

      <div className="flex gap-x-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-4 flex items-center gap-x-3"
              >
                <Heart size={20} color="gray" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Like</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="mt-4 flex items-center gap-x-3"
              >
                <MessageCircle size={20} color="gray" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comments</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}
