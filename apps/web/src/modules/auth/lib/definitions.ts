export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  avatarUrl: string;
}

export interface AuthStatus {
  isAuthenticated: boolean;
  user: User | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean | undefined;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}
