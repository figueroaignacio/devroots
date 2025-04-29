import { RegisterFormSchema } from "../schemas/register-schema";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export type AuthState = {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  register: (userData: RegisterFormSchema) => Promise<boolean>;
  login: (email: string, password: string) => Promise<User>;
  getMe: () => Promise<User | null>;
  logout: () => Promise<void>;
};
