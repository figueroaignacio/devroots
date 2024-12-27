// Hooks
import { useTranslations } from "next-intl";

// Components
import { Github } from "@/components/shared/tech-icons";
import { Button } from "@/components/ui/button";

interface GitHubButtonProps {
  handleGitHubAuth: () => void;
}

export function GitHubButton({ handleGitHubAuth }: GitHubButtonProps) {
  const t = useTranslations();

  return (
    <Button
      onClick={handleGitHubAuth}
      className="w-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
    >
      {t("login.loginWithGithub")}
      <Github />
    </Button>
  );
}
