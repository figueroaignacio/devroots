"use client";

// Compponents
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Icons
import { Heart, MessageCircle, Share2 } from "lucide-react";

// Utils
import { UserPostProps } from "@/modules/app/lib/definitions";
import { getInitials, timeAgo } from "../lib/utils";

export function UserPost({
  content,
  createdAt,
  id,
  title,
  author,
  authorImage,
}: UserPostProps) {
  const initials = author ? getInitials(author) : "";

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3" />
      <CardHeader className="flex flex-row items-center gap-4 p-6">
        <Avatar>
          {authorImage ? (
            <AvatarImage
              src={authorImage}
              alt={`${author || "User"}'s avatar`}
            />
          ) : (
            <AvatarFallback>{initials}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col">
          <p className="text-lg font-semibold tracking-tight">
            {author || "Anonymous"}
          </p>
          <p className="text-sm text-muted-foreground">{timeAgo(createdAt)}</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-6">
        <CardTitle className="text-2xl font-bold leading-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {content}
        </CardDescription>
      </CardContent>
      <Separator className="my-2" />
      <CardFooter className="flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-purple-100 transition-colors duration-200"
          >
            <Heart className="h-5 w-5  mr-1" />
            <span className="font-medium">42</span>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-blue-100 transition-colors duration-200"
          >
            <MessageCircle className="h-5 w-5  mr-1" />
            <span className="font-medium">12</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-green-100 transition-colors duration-200"
          >
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
