// Components
import { EnterIcon, PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

const actions = [
  {
    label: "Register",
    href: "/auth/register",
    variant: "outline" as const,
    icon: PlusCircledIcon,
  },
  {
    label: "Log In",
    href: "/auth/login",
    variant: "default" as const,
    icon: EnterIcon,
  },
];

export function Header() {
  return (
    <header className="border-b p-3">
      <div className="container mx-auto flex justify-between">
        <Link href="/" className="font-bold text-2xl">
          I7A
        </Link>
        <div className="space-x-5">
          {actions.map((action, index) => (
            <Button key={index} variant={action.variant} asChild>
              <Link href={action.href}>
                <span>{action.label}</span>
                {action.icon && <action.icon className="size-4" />}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
