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
    <Card className="w-full h-full overflow-hidden relative z-10 rounded-lg shadow-lg group">
      <Image
        width={600}
        height={600}
        src={img}
        alt={title}
        className="w-full h-full absolute inset-0 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110 opacity-30 pointer-events-none"
      />
      <div className="relative z-20 p-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white drop-shadow-md">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-white/90 drop-shadow-md">
            {description}
          </CardDescription>
        </CardContent>
      </div>
    </Card>
  );
}
