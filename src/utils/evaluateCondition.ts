import jsonLogic from "json-logic-js";
import { Subject, Resource } from "../types";

export function evaluateCondition(
  condition: Record<string, any>,
  subject: Subject,
  resource: Resource
): boolean {
  const context = {
    subject: {
      ...subject,
      attributes: subject.attributes || {},
    },
    resource: {
      ...resource,
      attributes: resource.attributes || {},
    },
  };

  try {
    return jsonLogic.apply(condition, context);
  } catch (err) {
    console.error("Condition evaluation failed:", err);
    return false;
  }
}
