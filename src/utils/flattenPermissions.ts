import { Subject, Resource } from "../types";
import { getPermissionClient } from "../frontend/PermissionClient"; // or from package entry point if exposed

export function flatten(subject: Subject, resource: Resource): string[] {
  const resolver = getPermissionClient();
  const allowed: string[] = [];

  const actions = new Set<string>();

  for (const rule of resolver.getRules()) {
    if (rule.resource === resource.type) {
      actions.add(rule.action);
    }
  }

  for (const action of actions) {
    if (resolver.can(subject, resource, action)) {
      allowed.push(`${resource.type}:${action}`);
    }
  }

  return allowed;
}
