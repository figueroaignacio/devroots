import { GoogleLogoIcon } from "@/components/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@workspace/ui/components/button";

export function OAuthProviders() {
  return (
    <>
      <p className="text-muted-foreground text-xs text-center">
        We recommend signing in with OAuth for better security and ease.
      </p>
      <div className="grid grid-cols-2">
        <Button variant="outline" type="button" className="w-full rounded-none">
          <GitHubLogoIcon />
        </Button>
        <Button variant="outline" type="button" className="w-full rounded-none">
          <GoogleLogoIcon />
        </Button>
      </div>
    </>
  );
}
