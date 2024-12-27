import { Waves } from "@/components/shared/waves";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SpotlightCardProps {
  title: string;
  description: string;
}

export function SpotlightCard({ description, title }: SpotlightCardProps) {
  return (
    <Card className="w-full h-full overflow-hidden">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <Waves />
    </Card>
  );
}
