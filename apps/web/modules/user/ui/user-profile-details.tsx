"use client";

// Hooks
import { useTranslations } from "next-intl";

// Components
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Types
import { User } from "next-auth";

interface ProfileDetailsProps {
  user: User;
}

export function UserProfileDetails({ user }: ProfileDetailsProps) {
  const t = useTranslations("profile.details");

  // This is a placeholder. In a real application, you'd fetch this data from your backend.
  const userDetails = {
    bio: "Full-stack developer passionate about creating user-friendly web applications.",
    location: "San Francisco, CA",
    skills: ["React", "Next.js", "TypeScript", "Node.js", "GraphQL"],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold mb-1">{t("bio")}</h3>
          <p className="text-muted-foreground">{userDetails.bio}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">{t("location")}</h3>
          <p className="text-muted-foreground">{userDetails.location}</p>
        </div>
        <div>
          <h3 className="font-semibold mb-1">{t("skills")}</h3>
          <div className="flex flex-wrap gap-2">
            {userDetails.skills.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
