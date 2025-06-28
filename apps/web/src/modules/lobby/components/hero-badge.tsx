import { Typography } from '@/components/ui/typography';

export function HeroBadge() {
  return (
    <div className="mb-8 flex justify-center">
      <div className="relative rounded-full border px-3 py-1 leading-6">
        <Typography variant="muted">
          Join thousands of developers who are already growing 🚀.
        </Typography>
      </div>
    </div>
  );
}
