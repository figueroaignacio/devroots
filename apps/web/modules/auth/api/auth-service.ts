import { StateCreator } from "zustand";
import { RegisterFormSchema } from "../schemas/register-schema";
import { authEndpoints } from "./endpoints";

type Set = Parameters<StateCreator<any>>[0];

export const register = (set: Set) => async (userData: RegisterFormSchema) => {
  set({ isLoading: true, error: null });

  try {
    const response = await fetch(`${authEndpoints.register}`, {
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
};

export const login = (set: Set) => async (email: string, password: string) => {
  set({ isLoading: true, error: null });

  try {
    const response = await fetch(`${authEndpoints.login}`, {
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
};

export const getMe = (set: Set) => async () => {
  set({ isLoading: true, error: null });

  try {
    const response = await fetch(`${authEndpoints.me}`, {
      credentials: "include",
    });

    if (!response.ok) {
      set({ user: null, isLoading: false });
      return null;
    }

    const userData = await response.json();
    set({ user: userData, isLoading: false });
    return userData;
  } catch {
    set({ user: null, isLoading: false });
    return null;
  }
};

export const logout = (set: Set) => async () => {
  try {
    await fetch(`${authEndpoints.logout}`, {
      method: "POST",
      credentials: "include",
    });
  } finally {
    set({ user: null });
  }
};
