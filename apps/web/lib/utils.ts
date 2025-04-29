import { API_URL } from "@/constants/api";

export const createEndpoint = (basePath: string, path: string) =>
  `${API_URL}/${basePath}/${path}`;

export const createEndpointWithPaths = (basePath: string, ...paths: string[]) =>
  `${API_URL}/${basePath}/${paths.join("/")}`;
