import { RegisterForm } from "@/modules/auth/components/register-form";
import {
  ChatBubbleIcon,
  CheckIcon,
  CodeIcon,
  RocketIcon,
} from "@radix-ui/react-icons";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-gradient-to-br from-primary/10 via-background to-background p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
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
            Join our developer community
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md">
            Create an account to access coding challenges, participate in
            discussions, and connect with fellow developers.
          </p>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-lg mt-1">
                <CheckIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Access to 500+ coding challenges</p>
                <p className="text-sm text-muted-foreground">
                  From beginner to advanced levels across multiple languages
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-lg mt-1">
                <CheckIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Join a thriving community</p>
                <p className="text-sm text-muted-foreground">
                  Connect with 10,000+ developers worldwide
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="bg-secondary p-2 rounded-lg mt-1">
                <CheckIcon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Track your progress</p>
                <p className="text-sm text-muted-foreground">
                  Monitor your skills development with detailed analytics
                </p>
              </div>
            </div>
          </div>

          {/* Enhanced Code, Discuss, Grow section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">Your journey with us</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="group bg-card hover:bg-card/80 border border-border rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg mr-3">
                    <CodeIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">Code</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Solve challenges in 20+ programming languages and improve your
                  algorithmic thinking
                </p>
                <div className="mt-3 pt-3 border-t border-border text-xs text-primary/80">
                  <span className="flex items-center">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Weekly new challenges
                  </span>
                </div>
              </div>

              <div className="group bg-card hover:bg-card/80 border border-border rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg mr-3">
                    <ChatBubbleIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">Discuss</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Share solutions, ask questions, and engage with other
                  developers in our forums
                </p>
                <div className="mt-3 pt-3 border-t border-border text-xs text-primary/80">
                  <span className="flex items-center">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Active community support
                  </span>
                </div>
              </div>

              <div className="group bg-card hover:bg-card/80 border border-border rounded-xl p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
                <div className="flex items-center mb-3">
                  <div className="bg-primary/10 p-2.5 rounded-lg mr-3">
                    <RocketIcon className="h-5 w-5 text-primary" />
                  </div>
                  <h4 className="font-semibold">Grow</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  Track your progress, earn badges, and build a portfolio to
                  showcase your skills
                </p>
                <div className="mt-3 pt-3 border-border border-t text-xs text-primary/80">
                  <span className="flex items-center">
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-primary"></span>
                    Career advancement opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Already have an account?</span>{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 bg-card flex items-center justify-center p-8">
        <div className="max-w-sm w-full">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
