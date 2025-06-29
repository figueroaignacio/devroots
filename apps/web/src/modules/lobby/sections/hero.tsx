// Components
import { HeroActions } from '../components/hero-actions';
import { HeroBadge } from '../components/hero-badge';
import { HeroBenefits } from '../components/hero-benefits';
import { HeroMarketing } from '../components/hero-marketing';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <HeroBadge />
          <HeroMarketing />
          <HeroActions />
        </div>
        <HeroBenefits />
      </div>
    </section>
  );
}
