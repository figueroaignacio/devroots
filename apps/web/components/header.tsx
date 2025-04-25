// Components
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

const actions = [
  {
    label: "Log In",
    href: "/auth/login",
    variant: "default" as const,
  },
  {
    label: "Register",
    href: "/auth/register",
    variant: "outline" as const,
  },
];

export function Header() {
  return (
    <header className="border-b py-3">
      <div className="max-w-6xl mx-auto flex justify-between">
        <Link href="/" className="font-bold text-2xl">
          N3O
        </Link>
        <div className="space-x-5">
          {actions.map((action, index) => (
            <Button key={index} variant={action.variant} asChild>
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
