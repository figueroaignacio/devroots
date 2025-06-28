// Components
import { Button } from '@/components/ui/button';
import { GetStartedButton } from '@/modules/auth/components/get-started-button';

export function HeroActions() {
  return (
    <div className="mt-10 flex items-center justify-center gap-x-6">
      <GetStartedButton />
      <Button variant="outline">See Challenges</Button>
    </div>
  );
}
