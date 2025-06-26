'use client';

import { useAuthStore } from '../store/auth-store';

export function LogoutButton() {
  const { logout } = useAuthStore();

  return (
    <button
      onClick={logout}
      className="rounded-md bg-red-600 px-6 py-3 text-sm text-white"
    >
      Cerrar sesión
    </button>
  );
}
