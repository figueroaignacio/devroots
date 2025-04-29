import { createEndpoint } from "@/lib/utils";

export const AUTH_ENDPOINTS = {
  LOGIN: createEndpoint("auth", "login"),
  LOGOUT: createEndpoint("auth", "logout"),
  REGISTER: createEndpoint("auth", "register"),
  ME: createEndpoint("auth", "me"),
};
