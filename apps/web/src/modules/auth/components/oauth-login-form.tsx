// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';
import { FunnyCodeSnippet } from './funny-code-snippet';
import { OAuthProviders } from './oauth-login-providers';

export function OAuthLoginForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="grid w-full max-w-6xl items-center gap-8 lg:grid-cols-2">
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-4">
            <Typography
              className="to-primary bg-gradient-to-r from-indigo-600 bg-clip-text leading-tight font-bold text-transparent"
              variant="h1"
            >
              {"It's not a bug,"}
              <br />
              <span className="text-primary">{"it's a feature"}</span>
            </Typography>
            <Typography
              className="mx-auto max-w-md text-lg lg:mx-0"
              variant="muted"
            >
              Join thousands of developers who definitely didn't break
              production on a Friday afternoon.
            </Typography>
          </div>
          <FunnyCodeSnippet />
        </div>
        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-md shadow-xl">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Welcome</CardTitle>
              <CardDescription>
                Choose your preferred way to sign in
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <OAuthProviders />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
