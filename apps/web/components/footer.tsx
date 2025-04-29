// Components
import { DiscordLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">I7A</h3>
              <ThemeToggle />
            </div>
            <p className="text-sm text-muted-foreground">
              A community platform for developers to connect, collaborate, and
              level up their skills through coding challenges.
            </p>
            <div className="flex items-center space-x-3">
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-secondary/80 text-foreground p-2 rounded-xl transition-colors"
              >
                <GitHubLogoIcon className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary hover:bg-secondary/80 text-foreground p-2 rounded-xl transition-colors"
              >
                <DiscordLogoIcon className="h-5 w-5" />
                <span className="sr-only">Discord</span>
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/challenges"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Challenges
                </Link>
              </li>
              <li>
                <Link
                  href="/tutorials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Learn
                </Link>
              </li>

              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Community */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/events"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/forum"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Forum
                </Link>
              </li>
              <li>
                <Link
                  href="/discord"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Discord Server
                </Link>
              </li>
              <li>
                <Link
                  href="/contribute"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contribute
                </Link>
              </li>
              <li>
                <Link
                  href="/leaderboard"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DevChallenge. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/terms"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/cookies"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
