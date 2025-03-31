// PermissionService.ts
import { PermissionResolver } from "./PermissionResolver";
import { PermissionRule } from "../types";

export class PermissionService {
  private static instance: PermissionResolver;

  private constructor() {}

  public static init(rules: PermissionRule[]): PermissionResolver {
    if (!PermissionService.instance) {
      PermissionService.instance = new PermissionResolver(rules);
    }
    return PermissionService.instance;
  }

  public static getInstance(): PermissionResolver {
    if (!PermissionService.instance) {
      throw new Error("PermissionService not initialized. Call init() first.");
    }
    return PermissionService.instance;
  }
}
