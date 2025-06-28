// Components
import { Typography } from '@/components/ui/typography';

export function HeroMarketing() {
  return (
    <>
      <Typography variant="h1">
        Challenge your code,{' '}
        <span className="to-primary bg-gradient-to-r from-indigo-600 bg-clip-text text-transparent">
          boost your career
        </span>
      </Typography>

      <Typography variant="p">
        Solve real-world challenges, share your solutions, and receive valuable
        feedback from a passionate developer community. Build your portfolio
        while sharpening your skills.
      </Typography>
    </>
  );
}
