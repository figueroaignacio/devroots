// Components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Heart, MessageCircle } from "lucide-react";

// Definitions
import { Post } from "../lib/definitions";

// Utils
import { formatDateDistance } from "../lib/utils";

interface FeedPostProps {
  post: Post;
}

export function FeedPost({ post }: FeedPostProps) {
  return (
    <div className="bg-card shadow-lg rounded-lg p-6 flex flex-col gap-4 hover:shadow-xl transition-shadow duration-200 ease-in-out">
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

      <h3 className="font-semibold text-lg mt-2">{post.title}</h3>
      <p className="text-gray-600 text-sm mt-1">{post.content}</p>

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
