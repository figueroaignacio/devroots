// Components
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function HeroActions() {
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <Button>
        Get Started
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
      <Button variant="outline">See Challenges</Button>
    </div>
  );
}
