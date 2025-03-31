import { Subject, Resource, Action, PermissionRule } from "../types";
import { evaluateCondition } from "./evaluateCondition";

export class PermissionResolver {
  private rules: PermissionRule[];

  constructor(rules: PermissionRule[] = []) {
    this.rules = rules;
  }

  public addRule(rule: PermissionRule): void {
    this.rules.push(rule);
  }

  public getRules(): PermissionRule[] {
    return this.rules;
  }

  public can(subject: Subject, resource: Resource, action: Action): boolean {
    const matchingRules = this.rules.filter(
      (rule) => rule.resource === resource.type && rule.action === action
    );

    for (const rule of matchingRules) {
      const roleAllowed =
        !rule.allowedRoles ||
        rule.allowedRoles.some((role) => subject.roles.includes(role));

      const attributesAllowed =
        !rule.attributeCondition ||
        evaluateCondition(rule.attributeCondition, subject, resource);

      if (roleAllowed && attributesAllowed) {
        return true;
      }
    }

    return false;
  }
}
