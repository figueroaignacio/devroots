// Components
import HeroForm from '@/modules/auth/components/hero-form';
import LoginForm from '@/modules/auth/components/login-form';

export default function Page() {
  return (
    <div className="from-background via-background to-muted/20 flex min-h-screen bg-gradient-to-br">
      <HeroForm />
      <LoginForm />
    </div>
  );
}
