// Components
import { Header } from "@/components/header";
import { LoginForm } from "@/modules/auth/components/login-form";
import { CodeIcon, PersonIcon, RocketIcon } from "@radix-ui/react-icons";
import { Button } from "@workspace/ui/components/button";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen bg-background text-foreground">
          <div className="container mx-auto px-4 py-12 md:py-24">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm border border-border mb-4">
                  <span className="text-primary font-medium">New!</span>{" "}
                  Challenge of the week is live
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                  Connect. Code. <span className="text-primary">Conquer.</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  Join a community of developers, complete coding challenges,
                  and level up your skills together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button variant="default" size="lg">
                    Get Started
                  </Button>
                  <Button variant="outline" size="lg">
                    Explore Challenges
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8">
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary p-2 rounded-lg">
                      <CodeIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">500+</p>
                      <p className="text-muted-foreground text-sm">
                        Coding Challenges
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary p-2 rounded-lg">
                      <PersonIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">10K+</p>
                      <p className="text-muted-foreground text-sm">
                        Active Developers
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-secondary p-2 rounded-lg">
                      <RocketIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">24/7</p>
                      <p className="text-muted-foreground text-sm">
                        Community Support
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-primary rounded-lg blur-lg opacity-30"></div>
                <div className="relative bg-card border border-border rounded-xl shadow-xl p-6">
                  <LoginForm className="p-0" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]"></div>
          </div>
        </div>
      </main>
    </>
  );
}
