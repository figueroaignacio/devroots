// Components
import { Code2, Trophy, Users } from 'lucide-react';

export function HeroBenefits() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
          <Code2 className="h-6 w-6 text-orange-600" />
        </div>
        <dt className="mt-4 text-base font-semibold text-gray-900">
          Real Challenges
        </dt>
        <dd className="text-muted-foreground text-center text-sm">
          Solve exercises from beginner to advanced level, applying logic and
          best practices.
        </dd>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
          <Users className="h-6 w-6 text-green-600" />
        </div>
        <dt className="mt-4 text-base font-semibold text-gray-900">
          Dev Community
        </dt>
        <dd className="text-muted-foreground text-center text-sm">
          Connect with other developers, share ideas, and build collaborative
          networks.
        </dd>
      </div>

      <div className="flex flex-col items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
          <Trophy className="h-6 w-6 text-purple-600" />
        </div>
        <dt className="mt-4 text-base font-semibold text-gray-900">
          Constructive Feedback
        </dt>
        <dd className="text-muted-foreground text-center text-sm">
          Receive useful and honest feedback on your code to improve step by
          step.
        </dd>
      </div>
    </div>
  );
}
