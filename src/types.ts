export interface Subject {
  id: string;
  roles: string[];
  attributes?: Record<string, any>;
}

export interface Resource {
  id: string;
  type: string;
  attributes?: Record<string, any>;
}

export type Action = string;

export interface PermissionRule {
  resource: string; // e.g., "document"
  action: string; // e.g., "read"
  allowedRoles?: string[]; // e.g., ["admin", "editor"]
  attributeCondition?: Record<string, any>; // JSON-logic format
}
