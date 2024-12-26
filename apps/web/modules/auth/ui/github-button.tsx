// Components
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

interface GitHubButtonProps {
  handleGitHubAuth: () => void;
}

export function GitHubButton({ handleGitHubAuth }: GitHubButtonProps) {
  return (
    <Button
      onClick={handleGitHubAuth}
      className="w-full bg-gray-800 hover:bg-gray-700"
    >
      <Github />
      Sign in with GitHub
    </Button>
  );
}
