import { create } from "zustand";
import { getMe, login, logout, register } from "../api/auth-service";
import { AuthState } from "../types";

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  register: register(set),
  login: login(set),
  getMe: getMe(set),
  logout: logout(set),
}));
