// Components
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
  img: string;
}

export function SpotlightCard({ description, title, img }: SpotlightCardProps) {
  return (
    <Card className="relative w-full h-full overflow-hidden rounded-xl">
      <div className="relative z-10 p-6">
        <CardHeader className="mb-4">
          <CardTitle className="text-3xl font-extrabold ">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-lg">{description}</CardDescription>
        </CardContent>
      </div>
    </Card>
  );
}
