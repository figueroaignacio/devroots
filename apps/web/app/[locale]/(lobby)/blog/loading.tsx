// Components
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Separator } from "@repo/ui/components/separator";

export default function LoadingPosts() {
  return (
    <section className="flex flex-col lg:px-5 lg:py-12 py-4">
      <div className="grid grid-cols-1 gap-8">
        <div className="lg:col-span-4">
          <div className="w-full">
            <Skeleton className="w-96 h-8 mb-3" />
            <Skeleton className="w-52 h-4" />
            <Separator className="my-4" />
            <div className="mt-8 hidden lg:block">
              <Skeleton className="w-52 h-4 mb-4" />
              <ul className="flex flex-row flex-wrap gap-y-2 gap-x-3">
                {Array.from({ length: 14 }).map((_, index) => {
                  const widths = ["w-16", "w-20", "w-24"];
                  const randomWidth =
                    widths[Math.floor(Math.random() * widths.length)];
                  return (
                    <li key={index}>
                      <Skeleton className={`${randomWidth} h-6`} />
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8">
          <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <li key={index}>
                <Card className="dark:border-none">
                  <CardHeader className="relative">
                    <CardTitle>
                      <Skeleton className="w-48 h-4" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col gap-2">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton className="w-full h-4" key={index} />
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex-col items-start gap-4">
                    <div className="flex gap-3 items-center">
                      {Array.from({ length: 3 }).map((_, index) => (
                        <Skeleton className="w-16 h-4" key={index} />
                      ))}
                    </div>
                    <Skeleton className="w-full h-8" />
                  </CardFooter>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
