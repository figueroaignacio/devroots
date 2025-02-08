"use client";

// Hooks
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

// Components
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { AlertCircle, Users } from "lucide-react";
import { CommunityCard } from "./community-card";
import { CommunityViewSkeleton } from "./community-view-skeleton";

// Utils
import { getCommunityBySlug } from "@/modules/communities/services/communities-services";

// Definitions
import type { Community } from "../lib/definitions";

export function CommunityView({ slug }: { slug: string }) {
  const { data: session, status } = useSession();
  const [community, setCommunity] = useState<Community | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunity() {
      try {
        const fetchedCommunity = await getCommunityBySlug(slug);
        setCommunity(fetchedCommunity);
      } catch (error) {
        console.error("Failed to fetch community:", error);
        setError("Failed to load community. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchCommunity();
  }, [slug]);

  if (status === "loading" || loading) {
    return <CommunityViewSkeleton />;
  }

  if (status === "unauthenticated") {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication required</AlertTitle>
        <AlertDescription>
          Please sign in to view this community.
        </AlertDescription>
      </Alert>
    );
  }

  if (error || !community) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error || "Community not found"}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{community.name}</h1>
        <p className="text-gray-600">{community.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2"></div>
        <div>
          <CommunityCard
            community={community}
            userId={session?.user?.id ?? ""}
          />
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Users className="mr-2" />
              Community Stats
            </h3>
            {/* <p>Members: {community.memberCount || 0}</p>
            <p>Created: {new Date(community.createdAt).toLocaleDateString()}</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
