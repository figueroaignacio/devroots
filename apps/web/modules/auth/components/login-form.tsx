// Components
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { GitHubLogoIcon, ValueIcon } from '@radix-ui/react-icons';

export default function LoginForm() {
  return (
    <div className="relative flex w-full items-center justify-center p-8 lg:w-1/2">
      <div className="bg-primary/5 absolute top-0 right-0 h-72 w-72 rounded-full blur-3xl"></div>
      <div className="bg-secondary/30 absolute bottom-0 left-0 h-96 w-96 rounded-full blur-3xl"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-muted-foreground">
            Desafíos que transforman desarrolladores
          </p>
        </div>
        <Card className="bg-card/80 shadow-2xl backdrop-blur-sm">
          <CardHeader className="space-y-4 pb-8 text-center">
            <CardTitle className="from-foreground to-foreground/70 bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
              Comienza tu aventura
            </CardTitle>
            <CardDescription className="text-muted-foreground text-base">
              Accede a cientos de desafíos y proyectos reales
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Button className="w-full" variant="outline">
              <GitHubLogoIcon className="relative z-10 mr-3 h-5 w-5" />
              <span className="relative z-10">Continuar con GitHub</span>
            </Button>
            <div className="text-muted-foreground flex items-center justify-center gap-6 text-xs">
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Desafíos</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Mentoria</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>Feedback</span>
              </div>
            </div>
            <div className="bg-muted/50 space-y-2 rounded-lg p-4">
              <ul className="text-muted-foreground space-y-1 text-xs">
                <li className="flex items-center gap-2">
                  <div className="bg-primary h-1 w-1 rounded-full"></div>
                  Acceso a todos los desafíos gratuitos
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-primary h-1 w-1 rounded-full"></div>
                  Mentoria por parte de la comunidad
                </li>
                <li className="flex items-center gap-2">
                  <div className="bg-primary h-1 w-1 rounded-full"></div>
                  Comunidad de desarrolladores activa
                </li>
              </ul>
            </div>
            <div className="text-center">
              <p className="text-muted-foreground text-xs leading-relaxed">
                Al continuar, aceptas nuestros{' '}
                <a
                  href="#"
                  className="hover:text-primary underline underline-offset-4 transition-colors"
                >
                  Términos de Servicio
                </a>{' '}
                y{' '}
                <a
                  href="#"
                  className="hover:text-primary underline underline-offset-4 transition-colors"
                >
                  Política de Privacidad
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 text-center lg:hidden">
          <div className="from-primary/10 to-primary/5 border-primary/20 rounded-2xl border bg-gradient-to-br p-6">
            <h3 className="text-foreground mb-2 flex items-center justify-center gap-2 text-xl font-semibold">
              <ValueIcon className="text-primary h-5" />
              Acepta el desafío
            </h3>
            <p className="text-muted-foreground text-sm">
              Únete a miles de desarrolladores mejorando sus habilidades cada
              día
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
