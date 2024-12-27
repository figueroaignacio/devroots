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
      <CardHeader className="">
        <CardTitle className="text-3xl w-72 font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      <Waves />
    </Card>
  );
}
