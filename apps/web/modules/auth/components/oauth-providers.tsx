import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "@workspace/ui/components/button";
import { GoogleLogoIcon } from "./icons";

export function OAuthProviders() {
  return (
    <div className="grid grid-cols-2">
      <Button variant="outline" type="button" className="w-full rounded-none">
        <GitHubLogoIcon />
      </Button>
      <Button variant="outline" type="button" className="w-full rounded-none">
        <GoogleLogoIcon />
      </Button>
    </div>
  );
}
