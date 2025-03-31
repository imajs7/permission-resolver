import { PermissionRule } from "../types";
import { PermissionResolver } from "./PermissionResolver";

/**
 * Create a PermissionResolver by loading rules from an external async source like a database.
 *
 * @param loader An async function that returns an array of PermissionRule objects.
 * @returns An instance of PermissionResolver
 */
export async function createResolverFromSource(
  loader: () => Promise<PermissionRule[]>
): Promise<PermissionResolver> {
  const rules = await loader();
  return new PermissionResolver(rules);
}
