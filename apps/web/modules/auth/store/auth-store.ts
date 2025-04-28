import { create } from "zustand";
import { RegisterFormSchema } from "../schemas/register-schema";
import { User } from "../types";

type AuthState = {
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

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),

  clearUser: () => set({ user: null }),

  register: async (userData: RegisterFormSchema) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch("http://localhost:4000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      set({ isLoading: false });
      return true;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await response.json();
      set({ user: userData, isLoading: false });
      return userData;
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
      throw error;
    }
  },

  getMe: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await fetch("http://localhost:4000/api/auth/me", {
        credentials: "include",
      });

      if (!response.ok) {
        set({ user: null, isLoading: false });
        return null;
      }

      const userData = await response.json();
      set({ user: userData, isLoading: false });
      return userData;
    } catch (error) {
      set({ user: null, isLoading: false });
      return null;
    }
  },

  logout: async () => {
    try {
      await fetch("http://localhost:4000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } finally {
      set({ user: null });
    }
  },
}));
