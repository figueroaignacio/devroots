// Components
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

interface SpotlightCardProps {
  title: string;
  description: string;
  img: string;
}

export function SpotlightCard({ description, title, img }: SpotlightCardProps) {
  return (
    <Card className="w-full h-full overflow-hidden relative z-50">
      <Image
        width={400}
        height={400}
        src={img}
        alt={title}
        className="w-full h-full absolute inset-0 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 opacity-30"
      />
      <CardHeader>
        <CardTitle className="text-3xl w-72 font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
