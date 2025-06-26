'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthStore } from '../store/auth-store';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const AuthGuard = ({ children, fallback }: AuthGuardProps) => {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isLoading && isAuthenticated === false) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return fallback || <div>Cargando...</div>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
};
