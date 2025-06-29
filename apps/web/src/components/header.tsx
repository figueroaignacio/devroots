// Components
import { GetStartedButton } from '@/modules/auth/components/get-started-button';
import { HeaderLinks } from './header-links';
import { Logo } from './logo';

export function Header() {
  return (
    <header className="border-border border-b backdrop-blur-3xl">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div>
          <Logo />
        </div>
        <nav className="hidden md:block">
          <HeaderLinks />
        </nav>
        <div>
          <GetStartedButton />
        </div>
      </div>
    </header>
  );
}
