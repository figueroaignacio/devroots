import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, MessageCircle, Share2 } from "lucide-react";

export function UserPost() {
  return (
    <Card className="">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar>
          <AvatarImage
            src="https://github.com/figueroaignacio.png"
            alt="Avatar de usuario"
          />
          <AvatarFallback>UN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="text-sm font-semibold">Ignacio Figueroa</p>
          <p className="text-xs text-muted-foreground">Hace 2 horas</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <CardTitle className="text-xl font-bold">Título del Post</CardTitle>
        <CardDescription>
          Este es el cuerpo del post. Aquí el usuario puede escribir su mensaje,
          compartir sus pensamientos o cualquier otra cosa que quiera comunicar
          a sus seguidores. El contenido puede ser tan largo o corto como se
          desee.
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Heart className="h-5 w-5 text-gray-500" />
          </Button>
          <span className="text-sm text-muted-foreground">42 likes</span>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <MessageCircle className="h-5 w-5 text-gray-500" />
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
