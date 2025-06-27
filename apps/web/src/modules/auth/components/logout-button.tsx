'use client';

// Hooks
import { useAuthStore } from '../store/auth-store';

// Components
import { Button } from '@/components/ui/button';

export function LogoutButton() {
  const { logout } = useAuthStore();

  return (
    <Button onClick={logout} variant="destructive">
      Cerrar sesión
    </Button>
  );
}
