// Components
import { Card } from '@/components/ui/card';
import { BackpackIcon, CodeIcon, StarIcon } from '@radix-ui/react-icons';

export default function HeroForm() {
  return (
    <div className="relative hidden overflow-hidden lg:flex lg:w-1/2">
      <div className="bg-primary-foreground/10 absolute top-20 right-20 h-32 w-32 rounded-full blur-xl"></div>
      <div className="bg-primary-foreground/10 absolute bottom-32 left-16 h-24 w-24 rounded-full blur-xl"></div>
      <div className="relative z-10 flex flex-col justify-center p-12 text-white">
        <div className="max-w-lg">
          <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight">
            Domina el <span className="relative">desarrollo</span>
          </h1>
          <p className="mb-12 text-xl leading-relaxed opacity-90">
            Resuelve desafíos reales, construye proyectos increíbles y lleva tus
            habilidades de desarrollo al siguiente nivel.
          </p>
          <div className="space-y-6">
            <Card className="flex items-start gap-4 rounded-xl border p-4 text-white backdrop-blur-sm">
              <div className="bg-primary-foreground/20 rounded-lg p-2">
                <StarIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Desafíos Progresivos</h3>
                <p className="text-sm opacity-80">
                  Desde principiante hasta experto, mejora paso a paso
                </p>
              </div>
            </Card>
            <Card className="flex items-start gap-4 rounded-xl border p-4 text-white backdrop-blur-sm">
              <div className="bg-primary-foreground/20 rounded-lg p-2">
                <BackpackIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Portfolio Real</h3>
                <p className="text-sm opacity-80">
                  Construye proyectos que impresionen a empleadores
                </p>
              </div>
            </Card>
            <Card className="flex items-start gap-4 rounded-xl border p-4 text-white backdrop-blur-sm">
              <div className="bg-primary-foreground/20 rounded-lg p-2">
                <CodeIcon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="mb-1 font-semibold">Tecnologías Modernas</h3>
                <p className="text-sm opacity-80">
                  React, Next.js, TypeScript y las últimas herramientas
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
