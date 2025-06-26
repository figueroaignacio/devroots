'use client';

import { LoginWithGitHubButton } from '@/modules/auth/components/login-with-github-button';
import { useAuthStore } from '@/modules/auth/store/auth-store';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated, isLoading, error, clearError } = useAuthStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const authError = searchParams.get('error');

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/home');
    }
  }, [isAuthenticated, router]);

  const displayError = error || getErrorMessage(authError);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="h-32 w-32 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar sesión
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Usa tu cuenta de GitHub para continuar
          </p>
        </div>

        {displayError && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{displayError}</p>
                <button
                  onClick={clearError}
                  className="mt-2 text-sm text-red-600 underline hover:text-red-800"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <LoginWithGitHubButton />
        </div>
      </div>
    </div>
  );
}

function getErrorMessage(error: string | null): string | null {
  switch (error) {
    case 'auth_failed':
      return 'Error al iniciar sesión. Por favor, inténtalo de nuevo.';
    case 'access_denied':
      return 'Acceso denegado. Necesitas autorizar la aplicación para continuar.';
    default:
      return null;
  }
}
