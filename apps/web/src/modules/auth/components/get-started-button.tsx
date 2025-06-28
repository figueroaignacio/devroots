// Components
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function GetStartedButton() {
  return (
    <Button asChild>
      <Link href="/auth/login">
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}
