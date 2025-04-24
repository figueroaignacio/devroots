import { Button } from "@workspace/ui/components/button";

export function OAuthProviders() {
  return (
    <>
      <Button variant="outline" className="w-full" type="button">
        Register with Google
      </Button>
      <Button variant="outline" className="w-full" type="button">
        Register with GitHub
      </Button>
    </>
  );
}
