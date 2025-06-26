import { LoginWithGitHubButton } from '@/modules/auth/components/login-with-github-button';

export default function LandingPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Hello world</h1>
      <LoginWithGitHubButton />
    </div>
  );
}
