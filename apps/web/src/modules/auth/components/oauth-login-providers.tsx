// Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoginWithGitHubButton } from './login-with-github-button';

export function OAuthProviders() {
  return (
    <>
      <LoginWithGitHubButton />
      <ComingSoonButton
        provider="GitLab"
        icon={
          <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0L8.5 9.5h-7L12 24l10.5-14.5h-7L12 0z" />
          </svg>
        }
      />
      <ComingSoonButton
        provider="Bitbucket"
        icon={
          <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.778 1.213a.768.768 0 00-.768.892l3.263 19.81c.084.5.515.868 1.022.873H19.95a.772.772 0 00.77-.646l3.27-20.03a.768.768 0 00-.768-.891zM14.52 15.53H9.522L8.17 8.466h7.561z" />
          </svg>
        }
      />
    </>
  );
}

function ComingSoonButton({
  provider,
  icon,
}: {
  provider: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="relative">
      <Button
        disabled
        variant="outline"
        className="w-full bg-transparent opacity-50"
      >
        {icon}
        Continue with {provider}
      </Button>
      <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs">
        Soon
      </Badge>
    </div>
  );
}
