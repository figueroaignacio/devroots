import { createEndpoint } from "@/lib/utils";

export const authEndpoints = {
  login: createEndpoint("auth", "login"),
  logout: createEndpoint("auth", "logout"),
  register: createEndpoint("auth", "register"),
  me: createEndpoint("auth", "me"),
};
