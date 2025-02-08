"use client";

// Hooks
import { useToast } from "@repo/ui/hooks/use-toast";
import { useEffect, useState } from "react";

// Components
import { Button } from "@repo/ui/components/button";

// Utils
import {
  checkMembership,
  joinCommunity,
} from "../services/communities-services";

// Definitions
import type { Community } from "../lib/definitions";

export interface CommunityCardProps {
  community: Community;
  userId: string;
}

export function CommunityCard({ community, userId }: CommunityCardProps) {
  const [loading, setLoading] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const checkInitialMembership = async () => {
      try {
        const isMember = await checkMembership(userId, community.id);
        setIsJoined(isMember);
      } catch (error) {
        console.error("Failed to check initial membership:", error);
      }
    };

    checkInitialMembership();
  }, [userId, community.id]);

  const handleJoin = async () => {
    if (isJoined) return;

    setLoading(true);
    try {
      await joinCommunity(userId, community.id);
      setIsJoined(true);
      toast({
        title: "Success",
        description: "Joined community successfully!",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-lg">
      <h2 className="text-xl font-semibold">{community.name}</h2>
      <p className="text-sm">{community.description}</p>
      <Button
        onClick={handleJoin}
        disabled={loading || isJoined}
        className={`mt-4 ${isJoined ? "bg-green-500 hover:bg-green-600" : ""}`}
      >
        {loading ? "Joining..." : isJoined ? "Joined" : "Join Community"}
      </Button>
    </div>
  );
}
