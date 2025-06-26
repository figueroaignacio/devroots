import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { getCurrentUser, logout } from '../lib/api';
import { AuthActions, AuthState } from '../lib/definitions';

type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: undefined as boolean | undefined,
        isLoading: false,
        error: null,

        checkAuth: async () => {
          set({ isLoading: true, error: null });

          try {
            const user = await getCurrentUser();

            if (user) {
              set({
                user,
                isAuthenticated: true,
                isLoading: false,
              });
            } else {
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
              });
            }
          } catch (error) {
            set({
              user: null,
              isAuthenticated: false,
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Error de autenticación',
            });
          }
        },

        logout: async () => {
          set({ isLoading: true });

          try {
            const success = await logout();

            if (success) {
              set({
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: null,
              });

              window.location.href = '/';
            } else {
              set({
                isLoading: false,
                error: 'Error al cerrar sesión',
              });
            }
          } catch (error) {
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : 'Error al cerrar sesión',
            });
          }
        },

        clearError: () => set({ error: null }),

        setLoading: (loading: boolean) => set({ isLoading: loading }),
      }),
      {
        name: 'auth-storage',
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    ),
    {
      name: 'auth-store',
    }
  )
);
