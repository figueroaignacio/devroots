"use client";

import { Link } from "@/config/i18n/routing";
import { getInitials } from "@/modules/app/lib/utils";
import { Comments } from "@/modules/app/ui/comments";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";

type PostDetailsProps = {
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    author: {
      name: string;
      image?: string | null;
    };
    authorId: string;
  };
};

export function PostDetails({ post }: PostDetailsProps) {
  return (
    <div className="max-w-3xl my-8 px-4">
      <div>
        <div className="flex items-center space-x-4 mb-4">
          <Avatar>
            <AvatarImage src={post.author.image ?? ""} alt={post.author.name} />
            <AvatarFallback>{getInitials(post.author.name)}</AvatarFallback>
          </Avatar>
          <div>
            <Link
              href={`/profile/${post.authorId}`}
              className="text-sm font-medium hover:underline"
            >
              {post.author.name}
            </Link>
            <p className="text-sm text-foreground">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="text-2xl font-bold">{post.title}</div>
      </div>
      <div>
        <div className="max-w-none mb-8">{post.content}</div>
        <Comments postId={post.id} />
      </div>
    </div>
  );
}
