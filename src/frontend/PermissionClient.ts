import { PermissionRule } from "../types";
import { createResolverFromSource } from "../utils/createResolver";
import { PermissionResolver } from "../utils/PermissionResolver";

let instance: PermissionResolver;

export interface InitPermissionClientOptions {
  fetchRules: () => Promise<{ data: PermissionRule[] }>;
}

export async function initPermissionClient(
  options: InitPermissionClientOptions
) {
  instance = await createResolverFromSource(async () => {
    const { data } = await options.fetchRules();
    return data;
  });
}

export function getPermissionClient(): PermissionResolver {
  if (!instance) {
    throw new Error("PermissionResolver not initialized");
  }
  return instance;
}
