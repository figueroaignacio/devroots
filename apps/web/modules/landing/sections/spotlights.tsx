// Hooks
import { useTranslations } from "next-intl";

// Components
import { SpotlightCard } from "../ui/spotlight-card";

interface Spotlight {
  title: string;
  description: string;
}

export const Spotlights = () => {
  const t = useTranslations();
  const spotlights = t.raw("spotlights");

  const images = [
    "/magicpattern-grid-pattern-1735417074146.png",
    "/magicpattern-grid-pattern-1735417406009.png",
    "/magicpattern-grid-pattern-1735417346535.png",
  ];

  return (
    <div>
      <ul className="grid grid-cols-2 lg:grid-cols-12 gap-3">
        {spotlights.map((spotlight: Spotlight, index: number) => (
          <li
            className={
              index === 0 || index === 1
                ? "col-span-6"
                : "col-span-6 lg:col-span-4 "
            }
            key={index}
          >
            <SpotlightCard
              title={spotlight.title}
              description={spotlight.description}
              img={images[Math.floor(Math.random() * images.length)]}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
