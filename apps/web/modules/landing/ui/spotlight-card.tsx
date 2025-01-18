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
    <Card className="w-full h-full overflow-hidden relative">
      <img
        src={img}
        alt={title}
        className="w-full h-full absolute left-60 object-cover opacity-35"
      />
      <CardHeader className="">
        <CardTitle className="text-3xl w-72 font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="max-w-52">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
