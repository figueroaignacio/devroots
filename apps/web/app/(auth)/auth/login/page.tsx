import { LoginForm } from "@/modules/auth/components/login-form";
import { ChatBubbleIcon, CodeIcon, RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Platform info */}
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>

        {/* Code snippet decoration */}
        <div className="absolute -right-20 top-1/4 w-64 h-64 bg-secondary/30 rounded-lg transform rotate-12 blur-sm"></div>
        <div className="absolute -left-10 bottom-1/4 w-48 h-48 bg-primary/10 rounded-lg transform -rotate-12 blur-sm"></div>

        <div className="relative z-10">
          <Link
            href="/"
            className="text-2xl font-bold text-primary mb-8 inline-block"
          >
            N3O
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">
            Welcome back, developer!
          </h1>

          <p className="text-muted-foreground mb-8 max-w-md">
            Log in to continue your journey of coding challenges, community
            discussions, and connecting with fellow developers.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-lg mt-1">
                <CodeIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Code Challenges</p>
                <p className="text-sm text-muted-foreground">
                  Test your skills with our coding challenges
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-lg mt-1">
                <ChatBubbleIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Discussions</p>
                <p className="text-sm text-muted-foreground">
                  Engage in technical discussions
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-lg mt-1">
                <RocketIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Community</p>
                <p className="text-sm text-muted-foreground">
                  Connect with like-minded developers
                </p>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-medium">New to N3O?</span>{" "}
            <Link href="/register" className="text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 bg-card flex items-center justify-center p-8">
        <div className="max-w-sm w-full">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
